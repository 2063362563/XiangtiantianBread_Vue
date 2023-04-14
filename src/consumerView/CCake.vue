<template>
  <div>
    <div class="body" style="margin-top: 0">
      <div v-for="good in goodList" :key="good.id">
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
                :column="5"
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
                  <template slot="label"> 描述 </template>
                  {{ good.description }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>

            <!-- 按钮 -->
            <div style="display: flex; align-items: center">
              <el-input-number
                v-model="good.num"
                :min="0"
                :max="99"
                label="描述文字"
              ></el-input-number>

              <el-button
                type="primary"
                @click="addShoppingCart(good)"
                :disabled="good.inventory == 0 ? true : false"
              >
                添加购物车</el-button
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
    <h1 style="margin-left: 30px">好吃不贵,真的实惠!</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      inject: ["reload"],
      total: -1,
      currentPage: 1,
      goodList: [],
    };
  },

  methods: {
    handleChange() {},
    //分页获取商品信息
    CurrentChange() {
      axios
        .get("/api/good/getGoodListByType/" + this.currentPage + "/蛋糕")
        .then((response) => {
          this.goodList = response.data.data;
          this.goodList.forEach((good) => {
            if (!good.num) {
              this.$set(good, "num", 1);
            }
          });
        });
    },
    //添加至购物车
    addShoppingCart(good) {
      // 通过goodId查找Vuex中的good对象
      const cartGood = this.$store.state.cart.find(
        (cartGood) => cartGood.goodId === good.id
      );

      // 如果找到了good对象并且它的num属性大于传入的good对象的inventory属性
      if (cartGood && cartGood.num + good.num > good.inventory) {
        // 展示消息
        this.$message("库存不足");
        return;
      }
      this.$store.commit("addCart", {
        goodId: good.id,
        goodName: good.goodName,
        price: good.nowPrice,
        num: good.num,
      });
      console.log(this.$store.state.cart);
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
        this.goodList = response.data.data;
        this.goodList.forEach((good) => {
          this.$set(good, "num", 1);
        });
      });
  },
};
</script>
