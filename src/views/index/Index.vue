<template>
    <div style="background-color: #F0F0F0">
        <div class="dashboard-container">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20" style="height:252px">
                        <div class="user-info">
                            <img :src="userIndexData.avatar" class="user-avatar" alt="">
                            <div class="user-info-cont">
                                <div class="user-info-name">{{userIndexData.name}}</div>
                                <div>{{userIndexData.roleName}}</div>
                            </div>
                        </div>
                        <div class="user-info-list">上次登录时间：<span>{{userIndexData.lastLoginTime}}</span></div>
                        <div class="user-info-list">上次登录地点：<span>{{userIndexData.lastLoginLocation}}</span></div>
                    </el-card>
                </el-col>
                <el-col :span="10">
                    <el-card shadow="hover" class="mgb20" style="height:252px">
                        <ve-liquidfill :data="liquidfillChartData" :settings="liquidfillSettings"></ve-liquidfill>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" class="mgb20" style="height:252px">
                        <div slot="header" class="clearfix">
                            <span>消息信息</span>
                        </div>
                        <div v-for="(log, index) in loginLogList" :key="index" >
                            <el-col :span="5">
                                <div class="text-item">{{log.userName}}</div>
                            </el-col>
                            <el-col :span="19">
                                <div class="text-item">{{log.content}}</div>
                            </el-col>

                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card shadow="hover" class="mgb20">
                        <ve-histogram :data="histogramChartData" :extend="extend"></ve-histogram>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" class="mgb20">
                        <ve-pie :data="pieChartData" :settings="pieSettings"></ve-pie>
                    </el-card>
                </el-col>
            </el-row>
        </div>


        <web-socket :userName="userInfo.userName" @receiveMassage="receiveMassage"></web-socket>
    </div>
</template>

<script>
    import {listPageViewByWeek, listUserViewByWeek, listLoginLogBySize, listMemoryData, getUserIndexData} from "@/api/index"
    import VeHistogram from 'v-charts/lib/histogram.common'
    import VePie from 'v-charts/lib/pie.common'
    import VeLiquidfill from 'v-charts/lib/liquidfill.common'
    import WebSocket from '@/components/WebSocket/Index'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            this.extend = {
                series: {
                    label: { show: true, position: "top" },
                    itemStyle:{
                        color: '#77c3f4'
                    }
                }
            };
            this.pieSettings = {
                roseType: 'radius'
            };
            this.liquidfillSettings = {
                seriesMap: {
                    '使用内存': {
                        radius: '180px',
                        center:['50%', '27%'],
                    }


                }
            };
            return {
                userIndexData: '',
                loginLogList: [],
                histogramChartData: {
                    columns: ['日期', '访问数量'],
                    rows: []
                },
                pieChartData: {
                    columns: ['用户', '访问数量'],
                    rows: []
                },
                liquidfillChartData: {
                    columns: ['memory', 'percent'],
                    rows: [{
                        memory: '使用内存',
                        percent: ''
                    }]
                }
            }
        },

        created() {
             this._getUserIndexData();
             this._listPageViewByWeek();
             this._listUserViewByWeek();
             this._listLoginLogBySize();
             this._listMemoryData();
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        methods: {

            receiveMassage(message) { // 收到webSocket的消息
                if (1 === message.type) {
                    this.loginLogList.unshift(message.message);
                    this.loginLogList.pop();
                }
            },

            _getUserIndexData() { // 获取用户首页信息
                getUserIndexData().then(response => {
                    this.userIndexData = response.resultData;
                })
            },

            _listPageViewByWeek() { // 获取一周的访问量
                listPageViewByWeek().then(response =>{
                    this.histogramChartData.rows = response.resultData;
                })
            },

            _listUserViewByWeek() { // 获取一周的访问用户
                listUserViewByWeek().then(response =>{
                    this.pieChartData.rows = response.resultData;
                })
            },

            _listLoginLogBySize() { // 获取指定长度的日志列表
                listLoginLogBySize(7).then(response =>{
                    this.loginLogList = response.resultData;
                })
            },

            _listMemoryData() { // 获取内存使用诗句
                listMemoryData().then(response =>{
                    let data = response.resultData;
                    this.liquidfillChartData.rows[0].percent = data.useMemoryPercent;
                })
            },


        },

        components: {
            VeHistogram,
            VePie,
            VeLiquidfill,
            WebSocket
        }


    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .dashboard
        &-container
            padding: 10px
        &-text
            font-size: 30px
            line-height: 46px
    .mgb20
        margin-bottom: 20px;

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
    .text-item {
        font-size: 14px;
        margin-bottom: 8px;
    }



</style>
