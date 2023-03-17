<template>
    <div>
        <el-form>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                sex: "1"
            }

        }
    }
}
</script>