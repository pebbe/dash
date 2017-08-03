'use strict'

var $ = require("jquery");

var menu = {}

menu.user_id = ''

menu.need_auth = ['user.html']

/*
 * parameters:
 *   - current
 */
menu.Init = function (v) {
  $('#nav [href="' + v.current + '"]').parent().addClass('current');

  $('#login button').on('click', function (ev) {
    menu.login(v)
  })

  $('#logout button').on('click', function (ev) {
    menu.logout(v)
  })

  menu.user_id = localStorage.getItem('user_id') || ''
  menu.setAuth(v)
}

menu.login = function (v) {
  menu.user_id = $('#login input').val().trim()
  $('#login input').val('')
  localStorage.setItem('user_id', menu.user_id)
  menu.setAuth(v)
}

menu.logout = function (v) {
  menu.user_id = ''
  localStorage.setItem('user_id', '')
  menu.setAuth(v)
}

menu.setAuth = function (v) {
  if (menu.user_id) {
    $('#login').addClass('hidden')
    $('#logout').removeClass('hidden')
    for (var i = 0; i < menu.need_auth.length; i++) {
      $('nav div.left a[href="' + menu.need_auth[i] + '"]').parent().removeClass('hidden')
    }
  } else {
    if (menu.need_auth.indexOf(v.current) >= 0) {
      window.location.replace('.')
      return
    }
    $('#login').removeClass('hidden')
    $('#logout').addClass('hidden')
    for (var i = 0; i < menu.need_auth.length; i++) {
      $('nav div.left a[href="' + menu.need_auth[i] + '"]').parent().addClass('hidden')
    }
  }
}

window.app = window.app || {}
window.app.menu = menu
