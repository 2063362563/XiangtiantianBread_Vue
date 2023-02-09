<template>
    <div class="employee-manage">
        <div class="top">
            <div class="add-employee">
                <el-dialog title="员工信息" :visible.sync="addDialogVisible" width="40%" :before-close="handleClose">
                    <el-form inline ref="form" :model="form" label-width="80px">
                        <el-form-item label="姓名" prop="name">
                            <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="tel">
                            <el-input placeholder="请输入电话" v-model="form.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                        </el-form-item>
                        <el-form-item label="职位" prop="post">
                            <el-select v-model="form.post" placeholder="请选择职位">
                                <el-option label="店长" value="0"></el-option>
                                <el-option label="店员" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="薪资" prop="salary">
                            <el-input placeholder="请输入薪资" v-model="form.salary"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="form.sex" placeholder="请选择性别">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="birth">
                            <div class="block">
                                <el-date-picker v-model="form.birth" type="date" placeholder="请选择日期"></el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="入职日期" prop="entryDate">
                            <div class="block">
                                <el-date-picker v-model="form.entryDate" type="date"
                                    placeholder="请选择日期"></el-date-picker>
                            </div>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="addEmployee">确 定</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="员工信息" :visible.sync="editDialogVisible" width="40%" :before-close="handleClose">
                    <el-form inline ref="form" :model="form" label-width="80px">
                        <el-form-item label="姓名" prop="name">
                            <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="tel">
                            <el-input placeholder="请输入电话" v-model="form.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                        </el-form-item>
                        <el-form-item label="职位" prop="post">
                            <el-select v-model="form.post" placeholder="请选择职位">
                                <el-option label="店长" value="0"></el-option>
                                <el-option label="店员" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="薪资" prop="salary">
                            <el-input placeholder="请输入薪资" v-model="form.salary"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="form.sex" placeholder="请选择性别">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="birth">
                            <div class="block">
                                <el-date-picker v-model="form.birth" type="date" placeholder="请选择日期"></el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="入职日期" prop="entryDate">
                            <div class="block">
                                <el-date-picker v-model="form.entryDate" type="date"
                                    placeholder="请选择日期"></el-date-picker>
                            </div>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="editEmployee">确 定</el-button>
                    </span>
                </el-dialog>

                <div class="manage-header">
                    <el-button @click="addDialogVisible = true" type="primary">新 增</el-button>
                </div>
            </div>

        </div>
        <div class="query">
            <el-input class="contant" placeholder="请输入姓名或者ID" v-model="queryContent">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        </div>
        <div class="employee-table">
            <el-table v-for="item in tableDataList" :data="item">
                <el-table-column label="ID" prop="id">
                </el-table-column>
                <el-table-column label="姓名" prop="name">
                </el-table-column>
                <el-table-column label="性别" prop="sex" :formatter="sexFormatter">
                </el-table-column>
                <el-table-column label="年龄" prop="age">
                </el-table-column>
                <el-table-column label="职位" prop="post" :formatter="postFormatter">
                </el-table-column>
                <el-table-column label="电话号码" prop="tel">
                </el-table-column>
                <el-table-column label="入职日期" prop="entryDate">
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
                tel: '',
                sex: '',
                age: '',
                birth: '',
                salary: '',
                post: '',
                entryDate: '',
            },

            queryContent: "",

            tableDataList: [],

            addDialogVisible: false,

            editDialogVisible: false,

        };
    },
    created: function () {
        axios.get("/api/employee/getEmployeeTotal").then((response) => {
            this.total = response.data.data
        });
        axios.get("/api/employee/getAllEmployee", {
            params: {
                page: this.currentPage
            }
        }).then((response) => {
            this.tableDataList = [response.data.data]
        })
    },
    methods: {
        sexFormatter(row,column){
            if(row.sex == 0){
                return "男"
            }
            if(row.sex == 1){
                return "女"
            }
        },
        postFormatter(row,column){
            if(row.post == 1){
                return "店长"
            }
            if(row.post == 2){
                return "店员"
            }
           
        },
        handleCurrentChange() {

            //有一个小bug,如果当前页面大于请求后得到的页数会报错,因为this.currentPage超出上限
            if (this.querying) {
                this.reload()
                axios.get("/api/employee/getEmployeeByNameOrId",
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
                axios.get("/api/employee/getAllEmployee", {
                    params: {
                        page: this.currentPage
                    }
                }).then((response) => {
                    this.tableDataList = [response.data.data]
                })
            }

        },
        open(row) {
            this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
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
            axios.get("/api/employee/getEmployeeByNameOrId",
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
            this.form.age = row.age
            this.form.birth = row.birth
            this.form.entryDate = row.birth
            this.form.salary = row.salary
            this.form.tel = row.tel
            if (row.sex = 1) { this.form.sex = "女" } else { this.form.sex = "男" }
            if (row.post = 1) { this.form.post = "店长" } else { this.form.post = "店员" }
            this.editDialogVisible = true

        },

        editEmployee() {
            axios.put("/api/employee/updateEmployee", {
                id: this.form.id,
                name: this.form.name,
                tel: this.form.tel,
                age: this.form.age,
                salary: this.form.salary,
                post: this.form.post === "店长" ? 1 : 2,
                sex: this.form.sex === "女" ? 0 : 1,
                birth: this.form.birth,
                entryDate: this.form.entryDate
            })
            //表单重置
            this.$refs.form.resetFields()
            //弹窗消失
            this.editDialogVisible = false
            //刷新页面
            this.reload()
        },

        handleDelete(row) {
            axios.delete("/api/employee/deleteEmployee/" + row.id)
            this.reload()
        },
        addEmployee() {
          

            //发送post请求添加员工
            axios.post("/api/employee/saveEmployee", {

                name: this.form.name,
                tel: this.form.tel,
                age: this.form.age,
                post: this.form.post,
                salary: this.form.salary,
                sex: this.form.sex,
                birth: this.form.birth,
                entryDate: this.form.entryDate


            })

            //表单重置
            this.$refs.form.resetFields()
            //弹窗消失
            this.addDialogVisible = false
            this.reload()

        },
        //弹框关闭前使用的方法
        handleClose() {
            this.$refs.form.resetFields()
            this.addDialogVisible = false
            this.editDialogVisible = false
        },
        cancel() {
            this.$refs.form.resetFields()
            this.addDialogVisible = false
            this.editDialogVisible = false
        }
    }
};
</script>

<style lang="less">
.employee-table {
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