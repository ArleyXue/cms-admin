<template>
    <div class="components-container">

            <pan-thumb :image="imageUrl"/>

            <crop-image v-if="showUpload" @updateImg="updateImg"></crop-image>

        <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="showUpload = true">上传头像
        </el-button>


        <el-form :model="itemForm" ref="itemForm"
                 :rules="rules" label-position="right" hide-required-asterisk
                 label-width="90px" style="width: 75%; margin-left:40px;">

            <el-form-item label="用户名" prop="userName">
                <el-input v-model="itemForm.userName" disabled placeholder="请输入用户名(4-16位字母或数字)"/>
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

        </el-form>

    </div>
</template>

<script>
    import CropImage from "@/components/upload/CropImage"
    import PanThumb from '@/components/PanThumb'
    import {_validatePhone} from '@/utils/validateMethod'
    export default {
        data() {
            let validatePhone = (rule, value, callback) => {
                _validatePhone(rule, value, callback)
            };
            return {

                showUpload: false,
                imageUrl: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
                itemForm: {
                    name : '',
                    phone: '',
                    email: '',
                    avatar: ''
                },
                rules: {
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
            }
        },

        methods: {

            updateImg(value) {
                this.imageUrl = value;
            },
        },

        components: {
            CropImage,
            PanThumb
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
