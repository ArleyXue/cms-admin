import {postRes, getRes} from "../utils/request";

/**
 * 分页获取管理员列表
 * @param searchParams
 */
export function listAdminByPage(searchParams) {
    return postRes("/api/admin/listAdminByPage", searchParams);
}
