import { patch } from './vdom/patch'
import Watcher from './observer/watcher'
export function mountComponent (vm, el) {
  let updateComponent = () => {
    vm._update(vm._render())
  }

  // updateComponent()
  new Watcher(vm, updateComponent, () => {}, true)
}

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    console.log('vnode', vnode)
    // 既有初始化 又又更新
    const vm = this

    vm.$el = patch(vm.$el, vnode)
  }
}
