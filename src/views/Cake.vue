<template>
  <div>
    <el-button type="primary" @click="showAddDialog">添加商品</el-button>
    <div class="body" style="margin-top: 0">
      <div v-for="good in goodsData" :key="good.id">
        <el-card class="box-card" style="width: 70%; margin-left: 13%">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div>
              <img
                :src="good.image"
                class="image"
                style="height: 158px; width: 150px"
              />
            </div>

            <el-card style="margin-left: 20px; width: 680px">
              <el-descriptions
                class="margin-top"
                :column="6"
                size="small"
                border
              >
                <el-descriptions-item>
                  <template slot="label"> 名字 </template>
                  {{ good.goodName }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 原价 </template>
                  {{ good.price }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 现价 </template>
                  {{ good.nowPrice }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 甜度 </template>
                  {{ good.sweetness }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 种类 </template>
                  {{ good.type }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 库存 </template>
                  {{ good.inventory }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 描述 </template>
                  {{ good.description }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>

            <!-- 按钮 -->
            <div style="display: flex; align-items: center">
              <el-button
                type="primary"
                icon="el-icon-sold-out"
                circle
                @click="openDownPrice(good)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                circle
                @click="openAddInventory(good)"
              ></el-button>
              <el-button type="primary" @click="showEditDialog(good)"
                >编辑</el-button
              >
              <el-button type="primary" @click="deleteGood(good.id)"
                >删除</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
      <el-pagination
        @current-change="CurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        :total="total"
        layout="total, prev, pager, next"
      >
      </el-pagination>
    </div>

    <!-- 打折对话框 -->
    <el-dialog title="打折" :visible.sync="downPrice" width="30%">
      <el-form>
        <h4>原价为{{ this.price }}元</h4>
        <el-form-item label="打折后价格">
          <el-input v-model="nowPrice"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downPrice = false">取 消</el-button>
        <el-button type="primary" @click="submitPrice">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改库存对话框 -->
    <el-dialog title="修改库存" :visible.sync="addInventory" width="30%">
      <el-form>
        <h4>原库存为{{ this.inventory }}</h4>
        <el-form-item label="修改库存为">
          <el-input v-model="inventory"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addInventory = false">取 消</el-button>
        <el-button type="primary" @click="submitInventory">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加/编辑对话框 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <div style="margin: 20px"></div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="名称" prop="goodName">
          <el-input v-model="form.goodName"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price"></el-input>
        </el-form-item>
        <el-form-item label="现价" prop="nowPrice">
          <el-input v-model.number="form.nowPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input v-model.number="form.inventory"></el-input>
        </el-form-item>
        <el-form-item label="种类" prop="type">
          <el-select v-model="form.type" placeholder="请选择种类">
            <el-option label="蛋糕" value="蛋糕"></el-option>
            <el-option label="面包" value="面包"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="甜度" prop="sweetness">
          <el-select v-model="form.sweetness" placeholder="请选择甜度">
            <el-option label="全糖" value="全糖"></el-option>
            <el-option label="7分糖" value="7分糖"></el-option>
            <el-option label="半糖" value="半糖"></el-option>
            <el-option label="3分甜" value="3分甜"></el-option>
            <el-option label="健康无糖" value="健康无糖"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="upload"
            action="/api/good/upload"
            list-type="picture-card"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
            :data="form"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  inject: ["reload"],
  data() {
    return {
      goodsData: [],
      dialogVisible: false, // 对话框是否可见
      dialogTitle: "", // 对话框标题
      queryContent: "",
      downPrice: false,
      addInventory: false,
      id: -1,
      price: -1,
      nowPrice: 0,
      inventory: 0,
      form: {
        id: "",
        goodName: "",
        price: 0,
        nowPrice: 0,
        type: "",
        description: "",
        sweetness: "",
        image: "",
        inventory: 0,
      },
      currentPage: -1,
      total: -1,
      rules: {
        goodName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "面包价格必须为数字值" },
        ],
        nowPrice: [
          { required: true, message: "请输入商品现价", trigger: "blur" },
          { type: "number", message: "面包现价必须为数字值" },
        ],
        type: [
          { required: true, message: "请选择商品种类", trigger: "change" },
        ],
        sweetness: [
          { required: true, message: "请选择甜度", trigger: "change" },
        ],
        inventory: [{ type: "number", message: "商品现价必须为数字值" }],
        description: [
          { required: true, message: "请输入描述信息", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    openDownPrice(good) {
      this.id = good.id;
      this.price = good.price;
      this.nowPrice = good.nowPrice;
      this.downPrice = true;
    },
    openAddInventory(good) {
      this.id = good.id;
      this.inventory = good.inventory;
      this.addInventory = true;
    },
    submitPrice() {
      axios.put("/api/good/updateGood", {
        id: this.id,
        nowPrice: this.nowPrice,
        isDiscount: 1,
      });
      this.downPrice = false;
      this.reload();
    },
    submitInventory() {
      axios.put("/api/good/updateGood", {
        id: this.id,
        inventory: this.inventory,
        isNew: 0,
      });
      this.addInventory = false;
      this.reload();
    },
    CurrentChange() {
      axios
        .get("/api/good/getGoodListByType/" + this.currentPage + "/蛋糕")
        .then((response) => {
          this.goodsData = response.data.data;
        });
    },
    submitUpload() {
      if (this.form.id) {
        //   如果ID存在说明是编辑
        this.$refs.upload.submit();
        console.log(this.form.id);
        this.dialogVisible = false;
        this.$message.success("保存成功");
        this.reload();
      } else {
        //   ID不存在说明是新增
        this.$refs.upload.submit();
        console.log(this.form);
        this.dialogVisible = false;
        this.$message.success("保存成功");
        this.reload();
      }
    },
    // 显示添加对话框
    showAddDialog() {
      this.dialogTitle = "添加商品";
      this.form = {};
      this.dialogVisible = true;
    },
    // 显示编辑对话框
    showEditDialog(good) {
      this.dialogTitle = "编辑商品";
      this.form = good;
      this.dialogVisible = true;
    },
    // 删除商品
    deleteGood(id) {
      this.$confirm("确定要删除该商品吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          axios.delete("/api/good/deleteGood/" + id).then(() => {
            this.reload();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    },
  },
  created: async function () {
    //获取商品总数
    axios.get("/api/good/getCakeTotal").then((response) => {
      this.total = response.data.data;
    });
    //获取商品信息
    await axios
      .get("/api/good/getGoodListByType/" + this.currentPage + "/蛋糕")
      .then((response) => {
        this.goodsData = response.data.data;
      });
  },
};
</script>