const oldArrayMethod = Array.prototype
const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
export const arrayMethods = Object.create(oldArrayMethod)


methods.forEach(method => {
  arrayMethods[method] = function (..args) {
    oldArrayMethod[method].call(this, ..args)
    const ob = this.__ob__
    let newInsertedData
    switch (method) {
      case 'push':
      case 'unshift':
        newInsertedData = args
        break;
      case splice:
        newInsertedData = args.slice(2)
        break
      default:
        break
    }

    if (newInsertedData) {
      ob.observeArray(newInsertedData)
    }
  }
})