import { initState } from './state'
import { mountComponent } from './lifecycle'
import { compileToFunction } from './compiler/index'
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options || {}

    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    vm.$el = el
    // 无render 方法生成   解析模板
    if (!options.render && el) {
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
        let render = compileToFunction(template)
        options.render = render
       }
    }

    mountComponent(vm, el)
  }
}
