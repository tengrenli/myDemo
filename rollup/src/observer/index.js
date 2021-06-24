import { isObject } from '../utils'
import Dep from './dep'

class Observer {
  constructor (data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })

    if (Array.isArray(data)) {
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  observeArray (data) {
    data.forEach(item => observe())
  }
  walk (data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

function defineReactive (data, key, value) {
  observe(value)
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get () {
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set (newVal) {
      if (value === newVal) {
        return
      }
      console.log('update')
      value = newVal
      dep.notify()
    }
  })
}

export function observe (data) {
  if (!isObject(data)) {
    return
  }

  if (data.__ob__) {
    return
  }
  return new Observer(data)
}
