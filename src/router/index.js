import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Solution from '../views/Solution.vue'
import Detail from '../views/Detail.vue'
import reMent from '../views/reMent.vue'
import Center from '../views/Center.vue'
import About from '../views/About.vue'
import Error from '../views/Error.vue'
import Product from '../views/Product.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/solution/:id?',
    name: 'Solution',
    component: Solution,
  },
  {
    path: '/product/:id?',
    name: 'Product',
    component: Product,
  },
  {
    path: '/detail/:id?',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/rement',
    name: 'reMent',
    component: reMent,
  },
  {
    path: '/center',
    name: 'Center',
    component: Center,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '*',
    component: Error,
  },
]

const router = new VueRouter({
  routes,
})

export default router
