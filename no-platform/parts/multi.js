'use strict'

var $ = require("jquery");

window.multi = {}
window.multi.Init = function (v) {
  $('#' + v.id).text(v.message + " (zonder box)");
}
