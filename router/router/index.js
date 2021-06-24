import Vue from 'vue'

// import VueRouter from 'vue-router'
import VueRouter from '../vueRouter'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../Views/home.vue')
  },
  {
    path: '/about',
    component: () => import('../Views/about.vue'),
    children: [
      {
        path: '/', component: () => import('../Views/a.vue')
      },
      {
        path: 'a',
        component: () => import('../Views/a.vue')
      },
      {
        path: 'b',
        component: () => import('../Views/b.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
  // mode: 'hash'
})

export default router
