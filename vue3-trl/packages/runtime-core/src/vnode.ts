import { isArray, isObject, isString, ShapeFlags } from '@vue/shared/src'
export const createVNode = (type, props, children = null) => {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0
  const vnode = {
    type,
    props,
    children,
    key: props && props.key, // 用于diff算法
    el: null, // 虚拟节点对应的真实节点
    shapeFlag // 自己是什么类型
  }
  normalizeChildren(vnode, children) // 根据子节点计算孩子类型
  return vnode
}
function normalizeChildren (vnode, children) {
  let type = 0
  if (children == null) {
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN // 数组
  } else {
    type = ShapeFlags.TEXT_CHILDREN // 文本
  }
  vnode.shapeFlag |= type
}
