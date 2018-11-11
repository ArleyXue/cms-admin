import service from "../utils/request";


/**
 * 获取用户信息
 */
export function getUserInfo() {
    return service({
        url: "/api/user/getUserInfo",
        method: 'GET'
    })
}

/**
 * 修改个人信息
 * @param params
 */
export function updateUserInfo(params) {
    return service({
        url: "/api/user/updateUserInfo",
        method: 'POST',
        data: params
    })
}