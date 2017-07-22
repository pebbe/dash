'use strict'

var $ = require("jquery");

var menu = {}

/*
 * parameters:
 *   - current
 */
menu.Init = function (v) {
  $('#nav [href="' + v.current + '"]').parent().addClass('current');
}

window.app = window.app || {}
window.app.menu = menu
