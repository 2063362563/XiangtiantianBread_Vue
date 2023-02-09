import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Main from "../views/Main.vue"
import Vip from "../views/Vip.vue"
import Employee from "../views/Employee.vue"
import New from "../views/New.vue"
import Discount from "../views/Discount.vue"
import Cake from "../views/Cake.vue"
import Bread from "../views/Bread.vue"
Vue.use(VueRouter)

const routes = [
  //主路由
  {
    path: '/',
    component: Main,
    redirect: '/home',
    //子路由
    children: [
      { path: 'home', name:'home', component: Home },
      { path: 'vip', name:'vip', component: Vip },
      { path: 'employee', name:'employee', component: Employee },
      { path: 'new', name:'new', component: New },
      { path: 'discount', name:'discount', component: Discount },
      { path: 'cake', name:'cake', component: Cake },
      { path: 'bread', name:'bread', component: Bread },
    ]
  }
  

]

const router = new VueRouter({
  routes
})

export default router