<template>
  <div id="exam_arrange">
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
  import moment from 'moment'
  import {get_exams} from '@/api/exam'

  export default {
    data() {
      return {
        columns: [
          {
            title: '科目',
            key: 'subject'
          },
          {
            title: '考试日期',
            key: 'day'
          },
          {
            title: '时间',
            key: 'time'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: !params.row.start
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.begin_exam(params.index)
                    }
                  }
                }, '开始考试')
              ]);
            }
          }
        ],
        data: [
        ]
      }
    },
    methods: {
      begin_exam(index) {
        console.log(index);
        this.$router.push({path:'/index/exam',query:{id:this.data[index].id}});
      }
    },
    mounted() {
      get_exams({}).then((result) => {
        console.log(result);
        let data = result.data;
        this.data = [];
        if (data.status === 1) {
          data.data.forEach((list) => {
            this.data.push({
              subject: list.subject,
              day: moment(list.examDay * 1000).format('YYYY/MM/DD'),
              time: moment(list.startTime * 1000).format('HH:mm') + '-' + moment(list.endTime * 1000).format('HH:mm'),
              start:new Date().getTime() >= parseInt(list.startTime*1000) && new Date().getTime() < parseInt(list.endTime*1000) && !list.submit,
              id:list.id
            })
          })
          this.$Message.success(data.message);
        } else {
          this.$Message.error(data.message)
        }
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #exam_arrange {
    margin-top: 40px;
  }
</style>
