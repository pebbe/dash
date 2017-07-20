'use strict'

var $ = require("jquery");

window.multi = {}

/*
 * parameters:
 *   - id
 *   - message
 */
window.multi.Init = function (v) {
  $('#' + v.id).text(v.message + " (zonder box)");
}
