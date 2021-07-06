import {
  extend,
  hasChanged,
  hasOwn,
  isArray,
  isIntegerKey,
  isObject
} from '@vue/shared'
import { track, trigger } from './effect'
import { reactive, readonly } from './reactive'
import { TrackOpTypes, TriggerOrTypes } from './operatores'
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
      console.log('依赖收集')
      track(target, TrackOpTypes.Get, key)
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
  return function (target, key, value, receiver) {
    const oldValue = target[key] // 获取老值
    // 是否存在此属性
    let hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    const res = Reflect.set(target, key, value, receiver)
    if (!hadKey) {
      // 新增
      trigger(target, TriggerOrTypes.ADD, key, value)
    } else {
      trigger(target, TriggerOrTypes.SET, key, value, oldValue)
    }
    // console.log('set', target, key, receiver)
    // let dispatch = targetMap.get(target)
    // let effect
    // if (dispatch && (effect = dispatch.get(key)))
    // {
    //   console.log('3333', effect)
    //   effect.forEach(item => item())
    // }
    return res
  }
}

// reactivity readonly  shallowReactive  shallowReadOnly
