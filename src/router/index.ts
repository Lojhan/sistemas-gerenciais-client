import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: () => import('../views/Purchases.vue')
  },
  {
    path: '/purchases/:id',
    name: 'Purchase',
    component: () => import('../views/PurchaseDetails.vue'),
    children: [
      
      {
        path: '/card',
        name: 'Card',
        component: () => import('../views/Product.vue')
      },
      {
        path: '/ticket',
        name: 'Ticket',
        component: () => import('../views/Cart.vue')
      },
      {
        path: '/montly-ticket',
        name: 'MontlyTicket',
        component: () => import('../views/Purchases.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
