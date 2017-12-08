<template>
  <div id="index">
    <div class="layout-header">
      <div class="layout-ceiling">
        <div class="layout-ceiling-main">
          <a href="#">欢迎你 {{name}}</a> |
          <a href="#" @click="logout()">退出登录</a>
        </div>
      </div>
    </div>

    <Menu mode="horizontal" active-name="1">
      <div class="layout-assistant">
        <router-link to="/index/query_exam"><MenuItem name="1">查询考试</MenuItem></router-link>
        <router-link to="/index/query_score"><MenuItem name="2">成绩查询</MenuItem></router-link>
        <router-link to="/index/change_pass"><MenuItem name="3">修改密码</MenuItem></router-link>
      </div>
    </Menu>

    <router-view></router-view>
  </div>
</template>

<script>
  import {logout} from '@/api/request'
  export default {
    data(){
      return {
        name:''
      }
    },
    methods:{
      logout(){
        logout({}).then((result)=>{
          let data = result.data;
          if(data.status ===1){
            localStorage.removeItem('name');
            localStorage.removeItem('teacherNo');
            this.$router.push({path:'/login'});
            this.$Message.success(data.message);
          }else{
            this.$Message.error('退出登录失败，请重试');
          }

        })
      }
    },
    mounted(){
      this.studentNo = localStorage.getItem('studentNo');
      this.name = localStorage.getItem('name');
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .layout-header{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout-ceiling{
    background: #464c5b;
    padding: 15px 0;
    overflow: hidden;
  }
  .layout-ceiling-main{
    float: right;
    margin-right: 15px;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }

  .layout-main{
    position:fixed;
    top:48px;
    left:0;
    right:0;
    bottom:0;
    .ivu-row-flex{
      height:100%;
      .layout-menu-left{
        background: #495060;
      }
    }

  }
</style>
