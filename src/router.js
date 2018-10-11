import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/cars',
      name:'cars',
      component: () => import('./views/Cars.vue')
    },
    {
      path: '/commercetools',
      name:'commercetools',
      component: () => import('./views/Commercetools.vue')
    },
    {
      path:'/playground',
      name: 'playground',
      component: () => import('./views/Playground.vue')
    },
    {
      path:'/category/:categoryId',
      name: 'category',
      component: () => import('./views/Category.vue'),
      props: true
    },
    {
      path:'/product/:productSlug',
      name: 'product',
      component: () => import('./views/Product.vue'),
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    }
  ]
})
