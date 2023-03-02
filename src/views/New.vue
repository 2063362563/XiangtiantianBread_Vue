<template>
    <div class="body" style="margin-top: 0;">
        
        <div class="query">
            <el-input class="contant" placeholder="请输入商品名称或者ID" v-model="queryContent">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        </div>

        <el-card class="box-card" style="width: 70%; margin-left: 13%;">
            <div style="display: inline-block;">
                <img src="../assets/2094954683.jpeg" class="image" style="height: 158px;width: 150px;">
            </div>

            <div style="display: inline-block;">
                <el-card style="margin-left: 20px;width:680px">
                    <ul style="display: inline-block;">
                        <li>名称</li>
                        <li>单价</li>
                        <li>种类</li>
                        <li>描述</li>
                    </ul>
                    <div style="display: inline-block;margin-left: 20px;">
                        <p>提拉米苏</p>
                        <p>12.8</p>
                        <p>蛋糕</p>
                        <p>这个提拉米苏非常好吃!</p>
                    </div>
                </el-card>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date()
        };
    }
}
</script>

<style lang="less">

</style>

