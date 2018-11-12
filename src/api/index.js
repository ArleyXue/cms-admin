import service from "../utils/request";


/**
 * 获取用户首页数据
 */
export function getUserIndexData() {
    return service({
        url: "/api/user/getUserIndexData",
        method: 'GET'
    })
}

/**
 * 获取内存使用情况
 */
export function listMemoryData() {
    return service({
        url: "/api/index/listMemoryData",
        method: 'GET'
    })
}


/**
 * 获取指定数量登录日志列表
 * @param size
 */
export function listLoginLogBySize(size) {
    return service({
        url: "/api/log/listLoginLogBySize",
        method: 'POST',
        data: {size: size}
    })
}

/**
 * 查询一周的访问量
 */
export function listPageViewByWeek() {
    return service({
        url: "/api/log/listPageViewByWeek",
        method: 'GET',
    })
}

/**
 * 查询一周的访问用户
 */
export function listUserViewByWeek() {
    return service({
        url: "/api/log/listUserViewByWeek",
        method: 'GET',
    })
}
