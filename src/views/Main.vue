<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <Tag/>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>

import Tag from '../components/Tag.vue';
import  Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';

export default {
    data() {
        return {};
    },
    components: { 
        Tag,
        Aside,
        Header,
    }
}
</script>
<style scoped>
.el-header{
    padding: 0px;
}
</style>