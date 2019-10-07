package com.goldbug.vpn

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.view.View.OnClickListener
import android.widget.Toast
import de.blinkt.openvpn.R
import kotlinx.android.synthetic.ui.activity_pin.clear
import kotlinx.android.synthetic.ui.activity_pin.dot1
import kotlinx.android.synthetic.ui.activity_pin.dot2
import kotlinx.android.synthetic.ui.activity_pin.dot3
import kotlinx.android.synthetic.ui.activity_pin.dot4
import kotlinx.android.synthetic.ui.activity_pin.pin0
import kotlinx.android.synthetic.ui.activity_pin.pin1
import kotlinx.android.synthetic.ui.activity_pin.pin2
import kotlinx.android.synthetic.ui.activity_pin.pin3
import kotlinx.android.synthetic.ui.activity_pin.pin4
import kotlinx.android.synthetic.ui.activity_pin.pin5
import kotlinx.android.synthetic.ui.activity_pin.pin6
import kotlinx.android.synthetic.ui.activity_pin.pin7
import kotlinx.android.synthetic.ui.activity_pin.pin8
import kotlinx.android.synthetic.ui.activity_pin.pin9


class PinActivity : Activity(), OnClickListener {

  private val inputPin = ArrayList<Int>()
  private val expectedPin = arrayListOf<Int>(1, 2, 3, 4)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_pin)

    pin0.setOnClickListener(this)
    pin1.setOnClickListener(this)
    pin2.setOnClickListener(this)
    pin3.setOnClickListener(this)
    pin4.setOnClickListener(this)
    pin5.setOnClickListener(this)
    pin6.setOnClickListener(this)
    pin7.setOnClickListener(this)
    pin8.setOnClickListener(this)
    pin9.setOnClickListener(this)
    clear.setOnClickListener(this)
  }

  override fun onClick(v: View) {
    when (v.id) {
      R.id.pin0 -> addPinDigit(0)
      R.id.pin1 -> addPinDigit(1)
      R.id.pin2 -> addPinDigit(2)
      R.id.pin3 -> addPinDigit(3)
      R.id.pin4 -> addPinDigit(4)
      R.id.pin5 -> addPinDigit(5)
      R.id.pin6 -> addPinDigit(6)
      R.id.pin7 -> addPinDigit(7)
      R.id.pin8 -> addPinDigit(8)
      R.id.pin9 -> addPinDigit(9)
      R.id.clear -> clearPin()
    }
  }

  private fun clearPin() {
    inputPin.clear()
    updatePinUi()
  }

  private fun updatePinUi() {
    if (inputPin.size >= 1) {
      dot1.setBackgroundResource(R.drawable.ic_shape_circle)
    } else {
      dot1.setBackgroundResource(R.drawable.ic_shape_circle_outline)
    }

    if (inputPin.size >= 2) {
      dot2.setBackgroundResource(R.drawable.ic_shape_circle)
    } else {
      dot2.setBackgroundResource(R.drawable.ic_shape_circle_outline)
    }

    if (inputPin.size >= 3) {
      dot3.setBackgroundResource(R.drawable.ic_shape_circle)
    } else {
      dot3.setBackgroundResource(R.drawable.ic_shape_circle_outline)
    }

    if (inputPin.size >= 4) {
      dot4.setBackgroundResource(R.drawable.ic_shape_circle)
    } else {
      dot4.setBackgroundResource(R.drawable.ic_shape_circle_outline)
    }
  }

  private fun addPinDigit(pinNumber: Int) {
    inputPin.add(pinNumber)
    updatePinUi()
    validatePin()
  }

  private fun validatePin() {
    if (inputPin.size == expectedPin.size) {
      if (inputPin.toIntArray().contentEquals(expectedPin.toIntArray())) {
        goToSimpleConfig()
      } else {
        showWrongPinInfo()
      }
    }
  }

  private fun showWrongPinInfo() {
    Toast.makeText(this, "Niepoprawny pin", Toast.LENGTH_SHORT).show()
  }

  private fun goToSimpleConfig() {
    startActivity(Intent(this, SimpleConfigActivity::class.java))
    finish()
  }
}
