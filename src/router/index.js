import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import Test from '@/views/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      name:'Index',
      component:Index,
      children:[
        {
          path:'test',
          name:'Test',
          component:Test
        }
      ]
    }
  ]
})
