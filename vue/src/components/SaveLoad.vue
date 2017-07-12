<template>
  <div>
    <button v-on:click="save()">save</button>
    <input type="text" v-model="text">
    <hr>
    <button v-on:click="load()">load</button> {{loaded}}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    var data = {}
    data.text = ''
    data.loaded = ''
    data.load = function () {
      axios.get('service/load')
        .then(d => {
          data.loaded = d.data
        })
        .catch(err => {
          data.loaded = err.response['status'] + ' ' + err.response['statusText']
        })
    }
    data.save = function () {
      axios.post('service/save', this.text)
        .then(d => {
          data.loaded = d.data
          data.text = ''
        })
        .catch(err => {
          data.loaded = err.response['status'] + ' ' + err.response['statusText']
          data.text = ''
        })
    }
    return data
  }

}
</script>
