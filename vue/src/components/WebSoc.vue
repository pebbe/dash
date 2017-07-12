<template>
  <div>
    <p>
      {{message}}
    </p>
    <p>
      <b>{{error}}</b>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    var data = {}
    data.socketClosed = true
    data.upcase = true
    data.message = ''
    data.error = ''
    data.update = function (conn) {
      if (data.socketClosed) {
        return
      }
      data.upcase = !data.upcase
      conn.send(data.upcase ? 'upper' : 'lower')
    }
    return data
  },
  created: function () {
    var self = this
    if (window['WebSocket']) {
      this.conn = new WebSocket('ws://' + window.location.host + '/service/ws')
      this.socketClosed = false
      this.conn.onclose = function (evt) {
        // hierbinnen geen this
        self.socketClosed = true
        self.error = 'WebSocket: Connection closed'
        try { clearInterval(self.interval) } catch (err) { }
      }
      this.conn.onmessage = function (evt) {
        // hierbinnen geen this
        var messages = evt.data.split('\n')
        if (messages.length > 0) {
          self.message = messages[messages.length - 1]
        }
      }
      this.interval = setInterval(() => this.update(this.conn), 2000)
    } else {
      this.socketClosed = true
      this.error = 'Your browser does not support WebSockets'
    }
  },
  destroyed: function () {
    if (this.socketClosed) {
      return
    }
    try { clearInterval(this.interval) } catch (err) { }
    try { this.conn.close() } catch (err) { }
    this.socketClosed = true
  }
}
</script>
