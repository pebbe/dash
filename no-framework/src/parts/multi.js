'use strict'

var $ = require("jquery");

var multi = {}

/*
 * parameters:
 *   - id
 *   - message
 */
multi.Init = function (v) {
  $('#' + v.id).text(v.message + " (_(without box)_)");
}

window.app = window.app || {}
window.app.multi = multi
