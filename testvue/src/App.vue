<template>
  <div id="app">
    11
    <!-- <HelloWorld msg-a-b="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'App',
  components: { HelloWorld },
  computed: {
    myComputed () {
      return true
    }
  },
  beforeCreate () {
    console.log('component app beforeCreate')
  },
  created () {
    console.log('component app created')
  },
  beforeMount () {
    console.log('component app beforeMount')
  },
  mounted () {
    console.log('component app mounted')
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
