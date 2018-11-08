import service from "../utils/request";

// -----------管理员-----------

/**
 * 分页获取管理员列表
 * @param params
 */
export function listAdminByPage(params) {
    return service({
        url: "/api/admin/listAdminByPage",
        method: 'POST',
        data: params
    })
}

/**
 * 检查用户名是否存在
 * @param params
 */
export function checkIsExistUserName(params) {
    return service({
        url: "/api/admin/checkIsExistUserName",
        method: 'POST',
        data: params
    })
}

/**
 * 添加管理员
 * @param params
 */
export function addAdmin(params) {
    return service({
        url: "/api/admin/addAdmin",
        method: 'POST',
        data: params
    })
}

/**
 * 修改管理员
 * @param params
 */
export function editAdmin(params) {
    return service({
        url: "/api/admin/editAdmin",
        method: 'POST',
        data: params
    })
}

/**
 * 删除管理员
 * @param params
 */
export function deleteAdmin(userId) {
    return service({
        url: "/api/admin/deleteAdmin",
        method: 'POST',
        data: {userId: userId}
    })
}



// -----------角色-----------


/**
 * 分页获取角色列表
 * @param searchParams
 */
export function listRoleByPage(searchParams) {
    return service({
        url: "/api/role/listRoleByPage",
        method: 'POST',
        data: searchParams
    })
}

/**
 * 获取所有角色列表
 */
export function listRole() {
    return service({
        url: "/api/role/listRole",
        method: 'GET',
    })
}

/**
 * 获取管理员拥有的角色
 */
export function getRoleBySysUserId(userId) {
    return service({
        url: "/api/role/getRoleBySysUserId",
        method: 'POST',
        data: {userId: userId}
    })
}

/**
 * 添加角色
 * @param params
 */
export function addRole(params) {
    return service({
        url: "/api/role/addRole",
        method: 'POST',
        data: params
    })
}

/**
 * 修改角色
 * @param params
 */
export function editRole(params) {
    return service({
        url: "/api/role/editRole",
        method: 'POST',
        data: params
    })
}

/**
 * 修改角色
 * @param roleId
 */
export function deleteRole(roleId) {
    return service({
        url: "/api/role/deleteRole",
        method: 'POST',
        data: {roleId: roleId}
    })
}


// -----------菜单-----------

/**
 * 获取菜单层级
 */
export function listHaveHierarchyPermission() {
    return service({
        url: "/api/permission/listHaveHierarchyPermission",
        method: 'POST',
    })
}

/**
 * 获取菜单树形数据
 */
export function listTreePermission() {
    return service({
        url: "/api/permission/listTreePermission",
        method: 'POST',
    })
}

/**
 * 获取角色拥有的菜单列表
 * @param params
 */
export function listPermissionByRoleId(roleId) {
    return service({
        url: "/api/permission/listPermissionByRoleId",
        method: 'POST',
        data: {roleId: roleId}
    })
}


/**
 * 添加菜单
 * @param params
 */
export function addPermission(params) {
    return service({
        url: "/api/permission/addPermission",
        method: 'POST',
        data: params
    })
}

/**
 * 修改菜单
 * @param params
 */
export function editPermission(params) {
    return service({
        url: "/api/permission/editPermission",
        method: 'POST',
        data: params
    })
}
