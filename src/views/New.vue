<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            form: {
                name: '',

            }
        }
    },
    methods: {
        onSubmit() {
            // console.log(this.form)
            // axios.post(this.HOST + "/employee/addEmployee", {
            //     name: this.form.name
            // }).then((response) => {
            //     console.log("返回结果" + response)
            // })

            // axios.post("/api/cotton/",
            //     {
            //         user_id: window.location['pathname'].replace('/', ''),
            //         cotton: this.cotton_text.replace(/<[^>]*>/g, ''),
            //         content: this.captcha,
            //         captcha: md5(this.img_src),
            //     }).then((res) => {
            //         if (res.data.code === 400) {
            //             this.wrong_captcha = true;
            //             this.captcha = "";
            //             this.captcha_src();
            //         } else {
            //             this.success_post = true;
            //             this.wrong_captcha = false;
            //             this.cotton_text = "";
            //             this.captcha = "";
            //             this.captcha_src();
            //         }
            //     }).catch(() => {
            //         this.$router.push("/")
            //     });


        }
    }
}
</script>

