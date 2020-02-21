import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Anonymous from '@/components/home/anonymous.vue'

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
      component:Home
    },
    // 匿名页面
    {
      name:'anonymous',
      path:'/anonymous',
      component:Anonymous
    }
  ]
})
