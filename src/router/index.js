import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import QueryTest from '@/views/queryTest' //查询考试
import Test from '@/views/test'   //进行考试
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      name:'Index',
      component:Index,
      children:[
        {
          path:'query_test',
          name:'QueryTest',
          component:QueryTest
        }
      ]
    },
    {
      path:'/test',
      name:'Test',
      component:Test
    }
  ]
})
