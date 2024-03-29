//    OpenVPN -- An application to securely tunnel IP networks
//               over a single port, with support for SSL/TLS-based
//               session authentication and key exchange,
//               packet encryption, packet authentication, and
//               packet compression.
//
//    Copyright (C) 2012-2017 OpenVPN Inc.
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License Version 3
//    as published by the Free Software Foundation.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Affero General Public License for more details.
//
//    You should have received a copy of the GNU Affero General Public License
//    along with this program in the COPYING file.
//    If not, see <http://www.gnu.org/licenses/>.

// Wrap the OpenSSL SSL API as defined in <openssl/ssl.h>
// so that it can be used as the SSL layer by the OpenVPN core.

#ifndef OPENVPN_OPENSSL_SSL_SSLCTX_H
#define OPENVPN_OPENSSL_SSL_SSLCTX_H

#include <string>
#include <cstring>
#include <sstream>
#include <utility>

#include <openssl/ssl.h>
#include <openssl/x509v3.h>
#include <openssl/rsa.h>
#include <openssl/dsa.h>
#include <openssl/bn.h>
#include <openssl/rand.h>

#include <openvpn/common/size.hpp>
#include <openvpn/common/exception.hpp>
#include <openvpn/common/mode.hpp>
#include <openvpn/common/options.hpp>
#include <openvpn/common/base64.hpp>
#include <openvpn/common/string.hpp>
#include <openvpn/common/uniqueptr.hpp>
#include <openvpn/common/hexstr.hpp>
#include <openvpn/common/to_string.hpp>
#include <openvpn/common/unicode.hpp>
#include <openvpn/frame/frame.hpp>
#include <openvpn/buffer/buffer.hpp>
#include <openvpn/pki/cclist.hpp>
#include <openvpn/pki/epkibase.hpp>
#include <openvpn/ssl/kuparse.hpp>
#include <openvpn/ssl/nscert.hpp>
#include <openvpn/ssl/tlsver.hpp>
#include <openvpn/ssl/tls_remote.hpp>
#include <openvpn/ssl/sslconsts.hpp>
#include <openvpn/ssl/sslapi.hpp>
#include <openvpn/ssl/ssllog.hpp>
#include <openvpn/ssl/sni_handler.hpp>
#include <openvpn/openssl/util/error.hpp>
#include <openvpn/openssl/pki/x509.hpp>
#include <openvpn/openssl/pki/crl.hpp>
#include <openvpn/openssl/pki/pkey.hpp>
#include <openvpn/openssl/pki/dh.hpp>
#include <openvpn/openssl/pki/x509store.hpp>
#include <openvpn/openssl/bio/bio_memq_stream.hpp>
#include <openvpn/openssl/ssl/sess_cache.hpp>

#ifdef HAVE_JSON
#include <openvpn/common/jsonhelper.hpp>
#endif

// An SSL Context is essentially a configuration that can be used
// to generate an arbitrary number of actual SSL connections objects.

// OpenSSLContext is an SSL Context implementation that uses the
// OpenSSL library as a backend.

namespace openvpn {

  // Represents an SSL configuration that can be used
  // to instantiate actual SSL sessions.
  class OpenSSLContext : public SSLFactoryAPI
  {
  public:
    typedef RCPtr<OpenSSLContext> Ptr;
    typedef CertCRLListTemplate<OpenSSLPKI::X509List, OpenSSLPKI::CRLList> CertCRLList;

    enum {
      MAX_CIPHERTEXT_IN = 64 // maximum number of queued input ciphertext packets
    };

    // The data needed to construct an OpenSSLContext.
    class Config : public SSLConfigAPI
    {
      friend class OpenSSLContext;

    public:
      typedef RCPtr<Config> Ptr;

      virtual SSLFactoryAPI::Ptr new_factory()
      {
	return SSLFactoryAPI::Ptr(new OpenSSLContext(this));
      }

      virtual void set_mode(const Mode& mode_arg)
      {
	mode = mode_arg;
      }

      virtual const Mode& get_mode() const
      {
	return mode;
      }

      // if this callback is defined, no private key needs to be loaded
      virtual void set_external_pki_callback(ExternalPKIBase* external_pki_arg)
      {
	external_pki = external_pki_arg;
      }

      // server side
      virtual void set_session_ticket_handler(TLSSessionTicketBase* session_ticket_handler_arg)
      {
	session_ticket_handler = session_ticket_handler_arg;
      }

      // client side
      virtual void set_client_session_tickets(const bool v)
      {
	client_session_tickets = v;
      }

      // server side
      virtual void set_sni_handler(SNI::HandlerBase* sni_handler_arg)
      {
	sni_handler = sni_handler_arg;
      }

      // client side
      virtual void set_sni_name(const std::string& sni_name_arg)
      {
	sni_name = sni_name_arg;
      }

      virtual void set_private_key_password(const std::string& pwd)
      {
	pkey.set_private_key_password(pwd);
      }

      virtual void load_ca(const std::string& ca_txt, bool strict)
      {
	ca.parse_pem(ca_txt, "ca");
      }

      virtual void load_crl(const std::string& crl_txt)
      {
	ca.parse_pem(crl_txt, "crl");
      }

      virtual void load_cert(const std::string& cert_txt)
      {
	cert.parse_pem(cert_txt, "cert");
      }

      virtual void load_cert(const std::string& cert_txt, const std::string& extra_certs_txt)
      {
	load_cert(cert_txt);
	if (!extra_certs_txt.empty())
	  CertCRLList::from_string(extra_certs_txt, "extra-certs", &extra_certs, nullptr);
      }

      virtual void load_private_key(const std::string& key_txt)
      {
	pkey.parse_pem(key_txt, "private key");
      }

      virtual void load_dh(const std::string& dh_txt)
      {
	dh.parse_pem(dh_txt);
      }

      virtual std::string extract_ca() const
      {
	return ca.certs.render_pem();
      }

      virtual std::string extract_crl() const
      {
	return ca.crls.render_pem();
      }

      virtual std::string extract_cert() const
      {
	return cert.render_pem();
      }

      virtual std::vector<std::string> extract_extra_certs() const
      {
	std::vector<std::string> ret;

	for (auto const& cert : extra_certs)
	  ret.push_back(cert.render_pem());

	return ret;
      }

      virtual std::string extract_private_key() const
      {
	return pkey.render_pem();
      }

      virtual std::string extract_dh() const
      {
	return dh.render_pem();
      }

      virtual PKType::Type private_key_type() const
      {
	if (!pkey.defined())
	  return PKType::PK_NONE;
	return pkey.key_type();
      }

      virtual size_t private_key_length() const
      {
	return pkey.key_length();
      }

      virtual void set_frame(const Frame::Ptr& frame_arg)
      {
	frame = frame_arg;
      }

      virtual void set_debug_level(const int debug_level)
      {
	ssl_debug_level = debug_level;
      }

      virtual void set_flags(const unsigned int flags_arg)
      {
	flags = flags_arg;
      }

      virtual void set_ns_cert_type(const NSCert::Type ns_cert_type_arg)
      {
	ns_cert_type = ns_cert_type_arg;
      }

      virtual void set_remote_cert_tls(const KUParse::TLSWebType wt)
      {
	KUParse::remote_cert_tls(wt, ku, eku);
      }

      virtual void set_tls_remote(const std::string& tls_remote_arg)
      {
	tls_remote = tls_remote_arg;
      }

      virtual void set_tls_version_min(const TLSVersion::Type tvm)
      {
	tls_version_min = tvm;
      }

      virtual void set_tls_version_min_override(const std::string& override)
      {
	TLSVersion::apply_override(tls_version_min, override);
      }

      virtual void set_tls_cert_profile(const TLSCertProfile::Type type)
      {
	tls_cert_profile = type;
      }

      virtual void set_tls_cert_profile_override(const std::string& override)
      {
	TLSCertProfile::apply_override(tls_cert_profile, override);
      }

      virtual void set_local_cert_enabled(const bool v)
      {
	local_cert_enabled = v;
      }

      virtual void set_force_aes_cbc_ciphersuites(const bool v)
      {
	force_aes_cbc_ciphersuites = v;
      }

      virtual void set_x509_track(X509Track::ConfigSet x509_track_config_arg)
      {
	x509_track_config = std::move(x509_track_config_arg);
      }

      virtual void set_rng(const RandomAPI::Ptr& rng_arg)
      {
	// Not implemented (other than assert_crypto check)
	// because OpenSSL is hardcoded to use its own RNG.
	rng_arg->assert_crypto();
      }

      virtual std::string validate_cert(const std::string& cert_txt) const
      {
	OpenSSLPKI::X509 cert(cert_txt, "cert");
	return cert.render_pem();
      }

      virtual std::string validate_cert_list(const std::string& certs_txt) const
      {
	CertCRLList certs(certs_txt, "cert list");
	return certs.render_pem();
      }

      virtual std::string validate_private_key(const std::string& key_txt) const
      {
	OpenSSLPKI::PKey pkey(key_txt, "private key");
	return pkey.render_pem();
      }

      virtual std::string validate_dh(const std::string& dh_txt) const
      {
	OpenSSLPKI::DH dh(dh_txt);
	return dh.render_pem();
      }

      virtual std::string validate_crl(const std::string& crl_txt) const
      {
	OpenSSLPKI::CRL crl(crl_txt);
	return crl.render_pem();
      }

      virtual void load(const OptionList& opt, const unsigned int lflags)
      {
	// client/server
	if (lflags & LF_PARSE_MODE)
	  mode = opt.exists("client") ? Mode(Mode::CLIENT) : Mode(Mode::SERVER);

	// possibly disable peer cert verification
	if ((lflags & LF_ALLOW_CLIENT_CERT_NOT_REQUIRED)
	    && opt.exists("client-cert-not-required"))
	  flags |= SSLConst::NO_VERIFY_PEER;

	// sni
	{
	  const std::string name = opt.get_optional("sni", 1, 256);
	  if (!name.empty())
	    set_sni_name(name);
	}

	// ca
	{
	  std::string ca_txt = opt.cat("ca");
	  if (lflags & LF_RELAY_MODE)
	    ca_txt += opt.cat("relay-extra-ca");
	  load_ca(ca_txt, true);
	}

	// CRL
	{
	  const std::string crl_txt = opt.cat("crl-verify");
	  if (!crl_txt.empty())
	    load_crl(crl_txt);
	}

	// local cert/key
	if (local_cert_enabled)
	  {
	    // cert
	    {
	      const std::string& cert_txt = opt.get("cert", 1, Option::MULTILINE);
	      const std::string ec_txt = opt.cat("extra-certs");
	      load_cert(cert_txt, ec_txt);
	    }

	    // private key
	    if (!external_pki)
	      {
		const std::string& key_txt = opt.get("key", 1, Option::MULTILINE);
		load_private_key(key_txt);
	      }
	  }

	// DH
	if (mode.is_server())
	  {
	    const std::string& dh_txt = opt.get("dh", 1, Option::MULTILINE);
	    load_dh(dh_txt);
	  }

	// relay mode
	std::string relay_prefix;
	if (lflags & LF_RELAY_MODE)
	  relay_prefix = "relay-";

	// ns-cert-type
	ns_cert_type = NSCert::ns_cert_type(opt, relay_prefix);

	// parse remote-cert-x options
	KUParse::remote_cert_tls(opt, relay_prefix, ku, eku);
	KUParse::remote_cert_ku(opt, relay_prefix, ku);
	KUParse::remote_cert_eku(opt, relay_prefix, eku);

	// parse tls-remote
	tls_remote = opt.get_optional(relay_prefix + "tls-remote", 1, 256);

	// Parse tls-version-min option.
	tls_version_min = TLSVersion::parse_tls_version_min(opt, relay_prefix, maxver());

	// parse tls-cert-profile
	tls_cert_profile = TLSCertProfile::parse_tls_cert_profile(opt, relay_prefix);

	// unsupported cert checkers
	{
	}
      }

#ifdef HAVE_JSON
      virtual SSLConfigAPI::Ptr json_override(const Json::Value& root, const bool load_cert_key) const override
      {
	static const char title[] = "json_override";

	Config::Ptr ret(new Config);

	// inherit from self
	ret->mode = mode;
	ret->dh = dh;
	ret->frame = frame;
	ret->ssl_debug_level = ssl_debug_level;
	ret->flags = flags;
	ret->local_cert_enabled = local_cert_enabled;

	// ca
	{
	  const std::string& ca_txt = json::get_string_ref(root, "ca", title);
	  ret->load_ca(ca_txt, true);
	}

	// CRL
	{
	  const std::string crl_txt = json::get_string_optional(root, "crl_verify", std::string(), title);
	  if (!crl_txt.empty())
	    ret->load_crl(crl_txt);
	}

	// cert/key
	if (load_cert_key && local_cert_enabled)
	  {
	    bool loaded_cert = false;

	    // cert/extra_certs
	    {
	      const std::string cert_txt = json::get_string_optional(root, "cert", std::string(), title);
	      if (!cert_txt.empty())
		{
		  const std::string ec_txt = json::get_string_optional(root, "extra_certs", std::string(), title);
		  ret->load_cert(cert_txt, ec_txt);
		  loaded_cert = true;
		}
	      else
		{
		  ret->cert = cert;
		  ret->extra_certs = extra_certs;
		}
	    }

	    // private key
	    if (loaded_cert && !external_pki)
	      {
		const std::string& key_txt = json::get_string_ref(root, "key", title);
		if (!key_txt.empty())
		  ret->load_private_key(key_txt);
		else
		  ret->pkey = pkey;
	      }
	  }
	else
	  {
	    // inherit from self
	    ret->cert = cert;
	    ret->extra_certs = extra_certs;
	    ret->pkey = pkey;
	  }

	// ns_cert_type
	{
	  const std::string ct = json::get_string_optional(root, "ns_cert_type", std::string(), title);
	  if (!ct.empty())
	    ret->ns_cert_type = NSCert::ns_cert_type(ct);
	}

	// ku, eku
	{
	  const std::string ct = json::get_string_optional(root, "remote_cert_tls", std::string(), title);
	  if (!ct.empty())
	    KUParse::remote_cert_tls(ct, ret->ku, ret->eku);
	}

	// tls_version_min
	{
	  const std::string tvm = json::get_string_optional(root, "tls_version_min", std::string(), title);
	  if (!tvm.empty())
	    ret->tls_version_min = TLSVersion::parse_tls_version_min(tvm, false, maxver());
	}

	// tls_cert_profile
	{
	  const std::string prof = json::get_string_optional(root, "tls_cert_profile", std::string(), title);
	  if (!prof.empty())
	    ret->tls_cert_profile = TLSCertProfile::parse_tls_cert_profile(prof);
	}

	return ret;
      }
#endif

    private:
      static TLSVersion::Type maxver()
      {
	// Return maximum TLS version supported by OpenSSL.
	// Assume that presence of SSL_OP_NO_TLSvX macro indicates
	// that local OpenSSL library implements TLSvX.
#if defined(SSL_OP_NO_TLSv1_3)
	return TLSVersion::V1_3;
#elif defined(SSL_OP_NO_TLSv1_2)
	return TLSVersion::V1_2;
#elif defined(SSL_OP_NO_TLSv1_1)
	return TLSVersion::V1_1;
#else
	return TLSVersion::V1_0;
#endif
      }

      Mode mode;
      CertCRLList ca;                   // from OpenVPN "ca" and "crl-verify" option
      OpenSSLPKI::X509 cert;            // from OpenVPN "cert" option
      OpenSSLPKI::X509List extra_certs; // from OpenVPN "extra-certs" option
      OpenSSLPKI::PKey pkey;            // private key
      OpenSSLPKI::DH dh;                // diffie-hellman parameters (only needed in server mode)
      ExternalPKIBase* external_pki = nullptr;
      TLSSessionTicketBase* session_ticket_handler = nullptr; // server side only
      SNI::HandlerBase* sni_handler = nullptr; // server side only
      Frame::Ptr frame;
      int ssl_debug_level = 0;
      unsigned int flags = 0;           // defined in sslconsts.hpp
      std::string sni_name;             // client side only
      NSCert::Type ns_cert_type{NSCert::NONE};
      std::vector<unsigned int> ku; // if defined, peer cert X509 key usage must match one of these values
      std::string eku;              // if defined, peer cert X509 extended key usage must match this OID/string
      std::string tls_remote;
      TLSVersion::Type tls_version_min{TLSVersion::UNDEF}; // minimum TLS version that we will negotiate
      TLSCertProfile::Type tls_cert_profile{TLSCertProfile::UNDEF};
      X509Track::ConfigSet x509_track_config;
      bool local_cert_enabled = true;
      bool force_aes_cbc_ciphersuites = false;
      bool client_session_tickets = false;
    };

    // Represents an actual SSL session.
    // Normally instantiated by OpenSSLContext::ssl().
    class SSL : public SSLAPI
    {
      friend class OpenSSLContext;

    public:
      typedef RCPtr<SSL> Ptr;

      void start_handshake() override
      {
	SSL_do_handshake(ssl);
      }

      ssize_t write_cleartext_unbuffered(const void *data, const size_t size) override
      {
	const int status = BIO_write(ssl_bio, data, size);
	if (status < 0)
	  {
	    if (status == -1 && BIO_should_retry(ssl_bio))
	      return SSLConst::SHOULD_RETRY;
	    else
	      {
		mark_no_cache();
		OPENVPN_THROW(OpenSSLException, "OpenSSLContext::SSL::write_cleartext: BIO_write failed, size=" << size << " status=" << status);
	      }
	  }
	else
	  return status;
      }

      ssize_t read_cleartext(void *data, const size_t capacity) override
      {
	if (!overflow)
	  {
	    const int status = BIO_read(ssl_bio, data, capacity);
	    if (status < 0)
	      {
		if (status == -1 && BIO_should_retry(ssl_bio))
		  return SSLConst::SHOULD_RETRY;
		else
		  {
		    mark_no_cache();
		    OPENVPN_THROW(OpenSSLException, "OpenSSLContext::SSL::read_cleartext: BIO_read failed, cap=" << capacity << " status=" << status);
		  }
	      }
	    else
	      return status;
	  }
	else
	  throw ssl_ciphertext_in_overflow();
      }

      bool read_cleartext_ready() const override
      {
	return !bmq_stream::memq_from_bio(ct_in)->empty() || SSL_pending(ssl) > 0;
      }

      void write_ciphertext(const BufferPtr& buf) override
      {
	bmq_stream::MemQ* in = bmq_stream::memq_from_bio(ct_in);
	if (in->size() < MAX_CIPHERTEXT_IN)
	  in->write_buf(buf);
	else
	  overflow = true;
      }

      void write_ciphertext_unbuffered(const unsigned char *data, const size_t size) override
      {
	bmq_stream::MemQ* in = bmq_stream::memq_from_bio(ct_in);
	if (in->size() < MAX_CIPHERTEXT_IN)
	  in->write(data, size);
	else
	  overflow = true;
      }

      bool read_ciphertext_ready() const override
      {
	return !bmq_stream::memq_from_bio(ct_out)->empty();
      }

      BufferPtr read_ciphertext() override
      {
	return bmq_stream::memq_from_bio(ct_out)->read_buf();
      }

      std::string ssl_handshake_details() const override
      {
	return ssl_handshake_details(ssl);
      }

      // Return true if we did a full SSL handshake/negotiation.
      // Return false for cached, reused, or persisted sessions.
      // Also returns false if previously called on this session.
      virtual bool did_full_handshake() override
      {
	if (called_did_full_handshake)
	  return false;
	called_did_full_handshake = true;
	return !SSL_session_reused(ssl);
      }

      const AuthCert::Ptr& auth_cert() const override
      {
	// Reused sessions don't call the cert verify callbacks,
	// so we must use an alternative method to build authcert.
	if (authcert && authcert->is_uninitialized())
	  rebuild_authcert();
	return authcert;
      }

      void mark_no_cache() override
      {
	sess_cache_key.reset();
      }

      ~SSL()
      {
	ssl_erase();
      }

      static void init_static()
      {
	bmq_stream::init_static();

	ssl_data_index = SSL_get_ex_new_index(0, (char *)"OpenSSLContext::SSL", nullptr, nullptr, nullptr);
	context_data_index = SSL_get_ex_new_index(0, (char *)"OpenSSLContext", nullptr, nullptr, nullptr);

	/*
	 * We actually override some of the OpenSSL SSLv23 methods here,
	 * in particular the ssl_pending method.  We want ssl_pending
	 * to return 0 until the SSL negotiation establishes the
	 * actual method.  The default OpenSSL SSLv23 ssl_pending method
	 * (ssl_undefined_const_function) triggers an OpenSSL error condition
	 * when calling SSL_pending early which is not what we want.
	 *
	 * This depends on SSL23 being a generic method and OpenSSL later
	 * switching to a spefic TLS method (TLS10method etc..) with
	 * ssl23_get_client_method that has the proper ssl3_pending pending method.
	 *
	 * OpenSSL 1.1.x does not allow hacks like this anymore. So overriding is not
	 * possible. Fortunately OpenSSL 1.1 also always defines ssl_pending method to
	 * be ssl3_pending, so this hack is no longer needed.
	 */

#if OPENSSL_VERSION_NUMBER < 0x10100000L
	ssl23_method_client_ = *SSLv23_client_method();
	ssl23_method_client_.ssl_pending = ssl_pending_override;

	ssl23_method_server_ = *SSLv23_server_method();
	ssl23_method_server_.ssl_pending = ssl_pending_override;
#endif
      }

    private:
      SSL(const OpenSSLContext& ctx, const std::string* hostname, const std::string* cache_key)
      {
	ssl_clear();
	try {
	  // init SSL objects
	  ssl = SSL_new(ctx.ctx);
	  if (!ssl)
	    throw OpenSSLException("OpenSSLContext::SSL: SSL_new failed");

	  // release unneeded buffers
	  SSL_set_mode(ssl, SSL_MODE_RELEASE_BUFFERS);

	  // verify hostname
	  if (hostname && !(ctx.config->flags & SSLConst::NO_VERIFY_HOSTNAME))
	    {
	      X509_VERIFY_PARAM *param = SSL_get0_param(ssl);
	      X509_VERIFY_PARAM_set_hostflags(param, 0);
	      X509_VERIFY_PARAM_set1_host(param, hostname->c_str(), 0);
	    }

	  // init BIOs
	  ssl_bio = BIO_new(BIO_f_ssl());
	  if (!ssl_bio)
	    throw OpenSSLException("OpenSSLContext::SSL: BIO_new BIO_f_ssl failed");
	  ct_in = mem_bio(ctx.config->frame);
	  ct_out = mem_bio(ctx.config->frame);

	  // set client/server mode
	  if (ctx.config->mode.is_server())
	    {
	      SSL_set_accept_state(ssl);
	      authcert.reset(new AuthCert());
	      if (!ctx.config->x509_track_config.empty())
		authcert->x509_track.reset(new X509Track::Set);
	    }
	  else if (ctx.config->mode.is_client())
	    {
	      if (cache_key && ctx.sess_cache)
		{
		  // see if a cached session already exists for our cache_key
		  ctx.sess_cache->extract(*cache_key, [this](SSL_SESSION* sess) {
		      if (!SSL_set_session(ssl, sess))
			throw OpenSSLException("SSL_set_session failed");
		    });

		  // cache the session before its end-of-life if no errors occur
		  sess_cache_key.reset(new OpenSSLSessionCache::Key(*cache_key, ctx.sess_cache));
		}
	      SSL_set_connect_state(ssl);

	      // client-side SNI
	      if (!ctx.config->sni_name.empty())
		{
		  if (SSL_set_tlsext_host_name(ssl, ctx.config->sni_name.c_str()) != 1)
		    throw OpenSSLException("OpenSSLContext::SSL: SSL_set_tlsext_host_name failed (sni_name)");
		}
	      else if ((ctx.config->flags & SSLConst::ENABLE_CLIENT_SNI) && hostname)
		{
		  if (SSL_set_tlsext_host_name(ssl, hostname->c_str()) != 1)
		    throw OpenSSLException("OpenSSLContext::SSL: SSL_set_tlsext_host_name failed (hostname)");
		}
	    }
	  else
	    OPENVPN_THROW(ssl_context_error, "OpenSSLContext::SSL: unknown client/server mode");

	  // effect SSL/BIO linkage
	  ssl_bio_linkage = true; // after this point, no need to explicitly BIO_free ct_in/ct_out
	  SSL_set_bio (ssl, ct_in, ct_out);
	  BIO_set_ssl (ssl_bio, ssl, BIO_NOCLOSE);

	  if (ssl_data_index < 0)
	    throw ssl_context_error("OpenSSLContext::SSL: ssl_data_index is uninitialized");
	  SSL_set_ex_data (ssl, ssl_data_index, this);
	  set_parent(&ctx);
	}
	catch (...)
	  {
	    ssl_erase();
	    throw;
	  }
      }

      void set_parent(const OpenSSLContext* ctx)
      {
	if (context_data_index < 0)
	  throw ssl_context_error("OpenSSLContext::SSL: context_data_index is uninitialized");
	SSL_set_ex_data(ssl, context_data_index, (void *)ctx);
      }

      void rebuild_authcert() const
      {
	::X509 *cert = SSL_get_peer_certificate(ssl);
	if (cert)
	  {
	    // save the issuer cert fingerprint
	    static_assert(sizeof(AuthCert::issuer_fp) == SHA_DIGEST_LENGTH, "size inconsistency");

	    unsigned int md_len = sizeof(AuthCert::issuer_fp);
	    X509_digest (cert, EVP_sha1 (), authcert->issuer_fp, &md_len);

	    // save the Common Name
	    authcert->cn = x509_get_field(cert, NID_commonName);

	    // save the leaf cert serial number
	    const ASN1_INTEGER *ai = X509_get_serialNumber(cert);
	    authcert->sn = ai ? ASN1_INTEGER_get(ai) : -1;

	    X509_free (cert);
	  }
      }

      // Indicate no data available for our custom SSLv23 method
      static int ssl_pending_override(const ::SSL *)
      {
	return 0;
      }

      // Print a one line summary of SSL/TLS session handshake.
      static std::string ssl_handshake_details (::SSL *c_ssl)
      {
	std::ostringstream os;

	::X509 *cert = SSL_get_peer_certificate (c_ssl);

	if (cert)
	  os << "CN=" << x509_get_field(cert, NID_commonName) << ", ";

	os << SSL_get_version (c_ssl);

	const SSL_CIPHER *ciph = SSL_get_current_cipher (c_ssl);
	if (ciph)
	  os << ", cipher " << SSL_CIPHER_get_version (ciph) << ' ' << SSL_CIPHER_get_name (ciph);

	if (cert != nullptr)
	  {
	    EVP_PKEY *pkey = X509_get_pubkey (cert);
	    if (pkey != nullptr)
	      {
		if (EVP_PKEY_id (pkey) == EVP_PKEY_RSA && EVP_PKEY_get0_RSA (pkey) != nullptr && RSA_get0_n(EVP_PKEY_get0_RSA (pkey)) != nullptr)
		  os << ", " << BN_num_bits (RSA_get0_n(EVP_PKEY_get0_RSA (pkey))) << " bit RSA";
#ifndef OPENSSL_NO_DSA
		else if (EVP_PKEY_id (pkey) == EVP_PKEY_DSA && EVP_PKEY_get0_DSA (pkey) != nullptr && DSA_get0_p(EVP_PKEY_get0_DSA (pkey))!= nullptr)
		  os << ", " << BN_num_bits (DSA_get0_p(EVP_PKEY_get0_DSA (pkey))) << " bit DSA";
#endif
		EVP_PKEY_free (pkey);
	      }
	    X509_free (cert);
	  }
	if (SSL_session_reused(c_ssl))
	  os << " [REUSED]";
	return os.str();
      }

      void ssl_clear()
      {
	ssl_bio_linkage = false;
	ssl = nullptr;
	ssl_bio = nullptr;
	ct_in = nullptr;
	ct_out = nullptr;
	overflow = false;
	called_did_full_handshake = false;
	sess_cache_key.reset();
      }

      void ssl_erase()
      {
	if (!ssl_bio_linkage)
	  {
	    if (ct_in)
	      BIO_free(ct_in);
	    if (ct_out)
	      BIO_free(ct_out);
	  }
	if (ssl_bio)
	  BIO_free_all(ssl_bio);
	if (ssl)
	  {
	    if (sess_cache_key)
	      {
		SSL_set_shutdown(ssl, SSL_SENT_SHUTDOWN|SSL_RECEIVED_SHUTDOWN);
		sess_cache_key->commit(SSL_get1_session(ssl));
	      }
	    SSL_free(ssl);
	  }
	openssl_clear_error_stack();
	ssl_clear();
      }

      static BIO* mem_bio(const Frame::Ptr& frame)
      {
	BIO *bio = BIO_new(bmq_stream::BIO_s_memq());
	if (!bio)
	  throw OpenSSLException("OpenSSLContext::SSL: BIO_new failed on bmq_stream");
	bmq_stream::memq_from_bio(bio)->set_frame(frame);
	return bio;
      }

#if OPENSSL_VERSION_NUMBER < 0x10100000L
      /*
       * Return modified OpenSSL SSLv23 methods,
       * as configured in init_static().
       */

      static const SSL_METHOD* tls_method_client()
      {
	return &ssl23_method_client_;
      }

      static const SSL_METHOD* tls_method_server()
      {
	return &ssl23_method_server_;
      }
#else
      static const SSL_METHOD* tls_method_client ()
      {
        return TLS_client_method ();
      }

      static const SSL_METHOD* tls_method_server ()
      {
        return TLS_server_method ();
      }
#endif
      ::SSL *ssl;	   // OpenSSL SSL object
      BIO *ssl_bio;        // read/write cleartext from here
      BIO *ct_in;          // write ciphertext to here
      BIO *ct_out;         // read ciphertext from here
      AuthCert::Ptr authcert;
      OpenSSLSessionCache::Key::UPtr sess_cache_key; // client-side only
      OpenSSLContext::Ptr sni_ctx;
      bool ssl_bio_linkage;
      bool overflow;
      bool called_did_full_handshake;

      // Helps us to store pointer to self in ::SSL object
      static int ssl_data_index;
      static int context_data_index;

#if OPENSSL_VERSION_NUMBER < 0x10100000L
      // Modified SSLv23 methods
      static SSL_METHOD ssl23_method_client_;
      static SSL_METHOD ssl23_method_server_;
#endif
    };

  private:
    class ExternalPKIImpl {
    public:
      ExternalPKIImpl(SSL_CTX* ssl_ctx, ::X509* cert, ExternalPKIBase* external_pki_arg)
	: external_pki(external_pki_arg), n_errors(0)
      {
	RSA *rsa = nullptr;
        RSA *pub_rsa = nullptr;
        RSA_METHOD *rsa_meth = nullptr;
	const char *errtext = "";

	/* allocate custom RSA method object */
	rsa_meth = RSA_meth_new ("OpenSSLContext::ExternalPKIImpl private key RSA Method", RSA_METHOD_FLAG_NO_CHECK);

	RSA_meth_set_pub_enc (rsa_meth, rsa_pub_enc);
	RSA_meth_set_pub_dec (rsa_meth, rsa_pub_dec);
	RSA_meth_set_priv_enc (rsa_meth, rsa_priv_enc);
	RSA_meth_set_priv_dec (rsa_meth, rsa_priv_dec);
	RSA_meth_set_init (rsa_meth, nullptr);
	RSA_meth_set_finish (rsa_meth, rsa_finish);
	RSA_meth_set0_app_data (rsa_meth, this);

	/* allocate RSA object */
	rsa = RSA_new();
	if (rsa == nullptr)
	  {
	    SSLerr(SSL_F_SSL_USE_PRIVATEKEY, ERR_R_MALLOC_FAILURE);
	    errtext = "RSA_new";
	    goto err;
	  }

	/* get the public key */
	if (X509_get0_pubkey(cert) == nullptr) /* nullptr before SSL_CTX_use_certificate() is called */
	  {
	    errtext = "pkey is NULL";
	    goto err;
	  }

	if (EVP_PKEY_id (X509_get0_pubkey(cert)) != EVP_PKEY_RSA )
	  {
	    errtext = "pkey is not RSA";
	    goto err;
	  }
	pub_rsa = EVP_PKEY_get0_RSA (X509_get0_pubkey(cert));

	/* initialize RSA object */
	rsa = RSA_new ();

	/* only set e and n as d (private key) is outside our control */
	RSA_set0_key(rsa, BN_dup(RSA_get0_n(pub_rsa)), BN_dup(RSA_get0_e(pub_rsa)), nullptr);
	RSA_set_flags (rsa, RSA_FLAG_EXT_PKEY);

	if (!RSA_set_method(rsa, rsa_meth))
	  {
	    errtext = "RSA_set_method";
	    goto err;
	  }

	/* bind our custom RSA object to ssl_ctx */
	if (!SSL_CTX_use_RSAPrivateKey(ssl_ctx, rsa))
	  {
	    errtext = "SSL_CTX_use_RSAPrivateKey";
	    goto err;
	  }

	RSA_free(rsa); /* doesn't necessarily free, just decrements refcount */
	return;

      err:
	if (rsa)
	  RSA_free(rsa);
	else
	  {
	    if (rsa_meth)
	      RSA_meth_free (rsa_meth);
	  }
	OPENVPN_THROW(OpenSSLException, "OpenSSLContext::ExternalPKIImpl: " << errtext);
      }

      unsigned int get_n_errors() const { return n_errors; }

    private:
      OPENVPN_EXCEPTION(openssl_external_pki);

      /* called at RSA_free */
      static int rsa_finish(RSA *rsa)
      {
	RSA_meth_free (const_cast<RSA_METHOD*>(RSA_get_method (rsa)));
	return 1;
      }

      /* sign arbitrary data */
      static int rsa_priv_enc(int flen, const unsigned char *from, unsigned char *to, RSA *rsa, int padding)
      {
	ExternalPKIImpl* self = (ExternalPKIImpl*)(RSA_meth_get0_app_data (RSA_get_method(rsa)));

	try {
	  if (padding != RSA_PKCS1_PADDING && padding != RSA_NO_PADDING)
	    {
	      RSAerr (RSA_F_RSA_OSSL_PRIVATE_ENCRYPT, RSA_R_UNKNOWN_PADDING_TYPE);
	      throw ssl_external_pki("OpenSSL: bad padding type");
	    }
	  std::string padding_algo;
	  if (padding == RSA_PKCS1_PADDING)
	    {
	      padding_algo = "RSA_PKCS1_PADDING";
	    }
          else if (padding == RSA_NO_PADDING)
	    {
	      padding_algo = "RSA_NO_PADDING";
	    }

	  /* convert 'from' to base64 */
	  ConstBuffer from_buf(from, flen, true);
	  const std::string from_b64 = base64->encode(from_buf);

	  /* get signature */
	  std::string sig_b64;
	  const bool status = self->external_pki->sign(from_b64, sig_b64, padding_algo);
	  if (!status)
	    throw ssl_external_pki("OpenSSL: could not obtain signature");

	  /* decode base64 signature to binary */
	  const int len = RSA_size(rsa);
	  Buffer sig(to, len, false);
	  base64->decode(sig, sig_b64);

	  /* verify length */
	  if (sig.size() != len)
	    throw ssl_external_pki("OpenSSL: incorrect signature length");

	  /* return length of signature */
	  return len;
	}
	catch (const std::exception& e)
	  {
	    OPENVPN_LOG("OpenSSLContext::ExternalPKIImpl::rsa_priv_enc exception: " << e.what());
	    ++self->n_errors;
	    return -1;
	  }
      }

      static void not_implemented(RSA *rsa)
      {
	ExternalPKIImpl* self = (ExternalPKIImpl*)(RSA_meth_get0_app_data (RSA_get_method (rsa)));
	++self->n_errors;
      }

      /* encrypt */
      static int rsa_pub_enc(int flen, const unsigned char *from, unsigned char *to, RSA *rsa, int padding)
      {
	not_implemented(rsa);
	return -1;
      }

      /* verify arbitrary data */
      static int
      rsa_pub_dec(int flen, const unsigned char *from, unsigned char *to, RSA *rsa, int padding)
      {
	not_implemented(rsa);
	return -1;
      }

      /* decrypt */
      static int
      rsa_priv_dec(int flen, const unsigned char *from, unsigned char *to, RSA *rsa, int padding)
      {
	not_implemented(rsa);
	return -1;
      }

      ExternalPKIBase* external_pki;
      unsigned int n_errors;
    };

    /////// start of main class implementation

    OpenSSLContext(Config* config_arg)
      : config(config_arg)
    {
      try
	{
	  // Create new SSL_CTX for server or client mode
	  if (config->mode.is_server())
	    {
	      ctx = SSL_CTX_new(SSL::tls_method_server());
	      if (ctx == nullptr)
		throw OpenSSLException("OpenSSLContext: SSL_CTX_new failed for server method");

	      // Set DH object
	      if (!config->dh.defined())
		OPENVPN_THROW(ssl_context_error, "OpenSSLContext: DH not defined");
	      if (!SSL_CTX_set_tmp_dh(ctx, config->dh.obj()))
		throw OpenSSLException("OpenSSLContext: SSL_CTX_set_tmp_dh failed");
	      if (config->flags & SSLConst::SERVER_TO_SERVER)
		SSL_CTX_set_purpose(ctx, X509_PURPOSE_SSL_SERVER);

	      // server-side SNI
	      if (config->sni_handler)
		{
#if OPENSSL_VERSION_NUMBER >= 0x10101000L
#define OPENSSL_SERVER_SNI
		  SSL_CTX_set_client_hello_cb(ctx, client_hello_callback, nullptr);
#else
		  OPENVPN_THROW(ssl_context_error, "OpenSSLContext: server-side SNI requires OpenSSL 1.1 or higher");
#endif
		}
	    }
	  else if (config->mode.is_client())
	    {
	      ctx = SSL_CTX_new(SSL::tls_method_client());
	      if (ctx == nullptr)
		throw OpenSSLException("OpenSSLContext: SSL_CTX_new failed for client method");
	    }
	  else
	    OPENVPN_THROW(ssl_context_error, "OpenSSLContext: unknown config->mode");

	  // Set SSL options
	  if (!(config->flags & SSLConst::NO_VERIFY_PEER))
	    {
	      int vf = SSL_VERIFY_PEER;
	      if (!(config->flags & SSLConst::PEER_CERT_OPTIONAL))
		vf |= SSL_VERIFY_FAIL_IF_NO_PEER_CERT;
	      SSL_CTX_set_verify(ctx, vf,
				 config->mode.is_client() ? verify_callback_client : verify_callback_server);
	      SSL_CTX_set_verify_depth(ctx, 16);
	    }

	  /* Disable SSLv2 and SSLv3, might be a noop but does not hurt */
	  long sslopt = SSL_OP_SINGLE_DH_USE | SSL_OP_SINGLE_ECDH_USE | SSL_OP_NO_COMPRESSION | SSL_OP_NO_SSLv2 | SSL_OP_NO_SSLv3;

	  if (config->mode.is_server())
	    {
	      SSL_CTX_set_session_cache_mode(ctx, SSL_SESS_CACHE_OFF);
	      if (config->session_ticket_handler)
		{
		  const std::string sess_id_context = config->session_ticket_handler->session_id_context();
		  if (!SSL_CTX_set_session_id_context(ctx, (unsigned char *)sess_id_context.c_str(), sess_id_context.length()))
		    throw OpenSSLException("OpenSSLContext: SSL_CTX_set_session_id_context failed");

		  if (!SSL_CTX_set_tlsext_ticket_key_cb(ctx, tls_ticket_key_callback))
		    throw OpenSSLException("OpenSSLContext: SSL_CTX_set_tlsext_ticket_key_cb failed");
		}
	      else
		sslopt |= SSL_OP_NO_TICKET;

	      // send a client CA list to the client
	      if (config->flags & SSLConst::SEND_CLIENT_CA_LIST)
		{
		  for (const auto& e : config->ca.certs)
		    {
		      if (SSL_CTX_add_client_CA(ctx, e.obj()) != 1)
			throw OpenSSLException("OpenSSLContext: SSL_CTX_add_client_CA failed");
		    }
		}
	    }
	  else
	    {
	      if (config->client_session_tickets)
		{
		  SSL_CTX_set_session_cache_mode(ctx, SSL_SESS_CACHE_CLIENT);
		  sess_cache.reset(new OpenSSLSessionCache);
		}
	      else
		{
		  SSL_CTX_set_session_cache_mode(ctx, SSL_SESS_CACHE_OFF);
		  sslopt |= SSL_OP_NO_TICKET;
		}
	    }

	  /* mbed TLS also ignores tls version when force aes cbc cipher suites is on */
	  if (!config->force_aes_cbc_ciphersuites)
	    {
	      if (config->tls_version_min > TLSVersion::V1_0)
		sslopt |= SSL_OP_NO_TLSv1;
#             ifdef SSL_OP_NO_TLSv1_1
		if (config->tls_version_min > TLSVersion::V1_1)
		  sslopt |= SSL_OP_NO_TLSv1_1;
#             endif
#             ifdef SSL_OP_NO_TLSv1_2
		if (config->tls_version_min > TLSVersion::V1_2)
		  sslopt |= SSL_OP_NO_TLSv1_2;
#             endif
#             ifdef SSL_OP_NO_TLSv1_3
		if (config->tls_version_min > TLSVersion::V1_3)
		  sslopt |= SSL_OP_NO_TLSv1_3;
#             endif
	    }
	  SSL_CTX_set_options(ctx, sslopt);

	  if (config->force_aes_cbc_ciphersuites)
	    {
	      if (!SSL_CTX_set_cipher_list(ctx, "DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA"))
		OPENVPN_THROW(ssl_context_error, "OpenSSLContext: SSL_CTX_set_cipher_list failed for force_aes_cbc_ciphersuites");
	    }
	  else
	    {
	      if (!SSL_CTX_set_cipher_list(ctx,
					   /* default list as a basis */
					   "DEFAULT"
					   /* Disable export ciphers, low and medium */
					   ":!EXP:!LOW:!MEDIUM"
					   /* Disable static (EC)DH keys (no forward secrecy) */
					   ":!kDH:!kECDH"
					   /* Disable DSA private keys */
					   ":!DSS"
					   /* Disable RC4 cipher */
					   ":!RC4"
					   /* Disable MD5 */
					   ":!MD5"
					   /* Disable unsupported TLS modes */
					   ":!PSK:!SRP:!kRSA"
					   /* Disable SSLv2 cipher suites*/
					   ":!SSLv2"
					   ))
		  OPENVPN_THROW(ssl_context_error, "OpenSSLContext: SSL_CTX_set_cipher_list failed");
#if OPENSSL_VERSION_NUMBER >= 0x10002000L && OPENSSL_VERSION_NUMBER < 0x10100000L
	      SSL_CTX_set_ecdh_auto(ctx, 1); // this method becomes a no-op in OpenSSL 1.1
#endif
	    }

	  /* HAVE_SSL_CTX_SET_SECURITY_LEVEL exists from OpenSSL-1.1.0 up */
#ifdef HAVE_SSL_CTX_SET_SECURITY_LEVEL
	  switch(TLSCertProfile::default_if_undef(config->tls_cert_profile))
	  {
	  case TLSCertProfile::UNDEF:
	    OPENVPN_THROW(ssl_context_error,
			  "OpenSSLContext: undefined tls-cert-profile");
	    break;
#ifdef OPENVPN_USE_TLS_MD5
	  case TLSCertProfile::INSECURE:
	    SSL_CTX_set_security_level(ctx, 0);
	    break;
#endif
	  case TLSCertProfile::LEGACY:
	    SSL_CTX_set_security_level(ctx, 1);
	    break;
	  case TLSCertProfile::PREFERRED:
	    SSL_CTX_set_security_level(ctx, 2);
	    break;
	  case TLSCertProfile::SUITEB:
	    SSL_CTX_set_security_level(ctx, 3);
	    break;
	  default:
	    OPENVPN_THROW(ssl_context_error,
			  "OpenSSLContext: unexpected tls-cert-profile value");
	    break;
	  }
#else
	  // when OpenSSL does not CertProfile support we force the user to set 'legacy'
	  if (TLSCertProfile::default_if_undef(config->tls_cert_profile) != TLSCertProfile::LEGACY)
	  {
	    OPENVPN_THROW(ssl_context_error,
			  "OpenSSLContext: tls-cert-profile not supported by this OpenSSL build. Use 'legacy' instead");
	  }
#endif

	  if (config->local_cert_enabled)
	    {
	      // Set certificate
	      if (!config->cert.defined())
		OPENVPN_THROW(ssl_context_error, "OpenSSLContext: cert not defined");
	      if (SSL_CTX_use_certificate(ctx, config->cert.obj()) != 1)
		throw OpenSSLException("OpenSSLContext: SSL_CTX_use_certificate failed");

	      // Set private key
	      if (config->external_pki)
		{
		  epki = new ExternalPKIImpl(ctx, config->cert.obj(), config->external_pki);
		}
	      else
		{
		  if (!config->pkey.defined())
		    OPENVPN_THROW(ssl_context_error, "OpenSSLContext: private key not defined");
		  if (SSL_CTX_use_PrivateKey(ctx, config->pkey.obj()) != 1)
		    throw OpenSSLException("OpenSSLContext: SSL_CTX_use_PrivateKey failed");

		  // Check cert/private key compatibility
		  if (!SSL_CTX_check_private_key(ctx))
		    throw OpenSSLException("OpenSSLContext: private key does not match the certificate");
		}

	      // Set extra certificates that are part of our own certificate
	      // chain but shouldn't be included in the verify chain.
	      if (config->extra_certs.defined())
		{
		  for (const auto& e : config->extra_certs)
		    {
		      if (SSL_CTX_add_extra_chain_cert(ctx, e.obj_dup()) != 1)
			throw OpenSSLException("OpenSSLContext: SSL_CTX_add_extra_chain_cert failed");
		    }
		}
	    }

	  // Set CAs/CRLs
	  if (config->ca.certs.defined())
	    update_trust(config->ca);
	  else if (!(config->flags & SSLConst::NO_VERIFY_PEER))
	    OPENVPN_THROW(ssl_context_error, "OpenSSLContext: CA not defined");

	  // Show handshake debugging info
	  if (config->ssl_debug_level)
	    SSL_CTX_set_info_callback (ctx, info_callback);
	}
      catch (...)
	{
	  erase();
	  throw;
	}
    }

  public:
    // create a new SSL instance
    virtual SSLAPI::Ptr ssl()
    {
      return SSL::Ptr(new SSL(*this, nullptr, nullptr));
    }

    // like ssl() above but verify hostname against cert CommonName and/or SubjectAltName
    virtual SSLAPI::Ptr ssl(const std::string* hostname, const std::string* cache_key)
    {
      return SSL::Ptr(new SSL(*this, hostname, cache_key));
    }

    void update_trust(const CertCRLList& cc)
    {
      OpenSSLPKI::X509Store store(cc);
      SSL_CTX_set_cert_store(ctx, store.release());
    }

    ~OpenSSLContext()
    {
      erase();
    }

    virtual const Mode& mode() const
    {
      return config->mode;
    }
 
  private:
    // ns-cert-type verification

    bool ns_cert_type_defined() const
    {
      return config->ns_cert_type != NSCert::NONE;
    }

    bool verify_ns_cert_type(::X509* cert) const
    {
      if (config->ns_cert_type == NSCert::SERVER)
	return X509_check_purpose (cert, X509_PURPOSE_SSL_SERVER, 0);
      else if (config->ns_cert_type == NSCert::CLIENT)
	return X509_check_purpose (cert, X509_PURPOSE_SSL_CLIENT, 0);
      else
	return true;
    }

    // remote-cert-ku verification

    bool x509_cert_ku_defined() const
    {
      return config->ku.size() > 0;
    }

    bool verify_x509_cert_ku(::X509 *cert) const
    {
      bool found = false;
      ASN1_BIT_STRING *ku = (ASN1_BIT_STRING *)X509_get_ext_d2i(cert, NID_key_usage, nullptr, nullptr);

      if (ku)
	{
	  // Extract key usage bits
	  unsigned int nku = 0;
	  {
	    for (int i = 0; i < 8; i++)
	      {
		if (ASN1_BIT_STRING_get_bit(ku, i))
		  nku |= 1 << (7 - i);
	      }
	  }

	  // Fixup if no LSB bits
	  if ((nku & 0xff) == 0)
	    nku >>= 8;

	  // Validating certificate key usage
	  {
	    for (std::vector<unsigned int>::const_iterator i = config->ku.begin(); i != config->ku.end(); ++i)
	      {
		if (nku == *i)
		  {
		    found = true;
		    break;
		  }
	      }
	  }

	  ASN1_BIT_STRING_free(ku);
	}
      return found;
    }

    // remote-cert-eku verification

    bool x509_cert_eku_defined() const
    {
      return !config->eku.empty();
    }

    bool verify_x509_cert_eku(::X509 *cert) const
    {
      bool found = false;
      EXTENDED_KEY_USAGE *eku = (EXTENDED_KEY_USAGE *)X509_get_ext_d2i(cert, NID_ext_key_usage, nullptr, nullptr);

      if (eku)
	{
	  // Validating certificate extended key usage
	  for (int i = 0; !found && i < sk_ASN1_OBJECT_num(eku); i++)
	    {
	      ASN1_OBJECT *oid = sk_ASN1_OBJECT_value(eku, i);
	      char oid_str[256];

	      if (!found && OBJ_obj2txt(oid_str, sizeof(oid_str), oid, 0) != -1)
		{
		  // Compare EKU against string
		  if (config->eku == oid_str)
		    found = true;
		}

	      if (!found && OBJ_obj2txt(oid_str, sizeof(oid_str), oid, 1) != -1)
		{
		  // Compare EKU against OID
		  if (config->eku == oid_str)
		    found = true;
		}
	    }

	  sk_ASN1_OBJECT_pop_free(eku, ASN1_OBJECT_free);
	}
      return found;
    }


    static std::string x509_get_subject(::X509 *cert)
    {
      unique_ptr_del<char> subject(X509_NAME_oneline(X509_get_subject_name(cert), nullptr, 0),
				   [](char* p) { OPENSSL_free(p); });
      if (subject)
	return std::string(subject.get());
      else
	return std::string("");
    }

    static std::string x509_get_field(::X509 *cert, const int nid)
    {
      static const char nullc = '\0';
      std::string ret;
      X509_NAME *x509_name = X509_get_subject_name(cert);
      int i = X509_NAME_get_index_by_NID(x509_name, nid, -1);
      if (i >= 0)
	{
	  X509_NAME_ENTRY *ent = X509_NAME_get_entry(x509_name, i);
	  if (ent)
	    {
	      ASN1_STRING *val = X509_NAME_ENTRY_get_data(ent);
	      unsigned char *buf;
	      buf = (unsigned char *)1; // bug in OpenSSL 0.9.6b ASN1_STRING_to_UTF8 requires this workaround
	      const int len = ASN1_STRING_to_UTF8(&buf, val);
	      if (len > 0)
		{
		  if (std::strlen((char *)buf) == len)
		    ret = (char *)buf;
		  OPENSSL_free(buf);
		}
	    }
	}
      else
	{
	  i = X509_get_ext_by_NID(cert, nid, -1);
	  if (i >= 0)
	    {
	      X509_EXTENSION *ext = X509_get_ext(cert, i);
	      if (ext)
		{
		  BIO *bio = BIO_new(BIO_s_mem());
		  if (bio)
		    {
		      if (X509V3_EXT_print(bio, ext, 0, 0))
			{
			  if (BIO_write(bio, &nullc, 1) == 1)
			    {
			      char *str;
			      const long len = BIO_get_mem_data(bio, &str);
			      if (std::strlen(str) == len)
				ret = str;
			    }
			}
		      BIO_free(bio);
		    }
		}
	    }
	}
      return ret;
    }

    static std::string x509_get_serial(::X509 *cert)
    {
      ASN1_INTEGER *asn1_i;
      BIGNUM *bignum;
      char *openssl_serial;

      asn1_i = X509_get_serialNumber(cert);
      bignum = ASN1_INTEGER_to_BN(asn1_i, NULL);
      openssl_serial = BN_bn2dec(bignum);

      const std::string ret = openssl_serial;

      BN_free(bignum);
      OPENSSL_free(openssl_serial);

      return ret;
    }

    static std::string x509_get_serial_hex(::X509 *cert)
    {
      const ASN1_INTEGER *asn1_i = X509_get_serialNumber(cert);
      return render_hex_sep(asn1_i->data, asn1_i->length, ':', false);
    }

    static void x509_track_extract_nid(const X509Track::Type xt_type,
				       const int nid,
				       ::X509 *cert,
				       const int depth,
				       X509Track::Set& xts)
    {
      const std::string value = x509_get_field(cert, nid);
      if (!value.empty())
	xts.emplace_back(xt_type, depth, x509_get_field(cert, nid));
    }

    static void x509_track_extract_from_cert(::X509 *cert,
					     const int depth,
					     const X509Track::ConfigSet& cs,
					     X509Track::Set& xts)
    {
      for (auto &c : cs)
	{
	  if (c.depth_match(depth))
	    {
	      switch (c.type)
		{
		case X509Track::SERIAL:
		  xts.emplace_back(X509Track::SERIAL,
				   depth,
				   x509_get_serial(cert));
		  break;
		case X509Track::SERIAL_HEX:
		  xts.emplace_back(X509Track::SERIAL_HEX,
				   depth,
				   x509_get_serial_hex(cert));
		  break;
		case X509Track::SHA1:
		  {
		    unsigned char buf[EVP_MAX_MD_SIZE];
		    unsigned int len = EVP_MAX_MD_SIZE;
		    X509_digest (cert, EVP_sha1 (), buf, &len);
		    xts.emplace_back (X509Track::SHA1,
				      depth,
				      render_hex_sep (buf, len, ':', true));
		  }
		  break;
		case X509Track::CN:
		  x509_track_extract_nid(X509Track::CN, NID_commonName, cert, depth, xts);
		  break;
		case X509Track::C:
		  x509_track_extract_nid(X509Track::C, NID_countryName, cert, depth, xts);
		  break;
		case X509Track::L:
		  x509_track_extract_nid(X509Track::L, NID_localityName, cert, depth, xts);
		  break;
		case X509Track::ST:
		  x509_track_extract_nid(X509Track::ST, NID_stateOrProvinceName, cert, depth, xts);
		  break;
		case X509Track::O:
		  x509_track_extract_nid(X509Track::O, NID_organizationName, cert, depth, xts);
		  break;
		case X509Track::OU:
		  x509_track_extract_nid(X509Track::OU, NID_organizationalUnitName, cert, depth, xts);
		  break;
		case X509Track::EMAIL:
		  x509_track_extract_nid(X509Track::EMAIL, NID_pkcs9_emailAddress, cert, depth, xts);
		  break;
		default:
		  break;
		}
	    }
	}
    }

    static std::string cert_status_line(int preverify_ok,
					int depth,
					int err,
					const std::string& subject)
    {
      std::string ret;
      ret.reserve(128);
      ret = "VERIFY";
      if (preverify_ok)
	ret += " OK";
      else
	ret += " FAIL";
      ret += ": depth=";
      ret += openvpn::to_string(depth);
      ret += ", ";
      if (!subject.empty())
	ret += subject;
      else
	ret += "NO_SUBJECT";
      if (!preverify_ok)
	{
	  ret += " [";
	  ret += X509_verify_cert_error_string(err);
	  ret += ']';
	}
      return ret;
    }

    static AuthCert::Fail::Type cert_fail_code(const int openssl_err)
    {
      // NOTE: this method should never return OK
      switch (openssl_err)
	{
	case X509_V_ERR_CERT_HAS_EXPIRED:
	  return AuthCert::Fail::EXPIRED;
	default:
	  return AuthCert::Fail::CERT_FAIL;
	}
    }

    static int verify_callback_client(int preverify_ok, X509_STORE_CTX *ctx)
    {
      // get the OpenSSL SSL object
      ::SSL* ssl = (::SSL*) X509_STORE_CTX_get_ex_data (ctx, SSL_get_ex_data_X509_STORE_CTX_idx());

      // get OpenSSLContext
      const OpenSSLContext* self = (OpenSSLContext*) SSL_get_ex_data (ssl, SSL::context_data_index);

      // get depth
      const int depth = X509_STORE_CTX_get_error_depth(ctx);

      // get current certificate
      X509* current_cert = X509_STORE_CTX_get_current_cert (ctx);

      // log subject
      const std::string subject = x509_get_subject(current_cert);
      if (self->config->flags & SSLConst::LOG_VERIFY_STATUS)
	OPENVPN_LOG_SSL(cert_status_line(preverify_ok, depth, X509_STORE_CTX_get_error(ctx), subject));

      // leaf-cert verification
      if (depth == 0)
	{
	  // verify ns-cert-type
	  if (self->ns_cert_type_defined() && !self->verify_ns_cert_type(current_cert))
	    {
	      OPENVPN_LOG_SSL("VERIFY FAIL -- bad ns-cert-type in leaf certificate");
	      preverify_ok = false;
	    }

	  // verify X509 key usage
	  if (self->x509_cert_ku_defined() && !self->verify_x509_cert_ku(current_cert))
	    {
	      OPENVPN_LOG_SSL("VERIFY FAIL -- bad X509 key usage in leaf certificate");
	      preverify_ok = false;
	    }

	  // verify X509 extended key usage
	  if (self->x509_cert_eku_defined() && !self->verify_x509_cert_eku(current_cert))
	    {
	      OPENVPN_LOG_SSL("VERIFY FAIL -- bad X509 extended key usage in leaf certificate");
	      preverify_ok = false;
	    }

	  // verify tls-remote
	  if (!self->config->tls_remote.empty())
	    {
	      const std::string subj = TLSRemote::sanitize_x509_name(subject);
	      const std::string common_name = TLSRemote::sanitize_common_name(x509_get_field(current_cert, NID_commonName));
	      TLSRemote::log(self->config->tls_remote, subj, common_name);
	      if (!TLSRemote::test(self->config->tls_remote, subj, common_name))
		{
		  OPENVPN_LOG_SSL("VERIFY FAIL -- tls-remote match failed");
		  preverify_ok = false;
		}
	    }
	}

      return preverify_ok;
    }

    static int verify_callback_server(int preverify_ok, X509_STORE_CTX *ctx)
    {
      // get the OpenSSL SSL object
      ::SSL* ssl = (::SSL*) X509_STORE_CTX_get_ex_data (ctx, SSL_get_ex_data_X509_STORE_CTX_idx());

      // get OpenSSLContext
      const OpenSSLContext* self = (OpenSSLContext*) SSL_get_ex_data (ssl, SSL::context_data_index);

      // get OpenSSLContext::SSL
      SSL* self_ssl = (SSL *) SSL_get_ex_data (ssl, SSL::ssl_data_index);

      // get error code
      const int err = X509_STORE_CTX_get_error(ctx);

      // get depth
      const int depth = X509_STORE_CTX_get_error_depth(ctx);

      // get current certificate
      X509* current_cert = X509_STORE_CTX_get_current_cert (ctx);

      // log subject
      if (self->config->flags & SSLConst::LOG_VERIFY_STATUS)
	OPENVPN_LOG_SSL(cert_status_line(preverify_ok, depth, err, x509_get_subject(current_cert)));

      // record cert error in authcert
      if (!preverify_ok && self_ssl->authcert)
	self_ssl->authcert->add_fail(depth, cert_fail_code(err), X509_verify_cert_error_string(err));

      if (depth == 1) // issuer cert
	{
	  // save the issuer cert fingerprint
	  if (self_ssl->authcert)
	    {
	      static_assert(sizeof(AuthCert::issuer_fp) == SHA_DIGEST_LENGTH, "size inconsistency");
	      unsigned int digest_len = sizeof(AuthCert::issuer_fp);
	      if (!X509_digest (current_cert, EVP_sha1 (), self_ssl->authcert->issuer_fp, &digest_len))
	        preverify_ok = false;
	    }
	}
      else if (depth == 0) // leaf cert
	{
	  // verify ns-cert-type
	  if (self->ns_cert_type_defined() && !self->verify_ns_cert_type(current_cert))
	    {
	      OPENVPN_LOG_SSL("VERIFY FAIL -- bad ns-cert-type in leaf certificate");
	      if (self_ssl->authcert)
		self_ssl->authcert->add_fail(depth, AuthCert::Fail::BAD_CERT_TYPE, "bad ns-cert-type in leaf certificate");
	      preverify_ok = false;
	    }

	  // verify X509 key usage
	  if (self->x509_cert_ku_defined() && !self->verify_x509_cert_ku(current_cert))
	    {
	      OPENVPN_LOG_SSL("VERIFY FAIL -- bad X509 key usage in leaf certificate");
	      if (self_ssl->authcert)
		self_ssl->authcert->add_fail(depth, AuthCert::Fail::BAD_CERT_TYPE, "bad X509 key usage in leaf certificate");
	      preverify_ok = false;
	    }

	  // verify X509 extended key usage
	  if (self->x509_cert_eku_defined() && !self->verify_x509_cert_eku(current_cert))
	    {
	      OPENVPN_LOG_SSL("VERIFY FAIL -- bad X509 extended key usage in leaf certificate");
	      if (self_ssl->authcert)
		self_ssl->authcert->add_fail(depth, AuthCert::Fail::BAD_CERT_TYPE, "bad X509 extended key usage in leaf certificate");
	      preverify_ok = false;
	    }

	  if (self_ssl->authcert)
	    {
	      // save the Common Name
	      self_ssl->authcert->cn = x509_get_field(current_cert, NID_commonName);

	      // save the leaf cert serial number
	      const ASN1_INTEGER *ai = X509_get_serialNumber(current_cert);
	      self_ssl->authcert->sn = ai ? ASN1_INTEGER_get(ai) : -1;
	    }
	}

      // x509-track enabled?
      if (self_ssl->authcert && self_ssl->authcert->x509_track)
	x509_track_extract_from_cert(current_cert,
				     depth,
				     self->config->x509_track_config,
				     *self_ssl->authcert->x509_track);

      return preverify_ok || self->deferred_cert_verify_failsafe(*self_ssl);
    }

    // Print debugging information on SSL/TLS session negotiation.
    static void info_callback (const ::SSL *s, int where, int ret)
    {
      if (where & SSL_CB_LOOP)
	{
	  OPENVPN_LOG_SSL("SSL state (" << (where & SSL_ST_CONNECT ? "connect" : where & SSL_ST_ACCEPT ? "accept" : "undefined") << "): " << SSL_state_string_long(s));
	}
      else if (where & SSL_CB_ALERT)
	{
	  OPENVPN_LOG_SSL("SSL alert (" << (where & SSL_CB_READ ? "read" : "write") << "): " << SSL_alert_type_string_long(ret) << ": " << SSL_alert_desc_string_long(ret));
	}
    }

    static int tls_ticket_key_callback(::SSL *ssl,
				       unsigned char key_name[16],
				       unsigned char iv[EVP_MAX_IV_LENGTH],
				       ::EVP_CIPHER_CTX *ctx,
				       ::HMAC_CTX *hctx,
				       int enc)
    {
      // get OpenSSLContext
      const OpenSSLContext* self = (OpenSSLContext*) SSL_get_ex_data (ssl, SSL::context_data_index);
      if (!self)
	return -1;

      // get user-defined session ticket handler
      TLSSessionTicketBase* t = self->config->session_ticket_handler;
      if (!t)
	return -1;

      if (enc)
	{
	  // create new ticket
	  TLSSessionTicketBase::Name name;
	  TLSSessionTicketBase::Key key;

	  switch (t->create_session_ticket_key(name, key))
	    {
	    case TLSSessionTicketBase::NO_TICKET:
	    case TLSSessionTicketBase::TICKET_EXPIRING: // doesn't really make sense for enc==1?
	      // NOTE: OpenSSL may segfault on a zero return.
	      // This appears to be fixed by:
              // commit dbdb96617cce2bd4356d57f53ecc327d0e31f2ad
              // Author: Todd Short <tshort@akamai.com>
              // Date:   Thu May 12 18:16:52 2016 -0400
              // Fix session ticket and SNI
	      //OPENVPN_LOG("tls_ticket_key_callback: create: no ticket or expiring ticket");
#if OPENSSL_VERSION_NUMBER < 0x1000212fL // 1.0.2r
	      if (!randomize_name_key(name, key))
		return -1;
	      // fallthrough
#else
	      return 0;
#endif
	    case TLSSessionTicketBase::TICKET_AVAILABLE:
	      if (!RAND_bytes(iv, EVP_MAX_IV_LENGTH))
		return -1;
	      if (!tls_ticket_init_cipher_hmac(key, iv, ctx, hctx, enc))
		return -1;
	      static_assert(TLSSessionTicketBase::Name::SIZE == 16, "unexpected name size");
	      std::memcpy(key_name, name.value_, TLSSessionTicketBase::Name::SIZE);
	      //OPENVPN_LOG("tls_ticket_key_callback: created ticket");
	      return 1;
	    default:
	      //OPENVPN_LOG("tls_ticket_key_callback: create: bad ticket");
	      return -1;
	    }
	}
      else
	{
	  // lookup existing ticket
	  static_assert(TLSSessionTicketBase::Name::SIZE == 16, "unexpected name size");
	  const TLSSessionTicketBase::Name name(key_name);
	  TLSSessionTicketBase::Key key;

	  switch (t->lookup_session_ticket_key(name, key))
	    {
	    case TLSSessionTicketBase::TICKET_AVAILABLE:
	      if (!tls_ticket_init_cipher_hmac(key, iv, ctx, hctx, enc))
		return -1;
	      //OPENVPN_LOG("tls_ticket_key_callback: found ticket");
	      return 1;
	    case TLSSessionTicketBase::TICKET_EXPIRING:
	      if (!tls_ticket_init_cipher_hmac(key, iv, ctx, hctx, enc))
		return -1;
	      //OPENVPN_LOG("tls_ticket_key_callback: expiring ticket");
	      return 2;
	    case TLSSessionTicketBase::NO_TICKET:
	      //OPENVPN_LOG("tls_ticket_key_callback: lookup: no ticket");
	      return 0;
	    default:
	      //OPENVPN_LOG("tls_ticket_key_callback: lookup: bad ticket");
	      return -1;
	    }
	}
    }

    static bool tls_ticket_init_cipher_hmac(const TLSSessionTicketBase::Key& key,
					    unsigned char iv[EVP_MAX_IV_LENGTH],
					    ::EVP_CIPHER_CTX *ctx,
					    ::HMAC_CTX *hctx,
					    const int enc)
    {
      static_assert(TLSSessionTicketBase::Key::CIPHER_KEY_SIZE == 32, "unexpected cipher key size");
      if (!EVP_CipherInit_ex(ctx, EVP_aes_256_cbc(), nullptr, key.cipher_value_, iv, enc))
	return false;
      if (!HMAC_Init_ex(hctx, key.hmac_value_, TLSSessionTicketBase::Key::HMAC_KEY_SIZE, EVP_sha256(), nullptr))
	return false;
      return true;
    }

    static bool randomize_name_key(TLSSessionTicketBase::Name& name,
				   TLSSessionTicketBase::Key& key)
    {
      if (!RAND_bytes(name.value_, TLSSessionTicketBase::Name::SIZE))
	return false;
      if (!RAND_bytes(key.cipher_value_, TLSSessionTicketBase::Key::CIPHER_KEY_SIZE))
	return false;
      if (!RAND_bytes(key.hmac_value_, TLSSessionTicketBase::Key::HMAC_KEY_SIZE))
	return false;
      return true;
    }

#if OPENSSL_VERSION_NUMBER >= 0x10101000L

    static int client_hello_callback(::SSL *s, int *al, void *)
    {
      std::string sni_name;

      // get OpenSSLContext
      OpenSSLContext* self = (OpenSSLContext*) SSL_get_ex_data(s, SSL::context_data_index);

      // get OpenSSLContext::SSL
      SSL* self_ssl = (SSL *) SSL_get_ex_data(s, SSL::ssl_data_index);

      try {
	// get the SNI from the client hello
	sni_name = client_hello_get_sni(s);

	// process the SNI name, if provided
	if (!sni_name.empty())
	  {
	    // save the SNI name in authcert
	    if (self_ssl->authcert)
	      self_ssl->authcert->sni = sni_name;

	    // ignore the SNI if no handler was provided
	    if (self->config->sni_handler)
	      {
		// get an alternative SSLFactoryAPI from the sni_handler
		SSLFactoryAPI::Ptr fapi;
		try {
		  SNI::Metadata::UPtr sm;
		  fapi = self->config->sni_handler->sni_hello(sni_name, sm, self->config);
		  if (self_ssl->authcert)
		    self_ssl->authcert->sni_metadata = std::move(sm);
		}
		catch (const std::exception& e)
		  {
		    OPENVPN_LOG("SNI HANDLER ERROR: " << e.what());
		    return sni_error(e.what(), SSL_AD_INTERNAL_ERROR, self, self_ssl, al);
		  }
		if (!fapi)
		  return sni_error("SNI name not found", SSL_AD_UNRECOGNIZED_NAME, self, self_ssl, al);

		// make sure that returned SSLFactoryAPI is an OpenSSLContext
		self_ssl->sni_ctx = fapi.dynamic_pointer_cast<OpenSSLContext>();
		if (!self_ssl->sni_ctx)
		  throw Exception("sni_handler returned wrong kind of SSLFactoryAPI");

		// don't modify SSL CTX if the returned SSLFactoryAPI is ourself
		if (fapi.get() != self)
		  {
		    SSL_set_SSL_CTX(s, self_ssl->sni_ctx->ctx);
		    self_ssl->set_parent(self_ssl->sni_ctx.get());
		  }
	      }
	  }
	return SSL_CLIENT_HELLO_SUCCESS;
      }
      catch (const std::exception& e)
	{
	  OPENVPN_LOG("SNI exception in OpenSSLContext, SNI=" << sni_name << " : " << e.what());
	  *al = SSL_AD_INTERNAL_ERROR;
	  return SSL_CLIENT_HELLO_ERROR;
	}
    }

    static int sni_error(std::string err,
			 const int ssl_ad_error,
			 OpenSSLContext* self,
			 SSL* self_ssl,
			 int* al)
    {
      if (self_ssl->authcert)
	self_ssl->authcert->add_fail(0, AuthCert::Fail::SNI_ERROR, std::move(err));
      if (self->deferred_cert_verify_failsafe(*self_ssl))
	return SSL_CLIENT_HELLO_SUCCESS;
      *al = ssl_ad_error;
      return SSL_CLIENT_HELLO_ERROR;
    }

    static size_t sni_get_len(ConstBuffer& buf)
    {
      size_t ret = buf.pop_front() << 8;
      ret += buf.pop_front();
      return ret;
    }

    static std::string client_hello_get_sni(::SSL* s)
    {
      const unsigned char *p;
      size_t remaining;
      if (!SSL_client_hello_get0_ext(s, TLSEXT_TYPE_server_name, &p, &remaining))
	return std::string();

      // For safety, map a ConstBuffer onto returned OpenSSL TLSEXT_TYPE_server_name data.
      ConstBuffer buf(p, remaining, true);

      // Extract the length of the supplied list of names,
      // and check that it matches size of remaining data
      // in buf.
      {
	const size_t len = sni_get_len(buf);
	if (len != buf.size())
	  throw Exception("bad name list size");
      }

      // Next byte must be TLSEXT_NAMETYPE_host_name.
      if (buf.pop_front() != TLSEXT_NAMETYPE_host_name)
	throw Exception("expecting TLSEXT_NAMETYPE_host_name");

      // Now try to extract the SNI name.
      {
	const size_t len = sni_get_len(buf);
	if (len > buf.size())
	  throw Exception("bad name size");
	if (!Unicode::is_valid_utf8_uchar_buf(buf.c_data(), len, 1024 | Unicode::UTF8_NO_CTRL))
	  throw Exception("invalid UTF-8");
	return std::string((const char *)buf.c_data(), len);
      }
    }
#endif

    // Return true if we should continue with authentication
    // even though there was an error, because the user has
    // enabled SSLConst::DEFERRED_CERT_VERIFY and wants the
    // error to be logged in authcert so that it can be handled
    // by a higher layer.
    bool deferred_cert_verify_failsafe(const SSL& ssl) const
    {
      return (config->flags & SSLConst::DEFERRED_CERT_VERIFY)
	&& ssl.authcert               // failsafe: don't defer error unless
	&& ssl.authcert->is_fail();   //   authcert has recorded it
    }

    void erase()
    {
      if (epki)
	{
	  delete epki;
	  epki = nullptr;
	}
      if (ctx)
	{
	  SSL_CTX_free(ctx);
	  ctx = nullptr;
	}
    }

    Config::Ptr config;
    SSL_CTX* ctx = nullptr;
    ExternalPKIImpl* epki = nullptr;
    OpenSSLSessionCache::Ptr sess_cache; // client-side only
  };

  int OpenSSLContext::SSL::ssl_data_index = -1;
  int OpenSSLContext::SSL::context_data_index = -1;

#if OPENSSL_VERSION_NUMBER < 0x10100000L
  SSL_METHOD OpenSSLContext::SSL::ssl23_method_client_;
  SSL_METHOD OpenSSLContext::SSL::ssl23_method_server_;
#endif

  std::string get_ssl_library_version()
  {
    return OpenSSL_version(OPENSSL_VERSION);
  }
}

#endif
