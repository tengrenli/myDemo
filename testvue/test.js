let compiler = require('vue-template-compiler')

let t = `<div>333</div>`

console.log(compiler.compile(t).render)


Vue.directive('click-a', {
  bind (el, bindings, vnode, oldVnode) {
    vnode.context
  },
  inserted () { },
  componentUpdated () { },
  update () { },
  unbind () { }

})

