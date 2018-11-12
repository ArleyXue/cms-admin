<template>
    <div class="icons-container">
        <h2>图标</h2>
        <div class="search-box">
            <el-input style="width: 300px" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>
        </div>

        <div class="icons-wrapper">
            <div v-for="item of filerIconList" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
                <el-tooltip placement="top">
                    <div slot="content">
                        {{ generateIconCode(item) }}
                    </div>
                    <div class="icon-item">
                        <i :class="item"></i>
                        <span>{{ item }}</span>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    /*import icons from './requireIcons'*/
    import clipboard from '@/utils/clipboard'
    import constants from '@/utils/constants'
    import axios from 'axios'
    import {listIcon} from '@/utils'

    export default {
        name: 'Icons',
        data() {
            return {
                keyword: '',
                iconList: []
            }
        },

        created() {
            this._getIconsData();
        },

        computed: {
            filerIconList() {
                return this.iconList.filter(icon => {
                    return icon.indexOf(this.keyword) > -1;
                })
            }
        },

        methods: {
            generateIconCode(symbol) {
                return symbol;
            },
            handleClipboard(text, event) {
                clipboard(text, event)
            },

            _getIconsData() {
                axios.get(constants.ICON_URL).then(response =>{
                    this.iconList = listIcon(response.data);
                }).catch(error => {

                });
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .icons-container
        margin: 10px 20px 0
        overflow: hidden
        .search-box
            text-align: center
            margin-top: 10px
        .icons-wrapper
            margin: 0 auto
            .icon-item
                margin: 20px
                height: 110px
                text-align: center
                width: 110px
                float: left
                font-size: 30px
                color: #24292e
                cursor: pointer
            i
                font-size: 33px;
                color: #606266;
            span
                display: block
                font-size: 14px
                margin-top: 10px
            .disabled
                pointer-events: none
</style>
