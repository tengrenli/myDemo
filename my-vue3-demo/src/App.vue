<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { reactive, markRaw, isReactive, toRaw } from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    // const d = reactive({ a: 1, b: 2 })
    // console.log(d)
    // console.log('执行', props)
    const foo = markRaw({
      nested: { a: 2 }
    })

    const bar = reactive({
      // 虽然 `foo` 被标记为原始，但 foo.nested 不是。
      nested: foo.nested
    })
    console.log('isReactive==', isReactive(bar.nested))
    console.log('isReactive==nested', isReactive(foo))
    console.log('234234234', bar)
    console.log('toRaw==', toRaw(bar))
    console.log(foo.nested === bar.nested) // false
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
