<template>
    <div class="registerbody">
        <div class="registerdata">
            <div class="registertext">
                <h2>注册</h2>
            </div>
            <div class="formdata">
                <el-form ref="form" :model="form">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" clearable placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" clearable placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item prop="passwordCheck">
                        <el-input v-model="form.passwordCheck" clearable placeholder="请重复密码" show-password></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="button">
                <el-button class="register" @click="register" type="primary">注册</el-button>
                <el-button @click="goBack">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
                passwordCheck: "",
            },
        };
    },
    methods: {
        register() {
            
        },
        goBack() {
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.registerbody {
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

.registertext {
    margin-bottom: 20px;
    line-height: 50px;
    text-align: center;
    font-size: 26px;
    font-weight: bolder;
    color: rgb(18, 20, 20);
    text-shadow: 2px 2px 4px #857d7d;
}

.registerdata {
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