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

              <el-button type="primary" @click="addShoppingCart(good)">
                添加购物车</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      goodList: [],
    };
  },
  methods: {
    handleChange() {},
    addShoppingCart(good) {
      console.log(good.id, good.num);
    },
  },
  created: async function () {
    await axios.get("/api/good/getGoodList/1").then((response) => {
      this.goodList = response.data.data;
      this.goodList.forEach((good) => {
        this.$set(good, "num", 1);
      });
    });
  },
};
</script>
