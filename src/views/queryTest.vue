<template>
  <div id="test_arrange">
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns:[
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
            title:'操作',
            key:'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              console.log(params)
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled:!params.row.start
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.begin_test(params.index)
                    }
                  }
                }, '开始考试')
              ]);
            }
          }
        ],
        data:[
          {
            subject:'数学',
            day:'201//11/30',
            time:'8:00-10:00',
            start:false
          },
          {
            subject:'数学',
            day:'201//11/30',
            time:'8:00-10:00',
            start:true
          },
          {
            subject:'数学',
            day:'201//11/30',
            time:'8:00-10:00',
            start:false
          }
        ]
      }
    },
    methods:{
      begin_test(index){
        console.log(index);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
