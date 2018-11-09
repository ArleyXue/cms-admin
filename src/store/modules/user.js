import {login, logout, getUserInfo} from '@/api/login'
import {setToken, removeToken, getToken} from '@/utils/auth'
import {postRes} from "../../api/login";

const user = {
    state: {
        userInfo: '',
        permissionMenuList: [],
        permissionButtonList: [],
    },

    mutations: {
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_PERMISSION_MENU_LIST: (state, permissionMenuList) => {
            state.permissionMenuList = permissionMenuList
        },
        SET_PERMISSION_BUTTON_LIST: (state, permissionButtonList) => {
            state.permissionButtonList = permissionButtonList
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

                    let permissionList = data.permissionList;
                    let permissionMenuList = [];
                    let permissionButtonList = [];
                    permissionList.forEach(v => {
                        if (v.menuType === 1) {
                            permissionMenuList.push(v);
                        } else {
                            permissionButtonList.push(v);
                        }
                    });

                    commit('SET_PERMISSION_MENU_LIST', permissionMenuList);
                    commit('SET_PERMISSION_BUTTON_LIST', permissionButtonList);

                    commit('SET_USER_INFO', data.sysUser);
                    resolve(permissionMenuList)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_PERMISSION_MENU_LIST', []);
                    commit('SET_PERMISSION_BUTTON_LIST', []);
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
