'use strict'

var $ = require("jquery");

window.menu = {}
window.menu.Init = function (v) {
  $('#' + v.id + ' [href="' + v.current + '"]').parent().addClass('current');
}
