import { patchAttr } from './modules/attr'
import { patchClass } from './modules/class'
import { patchEvents } from './modules/events'
import { patchStyle } from './modules/style'

export const patchProp = (el, key, prevValue, nextValue) => {
  switch (key) {
    case 'class':
      patchClass(el, nextValue)
      break
    case 'style':
      patchStyle(el, prevValue, nextValue)
      break
    default:
      if (/^on[^A-Z]/.test(key)) {
        patchEvents(el, key, nextValue)
      } else {
        patchAttr(el, key, nextValue)
      }
  }
}
