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

            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="message(scope.row)">点击</el-button>
                </template>
            </el-table-column>
        </el-table>
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
                permissionTreeData: []
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
