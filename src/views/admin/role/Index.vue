<template>
    <div class="app-container">
        <div class="filter-container">

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
            <el-table-column prop="roleId" label="ID"  align="center" sortable="custom"></el-table-column>
            <el-table-column prop="roleName" label="用户名"  align="center"></el-table-column>
            <el-table-column prop="remark" show-overflow-tooltip label="备注"  align="center"></el-table-column>
            <el-table-column prop="roleState" label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.roleState === 1 ?  'success' : 'danger'">{{scope.row.roleState === 1 ? '启动' : '禁用'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="modifier" label="操作人" align="center"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="210">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleUpdate(scope.row)"><i class="arley-icon arley-icon-edit"></i>编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.roleId)"><i class="arley-icon arley-icon-del"></i>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="searchParams.page" :limit.sync="searchParams.limit" @pagination="listTableData" />


        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="itemForm" ref="itemForm"
                     :rules="rules" label-position="right" hide-required-asterisk
                     label-width="90px" style="width: 70%; margin-left:40px;">

                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="itemForm.roleName" placeholder="请输入角色名称"/>
                </el-form-item>
                <el-form-item label="角色备注" prop="remark">
                    <el-input v-model="itemForm.remark" placeholder="请输入备注"/>
                </el-form-item>
                <el-form-item label="角色状态">
                    <el-radio-group v-model="itemForm.roleState">
                        <el-radio :label.number="1">启用</el-radio>
                        <el-radio :label.number="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="拥有权限">
                    <el-tree
                            :data="permissionTreeData"
                            ref="permissionTree"
                            show-checkbox
                            check-strictly
                            node-key="id"
                            default-expand-all
                            :default-checked-keys="[]"
                            :props="defaultProps">
                    </el-tree>
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

    import {listRoleByPage, listTreePermission, addRole, listPermissionByRoleId, editRole, deleteRole} from '@/api/admin'
    import Pagination from "@/components/Pagination/Pagination" // 分页

    export default {
        data() {
            return {
                loading: false,
                total: 0, // 分页总数量
                tableData: [],
                dialogTitle: '',
                dialogFormVisible: false,
                isCreate: true,
                searchParams: { // 搜索的参数
                    page: 1,  // 当前页
                    limit: 10, // 每页数量
                    sortField: "",
                    sortOrder: ""
                },
                itemForm: {
                    roleName: '',
                    roleState: 1,
                    remark: '',
                },
                permissionTreeData: [],
                defaultProps: {
                    children: 'children',
                    disabled: 'disabled',
                    label: 'label'
                },
                rules: {
                    roleName: [
                        {  required: true, message: '请输入角色名称', trigger: 'blur'}
                    ]
                },
            }
        },

        created() {
            this.searchData()
        },

        computed: {
            userName() {
                return this.$store.getters.userName;
            }
        },

        methods: {
            listTableData() {  // 获取角色列表数据
                this.loading = true;
                listRoleByPage(this.searchParams).then(response => {
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
                this.dialogTitle = "添加角色";
                this.isCreate = true;
                this._listTreePermission(); // 获取树形菜单
                Object.assign(this.itemForm, this.$options.data().itemForm);   // 重置表单数据
                this.dialogFormVisible = true;      // 显示表单并清空校验信息
                this.$nextTick(() => {
                    this.$refs.itemForm.clearValidate();
                });
            },

            createItem() { // 添加角色
                this.$refs.itemForm.validate((valid) => {
                    if (valid) {
                        this.itemForm.permissionIds = this.$refs.permissionTree.getCheckedKeys().join();
                        addRole(this.itemForm).then(response => {
                            this.dialogFormVisible = false;
                            this.listTableData();
                            this.$message.success("添加成功");
                        })
                    }
                })
            },

            handleUpdate(row) { // 打开修改角色窗口
                this.dialogTitle = "编辑角色";
                this.isCreate = false;
                Object.assign(this.itemForm, row); // 重置表单

                this._listTreePermission(); // 获取树形菜单
                this._listPermissionByRoleId(row.roleId); // 获取角色拥有的菜单

                this.dialogFormVisible = true;  // 显示表单并清空校验信息
                this.$nextTick(() => {
                    this.$refs.itemForm.clearValidate();
                });
            },

            updateItem() { // 修改角色
                this.$refs.itemForm.validate((valid) => {
                    if (valid) {
                        this.itemForm.permissionIds = this.$refs.permissionTree.getCheckedKeys().join();
                        editRole(this.itemForm).then(response => {
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

            handleDelete(roleId) { // 删除角色
                this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    deleteRole(roleId).then(response => {
                        this.listTableData();
                        this.$message.success("删除成功");
                    })
                }).catch(() => {})
            },

            _listTreePermission() { // 获取菜单树形结构
                listTreePermission().then(response => {
                    this.permissionTreeData = response.resultData;
                })
            },

            _listPermissionByRoleId(roleId) { // 获取角色拥有的菜单
                listPermissionByRoleId(roleId).then(response => {
                    let permissionList = response.resultData;
                    let permissionIds = [];
                    permissionList.forEach(v => {
                        permissionIds.push(v.permissionId);
                    });
                    this.$nextTick(() => {
                        this.$refs.permissionTree.setCheckedKeys(permissionIds);
                    })
                })
            }
        },

        components: {
            Pagination
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
