let id = 0
// 依赖收集
class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  
  
  depend () {
    if (Dep.target) {
      this.subs.push(Dep.target)
    }
  }
  
  notify () {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

export function pushTarget (watcher) {
  Dep.target = watcher
}

export function popTarget () {
  Dep.target = null
}
 

export default Dep