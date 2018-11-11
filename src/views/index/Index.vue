<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="userIndexData.avatar" class="user-avatar" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{userIndexData.name}}</div>
                            <div>{{userIndexData.roleName}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">上次登录时间：<span>{{userIndexData.lastLoginTime}}</span></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getUserIndexData} from "@/api/userInfo"

    export default {
        data() {
            return {
                userIndexData: ''
            }
        },

        created() {
             this._getUserIndexData();
        },

        methods: {
            _getUserIndexData() {
                getUserIndexData().then(response => {
                    this.userIndexData = response.resultData;
                })
            }
        }


    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .dashboard
        &-container
            margin 30px
        &-text
            font-size 30px
            line-height 46px


    .user-info
        display: flex
        align-items: center
        padding-bottom: 20px
        border-bottom: 2px solid #ccc
        margin-bottom: 20px
        .user-avatar
            width: 120px
            height: 120px
            border-radius: 50%
        .user-info-cont
            padding-left: 50px
            flex: 1
            font-size: 14px
            color: #999
            div:first-child
                font-size: 30px
                color: #222
    .user-info-list
        font-size: 14px
        color: #999
        line-height: 25px
        span
            margin-left: 70px



</style>
