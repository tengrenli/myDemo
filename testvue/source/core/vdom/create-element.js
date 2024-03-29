/* @flow */

import config from '../config'
import VNode, { createEmptyVNode } from './vnode'
import { createComponent } from './create-component'
import { traverse } from '../observer/traverse'

import {
  warn,
  isDef,
  isUndef,
  isTrue,
  isObject,
  isPrimitive,
  resolveAsset
} from '../util/index'

import { normalizeChildren, simpleNormalizeChildren } from './helpers/index'

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
export function createElement (
  context: Component,
  tag: any,
  data: any, // Vnode 相关数据
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  // debugger
  if (Array.isArray(data) || isPrimitive(data)) { // 判断data 是否传入
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

// 作用返回vnode
export function _createElement (
  context: Component, // vm 实例  第二次进入为app 组件实例
  tag?: string | Class<Component> | Function | Object, // app  组件 // 第二次为HelloWorld
  data?: VNodeData, //  app 时 此参数为undefined  第二次 data = {attrs: 'msg-a-b'}
  children?: any,
  normalizationType?: number // 第二次为undefined
): VNode | Array<VNode> {
  // debugger
  // VNodeData不能为响应式
  if (isDef(data) && isDef((data: any).__ob__)) { 
    process.env.NODE_ENV !== 'production' &&
      warn(
        `Avoid using observed data object as vnode data: ${JSON.stringify(
          data
        )}` + 'Always create fresh vnode data objects in each render!',
        context
      )
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (
    process.env.NODE_ENV !== 'production' &&
    isDef(data) &&
    isDef(data.key) &&
    !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn(
        'Avoid using non-primitive value as key, ' +
          'use string/number value instead.',
        context
      )
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  // 对所有children normalize
  if (normalizationType === ALWAYS_NORMALIZE) {
    // 第一次 app 为true  作用拍平？
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns

  // tag 为字符串
  if (typeof tag === 'string') { // 第二次进入 tag = HelloWorld
    // 
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) { // 是否为平台保留标签
      // platform built-in elements
      if (
        process.env.NODE_ENV !== 'production' &&
        isDef(data) &&
        isDef(data.nativeOn)
      ) {
        warn(
          `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
          context
        )
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      )
    } else if (
      (!data || !data.pre) &&
      isDef((Ctor = resolveAsset(context.$options, 'components', tag)))
    ) {
      // component    第二次进入 App
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context)
    }
  } else {
    // debugger
    // 第一次 app  会进入
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  // vnode 为 Array  直接返回
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    // 第一次进入此逻辑
    // 命名空间处理
    if (isDef(ns)) applyNS(vnode, ns)
    // 处理 :class 、:style
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    // 返回注释节点
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined
    force = true
  }
  if (isDef(vnode.children)) {
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const child = vnode.children[i]
      if (
        isDef(child.tag) &&
        (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))
      ) {
        applyNS(child, ns, force)
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style)
  }
  if (isObject(data.class)) {
    traverse(data.class)
  }
}
