<template>
    <div class="app-container">
        <div class="filter-container">

            <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
                <i class="arley-icon arley-icon-add"></i>添加菜单
            </el-button>

        </div>

        <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" border v-loading="loading">

            <el-table-column align="center" label="主键ID" prop="permissionId"></el-table-column>

            <el-table-column label="菜单名称">
                <template slot-scope="scope">
                    <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
                    <span v-if="iconShow(scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                        <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                        <i v-else class="el-icon-minus"></i>
                    </span>
                    {{ scope.row.menuName }}
                </template>
            </el-table-column>

            <el-table-column align="center" label="菜单链接" show-overflow-tooltip prop="menuUrl"></el-table-column>
            <el-table-column align="center" label="菜单标识" prop="menuCode">
                <template slot-scope="scope">
                    <i :class="scope.row.menuIcon"></i>
                </template>
            </el-table-column>
            <el-table-column align="center" label="菜单图标" prop="menuIcon"></el-table-column>
            <el-table-column align="center" label="菜单类型" >
                <template slot-scope="scope">
                    <el-tag :type="scope.row.menuType === 1 ? '' : 'warning'">{{scope.row.menuType === 1 ? '菜单' : '按钮'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="排序" prop="menuPriority"></el-table-column>

            <el-table-column align="center" label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleUpdate(scope.row.permissionId)"><i class="arley-icon arley-icon-add"></i>添加子菜单</el-button>
                    <el-button size="mini" type="primary" @click="handleUpdate(scope.row)"><i class="arley-icon arley-icon-edit"></i>编辑</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" top="40px">
            <el-form :model="itemForm" ref="itemForm"
                     :rules="rules" label-position="right" hide-required-asterisk
                     label-width="90px" style="width: 70%; margin-left:40px;">

                <el-form-item label="父菜单名称" prop="parentMenuName">
                    <el-input v-model="itemForm.parentMenuName" disabled placeholder="请输入父菜单名称"/>
                </el-form-item>

                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="itemForm.menuName" placeholder="请输入菜单名称"/>
                </el-form-item>

                <el-form-item label="菜单标识" prop="menuCode">
                    <el-input v-model="itemForm.menuCode" placeholder="请输入菜单标识"/>
                </el-form-item>

                <el-form-item label="菜单排序" prop="menuPriority">
                    <el-input v-model.number="itemForm.menuPriority" placeholder="请输入菜单排序"/>
                </el-form-item>

                <el-form-item label="菜单类型">
                    <el-radio-group v-model="itemForm.menuType">
                        <el-radio :label.number="1">菜单</el-radio>
                        <el-radio :label.number="2">按钮</el-radio>
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
    /**
     Auth: Lei.j1ang
     Created: 2018/1/19-14:54
     */
    import treeToArray from './eval'
    import {listHaveHierarchyPermission} from '@/api/admin'

    export default {
        name: 'TreeTableDemo',

        data() {
            return {
                expandAll: true,
                loading: false,
                dialogTitle: '',
                dialogFormVisible: false,
                isCreate: true,
                permissionTreeData: [],
                itemForm: {
                    parentMenuName: '',
                    menuName: '',
                    menuCode: '',
                    menuType: 1,
                    remark: '',
                },
                rules: {
                    menuName: [
                        {  required: true, message: '请输入菜单名称', trigger: 'blur'}
                    ],
                    menuCode: [
                        {  required: true, message: '请输入菜单标识', trigger: 'blur'}
                    ],
                    menuPriority: [
                        {  required: true, message: '请输入菜单排序', trigger: 'blur'},
                        {  type: 'number', message: '必须为数字值', trigger: 'blur'},
                    ]
                },
            }
        },

        created() {
            this._listHaveHierarchyPermission()
        },

        computed: {
            // 格式化数据源
            formatData: function () {
                let tmp;
                if (!Array.isArray(this.permissionTreeData)) {
                    tmp = [this.permissionTreeData]
                } else {
                    tmp = this.permissionTreeData
                }
                const func = this.evalFunc || treeToArray;
                const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll];
                return func.apply(null, args)
            }
        },

        methods: {
            handleCreate() { // 打开创建管理员窗口
                this.dialogTitle = "添加菜单";
                this.isCreate = true;
                Object.assign(this.itemForm, this.$options.data().itemForm);   // 重置表单数据
                this.dialogFormVisible = true;      // 显示表单并清空校验信息
                this.$nextTick(() => {
                    this.$refs.itemForm.clearValidate();
                });
            },

            createItem() { // 添加管理员
                this.$refs.itemForm.validate((valid) => {
                    if (valid) {
                        console.log(this.itemForm)
                    }
                })
            },

            closeForm() { // 关闭form表单
                this.dialogFormVisible = false;
            },

            showRow (row) {
                const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true);
                row.row._show = show;
                return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
            },
            // 切换下级是否展开
            toggleExpanded(trIndex) {
                const record = this.formatData[trIndex];
                record._expanded = !record._expanded
            },
            // 图标显示
            iconShow(record) {
                return (record.permissionList && record.permissionList.length > 0)
            },
            message(row) {
                this.$message.info(row.event)
            },

            _listHaveHierarchyPermission() {
                this.loading = true;
                listHaveHierarchyPermission().then(response => {
                    this.permissionTreeData = response.resultData;
                    this.loading = false;
                })
            }
        }
    }
</script>
<style rel="stylesheet/css">
    @keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @-webkit-keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $color-blue = #2196f3
    $space-width = 18px
    .ms-tree-space
        position: relative
        top: 1px
        display: inline-block
        font-style: normal
        font-weight: 400
        line-height: 1
        width: $space-width
        height: 14px
        &::before
            content: ""
    .processContainer
        width: 100%
        height: 100%
    table td
        line-height: 26px
    .tree-ctrl
        position: relative
        cursor: pointer
        color: $color-blue
        margin-left: -1*$space-width
</style>
