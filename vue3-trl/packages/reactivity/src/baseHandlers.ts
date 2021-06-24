import {
  extend,
  hasChanged,
  hasOwn,
  isArray,
  isIntegerKey,
  isObject
} from '@vue/shared'
import { reactive, readonly } from './reactive'
const mutableHandlersGet = createGetter()
const mutableHandlersSet = createSetter()

const shallowReactiveHandlersGet = createGetter(false, true)
const shallowReactiveHandlersSet = createSetter(true)

const readonlyHandlersGet = createGetter(true) // 只读 非浅 不能设置新属性

const shallowReadonlyHandlersGet = createGetter(true, true)

const readOnlySet = {
  set: (target, key) => {
    console.warn(`set on key ${key} failed`)
  }
}
// 响应
export const mutableHandlers = {
  get: mutableHandlersGet,
  set: mutableHandlersSet
}

export const shallowReactiveHandlers = {
  get: shallowReactiveHandlersGet,
  set: shallowReactiveHandlersSet
}

export const readonlyHandlers = extend(
  {
    get: readonlyHandlersGet
  },
  readOnlySet
)

export const shallowReadonlyHandlers = extend(
  {
    get: shallowReadonlyHandlersGet
  },
  readOnlySet
)

function createGetter (isReadonly = false, shallow = false) {
  return function (target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    if (!isReadonly) {
      //收集依赖
    }

    if (shallow) {
      return res
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res
  }
}
function createSetter (shallow = false) {
  return function (target, key, receiver) {
    const res = Reflect.set(target, key, receiver)
    return res
  }
}

// reactivity readonly  shallowReactive  shallowReadOnly
