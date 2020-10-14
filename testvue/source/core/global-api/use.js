/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {

  // 此方法Vue 主要是为了在Vue 上扩展插件使用, 多次调用只会安装一次， 第一个参数为Vue 
  Vue.use = function (plugin: Function | Object) {
    // 判断是否已经执行挂载过
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters

    // 把类数组转为数组  类数组不能使用数组的方法 可借助call apply 
    // 常见类数组 arguments / NodeList  
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      // Object 包含install 方法
      // 修正this  args 第一个参数为 Vue 
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // function
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
