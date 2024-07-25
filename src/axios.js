import axios from "axios"
import { useCookies } from '@vueuse/integrations/useCookies'
import { ElNotification } from 'element-plus'




const service = axios.create({
    baseURL:"/api"
})

export default service

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    const cookie = useCookies()
    const token = cookie.get('admin-token')
    if(token){
        config.headers["token"] = token
    }

    return config;
  }, function (error){

    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {

    return response.data.data;
  }, function (error) {

    ElNotification({

        message: error.response.data.msg || "请求失败" ,
        type: 'error',
        duration:3000
    })

  });