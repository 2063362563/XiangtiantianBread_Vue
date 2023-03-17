<template>
    <div>
        <el-button type="primary" @click="showAddDialog">添加商品</el-button>
        <el-table :data="products">
            <el-table-column label="图片">
                <template slot-scope="{ row }">
                    <img :src="row.image" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="price" label="种类"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="price" label="简介"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{ row }">
                    <el-button @click="showEditDialog(row)">编辑</el-button>
                    <el-button @click="deleteProduct(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加/编辑对话框 -->
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">

            <div style="margin: 20px;"></div>
            <el-form :label-position="left" label-width="80px" :model="formLabelAlign">
                <el-form-item label="名称">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="formLabelAlign.price"></el-input>
                </el-form-item>
                <el-form-item label="种类">
                    <el-select v-model="formLabelAlign.type" placeholder="请选择种类">
                        <el-option label="蛋糕" value="1"></el-option>
                        <el-option label="面包" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="formLabelAlign.discription"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload drag action="/api/good/upload" accept="image/*" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                        </div>
                        <div slot="tip" class="el-upload__tip">
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveProduct">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            products: [], // 商品列表
            dialogVisible: false, // 对话框是否可见
            dialogTitle: '', // 对话框标题
            currentProduct: {}, // 当前正在编辑的商品

            formLabelAlign: {
                name: '',
                price: '',
                type: '',
                discription: '',

            }
        };
    },
    methods: {
        // 显示添加对话框
        showAddDialog() {
            this.dialogTitle = '添加商品';
            this.currentProduct = {};
            this.dialogVisible = true;
        },
        // 显示编辑对话框
        showEditDialog(product) {
            this.dialogTitle = '编辑商品';
            this.currentProduct = { ...product };
            this.dialogVisible = true;
        },
        // 删除商品
        deleteProduct(product) {
            this.$confirm('确定要删除该商品吗？', '提示', {
                type: 'warning'
            }).then(() => {
                // 调用后端 API 删除商品
                // 假设后端 API 返回一个 Promise
                axios.deleteProduct(product.id).then(() => {
                    // 从商品列表中移除该商品
                    this.products = this.products.filter(p => p.id !== product.id);
                    this.$message.success('删除成功');
                });
            });
        },
        // 保存商品
        saveProduct() {
            if (this.currentProduct.id) {
                // 编辑商品
                axios.updateProduct(this.currentProduct).then(() => {
                    // 更新商品列表中的数据
                    const index = this.products.findIndex(p => p.id === this.currentProduct.id);
                    if (index > -1) {
                        this.products.splice(index, 1, { ...this.currentProduct });
                    }
                    this.dialogVisible = false;
                    this.$message.success('保存成功');
                });
            } else {
                // 添加商品
                axios.addProduct(this.currentProduct).then(product => {
                    // 将新添加的商品添加到列表中
                    this.products.push(product);
                    this.dialogVisible = false;
                    this.$message.success('添加成功');
                });
            }
        }
    },
    mounted() {
        // 获取初始数据
        // axios.getProducts().then(products => {
        //     this.products = products;
        // });
    }
};
</script>