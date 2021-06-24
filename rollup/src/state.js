import { observe } from './observer/index'
import { isFunction } from './utils'
export function initState (vm) {
  let opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
}
function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get () {
      return vm[source][key]
    },
    set (newValue) {
      vm[source][key] = newValue
    }
  })
}
function initData (vm) {
  let data = vm.$options.data

  data = vm._data = isFunction(data) ? data.call(vm) : data

  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}
