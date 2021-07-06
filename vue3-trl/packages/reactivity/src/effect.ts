import { isArray, isIntegerKey } from '@vue/shared'
import { TriggerOrTypes } from './operatores'

export function effect (fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}
let uid = 0
let activeEffect
const effectStack = []
function createReactiveEffect (fn, options) {
  const effect = function () {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++
  effect._isEffect = true
  effect.raw = fn
  effect.options = options
  return effect
}

export const targetMap = new WeakMap()
// 依赖收集
export function track (target, type, key) {
  // {}<WeakMap> => Map()
  // console.log(activeEffect)
  // console.log(target, type, key)
  if (!activeEffect) {
    // 不需要进行依赖收集
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
  console.log('WeakMap', targetMap)
}

export function trigger (target, type, key?, newValue?, oldValue?) {
  console.log(target, type, key, newValue, oldValue)
  const effects = new Set()
  const add = effectsToAdd => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => effects.add(effect))
    }
  }
  // 修改数组长度比较特殊
  let depsMap = targetMap.get(target) // 没有进行过依赖收集
  if (!depsMap) {
    return
  }

  if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, k) => {
      // console.log('dep=>', dep, 'k==', k, 'newValu==', newValue)
      if (key === 'length' || k > newValue) {
        // k 为依赖中访问的数组索引，当修改数组length 属性时 也需要更新
        // 如果更改的长度 小于收集的索引，那么这个索引也需要触发effect重新执行
        add(dep)
      }
    })
  } else {
    // 可能是对象
    if (key !== undefined) {
      // 这里肯定是修改， 不能是新增
      add(depsMap.get(key)) // 如果是新增
    }
    // 如果修改数组中的 某一个索引 怎么办？
    switch (
      type // 如果添加了一个索引就触发长度的更新
    ) {
      case TriggerOrTypes.ADD:
        if (isArray(target) && isIntegerKey(key)) {
          add(depsMap.get('length'))
        }
    }
  }
  effects.forEach((effect: any) => effect())
}
