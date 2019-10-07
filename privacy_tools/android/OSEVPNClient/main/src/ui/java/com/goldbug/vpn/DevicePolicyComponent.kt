package com.goldbug.vpn

import android.app.Activity
import android.app.admin.DevicePolicyManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
import android.os.UserManager
import de.blinkt.openvpn.BuildConfig
import android.app.admin.DevicePolicyManager.EXTRA_DEVICE_ADMIN
import android.app.admin.DevicePolicyManager.EXTRA_PROVISIONING_DEVICE_ADMIN_PACKAGE_NAME
import android.app.admin.DevicePolicyManager.EXTRA_PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME
import android.os.Build.VERSION.SDK_INT
import android.app.admin.DevicePolicyManager.ACTION_PROVISION_MANAGED_PROFILE
import android.os.Build
import java.lang.IllegalStateException


class DevicePolicyComponent(val activity: Activity) {

  private val devicePolicyManager = activity.getSystemService(
      Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
  private val deviceAdminComponent = ComponentName(activity,
      AdminReceiver::class.java)

  val isDeviceOwner = devicePolicyManager.isDeviceOwnerApp(BuildConfig.APPLICATION_ID)

  fun enableDeviceOwner(requestCode: Int) {
//    val intent = Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN)
//
//    intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, deviceAdminComponent)
//    intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, "Additional explantation")
    val intent = Intent(ACTION_PROVISION_MANAGED_PROFILE)
    if (SDK_INT >= 24) {
      intent.putExtra(EXTRA_PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME, deviceAdminComponent)
    } else {
      intent.putExtra(EXTRA_PROVISIONING_DEVICE_ADMIN_PACKAGE_NAME, activity.applicationContext.packageName)
      intent.putExtra(EXTRA_DEVICE_ADMIN, deviceAdminComponent)
    }

    if (intent.resolveActivity(activity.packageManager) != null) {
      activity.startActivityForResult(intent, requestCode)
    } else {
      throw IllegalStateException()
    }
  }

  fun disableDeviceOwner() {

  }

  fun enableAppProtection() {
    if (SDK_INT >= VERSION_CODES.N) {
      devicePolicyManager.setAlwaysOnVpnPackage(deviceAdminComponent, BuildConfig.APPLICATION_ID, true)
    }
    if (SDK_INT >= VERSION_CODES.LOLLIPOP) {
      devicePolicyManager.addUserRestriction(deviceAdminComponent, UserManager.DISALLOW_UNINSTALL_APPS)
    }
  }
}