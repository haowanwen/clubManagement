import axios from "axios";

//全局配置
axios.defaults.headers.post["Content-type"] = "application/json";
// axios.defaults.headers.post["Content-type"] = "application/x-www-from-urlencoded;charset=UTF-8";

//设置统一路径前缀
//axios.defaults.baseURL = "https://service"

//设置请求拦截
// axios.interceptors,request.use(function (config){
    //手动将参数转换为查询字符串，为了呼应["Content-type"] = "application/x-www-from-urlencoded;charset=UTF-8";

    //     return config;
// },function(error){
//     return Promise,reject(error);
// });


export default axios;