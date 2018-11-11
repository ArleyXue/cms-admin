<template>
    <div class="app-container">
        <el-row>
            <el-col :span="12">
                <el-form :model="itemForm" ref="itemForm"
                         :rules="rules" label-position="right" hide-required-asterisk
                         label-width="90px" style="width: 70%; margin-left:40px;">

                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input type="password" v-model="itemForm.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="itemForm.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkNewPassword">
                        <el-input type="password" v-model="itemForm.checkNewPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePwd">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import {updatePassword} from '@/api/userInfo'

    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                    return;
                }

                if (value.length < 6 || value.length > 16) {
                    callback(new Error('长度在 6 到 16 个字符'));
                } else {
                    if (this.rules.checkNewPassword !== '') {
                        this.$refs.itemForm.validateField('checkNewPassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.itemForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                itemForm: {
                    oldPassword: '',
                    newPassword: '',
                    checkNewPassword: '',
                },
                rules: {
                    oldPassword: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validatePass, required: true, trigger: 'blur' }
                    ],
                    checkNewPassword: [
                        { validator: validatePass2, required: true, trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            updatePwd() {
                this.$refs.itemForm.validate((valid) => {
                    if (valid) {
                        updatePassword(this.itemForm).then(response => {
                            this.$alert('修改成功, 请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    location.reload();
                                }
                            });

                        })
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
