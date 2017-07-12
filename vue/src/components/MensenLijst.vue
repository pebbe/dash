<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-on:click="orderVoornaam(tag)">voornaam</th>
          <th v-on:click="orderAchternaam(tag)">achternaam</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mens in mensen" v-bind:key="mens.achtersort">
          <td>{{mens.voornaam}}</td>
          <td>{{mens.achternaam}}</td>
        </tr>
      </tbody>
    </table>
    <p>
      zoeken:
      <input type="text">
    </p>
    <!--
                            Mensenlijst! {{ idTag }} {{ hideStyle }}
                        -->
  </div>
</template>

<script>
function Mens (voornaam, achternaam, achtersort) {
  this.voornaam = voornaam
  this.achternaam = achternaam
  this.achtersort = achtersort || achternaam
  this.matches = function (substring) {
    var s = substring.toLowerCase()
    return this.voornaam.toLowerCase().includes(s) ||
      this.achternaam.toLowerCase().includes(s)
  }
}

export default {
  props: ['idTag', 'hideStyle'],
  data: function () {
    var data = {}
    data.mensen = [
      new Mens('Chris', 'Froome'),
      new Mens('Richie', 'Porte'),
      new Mens('Alberto', 'Contador'),
      new Mens('Romain', 'Bardet'),
      new Mens('Nairo', 'Quintana'),
      new Mens('Michal', 'Kwiatkowski'),
      new Mens('Alejandro', 'Valverde'),
      new Mens('John', 'Degenkolb'),
      new Mens('Bauke', 'Mollema'),
      new Mens('Laurens', 'ten Dam', 'Dam'),
      new Mens('Greg', 'Van Avermaet'),
      new Mens('Fabio', 'Aru'),
      new Mens('Peter', 'Sagan')
    ]
    data.orderVoornaam = function () {
      // data.order = 1
      // data.save()
      data.mensen.sort(function (a, b) {
        if (a.voornaam < b.voornaam) {
          return -1
        }
        if (a.voornaam > b.voornaam) {
          return 1
        }
        return 0
      })
    }
    data.orderAchternaam = function () {
      // data.order = 2
      // data.save()
      data.mensen.sort(function (a, b) {
        if (a.achtersort < b.achtersort) {
          return -1
        }
        if (a.achtersort > b.achtersort) {
          return 1
        }
        return 0
      })
    }
    return data
  }
}
</script>

<style scoped>
table {
  width: 100%;
}

th {
  cursor: pointer;
  border: 1px solid blue;
}

th:hover {
  background-color: yellow;
}
</style>
