/* @flow */

// node 操作方法
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// console.log('platformModules==>', platformModules)
// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)
// console.log('modules==', modules)  vue 跨端

export const patch: Function = createPatchFunction({ nodeOps, modules })
