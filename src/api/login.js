import service from "../utils/request";

/**
 * 登陆
 * @param userName
 * @param password
 */
export function login(userName, password) {
    return service({
        url: "/api/user/login",
        method: 'POST',
        data: {userName, password}
    })
}

/**
 * 获取用户信息
 * @param token
 */
export function getUserInfo() {
    return service({
        url: "/api/user/getUserInfo",
        method: 'GET'
    })
}

/**
 * 退出登录
 */
export function logout() {
    return service({
        url: "/api/user/logout",
        method: 'GET'
    })
}


