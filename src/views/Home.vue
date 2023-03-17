<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="grid-content-bg-purple">
                <el-card class="box-card">
                    <div class="user">
                        <img :src="this.$store.state.userinfo.icon">
                        <div class="userinfo">
                            <p class="name">{{ this.$store.state.userinfo.name }}</p>
                            <p class="identity">{{ this.$store.state.userinfo.post | postFilter }}</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <el-divider></el-divider>
                        <div class="time">
                            <p>上次登录时间:<span> {{ this.$store.state.userinfo.lastLogintime }} </span></p>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" style="height:600px">
                    <div slot="header" class="clearfix">
                        <span class="little-title">今日销售统计</span>
                    </div>
                    <div>
                        <el-table :data="goodData" style="width: 100%;height: 460px;">
                            <el-table-column prop="goods" label="商品" width="160">
                            </el-table-column>
                            <el-table-column prop="number" label="数量">
                            </el-table-column>
                        </el-table>
                        <el-pagination @current-change="goodCurrentChange" :current-page.sync="currentGoodDataPage"
                            :page-size="5" layout="total, prev, pager, next" :total="goodTotal">
                        </el-pagination>
                    </div>
                </el-card>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content-bg-purple-light">

                <el-card class="box-card" style="height: 470px;">
                    <div slot="header" class="clearfix">
                        <span class="little-title">已售商品</span>
                    </div>
                    <div>
                        <el-table :data="orderData" stripe style="width: 100% ;height: 320px;">
                            <el-table-column prop="time" label="时间" width="230">
                            </el-table-column>
                            <el-table-column prop="orderId" label="订单号" width="100">
                            </el-table-column>
                            <el-table-column prop="username" label="用户" width="100">
                            </el-table-column>
                            <el-table-column prop="goods" label="商品" width="100">
                            </el-table-column>
                            <el-table-column prop="number" label="数量" width="100">
                            </el-table-column>
                            <el-table-column prop="price" label="单价" width="100">
                            </el-table-column>
                            <el-table-column prop="total" label="总额">
                            </el-table-column>
                        </el-table>


                        <el-pagination @current-change="orderCurrentChange" :current-page.sync="currentOrderDataPage"
                            :page-size="5" layout="total, prev, pager, next" :total="orderTotal">
                        </el-pagination>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div id="line-chart" style="width:1000px;height: 355px;">
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script >
import * as echarts from 'echarts';
import axios from 'axios';
export default {
    data() {
        return {


            //销售历史
            orderData: [],
            //今日销售统计，展示商品名字和今日售出的数量
            goodData: [],
            dates: [],
            series: [],
            currentOrderDataPage: 1,
            currentGoodDataPage: 1,
            orderTotal: -1,
            goodTotal: -1,
        }
    },
    filters: {
        postFilter: function (value) {
            if (value == 1) return '店长'
            if (value == 2) return '店员'
        }
    },
    created:
        function () {
            //历史总数
            axios.get("/api/orderGood/getShopHistoryTotal").then((response) => {
                this.orderTotal = response.data.data
            })
            //历史记录
            axios.get("/api/orderGood/getShopHistory/" + this.currentOrderDataPage).then((response) => {
                this.orderData = response.data.data
            })
            //今日总数
            axios.get("/api/good/getTodaySaleGoodTotal").then((response) => {
                this.goodTotal = response.data.data
            })
            //今日记录
            axios.get("/api/good/getTodaySaleGood/" + this.currentGoodDataPage).then((response) => {
                this.goodData = response.data.data
            })


        },
    methods: {
        //GoodHistory页码切换
        orderCurrentChange() {
            axios.get("/api/orderGood/getShopHistory/" + this.currentOrderDataPage).then((response) => {
                this.orderData = response.data.data
            })
        },
        //TodaySaleGood页码切换
        goodCurrentChange() {
            axios.get("/api/good/getTodaySaleGood/" + this.currentGoodDataPage).then((response) => {
                this.goodData = response.data.data
            })
        }
    },
    async mounted() {
        let dates = [];
        for (let i = 6; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            dates.push(`${month}月${day}日`);
        }
        await axios.get("/api/orders/getWeekIncome").then((response) => {
            this.series = response.data.data
        })
        var myChart = echarts.init(document.getElementById('line-chart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '七日营收折线图'
            },
            xAxis: {
                type: 'category',
                data: dates
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.series,
                    type: 'line'
                }
            ]
        });
    },
}
</script>
<style lang="less" scoped>
.el-row {
    background-color: antiquewhite;
}



.box-card {
    background-color: rgb(229, 245, 240);
    margin: 20px 10px;


    .user {
        display: flex;
        align-items: center;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }

        .userinfo {
            margin-left: 30px;

            .name {
                font-size: 32px;
                margin-bottom: 10px;
            }
        }

    }

    .login-info {
        .time {
            p {
                line-height: 28px;
                font-size: 16px;
                color: #999999;
                margin-left: 20px;

                span {
                    color: #666666;
                    margin-left: 50px;
                }
            }
        }
    }
}
</style>