'use strict'

var $ = require("jquery");

var websoc = {}

/*
 * parameters:
 *   - id
 */
websoc.Init = function (v) {
  var msg = $('#' + v.id + ' .message')
  var err = $('#' + v.id + ' .error')

  var conn
  var socketClosed = true
  var interval
  var upcase = true

  if (window['WebSocket']) {
    conn = new WebSocket('ws://' + window.location.host + '/service/ws')
    socketClosed = false
    conn.onclose = function (evt) {
      socketClosed = true
      err.text('WebSocket: Connection closed')
      try { clearInterval(interval) } catch (err) { }
    }
    conn.onmessage = function (evt) {
      var messages = evt.data.split('\n')
      if (messages.length > 0) {
        msg.text(messages[messages.length - 1])
      }
    }
    interval = setInterval(update, 2000)
  } else {
    socketClosed = true
    err.text('Your browser does not support WebSockets')
  }

  function update() {
    if (socketClosed) {
      return
    }
    upcase = !upcase
    try {
      conn.send(upcase ? 'upper' : 'lower')
    } catch (e) {
      err.text(e)
    }
  }

}

window.app = window.app || {}
window.app.websoc = websoc
