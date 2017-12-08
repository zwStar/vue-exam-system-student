<template>
  <div class="change_pass">
    <Form class="form" ref="formCustom" :model="formCustom" :rules="ruleCustom" >
      <h1 class="title">修改密码</h1>

      <FormItem prop="password">
        <Input type="password" v-model="formCustom.password" placeholder="新密码">
        <span slot="prepend"><Icon type="locked"></Icon></span>
        </Input>
      </FormItem>
      <FormItem  prop="check_password" >
        <Input type="password" v-model="formCustom.check_password" placeholder="确认密码">
        <span slot="prepend"><Icon type="locked"></Icon></span>
        </Input>
      </FormItem>
      <FormItem>
        <Button long type="primary" @click="handleSubmit('formCustom')">修改</Button>
      </FormItem>

    </Form>
  </div>
</template>
<script>
  import {change_pass,logout} from '@/api/request'
  export default {
    data(){
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          callback();
        }
      };
      const validateCheckPass = (rule,value,callback) =>{
        if (value !== this.formCustom.password) {
          callback(new Error('2次密码不同'));
        }else{
          callback();
        }
      }
     return {
       formCustom:{
         password:'',
         check_password:''
       },
       ruleCustom:{
         password:[
           { validator: validatePass, trigger: 'blur' }
         ],
         check_password:[
           { validator: validateCheckPass, trigger: 'blur' }
         ]
       }
     }
    },
    methods:{
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            change_pass({password:this.formCustom.password}).then((response)=>{
              console.log(response);
              let data = response.data;
              if(data.status === 1){
                this.$Message.success(`${data.message} 请重新登录`);
                logout({}).then((response)=>{
                  let data = response.data;
                  if(data.status === 1){
                    localStorage.removeItem('name');
                    localStorage.removeItem('teacherNo');
                    this.$router.push("/login");
                  }
                })
              }else{
                this.$Message.error(data.message);
              }
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .change_pass{
    width: 100vw;
    height:100vh;
    .form{
      width: 300px;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      .title{
        margin:15px 0;
        font-size: 30px;
        text-align: center;
      }
    }
  }
</style>
