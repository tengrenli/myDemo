// init Mixin 系列方法
// initMixin(Vue) =>  Vue.prototype._init 方法挂载  new Vue 时会执行此方法
// stateMixin(Vue) => Vue.prototype 上定义属性方法  响应式属性： $data / $props ; 原型属性： $set / $delete $watch
// eventsMixin(Vue) => Vue.prototype 上定义属性方法 $on / $once / $off / $emit
// lifecycleMixin(Vue) => Vue.prototype 上定义属性方法 _update / $forceUpdate / $destroy ;   mountComponent / updateChildComponent
// renderMixin(Vue)  => Vue.prototype 上定义属性方法  $nextTick / _render
import Vue from './instance/index'
// Vue 上挂载方法 Vue.use / Vue.mixin / Vue.extend / Vue.config  /Vue.util / Vue.set / Vue.delete / Vue.nextTick/ Vue.observable / Vue.options
import { initGlobalAPI } from './global-api/index'
// 是否为服务端渲染
import { isServerRendering } from 'core/util/env'
//
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'
// 在Vue 挂载方法/属性
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
