import {login, logout, getUserInfo} from '@/api/login'
import {setToken, removeToken} from '@/utils/auth'
import {postRes} from "../../api/login";

const user = {
    state: {
        userName: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_USER_NAME: (state, userName) => {
            state.userName = userName
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
            const userName = userInfo.userName.trim();
            return new Promise((resolve, reject) => {
                login(userName, userInfo.password).then(data => {
                    setToken(data.resultData.token);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const data = response.resultData;
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_USER_NAME', data.userName);
                    commit('SET_AVATAR', data.avatar);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_ROLES', []);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogout({commit}) {
            return new Promise(resolve => {
                removeToken();
                resolve()
            })
        }
    }
}

export default user
