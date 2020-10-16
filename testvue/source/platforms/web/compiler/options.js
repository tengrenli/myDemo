/* @flow */

import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace
} from '../util/index'

// 待分析
import modules from './modules/index'
// 0: {staticKeys: Array(1) staticClass , transformNode: ƒ, genData: ƒ}
// 1: {staticKeys: Array(1) staticStyle, transformNode: ƒ, genData: ƒ}
// 2: {preTransformNode: ƒ}
// 内置指令 v-html  v-model v-text
import directives from './directives/index'
import { genStaticKeys } from 'shared/util'
import { isUnaryTag, canBeLeftOpenTag } from './util'
// console.log(modules)
// console.log(genStaticKeys(modules)) // staticClass,staticStyle
export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules, // 待分析
  directives, // 内置指令
  isPreTag, // 是否为pre html 标签
  isUnaryTag, // 单标签元素集合
  mustUseProp, // 标签 与所使用属性是否匹配
  canBeLeftOpenTag, // 组合标签
  isReservedTag, // 是否为html 标签 包含svg
  getTagNamespace, // 获取标签的命名空间
  staticKeys: genStaticKeys(modules) // staticClass,staticStyle
}
