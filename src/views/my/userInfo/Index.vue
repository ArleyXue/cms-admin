<template>
    <div class="components-container">
        <el-row :gutter="20">
            <el-col :span="5" :xs="24">
                    <crop-image :isShow.sync="showUpload" @updateImg="updateImg"></crop-image>
                    <pan-thumb width="250px" height="250px" :image="itemForm.avatar"/>

                    <el-button icon="el-icon-upload"  style="margin: 40px 50px"
                               @click="showUpload = true">上传头像
                    </el-button>
            </el-col>
            <el-col :span="16" :xs="24">
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
                        <el-form-item>
                            <el-button type="success" @click="updateUserInfo">确定修改</el-button>
                        </el-form-item>
                    </el-form>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import CropImage from "@/components/upload/CropImage"
    import PanThumb from '@/components/PanThumb'
    import {updateUserInfo} from '@/api/userInfo'
    import {_validatePhone} from '@/utils/validateMethod'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            let validatePhone = (rule, value, callback) => {
                _validatePhone(rule, value, callback)
            };
            return {
                showUpload: false,
                itemForm: {
                    userName: '',
                    name: '',
                    phone: '',
                    email: '',
                    avatar: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ]
                },
            }
        },

        created() {
            this.itemForm.userName = this.userInfo.userName;
            this.itemForm.name = this.userInfo.name;
            this.itemForm.phone = this.userInfo.phone;
            this.itemForm.email = this.userInfo.email;
            this.itemForm.avatar = this.userInfo.avatar;
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        methods: {
            updateImg(value) {
                this.itemForm.avatar = value;
            },

            updateUserInfo() {
                this.$refs.itemForm.validate((valid) => {
                    if (valid) {
                        updateUserInfo(this.itemForm).then(response => {
                            this.$message.success("修改成功");
                            // 更新vuex
                            this.$store.dispatch('GetUserInfo');
                        })
                    }
                })

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
