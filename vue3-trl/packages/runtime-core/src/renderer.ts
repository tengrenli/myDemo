import { createAppAPI } from './apiCreateApp'

export const createRender = renderOptions => {
  const render = (vnode, container) => {
    console.log(vnode, container)
  }
  return {
    createApp: createAppAPI(render)
  }
}
