import qs from 'qs'
import {_get,_post} from './index'

export const login = (data) =>{
  let req = {
    url:'login.php',
  }
  let root = new FormData();

  for (let key of Object.keys(data)) {
    root.append(key, data[key]);
  }
  req.data =root;
  return _post(req);
};
//开始考试
export const get_test = (data) =>{
  let req = {
    url:'start_test.php',
  }
  req.data = data;
  return _get(req);
}
//暂存考试
export const temp_test = (data) =>{
  let req = {
    url:'temp_test.php',
  }
  req.data = data;
  return _post(req);
}
