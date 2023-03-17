<template>
    <div class="header-container">
        <div class="left-content">
            <el-button @click="handleMenu" type="info" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: 'item.path' }">{{
                    item.label
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    user<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/my">个人信息</el-dropdown-item>
                    <el-dropdown-item command="/logout">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    data() {
        return {

        }
    },
    methods: {
        logout() {

            //发请求至后端，记录登出时间
            axios.post('/api/employee/logout/' + this.$store.state.userinfo.id).then(() => {
                //清空store里的登录信息
                this.$store.commit("logout")
                //弹提示消息
                this.$message({
                    message: '已退出登录！',
                    type: 'success'
                });
                //跳转至登录页面
                this.$router.push("/login")
                console.log(this.$store.state.userinfo);
            })
        },
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        handleCommand(command) {
            //判断下拉选项的内容是什么
            if (command == "/logout") {
                //退出登录方法
                this.logout()
            } else {
                //如果command不是login，就是my，暂时没有更多选项，直接去个人中心页
                if (this.$route.path != command)
                    this.$router.push(command)

            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tabsList
        })
    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    height: 62px;
    background-color: rgb(61, 58, 70);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        color: aliceblue;
        padding: 0 20px;

    }

    .left-content {
        display: flex;
        align-items: center;

        .el-breadcrumb {
            padding-left: 20px;

            ::v-deep .el-breadcrumb__item {
                .el-breadcrumb__inner {
                    color: #fff;
                }

                &:last-child {
                    .el-breadcrumb__inner {
                        color: rgb(177, 230, 243);
                    }
                }
            }
        }
    }
}





.el-dropdown-link {
    cursor: pointer;
    color: lavender;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>