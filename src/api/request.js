import axios from 'axios'
import qs from 'qs'
import {Message, MessageBox} from 'element-ui'
import constants from '@/utils/constants'

import router from '../router'
import {getToken, removeToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: constants.BASE_URL, // api 的 base_url
    timeout: 30000 // 请求超时时间
});

//设置默认请求头
let contentType = "application/x-www-form-urlencoded; charset=UTF-8";
service.defaults.headers = {
    'Content-Type': contentType
};

// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }

        // 在发送请求之前做某件事
        if (config.method.toUpperCase() === "POST" && config.headers['Content-Type'] === contentType) {
            // 序列化
            config.data = qs.stringify(config.data);
            // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
        }

        return config
    },
    error => {
        // Do something with request error
        // error 的回调信息,看贵公司的定义
        Message({
            //  饿了么的消息弹窗组件,类似toast
            showClose: true,
            message: error && error.data.error.message,
            type: 'error'
        });
        return Promise.reject(error.data.error.message);
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
                        duration: 2 * 1000
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
                        duration: 2 * 1000
                    });
                    break;
            }
            return Promise.reject(res.resultDesc);
        }

        return response.data
    },
    error => {
        console.log('err' + error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 2 * 1000
        });
        return Promise.reject(error)
    }
);

export default service
