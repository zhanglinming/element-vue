import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
// 以下为用户访问组件
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'

// 以下为匿名访问组件
import Ahome from '@/components/home/ahome.vue'
import Ausers from '@/components/users/ausers.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    },
    {
      name:'home',
      path: '/',
      component:Home,
      children:[{
        name:'users',
        path:'users',
        component:Users
      }]
    },
    // 匿名页面
    {
      name:'ahome',
      path:'/',
      component:Ahome,
      children:[{
        name:'ausers',
        path:'ausers',
        component:Ausers
      }]
    }
  ]
})
