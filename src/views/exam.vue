<template>
  <div id="exam">
    <article>
      <section>
        <h1>判断题:</h1>
        <div class="judge_list" v-for="(list,index) in judge_data">
          <p>{{index + 1}}. {{list}}</p>
          <RadioGroup v-model="judge_answer[index+1]">
            <Radio label="true">
              <span>true</span>
            </Radio>
            <Radio label="false">
              <span>false</span>
            </Radio>
          </RadioGroup>
        </div>

      </section>
      <section>
        <h1>选择题</h1>
        <div class="select_list" v-for="(list,index) in select_data">
          <p>{{index + 1}}. {{list.question}}</p>
          <RadioGroup v-model="select_answer[index+1]">
            <Radio v-for="(value,key) in  list.options" :label="key" :key="key">
              <span>{{key}} {{value}}</span>
            </Radio>
          </RadioGroup>
        </div>
      </section>
      <section>
        <h1>填空题</h1>
        <div class="insert_list" v-for="(list,index) in insert_data">
          <p>{{index + 1}}. {{list}}</p>
          <Input v-model="insert_answer[index+1]" style="width:400px;margin:10px 0;"></Input>
        </div>
      </section>

    </article>
    <Button type="primary" @click="submit()">提交</Button>
    <Button type="warning" @click="temp_storage()">暂存</Button>
    <span class="remian_time">考试倒计时： {{remain_time}}</span>
  </div>
</template>

<script>
  import {start_exam, temp_exam, submit_exam} from '@/api/exam'
  import moment from 'moment'

  export default {
    data() {
      return {
        judge_data: [],
        judge_answer: [],
        select_data: [],
        select_answer: [],
        insert_data: [],
        insert_answer: [],
        exam_id: 0,
        remain_time: null
      }
    },
    methods: {
      submit() {
        console.log("提交");
        let judge_answer = this.judge_answer.join(";");
        let select_answer = this.select_answer.join(";");
        let insert_answer = this.insert_answer.join(";");
        let exam_id = this.exam_id;
        submit_exam({judge_answer, select_answer, insert_answer, exam_id}).then((result) => {
          console.log(result);
          let data = result.data;
          if (data.status === 1) {
            this.$router.push('/index');
            this.$Message.success(data.message);
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      temp_storage() {
        console.log("暂存")
        let judge_answer = this.judge_answer.join(";");
        let select_answer = this.select_answer.join(";");
        let insert_answer = this.insert_answer.join(";");
        let exam_id = this.exam_id;
        temp_exam({judge_answer, select_answer, insert_answer, exam_id}).then((result) => {
          console.log(result)
        })
      },
      calc_remain_time(time) {
        let remain_time = (time * 1000 - new Date().getTime());
        var hours = parseInt(remain_time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(remain_time / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(remain_time / 1000 % 60, 10);//计算剩余的秒数
        this.remain_time = hours + "小时" + minutes + "分" + seconds + "秒";
        if(hours==0&&minutes==0&&seconds==0)
          clearInterval(this.timer);
      }
    },
    mounted() {
      let id = this.$route.query;
      start_exam(id).then((result) => { //获取题目
        console.log(result)
        let res = result.data;
        let question_list;
        if (res.status === -1) {    //出错 重新返回到考试开始前
          this.$Message.error(res.message);
          this.$router.push({path: '/index/query_exam'});
        } else {   //第一次开始考试 不是从暂存区里面读取的数据
          if (res.status === 1) {
            question_list = res.data;
            this.exam_id = question_list.exam_id;
          } else if (res.status === 2) {  //从暂存区读取的数据
            let data = res.data;
            this.exam_id = data.exam_id;
            question_list = JSON.parse(data.question_list);
            this.judge_answer = data.judge_answer.split(';');    //加载判断题答案
            this.select_answer = data.select_answer.split(';');  //加载选择题答案
            this.insert_answer = data.insert_answer.split(';');  //加载填空题答案
          }
        }
        this.$Message.success(res.message);   //提示信息
        question_list.judgeList.forEach((el, index) => {    //渲染判断题
          this.judge_data.push(el.question);
        });
        question_list.insertList.forEach((el, index) => { //渲染选择题
          this.insert_data.push(el.question);
        })
        question_list.selectList.forEach((el, index) => {   //渲染填空题
          let options = el.options.replace(/[\r|\n]/g, '');
          options = options.split(";").slice(0, 4);   //切割字符串 转为数组
          let obj = {};
          options.forEach((option, index) => {
            obj[String.fromCharCode(index + 65)] = option.slice(2);
          })
          this.select_data.push({question: el.question, options: obj});
        })
      })
      //考试倒计时

      let _this = this;
      let time = localStorage.getItem('endTime');
      this.timer = setInterval(function () {
        _this.calc_remain_time(time);
      }, 1000);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #exam {
    text-align: center;
    h1 {
      margin: 20px 0;
    }
    .ivu-radio-group {
      margin: 10px 0;
    }
    .remian_time{
      color:#000;
      position:absolute;
      right:20px;
      top:70px;
      z-index: 999;
    }
  }
</style>
