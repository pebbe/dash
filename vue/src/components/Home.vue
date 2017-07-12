<template>
  <div id="container">
    <div>
      <h2>1</h2>
      {{helloworld}}
    </div>
  
    <div>
      <h2>2</h2>
      <mensen-lijst id-tag="A"></mensen-lijst>
    </div>

    <div>
      <h2>3</h2>
      <mensen-lijst id-tag="B" hide-style="color:lightgrey"></mensen-lijst>
    </div>

    <div>
      <h2>Todo</h2>
      <ul>
        <li>Alles wat ook in Aurelia is geïmplementeerd</li>
        <li>Titel aanpassen aan pagina (in routercode?)</li>
      </ul>
    </div>
  </div>
</template>

<script>
import MensenLijst from './MensenLijst.vue'

export default {
  name: 'home',
  data () {
    return {
      helloworld: 'Moi, Groningen!'
    }
  },
  components: {
    MensenLijst
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  padding: .4em .2em;

  -webkit-column-count: 6;
  -moz-column-count: 6;
  column-count: 6;

  -webkit-column-gap: 0px;
  -moz-column-gap: 0px;
  column-gap: 0px;

  -webkit-column-width: 20em;
  -moz-column-width: 20em;
  column-width: 20em;
}

#container>div {
  break-inside: avoid-column;
  padding: 1em;
  margin: 0px .2em .4em .2em;
  border: 1px solid black;
  background-color: white;
}

#container>div>h2 {
  font-weight: normal;
}
</style>
