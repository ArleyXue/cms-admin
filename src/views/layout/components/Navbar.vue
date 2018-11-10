<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

        <breadcrumb class="breadcrumb-container"/>

        <div class="right-menu">
            <template v-if="device!=='mobile'">

                <el-tooltip content="全屏" effect="dark" placement="bottom">
                    <screenfull class="screenfull right-menu-item"/>
                </el-tooltip>

            </template>

            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="userInfo.avatar" class="user-avatar">
                    <div class="user-name">
                        <span style="font-size: 17px;">{{userInfo.userName}}</span>
                    </div>
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu slot="dropdown" class="my-wrapper">
                    <router-link to="/">
                        <el-dropdown-item>
                        </el-dropdown-item>
                    </router-link>
                    <router-link to="/my/user-info">
                        <el-dropdown-item>
                            <i class="arley-icon arley-icon-personal"></i><span style="padding-left: 5px">个人资料</span>
                        </el-dropdown-item>
                    </router-link>
                    <router-link to="/my/rest-pwd">
                        <el-dropdown-item>
                            <i class="arley-icon arley-icon-update-password"></i><span style="padding-left: 5px">修改密码</span>
                        </el-dropdown-item>
                    </router-link>
                    <router-link to="/my/login-log">
                        <el-dropdown-item>
                            <i class="arley-icon arley-icon-log-login"></i><span style="padding-left: 5px">登录日志</span>
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="Logout">
                            <i class="arley-icon arley-icon-quit"></i><span style="padding-left: 5px">退出</span>
                        </span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import Screenfull from '@/components/Screenfull'

    export default {
        components: {
            Breadcrumb,
            Hamburger,
            Screenfull
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'userInfo',
                'device'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            Logout() {
                this.$store.dispatch('Logout').then(() => {
                    location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .navbar
        height: 50px
        line-height: 50px
        border-radius: 0px !important
        .hamburger-container
            line-height: 58px
            height: 50px
            float: left
            padding: 0 10px
        .breadcrumb-container
            float: left
        .errLog-container
            display: inline-block
            vertical-align: top
        .right-menu
            float: right
            height: 100%
            &:focus
                outline: none
            .right-menu-item
                display: inline-block
                margin: 0 8px
            .screenfull
                height: 20px
            .international
                vertical-align: top
            .theme-switch
                vertical-align: 15px
            .avatar-container
                height: 50px
                margin-right: 30px
                .avatar-wrapper
                    cursor: pointer
                    margin-top: 5px
                    position: relative
                    div
                        display: inline-block
                    .user-avatar
                        width: 40px
                        height: 40px
                        border-radius: 10px
                    .user-name
                        display: inline-block
                        padding-left: 10px
                        position: relative
                        top: -13px
                    .el-icon-caret-bottom
                        position: absolute
                        right: -20px
                        top: 25px
                        font-size: 12px
</style>
