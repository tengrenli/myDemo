import { hasChanged, isArray, isObject } from '@vue/shared'
import { reactive } from '.'
import { track, trigger } from './effect'
import { TrackOpTypes, TriggerOrTypes } from './operatores'

export function ref (value) {
  return createRef(value)
}
export function shallowRef (value) {
  return createRef(value, true)
}

const covert = value => (isObject(value) ? reactive(value) : value)
class RefImpl {
  public __v_isRef = true
  public _value
  constructor (public rawValue, public shallow) {
    this._value = shallow ? rawValue : covert(rawValue)
  }
  // 类的属性访问器
  get value () {
    track(this, TrackOpTypes.Get, 'value')
    return this._value
  }

  set value (newValue: any) {
    if (hasChanged(newValue, this.rawValue)) {
      this.rawValue = newValue
      this._value = this.shallow ? newValue : covert(newValue)
      trigger(this, TriggerOrTypes.SET, 'value', newValue)
    }
  }
}

function createRef (rawValue, shallow = false) {
  return new RefImpl(rawValue, shallow)
}

class ObjectRefImpl {
  constructor (public target, public key) {}

  get value () {
    return this.target[this.key]
  }

  set value (newValue) {
    this.target[this.key] = newValue
  }
}

export function toRef (target, key) {
  return new ObjectRefImpl(target, key)
}

export function toRefs (obj) {
  const ret = isArray(obj) ? new Array(obj.length) : {}
  for (let key in obj) {
    ret[key] = toRef(obj, key)
  }
  return ret
}
