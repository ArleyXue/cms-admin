<template>
    <div class="pagination-container ">
        <el-pagination
                :background="background"
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                :page-sizes="pageSizes"
                :layout="layout"
                :total="total"
                v-bind="$attrs"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>

<script>
    import { scrollTo } from '@/utils/scrollTo'

    export default {
        props: {
            total: {
                required: true,
                type: Number
            },
            page: {
                type: Number,
                default: 1
            },
            limit: {
                type: Number,
                default: 10
            },
            autoScroll: {
                type: Boolean,
                default: true
            },
            background: {
                type: Boolean,
                default: true
            },
            pageSizes: {
                type: Array,
                default() {
                    return [10, 20, 30, 50]
                }
            },
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
        },

        computed: {
            currentPage: {
                get() {
                    return this.page
                },
                set(val) {
                    this.$emit('update:page', val)
                }
            },
            pageSize: {
                get() {
                    return this.limit
                },
                set(val) {
                    this.$emit('update:limit', val)
                }
            }
        },

        methods: {
            handleSizeChange(val) {
               this.pageSize = val;
                this.$emit('pagination', { page: this.currentPage, limit: val });
                if (this.autoScroll) {
                    scrollTo(0, 800)
                }
            },
            handleCurrentChange(val) {
                this.$emit('pagination', { page: val, limit: this.pageSize });
                if (this.autoScroll) {
                    scrollTo(0, 800)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .pagination-container
        background: #fff
        padding: 5px 16px
</style>
