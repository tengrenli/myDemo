export const patchStyle = (el, prev, next) => {
  const style = el.style // 获取样式
  if (next == null) {
    el.removeAttribute('style')
  } else {
    if (prev) {
      for (let key in prev) {
        if (!next[key]) {
          style[key] = ''
        }
      }
    }
    for (let key in next) {
      style[key] = next[key]
    }
  }
}
