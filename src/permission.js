import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth' // 验权

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start();

    if (getToken()) {// 有token
        if (to.path === '/login') { // 如果地址是登录 跳转首页
            next({path: '/'});
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (store.getters.permissionMenuList.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetUserInfo').then(permissionMenuList => { // 拉取user_info
                    store.dispatch('GenerateRoutes', permissionMenuList).then(() => { // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                }).catch((err) => {
                    store.dispatch('FedLogout').then(() => {
                        Message.error(err || 'Verification failed, please login again');
                        next({ path: '/' })
                    })
                })
            } else {
                next()
            }
        }
    } else { // 没有token 如果是白名单地址, 跳转, 否则进登录页面
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
});
