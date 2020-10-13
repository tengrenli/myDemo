import Vue from '../source/core'
import App from './App.vue'
import HelloWorld from './components/HelloWorld'
console.log(Vue)
// Vue.config.productionTip = false
Vue.component('HelloWorld', HelloWorld)
window.myVue = new Vue({
  render: h => h(App)
}).$mount('#app')
