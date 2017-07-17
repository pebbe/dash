'use strict'

var $ = require("jquery");

window.klok = {}

/*
 * parameters:
 *   - id
 */
window.klok.Init = function (v) {
  var u = $('#' + v.id + '_uur')
  var m = $('#' + v.id + '_min')
  var s = $('#' + v.id + '_sec')

  function update() {
    var d = new Date()
    var sec = d.getSeconds() + (d.getMilliseconds() > 500 ? 1 : 0)
    var min = d.getMinutes() + sec / 60
    var uur = d.getHours() + min / 60
    uur = uur / 12 * 6.2831853
    min = min / 60 * 6.2831853
    sec = sec / 60 * 6.2831853
    u.attr('x2', 100 + 60 * Math.sin(uur))
    u.attr('y2', 100 - 60 * Math.cos(uur))
    m.attr('x2', 100 + 84 * Math.sin(min))
    m.attr('y2', 100 - 84 * Math.cos(min))
    s.attr('x2', 100 + 90 * Math.sin(sec))
    s.attr('y2', 100 - 90 * Math.cos(sec))
  }
  update()
  setInterval(update, 1000)
}
