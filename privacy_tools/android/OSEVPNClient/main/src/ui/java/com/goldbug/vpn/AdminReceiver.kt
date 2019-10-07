package com.goldbug.vpn

import android.app.admin.DeviceAdminReceiver
import android.app.admin.DevicePolicyManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
import android.widget.Toast
import de.blinkt.openvpn.R


class AdminReceiver : DeviceAdminReceiver() {
  override fun onEnabled(context: Context?, intent: Intent?) {
    super.onEnabled(context, intent)
    Toast.makeText(context, "Enabled", Toast.LENGTH_SHORT).show()
  }

  override fun onDisabled(context: Context?, intent: Intent?) {
    super.onDisabled(context, intent)
    Toast.makeText(context, "Disabled", Toast.LENGTH_SHORT).show()
  }

  override fun onProfileProvisioningComplete(context: Context, intent: Intent) {
    super.onProfileProvisioningComplete(context, intent)

    val manager = context.getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
    val componentName = getComponentName(context)
    if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
      manager.setProfileName(componentName, context.getString(R.string.device_owner_profile_name))
    }
    // Open the main screen
//    val launch = Intent(context, SimpleConfigActivity::class.java)
//    launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
//    context.startActivity(launch)
  }

  fun getComponentName(context: Context): ComponentName {
    return ComponentName(context.applicationContext, AdminReceiver::class.java)
  }
}
