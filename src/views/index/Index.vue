<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name:{{ userInfo.userName }}</div>
    <div class="dashboard-text">roles:<span v-for="(menu, index) in permissionMenuList" :key="index">{{ menu.menuName }}|</span></div>
        <el-input  style="width: 200px;" placeholder="请输入内容"></el-input>
        <el-input  style="width: 200px;" placeholder="请输入内容"></el-input>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'index',
        computed: {
            ...mapGetters(['userInfo', 'permissionMenuList', 'permissionButtonList'])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .dashboard
        &-container
            margin 30px
        &-text
            font-size 30px
            line-height 46px
</style>
