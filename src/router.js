import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from './views/layout/Layout'

/**
 * hidden: true                   如果“hidden:true”不会在侧边栏显示(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单，无论它的子路径长度是多少
 *                                如果不设置总路线，只在子下面多走一条路线
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noredirect           if `redirect:noredirect` 不会在面包屑中重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               显示在子菜单和面包屑中(推荐设置)
    icon: 'svg-name'             图标显示在侧边栏
  }
 **/
export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/404', component: () => import('@/views/404'), hidden: true},
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/index/Index'),
                name: '首页',
                meta: {title: '首页', icon: 'arley-icon arley-icon-home', noCache: true}
            }
        ]
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },


];

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})


export const asyncRouterMap = [
    {
        path: '/admin',
        component: Layout,
        redirect: '/admin/admin-list',
        name: 'admin',
        meta: {title: '管理员管理', icon: 'arley-icon arley-icon-admin'},
        children: [
            {
                path: 'admin-list',
                name: 'admin-list',
                component: () => import('@/views/admin/admin/Index'),
                meta: {title: '管理员列表', icon: 'arley-icon arley-icon-right_arrow'}
            },
            {
                path: 'role-list',
                name: 'role-list',
                component: () => import('@/views/admin/role/Index'),
                meta: {title: '角色列表', icon: 'arley-icon arley-icon-right_arrow'}
            },
            {
                path: 'permission-list',
                name: 'permission-list',
                component: () => import('@/views/admin/permission/Index'),
                meta: {title: '菜单列表', icon: 'arley-icon arley-icon-right_arrow'}
            }
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/login-log',
        name: 'system',
        meta: {title: '系统管理', icon: 'arley-icon arley-icon-system'},
        children: [
            {
                path: 'login-log',
                name: 'login-log',
                component: () => import('@/views/system/loginLog/Index'),
                meta: {title: '登陆日志', icon: 'arley-icon arley-icon-right_arrow'}
            }
        ]
    },

    {path: '*', redirect: '/404', hidden: true}
];

