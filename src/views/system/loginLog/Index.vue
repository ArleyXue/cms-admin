<template>
    <div class="app-container">
        <div class="filter-container" v-if="searchParams.type">
            <el-input placeholder="用户名" v-model="searchParams.userName" style="width: 200px;" class="filter-item"/>

            <el-button v-waves class="filter-item" style="margin-left: 5px;" type="primary" @click="searchData">
                <i class="arley-icon arley-icon-search"></i>搜索
            </el-button>
        </div>

        <el-table
                :data="tableData"
                v-loading="loading"
                border
                fit
                highlight-current-row
                style="width: 100%"
                @sort-change="sortChange">
            <el-table-column prop="id" label="ID"  align="center" sortable="custom"></el-table-column>
            <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
            <el-table-column prop="loginIp" label="登录ID"  align="center"></el-table-column>
            <el-table-column prop="loginTime" label="登录时间"  align="center"></el-table-column>
            <el-table-column prop="content" label="内容"  align="center"></el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="searchParams.page" :limit.sync="searchParams.limit" @pagination="listTableData" />
    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹
    import {listAdminByPage } from '@/api/system'
    import Pagination from "@/components/Pagination/Pagination" // 分页

    export default {
        directives: {waves},

        data() {
            return {
                loading: false,
                total: 0, // 分页总数量
                tableData: [],
                searchParams: { // 搜索的参数
                    userName: '',
                    type: '',
                    page: 1,  // 当前页
                    limit: 10, // 每页数量
                    sortField: "",
                    sortOrder: ""
                },
            }
        },

        created() {
            if (this.$route.path === '/log/login-log') {
                this.searchParams.type = 1;
            }
            this.searchData()
        },

        methods: {
            listTableData() {  // 获取日志列表数据
                this.loading = true;
                listAdminByPage(this.searchParams).then(response => {
                    this.tableData = response.resultData.data;
                    this.total = response.resultData.total;
                    this.loading = false;   // 取消loading
                })
            },

            searchData() { // 搜索
                this.searchParams.page = 1;
                this.listTableData();
            },

            sortChange(data) { // 排序
                const { prop, order } = data;
                this.searchParams.sortField = prop;
                this.searchParams.sortOrder = order;
                this.searchData();
            },
        },

        components: {
            Pagination
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
