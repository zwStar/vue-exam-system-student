<template>
  <div id="exam_detail">
    <h2 class="tip" v-if="total_score == 0">待批阅</h2>
    <h1>判断题</h1>
    <div v-for="(list,index) in question_list.judgeList">
      <p class="question">{{index + 1}}. {{list.question}}</p>
      <span>你的答案: {{judge_answer[index]}}</span>
      <span>正确答案:  {{real_judge_answer[index]}}</span>
      <span v-if="judge_answer[index] == real_judge_answer[index]"><Icon type="checkmark" color="#2d8cf0"></Icon></span>
      <span v-else><Icon type="close-round" color="#ff1717"></Icon></span>
    </div>
    <span class="score">获得的判断题总分是: <strong>{{judge_score}}</strong> </span>
    <h1>选择题</h1>
    <div v-for="(list,index) in question_list.selectList">
      <p class="question">{{index + 1}}. {{list.question}}</p>
      <span>你的答案: {{select_answer[index]}}   </span>
      <span>正确答案:  {{real_select_answer[index]}}</span>
      <span v-if="select_answer[index] == real_select_answer[index]"><Icon type="checkmark" color="#2d8cf0"></Icon></span>
      <span v-else><Icon type="close-round" color="#ff1717"></Icon></span>
    </div>
    <span class="score">获得的选择题总分是: <strong>{{select_score}}</strong> </span>
    <h1>填空题</h1>
    <div v-for="(list,index) in question_list.insertList">
      <p class="question">{{index + 1}}. {{list.question}}</p>
      <p style="margin:10px 0;">你的答案: {{insert_answer[index]}}</p>
      <span>正确答案:  {{real_insert_answer[index]}}</span>
    </div>
    <span class="score">获得的填空题总分是: <strong>{{insert_scores}}</strong> </span>
    <p class="score total_score">获得的总分是: <strong>{{total_score}}</strong></p>
  </div>
</template>

<script>
  import {get_submit_exam} from '@/api/exam';
  export default {
    data() {
      return {
        question_list: [],        //问题列表
        judge_answer: [],         //考生判断题答案
        real_judge_answer: [],    //正确的判断题答案
        select_answer: [],        //考生选择题答案
        real_select_answer: [],    //正确的选择题答案
        insert_answer: [],         //考生填空题答案
        real_insert_answer: [],     //正确的填空题答案
        judge_score: 0,      //判断题分数
        select_score: 0,     //选择题分数
        total_score: 0
      }
    },
    computed: {
      insert_scores() {            //填空题总分
        return this.total_score == 0 ? 0 :this.total_score - this.judge_score - this.select_score;
      }
    },
    mounted() {
      let id = this.$route.query;
      get_submit_exam(id).then((result) => {
        let data = result.data.data;
        //获取id
        this.id = data.id;
        //考生总成绩
        this.total_score = data.score;
        //获取考生判断题答案
        this.judge_answer = data.judge_answer.split(";").splice(1);
        console.log(this.judge_answer)
        //获取考生选择题答案
        this.select_answer = data.select_answer.split(";").splice(1);
        console.log("select Answer", this.select_answer)
        //获取考生填空题答案
        this.insert_answer = data.insert_answer.split(";").splice(1);

        //获取题目
        let question_list = data.question_list;
        question_list = question_list.replace(/[\r|\n]/g, '');
        this.question_list = JSON.parse(question_list);

        this.real_judge_answer = data.real_judge_answer;  //正确的判断题答案
        this.real_select_answer = data.real_select_answer;  //正确的选择题答案
        this.real_insert_answer = data.real_insert_answer;  //正确的填空题答案

        //计算判断题分数
        this.real_judge_answer.forEach((el, index) => {
          if (el === this.judge_answer[index])
            this.judge_score += Number(data.judge_question_score);
        })
        //计算选择题分数
        this.real_select_answer.forEach((el, index) => {
          if (el === this.select_answer[index])
            this.select_score += Number(data.select_question_score);
        })
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #exam_detail {
    text-align: center;
    h1 {
      margin: 10px 0;
    }
    .tip{
      color:#ff1717;
      margin:20px;
    }
    .question {
      margin: 10px 0;
    }
    .score {
      display: inline-block;
      font-size: 20px;
      margin: 10px 0;
      strong {
        color: #ff1717;
      }
    }
    .total_score {
      display: block;
    }
  }

</style>
