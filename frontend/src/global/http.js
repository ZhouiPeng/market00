import axios from "axios";
import router from "@/router";
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token'))
    {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.data.code === -10)
    {
      localStorage.removeItem('token')
      router.push({name: 'Login'})
    }
    return response
  }, async function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    await new Promise(r => {setTimeout(() => {
      r()
    }, 2*1000);})
    return Promise.reject(error);
  });
export default axios