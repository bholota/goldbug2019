package com.goldbug.vpn

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import de.blinkt.openvpn.R
import de.blinkt.openvpn.activities.BaseActivity
import kotlinx.android.synthetic.ui.activity_admin_setup.buttonDisable
import kotlinx.android.synthetic.ui.activity_admin_setup.buttonEnable


class AdminSetupActivity : BaseActivity() {

  private lateinit var policyComponent: DevicePolicyComponent

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_admin_setup)

    policyComponent = DevicePolicyComponent(this)
    updateButtonState()

    buttonEnable.setOnClickListener {
      policyComponent.enableDeviceOwner(REQ_ACTIVATE_ADMIN)
    }

    buttonDisable.setOnClickListener {
      policyComponent.disableDeviceOwner()
    }
  }

  private fun updateButtonState() {
    buttonEnable.isEnabled = !policyComponent.isDeviceOwner
    buttonDisable.isEnabled = policyComponent.isDeviceOwner
  }

  private fun setupAdminPolicy() {
    Toast.makeText(this, "Admin setup ok", Toast.LENGTH_SHORT).show()
    policyComponent.enableAppProtection()
    finish()
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)

    if (requestCode == REQ_ACTIVATE_ADMIN) {
      if (resultCode == Activity.RESULT_OK) {
        setupAdminPolicy()
      }
      updateButtonState()
    }
  }

  companion object {
    const val REQ_ACTIVATE_ADMIN = 4567

    fun setupAdminConfiguration(activity: Activity, requestCode: Int) {
      activity.startActivityForResult(Intent(activity, AdminSetupActivity::class.java), requestCode)
    }
  }
}
