import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import QueryExam from '@/views/queryExam' //查询考试
import Exam from '@/views/exam'   //进行考试
import ExamResult from '@/views/examResult'     //考试结果
import Detail from '@/views/examDetail'         //考试详情
import Login from '@/views/login'               //登录
import QueryScore from '@/views/queryScore'   //查询成绩
import ChangePass from '@/views/changePass'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/index',
      name:'Index',
      component:Index,
      redirect:'/index/query_exam',
      children:[
        {
          path:'query_exam',
          name:'QueryExam',
          component:QueryExam
        },
        {
          path:'exam',
          name:'Exam',
          component:Exam
        },
        {
          path:'query_score',
          name:'QueryScore',
          component:QueryScore
        },
        {
          path:'exam_detail',
          name:'Detail',
          component:Detail
        },
        {
          path:'change_pass',
          name:'修改密码',
          component:ChangePass
        }
      ]
    },

    {
      path:'/exam_result',
      name:'ExamResult',
      component:ExamResult,
      children:[
        {
          path:'detail',
          name:'Detail',
          component:Detail
        }
      ]
    }
  ]
})
