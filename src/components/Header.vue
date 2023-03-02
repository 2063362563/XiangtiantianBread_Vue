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
                    <el-dropdown-item command="/login">登出</el-dropdown-item>
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
            this.$router.push("/login")
        },
        handleMenu() {
            this.$store.commit('collapseMenu')

        },
        handleCommand(command) {
            console.log(this.$store.state.userinfo);
            if (command == "/login") {
                axios.post('/api/employee/logout')
                this.$store.commit('logout')
            }
            this.$router.push(command)
            console.log(this.$store.state.userinfo);
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