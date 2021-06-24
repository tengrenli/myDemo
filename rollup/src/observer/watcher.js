let id = 0
import { pushTarget, popTarget } from './dep'
class Watcher {
  constructor (vm, exprOrFn, cb, options) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    this.options = options
    this.id = id++

    this.getter = exprOrFn

    this.get()
  }

  get () {
    pushTarget(this)
    this.getter()
    popTarget()
  }

  update () {
    console.log('update')
    this.get()
  }
}

export default Watcher
