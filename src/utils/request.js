import axios from 'axios'
import qs from 'qs'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import router from '../router'
import {getToken, removeToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: "http://localhost:8081/cms-admin-console", // api 的 base_url
    timeout: 50000 // 请求超时时间
});

//设置默认请求头
service.defaults.headers = {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
};

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error)
    }
);

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        if (res.resultCode !== "0000") {
            switch (res.resultCode) {
                case "0100":  // 登录过期
                    removeToken(); // 删除token
                    router.replace({
                        path: '/login',
                    });
                    break;
                case "0101":  // 在别的地方登录
                    removeToken(); // 删除token
                    router.replace({
                        path: '/login',
                    });
                    Message({
                        message: res.resultDesc,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    break;
                case "1000" :  // 没有权限
                    router.replace({
                        path: '/404',
                    });
                    break;
                case "9000" :  // 服务不存在
                    router.replace({
                        path: '/404',
                    });
                    break;
                default:
                    Message({
                        message: res.resultDesc,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    break;
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)
    }
);

/*
    post请求
 */
export function postRes(url, data) {
    return service({
        url: url,
        method: 'post',
        data: qs.stringify(data)
    })
}

/*
    get 请求
 */
export function getRes(url, data) {
    return service({
        url: url,
        method: 'get',
        params: data
    })
}


export default service
