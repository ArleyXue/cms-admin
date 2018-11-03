<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="$t('table.title')" v-model="userName" style="width: 200px;" class="filter-item"/>
            <el-select  style="width: 140px" class="filter-item" @change="handleFilter">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
            </el-select>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
                搜索
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
                添加
            </el-button>

        </div>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹
    export default {
        directives: {waves},
        data() {
            return {
                userName: "",
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
