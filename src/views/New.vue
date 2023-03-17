<template>
    <div class="body" style="margin-top: 0;">
        <div v-for="good in goodsData" :key="good.id">
            <el-card class="box-card" style="width: 70%; margin-left: 13%;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <img :src="product.image" class="image" style="height: 158px;width: 150px;">
                    </div>

                    <el-card style="margin-left: 20px;width:680px">
                        <ul style="display: inline-block;">
                            <li>名称</li>
                            <li>单价</li>
                            <li>种类</li>
                            <li>描述</li>
                        </ul>
                        <div style="display: inline-block;margin-left: 20px;">
                            <p>{{ product.name }}</p>
                            <p>{{ product.price }}</p>
                            <p>{{ product.category }}</p>
                            <p>{{ product.description }}</p>
                        </div>
                    </el-card>

                    <!-- 新增的按钮容器 -->
                    <div style="display:flex;align-items:center">
                        <!-- 按钮1 -->
                        <el-button type="primary">编辑</el-button>

                        <!-- 按钮2 -->
                        <el-button type="primary">删除</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsData: [],
            currentDate: new Date(),
            queryContent: '',
        };
    },
    methods: {
        query() {

        },
    },


}
</script>

<style lang="less"></style>

