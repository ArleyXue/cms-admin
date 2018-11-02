import {postRes, getRes} from "../utils/request";

/**
 * 登陆
 * @param userName
 * @param password
 */
export function login(userName, password) {
    return postRes("/api/user/login", {userName, password});
}

export function getUserInfo(token) {
    return getRes("/api/user/getUserInfo");
}

export function logout() {
    return getRes("/api/user/logout");
}


