<template>
    <div class="vip-manage">
        <div class="top">
            <div class="edit-vip">
                <el-dialog title="会员信息" :visible.sync="editDialogVisible" width="40%" :before-close="handleClose">
                    <el-form inline ref="form" :model="form" label-width="80px">
                        <el-form-item label="昵称" prop="name">
                            <el-input placeholder="请输入昵称" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="tel">
                            <el-input placeholder="请输入电话" v-model="form.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="birth">
                            <div class="block">
                                <el-date-picker v-model="form.birth" type="date" placeholder="请选择日期"></el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="当前积分" prop="nowIntegral">
                            <el-input placeholder="请输入积分" v-model="form.nowIntegral"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="editConsumer">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <div class="query">
            <el-input class="contant" placeholder="请输入昵称或者ID" v-model="queryContent">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        </div>
        <div class="consumer-table">
            <el-table v-for="item in tableDataList" :data="item">
                <el-table-column label="ID" prop="id">
                </el-table-column>
                <el-table-column label="昵称" prop="name">
                </el-table-column>
                <el-table-column label="电话号码" prop="tel">
                </el-table-column>
                <el-table-column label="会员等级" prop="vip" :formatter="levelFormatter">
                </el-table-column>
                <el-table-column label="当前积分" prop="nowIntegral">
                </el-table-column>
                <el-table-column style="align:right">
                    <template slot-scope="scope">
                        <el-button class="edit" size="mini" @click="handleEdit(scope.row)">Edit</el-button>
                        <el-button class="delete" size="mini" type="danger" @click="open(scope.row)">Delete</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            layout="total, prev, pager, next" :total="total">>
        </el-pagination>

    </div>



</template>
<script>
import axios from 'axios';

export default {
    inject: ['reload'],

    page: -1,

    data() {
        return {
            currentPage: 1,

            querying: false,

            total: -1,

            form: {
                id: '',
                name: '',
                vip: '',
                tel: '',
                birth: '',
                nowIntegral: '',
            },

            queryContent: "",

            tableDataList: [],

            editDialogVisible: false,

        };
    },
    created: function () {
        axios.get("/api/consumer/getConsumerTotal").then((response) => {
            this.total = response.data.data
        });
        axios.get("/api/consumer/getAllConsumer", {
            params: {
                page: this.currentPage
            }
        }).then((response) => {
            this.tableDataList = [response.data.data]
        })
    },
    methods: {
        levelFormatter(row,column){
            if(row.vip == 0){
                return "无会员"
            }
            if(row.vip == 1){
                return "白银会员"
            }
            if(row.vip == 2){
                return "黄金会员"
            }
            if(row.vip == 3){
                return "钻石会员"
            }
        },
        handleCurrentChange() {

            //有一个小bug,如果当前页面大于请求后得到的页数会报错,因为this.currentPage超出上限
            if (this.querying) {
                this.reload()
                axios.get("/api/consumer/getConsumerByNameOrId",
                    {
                        params: {
                            queryContent: this.queryContent,
                            page: this.currentPage
                        }
                    }).then((response) => {
                        this.querying = true
                        this.tableDataList = [response.data.data.limitList]
                        this.total = response.data.data.total

                    })
            } else {
                axios.get("/api/consumer/getAllConsumer", {
                    params: {
                        page: this.currentPage
                    }
                }).then((response) => {
                    this.tableDataList = [response.data.data]
                })
            }
        },
        open(row) {
            this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.handleDelete(row)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        query() {
            axios.get("/api/consumer/getConsumerByNameOrId",
                {
                    params: {
                        queryContent: this.queryContent,
                        page: this.currentPage
                    }
                }).then((response) => {
                    this.querying = true
                    this.tableDataList = [response.data.data.limitList]
                    this.total = response.data.data.total
                })
        },

        handleEdit(row) {
            this.form.id = row.id
            this.form.name = row.name
            this.form.birth = row.birth
            this.form.tel = row.tel
            this.form.vip = row.vip
            this.form.nowIntegral = row.nowIntegral
            this.editDialogVisible = true

        },

        editConsumer() {
            axios.put("/api/consumer/updateConsumer", {
                id: this.form.id,
                name: this.form.name,
                tel: this.form.tel,
                vip: this.form.vip,
                birth: this.form.birth,
                nowIntegral: this.form.nowIntegral,
            })
            //表单重置
            this.$refs.form.resetFields()
            //弹窗消失
            this.editDialogVisible = false
            //刷新页面
            this.reload()
        },

        handleDelete(row) {
            axios.delete("/api/consumer/deleteConsumer/" + row.id)
            this.reload()
        },
        
        //弹框关闭前使用的方法
        handleClose() {
            this.$refs.form.resetFields()
            this.editDialogVisible = false
        },
        cancel() {
            this.$refs.form.resetFields()
            this.editDialogVisible = false
        }
    }
};
</script>

<style lang="less">
.consumer-table {
    width: 100%;
    height: 720px;
}

.query {
    display: flex;
    padding: 20px;
    margin-right: 45px;
    float: right;
    width: 20%;

    .contant {
        padding-right: 20px;
    }
}

.el-pagination {
    display: table;
    margin-left: auto;
    margin-right: auto;
}
</style>