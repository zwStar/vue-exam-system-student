<template>
  <div id="query_score">
    <Table :columns="columns" :data="exam_data" class="table"></Table>
  </div>
</template>

<script>
  import moment from 'moment';
  import {get_scores} from '@/api/exam'

  export default {
    data() {
      return {
        columns: [
          {
            title: '时间',
            key: 'time'
          },
          {
            title: '年级',
            key: 'grade'
          },
          {
            title: '科目',
            key: 'subject'
          },
          {
            title: '分数',
            key: 'score'
          },
          {
            title: '批阅状态',
            key: 'checked'
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
                  on: {
                    click: () => {
                      this.exam_detail(params.index)
                    }
                  }
                }, '查看详情')
              ]);
            }
          }
        ],
        exam_data: [
          /*{
            time:new Date(1511712000 * 1000),
            grade:'二年级',
            subject:'语文',
            score:0,
            checked:'未批阅'
          },
          {
            time:new Date(1511712000 * 1000),
            grade:'二年级',
            subject:'语文',
            score:80,
            checked:'已批阅'
          }*/
        ]
      }
    },
    methods: {
      exam_detail(index) {
        let id = this.exam_data[index].id;
        this.$router.push({path:'/index/exam_detail',query:{id}});
      }
    },
    mounted() {
      get_scores({}).then((result) => {
        console.log(result)
        let data = result.data;
        data.data.forEach((el) => {
          this.exam_data.push({
            grade: el.grade,
            subject: el.subject,
            score: el.score,
            checked: el.checked === '0' ? '未批阅' : '已批阅',
            time: moment(el.examDay * 1000).format('YYYY/MM/DD'),
            id:el.exam_id
          })
        })
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #query_score {
    .table {
      margin-top: 10px;
    }
  }
</style>
