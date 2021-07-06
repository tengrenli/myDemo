import { createRender } from '@vue/runtime-core'
import { extend } from '@vue/shared'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

const renderOptions = extend({ patchProp }, nodeOps)

export const createApp = (rootComponent, rootProps = null) => {
  console.log(rootComponent, rootProps)
  const app = createRender(renderOptions).createApp(rootComponent, rootProps)
  const { mount } = app
  app.mount = function (container) {
    mount(container)
    container = document.querySelector(container)
    container.innerHTML = ''
  }

  return app
}
