<template>
  <div class="hello">
    222
    <!-- <test/> -->
    <!-- <h1 @click="down">{{ msgAB }}</h1> -->
    <!-- <ul>
      <li v-for='item in msgAB' :key='item'>{{item}}</li>
    </ul> -->
    <!-- <p @click="count">{{ globalData.count }}</p> -->
    <!-- <test /> -->
    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
// import Vue from 'web/entry-runtime'
// import test from '@/components/test'
export default {
  name: 'HelloWorld',
  components: {
    // test
  },
  props: {
    'msg-a-b': {}
  },
  watch: {
    // 'globalData.count' (newVal, oldVal) {
    //    console.log('watch cb=>', newVal, oldVal)
    // }
  },
  data () {
    return {
      testData: 2
    }
  },
  // created () {
  //   console.log('$data', this.$data)
  //   console.log('$props', this.$props)
  //   console.log('33333', this._data.testData)
  //   this.globalData = this.$options._base.observable({ count: 0 })
  // },
  mounted () {
    console.log('_vnode===>', this._vnode)
    console.log('$vnode===>', this.$vnode)
    setTimeout(() => {}, 2000)
    this.testData = 333

    this.$nextTick().then(res => {
      console.log('nextTick', res)
    })
      console.log('this===', this)

    // console.log(this.$options._base.observable)
    // console.log(this)

    // console.log(this.globalData)
    // this.$watch('globalData.count', function (newVal, oldVal) {
    //   console.log('$watc cb=>', newVal, oldVal)
    // })
  },
  // destroyed () {
  //   console.log('is destoryed')
  // },
  updated () {
    // console.log('hellowrod component updated')
  },
  methods: {
    down () {
      this.$destroy()
    },
    count () {
      this.globalData.count++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
