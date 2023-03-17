<template>
    <div>


        <div class="updatePassword">
            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"> 修改密码 </el-button>
        </div>
        <div class="container ">
            <img class="icon" :src="this.$store.state.userinfo.icon">
            <div class="text1">
                <p class="name1">{{ this.$store.state.userinfo.name }}</p>
                <p class="identity1">{{ this.$store.state.userinfo.post | postFilter }}</p>
            </div>

        </div>
        <div>
            <el-descriptions class="margin-top" :column="1" border>
                <template slot="extra">
                    <el-button type="primary" size="large">编辑</el-button>
                </template>

                <el-descriptions-item>
                    <template slot="label">
                        账号
                    </template>
                    {{ this.$store.state.userinfo.account }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template slot="label">
                        年龄
                    </template>
                    {{ this.$store.state.userinfo.age }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template slot="label">
                        性别
                    </template>
                    {{ this.$store.state.userinfo.sex }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template slot="label">
                        入职日期
                    </template>
                    {{ this.$store.state.userinfo.entryDate }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template slot="label">
                        手机号
                    </template>
                    {{ this.$store.state.userinfo.tel }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template slot="label">
                        出生日期
                    </template>
                    {{ this.$store.state.userinfo.birth }}
                </el-descriptions-item>
            </el-descriptions>

        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmNewPassword">
                    <el-input type="password" v-model="form.confirmNewPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePassword">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        var validatePass0 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入旧密码'));
            } else {
                if (this.form.oldPassword !== this.$store.state.userinfo.password) {
                    callback(new Error('密码错误'));
                }
                callback();
            }
        };
        var validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else {
                if (this.form.newPassword !== '') {
                    this.$refs.form.validateField('confirmNewPassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            dialogFormVisible: false,

            form: {
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            formLabelWidth: '120px',
            rules: {
                oldPassword: [
                    { validator: validatePass0, trigger: 'blur' }
                ],
                newPassword: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                confirmNewPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    filters: {
        postFilter: function (value) {
            if (value == 1) return '店长'
            if (value == 2) return '店员'
        }
    },
    methods: {
        updatePassword() {
            this.dialogFormVisible = false;
            console.log(this.$store.state.userinfo.id);
            console.log(this.form.newPassword);
            axios.put("/api/employee/updateEmployee", {
                id: this.$store.state.userinfo.id,
                password: this.form.newPassword,
            }).then((response) => {
                console.log(this.$store.state.userinfo.id);
                console.log(response.data);
            });

        },
    }
}
</script>

<style lang="less">
.container {
    display: flex;
    align-items: center;
}

.icon {
    width: 150px;
    height: 150px;
    border-radius: 25px;
    margin-right: 10px;
}

.name1 {
    font-size: 36px;
    font-weight: bold;
}

.identity1 {
    font-size: 36px;
    color: #999999;
}
</style>