window.__WEEX__ = false
// import Vue from '../source/platforms/web/entry-runtime'
//  引入vue 带编译版本
import Vue from '../source/platforms/web/entry-runtime-with-compiler'
import App from './App.vue'
// // import VueRouter from '../vueRouterSource/index'
// // import VueRouter from 'vue-router'
// import VueRouter from '../node_modules/vue-router/dist/vue-router.esm'
// Vue.use(VueRouter)
import HelloWorld from './components/HelloWorld'
// import testMyApp from './components/test'
// Vue.config.productionTip = false
// Vue.component('HelloWorld', HelloWorld)
// Vue.component('HelloWorld', function (resolve, reject) {
//   require(['./components/HelloWorld'], function (res) {
//     debugger
//     resolve(res)
//   })
//  })
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
// const LoadingComp = {
//   template: '<div>loading</div>'
// }
// const ErrorComp = {
//   template: '<div>error</div>'
// }
// const AsyncComp = () => ({
//   component: import('./components/HelloWorld.vue'),
//   loading: LoadingComp,
//   error: ErrorComp,
//   delay: 3300,
//   timeout: 1000
// })

// Vue.component('HelloWorld', AsyncComp)
// const comp = {
//   template: '<div>{{msg}}</div>',
//   data () {
//     return {
//       msg: 'test-template-component'
//     }
//   },
//   created () {
//     console.log('comp created')
//   },
//   mounted () {
//     console.log('comp mounted')
//   }
// }
// Vue.component('test-template', comp)
// Vue.mixin({
//   created () {
//     console.log('mixin created')
//   }
// })

/**
 * 分析vue-router demo
 */
Vue.mixin({
  beforeCreate() {
    console.log('main beforeCreate')
  },
  mounted () {
    console.log('main app mounted 111')
  }
})
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
// const routes = [
//   { path: '/foo', component: Foo },
//   { path: '/bar', component: Bar }
// ]
// const router = new VueRouter({
//   base: 'api/',
//   mode: 'history',
//   routes
// })
/**
 * end
 */
Vue.config.devtools = true
// Vue.config.productionTip = false
window.__vue__ = Vue
window.myVue = new Vue({
  el: '#app',
  // router,
  // render: h => h(App),
  data () {
    return {
      message: 'hello world'
      // $1: 22,
      // _33: 333
    }
  },
  render: h => h(App),
  // beforeCreate () {
  //   console.log('main app beforeCreate')
  // },
  // created () {
  //   console.log('main app created')
  // },
  // beforeMount () {
  //   console.log('main app beforeMount')
  // },
  mounted () {
    console.log('main app mounted')
  }
})

// var Profile = Vue.extend({
//   render: h => h(HelloWorld)
//   // template: '<div>sdfsdf</div>',
//   // name: 'test'
// })
// new Profile().$mount('#app1')
