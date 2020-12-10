<template>
  <div id="app">
    <h1>hello app</h1>
    <p>
      <router-link to="/foo">Go to Foo</router-link>
    </p>
    <p>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <router-view></router-view>
    <!-- 11
    <!-- <test-template/> -->
    <!-- <HelloWorld msg-a-b="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'App',
  // components: { HelloWorld },
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
  },
  updated () {
    console.log('app updated')
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
