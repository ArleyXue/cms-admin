import {asyncRouterMap, constantRouterMap} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissionMenuList
 * @param route
 */
function hasPermission(permissionMenuList, route) {
    if (route.meta && route.meta.menuCode) {
        return permissionMenuList.some(role => route.meta.menuCode === role.menuCode)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param permissionMenuList
 */
function filterAsyncRouter(routes, permissionMenuList) {
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};
        if (hasPermission(permissionMenuList, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, permissionMenuList)
            }
            res.push(tmp)
        }
    });
    return res
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({commit}, permissionMenuList) {
            return new Promise(resolve => {
                let accessedRouters = filterAsyncRouter(asyncRouterMap, permissionMenuList);
                commit('SET_ROUTERS', accessedRouters);
                resolve()
            })
        }
    }
};

export default permission
