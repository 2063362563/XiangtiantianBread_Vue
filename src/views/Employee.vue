<template>
    <div class="employee-manage">
        <div class="top">
            <div class="add-employee">
                <el-dialog title="员工信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
                    <el-form inline ref="form" :model="form" label-width="80px" :rules="rules">
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

                

                <div class="manage-header">
                    <el-button @click="dialogVisible = true" type="primary">新 增</el-button>
                </div>
            </div>

        </div>
        <div class="query">
            <el-input class="contant" placeholder="请输入内容" v-model="queryContant">
            </el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="employee-table">
            <el-table v-for="item in tableDataList" :data="item">
                <el-table-column label="ID" prop="id">
                </el-table-column>
                <el-table-column label="姓名" prop="name">
                </el-table-column>
                <el-table-column label="性别" prop="sex">
                </el-table-column>
                <el-table-column label="年龄" prop="age">
                </el-table-column>
                <el-table-column label="职位" prop="post">
                </el-table-column>
                <el-table-column label="电话号码" prop="tel">
                </el-table-column>
                <el-table-column label="入职日期" prop="entryDate">
                </el-table-column>

                <el-table-column style="align:right">
                    <template slot-scope="scope">
                        <el-button class="edit" size="mini"
                            @click="handleEdit(scope.$index, scope.row),DialogVisible = true">Edit</el-button>
                        <el-button class="delete" size="mini" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000" class="page">
        </el-pagination>
    </div>



</template>
<script>
import axios from 'axios';
export default {
    inject:['reload'],
    created: function () {
        axios.get("/api/employee/getAllEmployee", {
            params: {
                page: 1
            }
        }).then((response) => {
            this.tableDataList = [response.data.data]
            
        })
    },
    computed: {

    },
    data() {
        return {
            form: {
                name: '',
                tel: '',
                sex: '',
                age: '',
                birth: '',
                salary: '',
                post: '',
                entryDate: '',
            },
           
            queryContant: '',

            tableDataList: [],

            dialogVisible: false,

            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { min: 11, max: 11, message: '该号码无效', trigger: 'blur' }
                ],
                birth: [
                    { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
                ],
                entryDate: [
                    { type: 'date', required: true, message: '请选择入职日期', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                post: [
                    { required: true, message: '请选择职位', trigger: 'change' }
                ],
                salary: [
                    { required: true, message: '请填写薪资', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请填写年龄', trigger: 'blur' }
                ],

            }
        };
    },
    methods: {

        deleteEmployee(){
            axios.delete()
        },
        handleEdit(index, row) {
            console.log(index, row);
            console.log(row.id)

            //校验表单
            this.$refs.form.validate((valid) => {
                //是否校验成功
                if (valid) {
                    console.log('Edit!');

                    //成功后发送PUT请求修改员工
                    

                    //表单重置
                    this.$refs.form.resetFields()
                    //弹窗消失
                    this.dialogVisible = false
                }
            })
            
        },
        handleDelete(index, row) {
            console.log(index, row.id);
            axios.delete("/api/employee/deleteEmployee/"+row.id).then((response) => {
                console.log(response);
                this.reload()
            })
        },
        addEmployee() {
            console.log(this.form)

            //校验表单
            this.$refs.form.validate((valid) => {
                //是否校验成功
                if (valid) {
                    console.log('submit!');

                    //成功后发送post请求添加员工
                    axios.post("/api/employee/saveEmployee", {

                        name: this.form.name,
                        tel: this.form.tel,
                        age: this.form.age,
                        post: this.form.post,
                        salary: this.form.salary,
                        sex: this.form.sex,
                        birth: this.form.birth,
                        entryDate: this.form.entryDate


                    }).then((response) => {
                        console.log("成功发送了post请求")
                        console.log("返回结果" + response)
                    })

                    //表单重置
                    this.$refs.form.resetFields()
                    //弹窗消失
                    this.dialogVisible = false
                }
            })
        },
        //弹框关闭前使用的方法
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {

            this.$refs.form.resetFields()
            this.dialogVisible = false
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

.page {}
</style>