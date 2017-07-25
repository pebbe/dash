'use strict'

// zie: https://learn.jquery.com/events/introduction-to-custom-events/

var $ = require("jquery");

var evs = {}

/*
 * parameters:
 *   - id
 *   - message
 */
evs.Init = function (v) {

  $('#' + v.id + ' button').on('click', function (ev) {
    $('.events').trigger(
      'events:click',
      { 'id': v.id, 'msg': v.message || '_(Hello!)_' });
  })

  var me = $('#' + v.id)
  me.on('events:click', function (ev, arg) {
    if (arg.id != v.id) {
      var div = $('<div></div>')
        .text('[' + v.id + '] _(Message from)_ ' + arg.id + ': ' + arg.msg)
        .appendTo(me)
      setTimeout(function () { div.addClass('hidden') }, 5000)
      setTimeout(function () { div.remove() }, 6000)
    }
  })
}

window.app = window.app || {}
window.app.events = evs
