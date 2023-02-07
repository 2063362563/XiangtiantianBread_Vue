<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="grid-content-bg-purple">
                <el-card class="box-card">
                    <div class="user">
                        <img src="../assets/image/usericon/2147538700.jpeg">
                        <div class="userinfo">
                            <p class="name">username</p>
                            <p class="identity">identity</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <el-divider></el-divider>
                        <div class="time">
                            <p>上次登录时间:<span> 具体时间 </span></p>
                        </div>
                    </div>

                </el-card>
                <el-card class="box-card" style="height:600px">
                    <div slot="header" class="clearfix">
                        <span class="little-title">今日销售统计</span>
                    </div>
                    <div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="goods" label="商品" width="160">
                            </el-table-column>
                            <el-table-column prop="number" label="数量">
                            </el-table-column>
                        </el-table>
                        <el-pagination small calss="pagination" layout="prev, pager, next" :total="50"
                            style="text-align: center;margin-top: 12px;"></el-pagination>
                    </div>
                </el-card>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content-bg-purple-light">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="little-title">已售商品</span>
                    </div>
                    <div>
                        <el-table :data="order" stripe style="width: 100%">
                            <el-table-column prop="time" label="时间" width="160">
                            </el-table-column>
                            <el-table-column prop="username" label="用户" width="160">
                            </el-table-column>
                            <el-table-column prop="goods" label="商品" width="160">
                            </el-table-column>
                            <el-table-column prop="number" label="数量" width="160">
                            </el-table-column>
                            <el-table-column prop="price" label="单价" width="160">
                            </el-table-column>
                            <el-table-column prop="total" label="总额">
                            </el-table-column>
                        </el-table>
                        <el-pagination small calss="pagination" layout="prev, pager, next" :total="50"
                            style="text-align: center;margin-top: 12px;"></el-pagination>
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

// import { getData } from '@/api';
import * as echarts from 'echarts';

export default {
    data() {
        return {
            tableData: [{
                goods: '巧克力甜甜圈',
                number: 34
            }, {
                goods: '牛角包',
                number: 12
            }, {
                goods: '肉松面包',
                number: 42
            }, {
                goods: '提拉米苏',
                number: 37
            },{
                goods: '提拉米苏',
                number: 37
            },{
                goods: '提拉米苏',
                number: 37
            },{
                goods: '提拉米苏',
                number: 37
            }, {
                goods: '榴莲千层',
                number: 39
            },],
            order: [{
                time: '2016-05-02',
                username: '王小虎',
                goods: '巧克力甜甜圈',
                number: 1,
                price: 10,
                total: 10,
            }, {
                time: '2016-05-02',
                username: '王小虎',
                goods: '巧克力甜甜圈',
                number: 1,
                price: 10,
                total: 10,
            },{
                time: '2016-05-02',
                username: '王小虎',
                goods: '巧克力甜甜圈',
                number: 1,
                price: 10,
                total: 10,
            }, {
                time: '2016-05-02',
                username: '王小虎',
                goods: '巧克力甜甜圈',
                number: 1,
                price: 10,
                total: 10,
            }, {
                time: '2016-05-02',
                username: '王小虎',
                goods: '巧克力甜甜圈',
                number: 1,
                price: 10,
                total: 10,
            }, {
                time: '2016-05-02',
                username: '王小虎',
                goods: '巧克力甜甜圈',
                number: 1,
                price: 10,
                total: 10,
            },]
        }
    },
    mounted() {
        var myChart = echarts.init(document.getElementById('line-chart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '七日营收折线图'
            },
            xAxis: {
                type: 'category',
                data: ['', '', '','','','','今日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10, 200, 150,120, 200, 150,120],
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