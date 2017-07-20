'use strict'

var $ = require("jquery");

window.multi2 = {}

/*
 * parameters:
 *   - id
 *   - message
 */
window.multi2.Init = function (v) {
  $('#' + v.id).text(v.message + " (met box)");
}
