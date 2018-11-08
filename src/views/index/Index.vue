<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name:{{ userName }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
        <el-input  style="width: 200px;" placeholder="请输入内容"></el-input>
        <el-input  style="width: 200px;" placeholder="请输入内容"></el-input>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'index',
        computed: {
            ...mapGetters(['userName', 'roles'])
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
