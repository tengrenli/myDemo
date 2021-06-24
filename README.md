# myDemo

updateComponent => 第一步执行 render 生成 vnode 的 (render.call() => createElement => createComponent = new VNode ) => 第二步 执行 \_update ( **patch** => createElm => (createComponent =? new Vnode) )

异步更新、 多次同一个 watcher this.\$nextTick()

宏任务、微任务 、 Super、 组件无孩子 solt 为插槽 extend 、Object.create dom diff （无 key 情况会比较标签名） while 循环 O(n)复杂度

vue 不建议用 index 索引 作为 key 性能不好 vue 渐进式框架， 不是严格意义上的框架 ，可以手动操作 dom eg：ref

vue 是框架 react 是一个 js 库只针对视图层

vue 是一个渐进式的框架 并不是严格意义上的 mvvm 框架

v-if v-for 共同使用问题， 先循环再判断，会有性能问题，建议用计算属性

vue 方法内容会绑定 this， 不会因 call apply 改变 this 指向


el, bingings, vnode, oldVnode   bind, inserted  update componentUpdated, unbind

\
