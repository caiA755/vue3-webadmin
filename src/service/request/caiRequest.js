import axios from 'axios'
import qs from 'qs' //querystring

class caiRequest {
    constructor(config) {
        this.instance = axios.create(config.axios_config);
        this.Interceptors = config.Interceptors;
        //axios拦截请求前后
        this.instance.interceptors.request.use(
            this.Interceptors.requestInterceptor,
            this.Interceptors.requestInterceptorCatch
        );
        //axios拦截响应前后
        this.instance.interceptors.response.use(
            this.Interceptors.responseInterceptor,
            this.Interceptors.responseInterceptorCatch
        );
    }

    getRequest(url, params, config) {
        //单独拦截
        if (config != null) {
            config = config.Interceptors.requestInterceptor(config);
        }
        //this.instance=axios实例
        let where;
        if (params != null) {
            //bomb云数据库 请求方式
            // where = '?where=' + JSON.stringify(params);
            where = '?where=' + params;
            url = url + where;
        }
        console.log(url);
        return this.instance.get(url).then((res) => {
            return res.data;
        }).catch(function(error) {
            console.log(error);
        });
    }
    postRequest(url, data, res) {
        //单独拦截
        if (res != null) {
            res = res.Interceptors.responseInterceptor(res);
        }
        //this.instance=axios实例
        this.instance.post(url, data).then((res) => {
            console.log(res);
            return Promise.resolve(res.data);
        }).catch(function(error) {
            console.log(error);
        })
    }
}

//axios直接配置请求方法
function post(url, data) { //  post
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
}

function get(url, params) { // get
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

export default caiRequest;