<template>
  <svg width="200" height="200">
    <circle cx="100" cy="100" r="95" stroke="grey" stroke-width="2" fill="white"></circle>
    <circle cx="100" cy="190" r="5" fill="grey"></circle>
    <circle cx="100" cy="10" r="5" fill="grey"></circle>
    <circle cx="10" cy="100" r="5" fill="grey"></circle>
    <circle cx="190" cy="100" r="5" fill="grey"></circle>
    <circle cx="177.9" cy="55" r="3" fill="grey"></circle>
    <circle cx="177.9" cy="145" r="3" fill="grey"></circle>
    <circle cx="22.1" cy="55" r="3" fill="grey"></circle>
    <circle cx="22.1" cy="145" r="3" fill="grey"></circle>
    <circle cx="145" cy="177.9" r="3" fill="grey"></circle>
    <circle cx="55" cy="177.9" r="3" fill="grey"></circle>
    <circle cx="145" cy="22.1" r="3" fill="grey"></circle>
    <circle cx="55" cy="22.1" r="3" fill="grey"></circle>
    <line x1="100" y1="100" :x2="100 + 60 * uurX" :y2="100 - 60 * uurY" stroke="black" stroke-width="5"></line>
    <line x1="100" y1="100" :x2="100 + 84 * minX" :y2="100 - 84 * minY" stroke="black" stroke-width="4"></line>
    <line x1="100" y1="100" :x2="100 + 90 * secX" :y2="100 - 90 * secY" stroke="red" stroke-width="2"></line>
    <circle cx="100" cy="100" r="8" fill="black"></circle>
  </svg>
</template>

<script>
export default {
  data: function () {
    var data = {}
    data.update = function () {
      var d = new Date()
      var sec = d.getSeconds() + (d.getMilliseconds() > 500 ? 1 : 0)
      var min = d.getMinutes() + sec / 60
      let uur = d.getHours() + min / 60
      uur = uur / 12 * 6.2831853
      min = min / 60 * 6.2831853
      sec = sec / 60 * 6.2831853
      data.uurX = Math.sin(uur)
      data.uurY = Math.cos(uur)
      data.minX = Math.sin(min)
      data.minY = Math.cos(min)
      data.secX = Math.sin(sec)
      data.secY = Math.cos(sec)
    }
    data.update()
    return data
  },
  created: function () {
    this.interval = setInterval(() => this.update(), 1000)
  },
  destroyed: function () {
    clearInterval(this.interval)
  }
}
</script>
