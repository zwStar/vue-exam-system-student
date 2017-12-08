<template>
  <div id="login">
    <Form class="form" ref="formCustom" :model="formCustom" :rules="ruleCustom" >
      <h1 class="title">系统登录</h1>
      <FormItem>
        <Input type="text" v-model="formCustom.studentNo">
        <span slot="prepend"><Icon type="person"></Icon></span>
        </Input>
      </FormItem>

      <FormItem prop="password">
        <Input type="password" v-model="formCustom.password">
        <span slot="prepend"><Icon type="locked"></Icon></span>
        </Input>
      </FormItem>
      <FormItem>
        <Button long type="primary" @click="handleSubmit('formCustom')">登录</Button>
      </FormItem>

    </Form>
  </div>
</template>

<script>
  import {login} from '@/api/request'

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        }
        callback();
      };
      return {
        formCustom: {
          password: '',
          studentNo: ''
        },
        ruleCustom: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        console.log(this.formCustom)
        let that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            login(this.formCustom).then((result)=>{
              console.log(result)
              let data = result.data;
              if(data.status ===1){
                localStorage.setItem('name',data.data.name);
                localStorage.setItem('teacherNo',data.data.teacherNo);
                this.$router.push({path:'/index'});
              }else{
                this.$Message.error(data.message);
              }
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #login{
    width: 100vw;
    height:100vh;
    background: #2d3a4b;
    .form{
      width: 300px;
      position: absolute;
      top:30%;
      left:50%;
      transform: translate(-50%,-50%);
      .title{
        color:#fff;
        margin:15px 0;
        font-size: 30px;
        text-align: center;
      }
    }
  }
</style>
