<template>
  <div id="app">
    <nav>
      <router-link v-for="route in this.$router.options.routes" tag="div" :to="route.path" :key="route.path">
        <a>{{ route.name }}</a>
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>

nav {
  background-color: grey;
  border-bottom: 1px solid black;
}

nav div {
  display: inline-block;
  background-color: darkgrey;
  border-right: 1px solid black;
  width: 8em;
}

nav a {
  padding: .5em 1em;
  color: black;
  display: block;
  text-decoration: none;
}

nav .router-link-exact-active a,
nav a:hover {
  background-color: lightgrey;
  color: black;
}

nav .router-link-exact-active {
  font-weight: bold;
}
</style>
