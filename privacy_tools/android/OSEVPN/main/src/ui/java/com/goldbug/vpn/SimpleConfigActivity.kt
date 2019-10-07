package com.goldbug.vpn

import android.annotation.TargetApi
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.os.Build
import android.view.View
import de.blinkt.openvpn.LaunchVPN
import de.blinkt.openvpn.R
import de.blinkt.openvpn.VpnProfile
import de.blinkt.openvpn.activities.BaseActivity
import de.blinkt.openvpn.activities.ConfigConverter
import de.blinkt.openvpn.activities.DisconnectVPN
import de.blinkt.openvpn.activities.FileSelect
import de.blinkt.openvpn.activities.MainActivity
import de.blinkt.openvpn.core.ProfileManager
import de.blinkt.openvpn.core.VpnStatus
import de.blinkt.openvpn.fragments.Utils
import kotlinx.android.synthetic.main.simple_config_activity.fancySwitch
import kotlinx.android.synthetic.main.simple_config_activity.lockButton
import kotlinx.android.synthetic.main.simple_config_activity.statusText

class SimpleConfigActivity : BaseActivity() {

  private val isVpnConfigured: Boolean
    get() {
      val profiles = pm.profiles
      return lastUuid != null && profiles.map { it.uuidString }.contains(lastUuid)
    }

  private val lastUuid: String?
    get() = prefs.getString(PREFS_KEY_VPN_UUID, null)

  private val isVpnConnected: Boolean
    get() {
      return VpnStatus.isVPNActive() && lastUuid != null && lastUuid == VpnStatus.getLastConnectedVPNProfile()
    }

  private val pm: ProfileManager
    get() = ProfileManager.getInstance(this)

  private val prefs: SharedPreferences by lazy {
    getSharedPreferences(PREFS_DEFAULT, Context.MODE_PRIVATE)
  }

  private val switchListener: (Boolean) -> Unit = { isChecked ->
    if (isVpnConfigured) {
      connectOrDisconnectToVpn()
    } else {
      startImportConfigFilePicker()
    }
  }

  private lateinit var devicePolicyComponent: DevicePolicyComponent

  override fun onCreate(savedInstanceState: android.os.Bundle?) {
    super.onCreate(savedInstanceState)

    setContentView(R.layout.simple_config_activity)

    devicePolicyComponent = DevicePolicyComponent(this)

    findViewById<View>(R.id.settingsButton).setOnClickListener { v ->
      startActivity(Intent(this@SimpleConfigActivity, MainActivity::class.java))
    }

    lockButton.setOnClickListener {
      startActivityForResult(Intent(this, AdminSetupActivity::class.java), REQ_CONFIG_ADMIN)
    }
  }

  override fun onResume() {
    super.onResume()
    updateSwitch()
  }

  private fun updateSwitch() {
    fancySwitch.setOnCheckedChangeListener {  }
    fancySwitch.setChecked(isVpnConnected, true)
    fancySwitch.setOnCheckedChangeListener(switchListener)
  }

  private fun startImportConfigFilePicker(): Boolean {
    var startOldFileDialog = true
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && !Utils.alwaysUseOldFileChooser(
            this)) {
      startOldFileDialog = !startFilePicker()
    }

    if (startOldFileDialog) startImportConfig()

    return true
  }

  @TargetApi(Build.VERSION_CODES.KITKAT)
  private fun startFilePicker(): Boolean {

    val i = Utils.getFilePickerIntent(this, Utils.FileType.OVPN_CONFIG)
    if (i != null) {
      startActivityForResult(i,
          FILE_PICKER_RESULT_KITKAT)
      return true
    } else {
      return false
    }
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)

    if (resultCode != Activity.RESULT_OK) return

    if (requestCode == SELECT_PROFILE) {
      val fileData = data!!.getStringExtra(FileSelect.RESULT_DATA)
      val uri = Uri.Builder().path(fileData).scheme("file").build()

      startConfigImport(uri)
    } else if (requestCode == IMPORT_PROFILE) {
      val profileUUID = data!!.getStringExtra(VpnProfile.EXTRA_PROFILEUUID)
      prefs.edit().putString(PREFS_KEY_VPN_UUID, profileUUID).apply()
      connectOrDisconnectToVpn()
    } else if (requestCode == FILE_PICKER_RESULT_KITKAT) {
      if (data != null) {
        val uri = data.data
        startConfigImport(uri)
      }
    }
  }

  private fun connectOrDisconnectToVpn() {
    val uuidFromPrefs = prefs.getString(
        PREFS_KEY_VPN_UUID, null)
    val vpnProfile = pm.profiles.last { it.uuidString == uuidFromPrefs }

    if (vpnProfile != null) {
      startOrStopVPN(vpnProfile)
    } else {
      throw IllegalStateException()
    }
  }

  private fun startConfigImport(uri: Uri?) {
    val startImport = Intent(this, ConfigConverter::class.java)
    startImport.action = ConfigConverter.IMPORT_PROFILE
    startImport.data = uri
    startActivityForResult(startImport,
        IMPORT_PROFILE)
  }

  private fun startImportConfig() {
    val intent = Intent(this, FileSelect::class.java)
    intent.putExtra(FileSelect.NO_INLINE_SELECTION, true)
    intent.putExtra(FileSelect.WINDOW_TITLE, R.string.import_configuration_file)
    startActivityForResult(intent, SELECT_PROFILE)
  }

  private fun startOrStopVPN(profile: VpnProfile) {
    if (VpnStatus.isVPNActive() && profile.uuidString == VpnStatus.getLastConnectedVPNProfile()) {
      val disconnectVPN = Intent(this, DisconnectVPN::class.java)
      startActivity(disconnectVPN)
      statusText.text = getString(R.string.connection_off)
    } else {
      startVPN(profile)
      statusText.text = getString(R.string.connection_on)
    }
  }

  private fun startVPN(profile: VpnProfile) {

    pm.saveProfile(this, profile)

    val intent = Intent(this, LaunchVPN::class.java)
    intent.putExtra(LaunchVPN.EXTRA_KEY, profile.uuid.toString())
    intent.action = Intent.ACTION_MAIN
    startActivity(intent)
  }

  companion object {

    private const val REQ_CONFIG_ADMIN = 8956

    private val FILE_PICKER_RESULT_KITKAT = 9356
    private val IMPORT_PROFILE = 231
    private val SELECT_PROFILE = 43
    private val PREFS_DEFAULT = "PREFS_DEFAULT_FILE"
    private val PREFS_KEY_VPN_UUID = "PREFS_KEY_VPN_UUID"
  }
}
