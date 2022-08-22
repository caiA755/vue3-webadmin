import axios from 'axios'
import { Promise } from 'core-js';
import qs from 'qs'
import { ElLoading } from "element-plus";

//axios基本配置
const config = {
    headers: {
        'X-Bmob-Application-Id': 'e536863a0210f9b43a1e5344b785de3d',
        'X-Bmob-REST-API-Key': '37b324a62cedd302e6a22fc84e622a5a',
        'Content-Type': 'application/json'
    },
    baseURL: "/api",
    // baseURL: "/api",
    timeout: 5000,
};
//全局配置
axios.defaults.baseURL = config.baseURL;
axios.defaults.headers = config.headers;

//axios实例
// axios.get('/1/classes/_User').then((res) => {
//     console.log(res);
// });


//添加拦截请求器
let loadingInstance = null
axios.interceptors.request.use(function(config) {
    //在发送请求之前做些什么
    loadingInstance = ElLoading.service({ fullscreen: true });
    return config;
}, function(error) {
    //对请求错误做些什么
    return Promise.reject(error);
});
// 声明响应拦截器
axios.interceptors.response.use((response) => {
    // 响应前
    // 隐藏 Loading 效果
    loadingInstance.close();
    return response;
}, function(response) {
    //  响应后
    return response;
});

export default {
    post(url, data) { //  post
        return axios({
            method: 'post',
            baseURL: process.env.BASEURL,
            url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: config.headers
                // headers: {
                //     'X-Requested-With': 'XMLHttpRequest',
                //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                // }
        }).then((response) => {
            console.log(response);
        }).catch((res) => {
            console.log(res);
        })
    },
    get(url, params) { // get
        return axios({
            method: 'get',
            baseURL: process.env.BASEURL,
            url,
            params, // get 请求时带的参数
            timeout: config.timeout,
            headers: config.headers
                // headers: {
                //     'X-Requested-With': 'XMLHttpRequest'
                // }
        }).then((response) => {
            console.log(response);
        }).catch((res) => {
            console.log(res);
        })
    }
};
//加一个返回状态码判断