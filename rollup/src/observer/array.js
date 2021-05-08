let oldArrayPrototype = Array.prototype
export let arrayMethods = Object.create(oldArrayPrototype)

let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    oldArrayPrototype[method].call(this, ...args)
    let ob = this.__ob__
    let newInserted
    switch (method) {
      case 'push':
      case 'unshift':
        newInserted = args
        break
      case 'splice':
        newInserted = args.slice(2)
      default:
        break
    }

    if (newInserted) {
      ob.observeArray(newInserted)
    }
  }
})
