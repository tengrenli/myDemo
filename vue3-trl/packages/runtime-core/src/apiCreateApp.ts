import { createVNode } from "./vnode"

export function createAppAPI (render) {
  return function createApp (rootComponent, rootProps) {
    const app = {
      _props: rootProps,
      _component: rootComponent,
      _container: null,
      mount(rootContainer)
      {
        const vnode = createVNode(rootComponent, rootProps)
        console.log('vnode', vnode)
        render(vnode, rootContainer)
        app._container = rootContainer
      }
    }
    return app
  }
}
