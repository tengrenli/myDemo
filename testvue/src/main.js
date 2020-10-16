window.__WEEX__ = false
// import Vue from '../source/platforms/web/entry-runtime'
import Vue from '../source/platforms/web/entry-runtime-with-compiler'
import App from './App.vue'
import HelloWorld from './components/HelloWorld'
import testMyApp from './components/test'
// Vue.config.productionTip = false
Vue.component('HelloWorld', HelloWorld)
// window.myUse = Vue.use(
//   {
//     install () {
//       console.log('arguments=>?', arguments)
//     }
//   },
//   { myOptions: true }
// )
// Vue.mixin({
//   myMixin () {
//     console.log('333')
//   }
// })

// 响应式属性
// Vue.prototype.globalData = Vue.observable({ count: 0 })
// var myApp = Vue.extend({
//   name: 'myApp',
//   template: '<p v-pre v-a><b> s <b>aaa</b>s s </b></p>'
//   // render (h) {
//   //   return h(testMyApp)
//   // }
// })
// new myApp().$mount('#myApp')
// console.log(myApp)
// myApp.$mount('#myApp')
window.__vue__ = Vue
window.myVue = new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    console.log('app beforeCreate')
  },
  mounted () {
    console.log('app mounted')
  }
})
