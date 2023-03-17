<template>
    <div class="loginbody">
        <div class="logindata">
            <div class="logintext">
                <h2>登录</h2>
            </div>
            <div class="formdata">
                <el-form ref="form" :model="form">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="button">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button class="register" @click="register">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            form: {
                password: "",
                username: "",
            },
        };
    },
    created:
        function () { },
    methods: {
        login() {
            axios.post('/api/employee/login', {
                username: this.form.username,
                password: this.form.password,
            }).then((response) => {
                if (response.data.code == 200) {
                    this.$store.commit("login", response.data.data)
                    this.$router.push('/home')
                } else {
                    this.$message.error(response.data.message);
                }
            })
        },
        register() {
            this.$router.push('register');
        },
    },
};
</script>

<style scoped>
.loginbody {
    width: 100%;
    height: 100%;
    min-width: 1000px;
    background-color: rgb(229, 245, 240);
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    background-repeat: no-repeat;
    position: fixed;
    line-height: 100%;
    padding-top: 150px;
}

.logintext {
    margin-bottom: 20px;
    line-height: 50px;
    text-align: center;
    font-size: 26px;
    font-weight: bolder;
    color: rgb(18, 20, 20);
    text-shadow: 2px 2px 4px #857d7d;
}

.logindata {
    width: 400px;
    height: 300px;
    transform: translate(-50%);
    margin-left: 50%;
}



.button {
    margin-top: 10px;
    text-align: center;
}

.register {
    cursor: pointer;
}
</style>