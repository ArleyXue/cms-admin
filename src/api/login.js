import {postRes, getRes} from "../utils/request";

/**
 * 登陆
 * @param userName
 * @param password
 */
export function login(userName, password) {
    return postRes("/api/user/login", {userName, password});
}

/**
 * 获取用户信息
 * @param token
 */
export function getUserInfo() {
    return getRes("/api/user/getUserInfo");
}

/**
 * 退出登录
 */
export function logout() {
    return getRes("/api/user/logout");
}


