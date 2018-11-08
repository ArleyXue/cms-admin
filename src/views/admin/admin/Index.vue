<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="用户名" v-model="searchParams.userName" style="width: 200px;" class="filter-item"/>

            <el-button v-waves class="filter-item" style="margin-left: 5px;" type="primary" @click="searchData">
                <i class="arley-icon arley-icon-search"></i>搜索
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
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
                    <img v-if="scope.row.avatar" :src="scope.row.avatar" width="40" height="40" />
                </template>
            </el-table-column>
            <el-table-column prop="email" show-overflow-tooltip label="邮箱"  align="center"></el-table-column>
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
                    <el-button size="mini" type="primary" :disabled="scope.row.userName === 'admin'" @click="handleUpdate(scope.row)"><i class="arley-icon arley-icon-edit"></i>编辑</el-button>
                    <el-button size="mini" type="danger" :disabled="scope.row.userName === 'admin'" @click="handleDelete(scope.row.userId)"><i class="arley-icon arley-icon-del"></i>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="searchParams.page" :limit.sync="searchParams.limit" @pagination="listTableData" />


        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" top="40px">
            <el-form :model="itemForm" ref="itemForm"
                     :rules="rules" label-position="right" hide-required-asterisk
                     label-width="90px" style="width: 70%; margin-left:40px;">

                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="itemForm.userName" :disabled="!isCreate" placeholder="请输入用户名(4-16位字母或数字)"/>
                </el-form-item>

                <el-form-item label="重置密码" v-if="!isCreate">
                    <el-checkbox v-model="resetPassword" @change="changeResetPwd"/>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-if="pwdShow">
                    <el-input type="password" v-model="itemForm.password" placeholder="请输入密码(6-16位字符)"/>
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="itemForm.name" placeholder="请输入姓名"/>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                    <el-input v-model.number="itemForm.phone" placeholder="请输入手机号"/>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="itemForm.email" placeholder="请输入邮箱"/>
                </el-form-item>

                <el-form-item label="状态">
                    <el-radio-group v-model="itemForm.userState">
                        <el-radio :label.number="1">启用</el-radio>
                        <el-radio :label.number="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input v-model="itemForm.remark" placeholder="请输入备注"/>
                </el-form-item>

                <el-form-item label="头像">
                    <single-image :imageUrl.sync="itemForm.avatar"/>
                </el-form-item>

                <el-form-item label="角色">
                    <el-radio-group v-model="itemForm.roleId">
                        <el-radio :label.number="role.roleId" v-for="(role, index) in roleList">{{role.roleName}}</el-radio>
                    </el-radio-group>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeForm">取 消</el-button>
                <el-button type="primary" @click="isCreate ? createItem() : updateItem()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹

    import {listAdminByPage, checkIsExistUserName, listRole, addAdmin, deleteAdmin, getRoleBySysUserId, editAdmin} from '@/api/admin'
    import Pagination from "@/components/Pagination/Pagination" // 分页
    import SingleImage from "@/components/upload/SingleImage"

    export default {
        directives: {waves},
        data() {
            let validateUserName = (rule, value, callback) => {
                if (!this.isCreate) {
                    callback();
                    return;
                }
                if (value === '') {
                    callback(new Error('请输入用户名'));
                    return;
                }
                if(!new RegExp(/^[a-zA-Z0-9_-]{4,16}$/).test(value)){
                    callback(new Error('用户名不合格'));
                    return;
                }

                // 发起请求检查用户名是否存在
                checkIsExistUserName({userName: value}).then(response => {
                    let isExist = response.resultData.isExist;
                    if (isExist) {
                        callback(new Error("此用户名已存在"));
                    } else {
                        callback();
                    }
                });
            };
            let validatePhone = (rule, value, callback) => {
                if(value !== '' && value !== null && !new RegExp(/^1\d{10}$/).test(value)){
                    callback(new Error('请输入正确手机号'));
                    return;
                }
                callback();
            };
            return {
                loading: false,
                total: 0, // 分页总数量
                tableData: [],
                dialogTitle: '',
                searchParams: { // 搜索的参数
                    userName: "",
                    page: 1,  // 当前页
                    limit: 10, // 每页数量
                    sortField: "",
                    sortOrder: ""
                },
                dialogFormVisible: false,
                isCreate: true,
                resetPassword: false,
                pwdShow: true,
                itemForm: {
                    userName: '',
                    password: '',
                    name : '',
                    phone: '',
                    email: '',
                    userState: 1,
                    remark: '',
                    roleId: '',
                    avatar: ''
                },

                roleList: [],
                rules: {
                    userName: [
                        { validator: validateUserName, required: true, trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    phone: [
                        { validator: validatePhone, trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ]
                },
            };
        },

        created() {
            this.searchData()
        },

        methods: {
            listTableData() {  // 获取管理员列表数据
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

            handleCreate() { // 打开创建管理员窗口
                this.dialogTitle = "添加管理员";
                this.isCreate = true;
                this.pwdShow = true;
                this._listRole(); // 获取所有角色列表
                Object.assign(this.itemForm, this.$options.data().itemForm);   // 重置表单数据
                this.dialogFormVisible = true;      // 显示表单并清空校验信息
                this.$nextTick(() => {
                    this.$refs.itemForm.clearValidate();
                });
            },

            createItem() { // 添加管理员
                this.$refs.itemForm.validate((valid) => {
                    if (valid) {
                        addAdmin(this.itemForm).then(response => {
                            this.dialogFormVisible = false;
                            this.listTableData();
                            this.$message.success("添加成功");
                        })
                    }
                })
            },

            handleUpdate(row) { // 打开修改管理员窗口
                this.dialogTitle = "编辑管理员";
                this.isCreate = false;
                this.pwdShow = false;
                Object.assign(this.itemForm, row); // 重置表单
                // 清空密码
                this.itemForm.password = "";
                this._listRole(); // 获取所有角色列表
                this._getRoleBySysUserId(row.userId); // 获取用户拥有的角色

                this.dialogFormVisible = true;  // 显示表单并清空校验信息
                this.$nextTick(() => {
                    this.$refs.itemForm.clearValidate();
                });
            },

            updateItem() { // 修改管理员
                this.$refs.itemForm.validate((valid) => {
                    if (valid) {
                        if (this.resetPassword) {
                            this.itemForm.resetPassword = 1;
                        }
                        editAdmin(this.itemForm).then(response => {
                            this.dialogFormVisible = false;
                            this.listTableData();
                            this.$message.success("修改成功");
                        })
                    }
                })
            },

            closeForm() { // 关闭form表单
                this.dialogFormVisible = false;
            },

            handleDelete(userId) { // 删除管理员
                this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    deleteAdmin(userId).then(response => {
                        this.listTableData();
                        this.$message.success("删除成功");
                    })
                }).catch(() => {})
            },

            changeResetPwd() {
                this.pwdShow = this.resetPassword;
            },

            _listRole() { // 获取所有角色
                listRole().then(response => {
                    this.roleList = response.resultData;
                })
            },

            _getRoleBySysUserId(userId) {  // 获取用户拥有的角色
                getRoleBySysUserId(userId).then(response => {
                    this.itemForm.roleId = response.resultData.roleId;
                })
            }
        },

        components: {
            Pagination,
            SingleImage
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
