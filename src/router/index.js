import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Main from "../views/Main.vue"
import Vip from "../views/Vip.vue"
import Employee from "../views/Employee.vue"
import Cake from "../views/Cake.vue"
import Bread from "../views/Bread.vue"
import Login from "../views/Login.vue"
import My from "../views/My.vue"
import Buy from "../consumerView/Buy.vue"
import ShoppingCart from "../consumerView/ShoppingCart.vue"

Vue.use(VueRouter)

const routes = [
  //登录
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/buy',
    component: Buy,
  },
  {
    path: '/shoppingCart',
    component: ShoppingCart,
  },
  //后台主路由
  {
    path: '/',
    component: Main,
    redirect: '/login',
    //子路由
    children: [
      { path: '/home', name: 'home', component: Home },
      { path: '/vip', name: 'vip', component: Vip },
      { path: '/employee', name: 'employee', component: Employee },
      { path: '/cake', name: 'cake', component: Cake },
      { path: '/bread', name: 'bread', component: Bread },
      //个人中心
      { path: '/my', name: 'my', component: My, },
    ],
  },


]

const router = new VueRouter({
  routes
})

export default router