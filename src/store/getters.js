const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    permissionMenuList: state => state.user.permissionMenuList,
    permissionButtonList: state => state.user.permissionButtonList,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
};
export default getters
