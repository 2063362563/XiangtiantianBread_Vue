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
                        <el-form-item label="入职日期" prop="entry_date">
                            <div class="block">
                                <el-date-picker v-model="form.birth" type="date" placeholder="请选择日期"></el-date-picker>
                            </div>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </span>
                </el-dialog>
                <div class="manage-header">
                    <el-button @click="dialogVisible = true" type="primary">新增</el-button>
                </div>
            </div>

        </div>
        <div class="employee-table">
            <el-table
                :data="tableData.filter(data => !quaryContent || data.name.toLowerCase().includes(quaryContent.toLowerCase()))"
                style="width: 100%">
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
                <el-table-column label="月薪" prop="salary">
                </el-table-column>
                <el-table-column label="电话号码" prop="tel">
                </el-table-column>
                <el-table-column label="出生日期" prop="birth">
                </el-table-column>
                <el-table-column label="入职日期" prop="entry_date">
                </el-table-column>

                <el-table-column style="align:right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="quaryContent" size="large" placeholder="输入姓名搜索" />
                    </template>
                    <template slot-scope="scope">
                        <el-button class="edit" size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button class="delete" size="mini" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000" class="page" page-size="15" hide-on-single-page="true">
        </el-pagination>
    </div>



</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '19806599916',
                post: '店长',
                salary: '8000',
                entry_date: '2016-05-02'
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '19806599916',
                post: '店长',
                salary: '8000',
                entry_date: '2016-05-02'
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '19806599916',
                post: '店长',
                salary: '8000',
                entry_date: '2016-05-02'
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '19806599916',
                post: '店长',
                salary: '8000',
                entry_date: '2016-05-02'
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '19806599916',
                post: '店长',
                salary: '8000',
                entry_date: '2016-05-02'
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            }, {
                id: 1,
                birth: '2016-05-02',
                name: '王小虎',
                sex: '0',
                age: '1',
                tel: '',
                post: '',
                salary: '',
                entry_date: ''
            },],

            dialogVisible: false,
            form: {
                name: '',
                tel: '',
                sex: '',
                age: '',
                birth: '',
                salary: '',
                post: '',
                entry_date: '',
            },
            quaryContent: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
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
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                entry_date: [
                    { type: 'date', required: true, message: '请选择入职日期', trigger: 'change' }
                ],
                sex: [
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
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        submit() {
            this.$refs.form.validate((valid) => {

                this.$refs.form.resetFields()
                this.dialogVisible = false

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
.top {
    display: flex;
    justify-content: space-between;


}
.employee-table{
    height: 820px;
}

.page{
    
}

</style>