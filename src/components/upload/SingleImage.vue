<template>
    <el-upload
            class="avatar-uploader"
            action=""
            accept="image/*"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    import {uploadPic} from '@/api/upload'

    export default {
        props: {
            imageUrl: {
                type: String,
                default: ''
            }
        },

        computed: {
            imageSrc: {
                get() {
                    return this.imageUrl;
                },
                set(value) {
                    this.$emit("update:imageUrl", value);
                }
            }
        },

        methods: {
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                    return false;
                }
                // 上传图片
                uploadPic(file).then(response => {
                    this.imageSrc = response.resultData.picUrl
                });
                return false; // 永远不自动上传
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .avatar-uploader .el-upload
        border: 1px dashed #d9d9d9
        border-radius: 6px
        cursor: pointer
        position: relative
        overflow: hidden
    .avatar-uploader .el-upload:hover
        border-color: #409EFF
    .avatar-uploader-icon
        font-size: 28px
        color: #8c939d
        width: 178px
        height: 178px
        line-height: 178px
        text-align: center
    .avatar
        width: 178px
        height: 178px
        display: block

</style>
