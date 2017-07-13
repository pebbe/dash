'use strict'

var $ = require("jquery");

window.multi2 = {}
window.multi2.Init = function (v) {
  $('#' + v.id).text(v.message + " (met box)");
}
