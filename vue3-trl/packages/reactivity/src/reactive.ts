import { isObject } from '@vue/shared'
import {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers
} from './baseHandlers'
export function reactive (target: any) {
  return createReactiveObject(target, false, mutableHandlers)
}

export function shallowReactive (target: any) {
  return createReactiveObject(target, false, shallowReactiveHandlers)
}

export function shallowReadonly (target: any) {
  return createReactiveObject(target, true, shallowReadonlyHandlers)
}

export function readonly (target: any) {
  return createReactiveObject(target, true, readonlyHandlers)
}

const reactiveMap = new WeakMap()
const readonlyMap = new WeakMap()
/**
 * target 目标
 * isReadonly 是否为只读
 * baseHandler 代理函数
 */
function createReactiveObject (target, isReadonly, baseHandler) {
  if (!isObject(target)) {
    // 非对象直接返回
    return target
  }
  const proxyMap = isReadonly ? readonlyMap : reactiveMap

  const isExitProxy = proxyMap.get(target) // 是否已代理
  if (isExitProxy) {
    return isExitProxy
  }

  const proxy = new Proxy(target, baseHandler)
  proxyMap.set(target, proxy)
  return proxy
}
