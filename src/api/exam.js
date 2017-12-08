import {_get,_post} from './index'
//获取考试列表
export const get_exams = (data) =>{
  let req = {
    url:'exam/get_exam_list.php',
  }
  req.data = data;
  return _get(req);
}

//获取成绩
export const get_scores = (data)=>{
  let req = {
    url:'exam/get_scores.php'
  }
  req.data = data;
  return _get(req);
}

//开始考试
export const start_exam = (data) =>{
  let req = {
    url:'exam/start_exam.php',
  }
  req.data = data;
  return _get(req);
}


//暂存考试
export const temp_exam = (data) =>{
  let req = {
    url:'exam/temp_exam.php',
  }
  req.data = data;
  return _post(req);
}
//提交答案
export const submit_exam = (data) =>{
  let req = {
    url: 'exam/submit.php'
  }
  req.data = data;
  return _post(req);
}

//查看成绩
export const exam_result = (data) =>{
  let req = {
    url:'exam/exam_result.php'
  }
  req.data = data;
  return _get(req);
}
//获取试卷
export const get_submit_exam = (data)=>{
  let req = {
    url:'exam/get_one_exam.php'
  }
  req.data = data;
  return _get(req);
}

