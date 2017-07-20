'use strict'

var $ = require("jquery");

window.menu = {}

/*
 * parameters:
 *   - current
 */
window.menu.Init = function (v) {
  $('#nav [href="' + v.current + '"]').parent().addClass('current');
}
