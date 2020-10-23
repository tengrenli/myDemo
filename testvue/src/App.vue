<template>
  <div id="app">
    <HelloWorld msg-a-b="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    myComputed () {
      return true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
