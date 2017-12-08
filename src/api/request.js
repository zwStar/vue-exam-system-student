import qs from 'qs'
import {_get,_post} from './index'
//登录
export const login = (data) =>{
  let req = {
    url:'login/login_student.php',
  }
  req.data =data;
  return _post(req);
};

//退出登录
export const logout = (data)=>{
  let req = {
    url:'login/logout_student.php',
  }
  req.data = data;
  return _post(req);
}

//修改密码
export const change_pass  = (data)=>{
  let req = {
    url:'login/change_pass.php'
  }
  req.data = data;
  return _post(req);
}




