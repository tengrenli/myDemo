export const patchEvents = (el, key, value) => {
  const invokes = el._vei || (el._vei = {})
  const exists = invokes[key] // 拿老事件
  if (value && exists) {
  } else {
    const eventName = key.slice(2).toLowerCase()
    if (value) {
      let invoker = (invokes[key] = createInvoker(value))
      el.addEventListener(eventName, invoker)
    } else {
      el.removeEventListener(eventName, exists)
      invokes[key] = undefined
    }
  }
}

function createInvoker (value) {
  const invoker = e => {
    invoker.value(e)
  }
  invoker.value = value
  return invoker
}
