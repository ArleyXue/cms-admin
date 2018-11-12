import service from "../utils/request";

// -----------日志---------------

/**
 * 分页获取登录日志列表
 * @param params
 */
export function listAdminByPage(params) {
    return service({
        url: "/api/log/listLoginLogByPage",
        method: 'POST',
        data: params
    })
}

