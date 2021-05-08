<template>
  <div id="app">
    11
    <!-- <h1>hello app</h1> -->
    <!-- <p>
      <router-link to="/foo">Go to Foo</router-link>
    </p>
    <p>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <router-view></router-view> -->
    <!-- 11
    <!-- <test-template/> -->
    <HelloWorld :msg-a-b="msg" />
    <!-- <HelloWorld :msg-a-b="msg" /> -->
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
  data () {
    return {
      msg: [1,2,3]
    }
  },
  beforeCreate () {
    console.log('component app beforeCreate')
  },
  // created () {
  //   console.log('component app created')
  // },
  // beforeMount () {
  //   console.log('component app beforeMount')
  // },
  mounted () {
    // setTimeout(()=> {
    //   this.$set(this.msg, 2, 10)
    // }, 2000)
    console.log('component app mounted')
  },
  // updated () {
  //   console.log('app updated')
  // }
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
