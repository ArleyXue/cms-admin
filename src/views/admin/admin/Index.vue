<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="用户名" v-model="searchParams.userName" style="width: 200px;" class="filter-item"/>

            <el-button v-waves class="filter-item" style="margin-left: 5px;" type="primary" @click="searchData">
                <i class="arley-icon arley-icon-search"></i>搜索
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary">
                <i class="arley-icon arley-icon-add"></i>添加
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
            <el-table-column prop="userId" label="ID"  align="center" sortable="custom"></el-table-column>
            <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
            <el-table-column prop="name" label="姓名"  align="center"></el-table-column>
            <el-table-column prop="avatar" label="头像"  align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" width="40" height="40" />
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱"  align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="loginNum" label="登录次数" align="center"></el-table-column>
            <el-table-column prop="loginTime" label="上次登录时间" align="center" width="160"></el-table-column>
            <el-table-column prop="loginNum" label="登录次数" align="center"></el-table-column>
            <el-table-column prop="userState" label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.userState === 1 ?  'success' : 'danger'">{{scope.row.userState === 1 ? '启动' : '禁用'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="modifier" label="操作人" align="center"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="210">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"><i class="arley-icon arley-icon-edit"></i>编辑</el-button>
                    <el-button size="mini" type="danger"><i class="arley-icon arley-icon-del"></i>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="searchParams.page" :limit.sync="searchParams.limit" @pagination="listTableData" />


        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹

    import {listAdminByPage} from '@/api/admin'
    import Pagination from "@/components/Pagination/Pagination" // 分页

    export default {
        directives: {waves},
        data() {
            return {
                loading: false,
                total: 0, // 分页总数量
                tableData: [],
                searchParams: { // 搜索的参数
                    userName: "",
                    page: 1,  // 当前页
                    limit: 10, // 每页数量
                    sortField: "",
                    sortOrder: ""
                },
                dialogFormVisible: false

            }
        },

        created() {
            this.listTableData()
        },

        components: {
            Pagination
        },

        methods: {
            listTableData() {  // 获取数据
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
            }
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
