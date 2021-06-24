let Vue
const install = (_Vue) => {
  Vue = _Vue
  Vue.component('router-view', {
    render () {
      return <div></div>
    }
  })

  Vue.component('router-link', {
    render () {
      return <a>{this.$slots.default}</a>
    }
  })
}

export default  install