<template>
    <div>
        <my-upload field="file"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="showUpload"
                   :width="300"
                   :height="300"
                   :headers="headers"
                   :url="uploadUrl"
                   img-format="jpg">
        </my-upload>

    </div>
</template>
    <script>

        import 'babel-polyfill'; // es6 shim
        import myUpload from 'vue-image-crop-upload';
        import constants from '@/utils/constants'
        import {getToken} from '@/utils/auth'

        export default {
            props: {
                isShow: {
                    type: Boolean,
                    default: false
                }
            },

            data() {
                return {
                    headers: {
                        token: getToken()
                    },
                    showUpload: false,
                    uploadUrl: constants.BASE_URL + "/api/upload/uploadPic"
                }
            },


            watch: {
                isShow() {
                    this.showUpload = this.isShow;
                },
                showUpload() {
                    this.$emit("update:isShow", this.showUpload)
                }
            },

            methods: {
                /**
                 * crop success
                 * [param] imgDataUrl
                 * [param] field
                 */
                cropSuccess(imgDataUrl, field){

                },

                cropUploadSuccess(jsonData, field){
                    if (jsonData.resultCode === "0000") {
                        this.$emit("updateImg", jsonData.resultData.picUrl);
                        this.$message.success("上传成功");
                    } else {
                        this.$message.success("上传失败");
                    }

                },

                cropUploadFail(status, field){
                    console.log(status);
                    this.$message.success("上传失败");
                }
            },

            components: {
                'my-upload': myUpload
            }
        }
    </script>



<style lang="stylus" rel="stylesheet/stylus">

</style>
