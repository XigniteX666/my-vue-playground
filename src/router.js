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
      path:'/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
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
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('./views/Checkout.vue')
    }
  ]
})
