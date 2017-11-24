<template>
  <div id="test">
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
          <Input size="large" v-model="insert_answer[index+1]"></Input>
        </div>
      </section>

    </article>
    <Button type="primary" @click="submit()">提交</Button>
    <Button type="warning" @click="temp_storage()">暂存</Button>
  </div>
</template>

<script>
  import {get_test, temp_test} from '@/api/request'

  export default {
    data() {
      return {
        judge_data: [],
        judge_answer: [],
        select_data: [],
        select_answer: [],
        insert_data: [],
        insert_answer: []
      }
    },
    methods: {
      submit() {
        console.log(this.insert_answer)
      },
      temp_storage() {
        console.log("暂存")
        let judge_answer = this.judge_answer.join(";");
        let select_answer = this.select_answer.join(";");
        let insert_answer = this.insert_answer.join(";");
        temp_test({judge_answer, select_answer, insert_answer,}).then((result) => {
          console.log(result)
        })
      }
    },
    mounted() {
      get_test().then((result) => {
        let data = result.data.data;
        data.judgeList.forEach((el, index) => {
          this.judge_data.push(el.question);
        })
        data.selectList.forEach((el, index) => {
          let options = el.options.replace(/[\r|\n]/g, '');
          options = options.split(";")
          let obj = {};
          options.forEach((option, index) => {
            obj[String.fromCharCode(index + 65)] = option;
          })
          this.select_data.push({question: el.question, options: obj});
        })

        data.insertList.forEach((el, index) => {
          this.insert_data.push(el.question);
        })
      });
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
