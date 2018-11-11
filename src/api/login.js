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
 * 退出登录
 */
export function logout() {
    return service({
        url: "/api/user/logout",
        method: 'GET'
    })
}


