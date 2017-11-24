import config from '../config'

const baseURL = config.baseURL;
console.log(baseURL)
const axios = require('axios').create({
  baseURL: baseURL,            //api请求的baseURL
  timeout: 10000,
  withCredentials: true, // 允许跨域 cookie
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  transformResponse: [function (data) {
    let json = {};
    console.log("返回的data",data);
    try {
      json = JSON.parse(data);
    } catch (e) {
      json = {};
    }
    return json;
  }]
})
// get
export const _get = (req) => {
/*  let data = req.data;
  let root = new FormData();
  for (let key of Object.keys(data)) {
    root.append(key, data[key]);
  }
  req.data = root;*/
  return axios.get(req.url, {params: req.data})
}

// post
export const _post = (req) => {
  let data = req.data;
  let root = new FormData();
  for (let key of Object.keys(data)) {
    root.append(key, data[key]);
  }
  req.data = root;
  return axios({method: 'post', url: `/${req.url}`, data: req.data})
}
