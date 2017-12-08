<template>
  <div id="exam_result">
    <Table :columns="columns1" :data="data"></Table>
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import {exam_result} from '@/api/request'

  export default {
    data() {
      return {
        columns1: [
          {
            title: '年级',
            key: 'grade'
          },
          {
            title: '科目',
            key: 'subject'
          },
          {
            title: '考试时间',
            key: 'time'
          },
          {
            title: '成绩',
            key: 'score'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看试卷')
              ]);
            }
          }
        ],
        data:[
          {
            grade:'一年级',
            subject:'数学',
            time:'2017/10/25',
            score:'60'
          }
        ]
      }
    },
    mounted() {
      test_result().then((result) => {
        console.log(result)
        let data = result.data.data;
        localStorage.setItem('data',JSON.stringify(data));
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
