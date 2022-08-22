// service统一出口
import caiRequest from "./request/caiRequest"
import { ElLoading, ElMessage } from "element-plus";

const axios_config = {
    headers: {
        'X-Bmob-Application-Id': 'e536863a0210f9b43a1e5344b785de3d',
        'X-Bmob-REST-API-Key': '37b324a62cedd302e6a22fc84e622a5a',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    // baseURL: process.env.BASEURL,
    baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: "http://cai.zvooo.com/",
    timeout: 5000,
    "Access-Control-Allow-Origin": "*"
};
let loadingInstance = null,
    isShowLoading = true;

let cRequest1 = new caiRequest({
    axios_config,
    isShowLoading,
    Interceptors: {
        requestInterceptor: (config) => {
            console.log('请求成功的拦截');
            // console.log(isShowLoading)
            if (isShowLoading) {
                loadingInstance = ElLoading.service({ fullscreen: true, text: "正在请求数据..." });
            }
            return config;
        },
        requestInterceptorCatch: (config) => {
            console.log('请求错误的拦截');
            return Promise.reject(error);
        },
        responseInterceptor: (response) => {
            console.log('响应成功的拦截');
            // console.log(response);
            loadingInstance.close();
            return response;
        },
        responseInterceptorCatch: (error) => {
            console.log('响应后的拦截');
            loadingInstance.close();
            //状态码判断
            statusShow(error.response.status, error.message);
            return error;
        }
    }
});

function statusShow(statusCode, msg) {
    let tip = "";
    switch (statusCode) {

        case 301:
            tip = "：请求的网页已永久移动到新位置";
            break;
        case 304:
            tip = "： 自从上次请求后， 请求的网页未修改过。 服务器返回此响应时， 不会返回网页内容";
            break;
        case 400:
            tip = "：服务器不理解请求的语法";
            break;
        case 403:
            tip = "：服务器拒绝请求";
            break;
        case 404:
            tip = "：服务器找不到请求的网页";
            break;
        case 500:
            tip = "：服务器遇到错误， 无法完成请求";
            break;
        case 501:
            tip = "：服务器不具备完成请求的功能";
            break;
        case 502:
            tip = "：服务器作为网关或代理，从上游服务器收到无效响应";
            break;
        default:
            tip = "";
    }
    ElMessage({
        message: msg + tip,
        type: 'error',
        duration: 5 * 1000
    })
}

export default cRequest1;