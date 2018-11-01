import request from '@/utils/request'

import {postRes} from "../utils/request";

/**
 * 登陆
 * @param userName
 * @param password
 */
export function login(userName, password) {
    return postRes("/api/login/login", {userName, password});
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {token}
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}


