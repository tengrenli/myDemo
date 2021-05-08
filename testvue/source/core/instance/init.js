/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

// export function initMixin (Vue: Class<Component>) {
export function initMixin (Vue) {
  // Vue.prototype._init = function (options?: Object) {
  Vue.prototype._init = function (options) {
    debugger
    // 第一次 为Vue 实例  第二次为App 实例
    const vm: Component = this
    // console.log('this==>', this)
    // console.log(this instanceof Vue)

    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    // 性能埋点
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    // 创建
    if (options && options._isComponent) {
      // 第二次进入
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options) // 把父级的一些配置合并到自身$options 上
    } else {
      // 合并options
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor), // Vue.options
        options || {},
        vm
      )
      // debugger
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') { // proxy 判断
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 初始化 父子关系变量  及 标记变量
    // $parents/$root/$children/$refs/_watcher
    // _inactive / _directInactive = false / _isMounted = false / _isDestroyed = false / _isBeingDestroyed = false
    initLifecycle(vm)
    // 初始化 vm._events / vm._hasHookEvent = false /  updateComponentListeners
    initEvents(vm)
    // _staticTrees/_vnode/$slots/$scopedSlots/$createElement/_c /  defineReactive => $attrs / $listeners
    initRender(vm)
    callHook(vm, 'beforeCreate')
    // 有关inject 相关配置 // TODO
    initInjections(vm) // resolve injections before data/props
    // vm._watchers = []
    // initProps(vm, vm.$options.props)/ initMethods(vm, vm.$options.methods)
    // initData(vm) / initComputed(vm, vm.$options.computed) / initWatch(vm, vm.$options.watch)
    initState(vm)
    // vm._provided // TODO
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    // 性能埋点
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      // 第二次不会再进入
      vm.$mount(vm.$options.el)
    }
  }
}

export function initInternalComponent (
  vm: Component,
  options: InternalComponentOptions
) {
  // 此时为入口 new Vue 时的options
  const opts = (vm.$options = Object.create(vm.constructor.options))
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode // 占位符vnode ?
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

// 配置和并  把父配置 合并到 子上面
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  // console.log('Ctor=', Ctor.options)
  // console.log('Ctor= suerp', Ctor.super)
  if (Ctor.super) { // 继承自 Vue  递归调用   merge options
    const superOptions = resolveConstructorOptions(Ctor.super) 
    // console.log('合并==', Ctor.superOptions)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      // 检查是否有修改的配置
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      // console.log('options.name==', options.name)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

// 判断是否配置有变更
function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
