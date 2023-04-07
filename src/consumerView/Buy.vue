<template>
  <div>
    <el-menu mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">热销新品</el-menu-item>
      <el-menu-item index="2">折扣专区</el-menu-item>
      <el-menu-item index="3">香甜蛋糕</el-menu-item>
      <el-menu-item index="4">香软面包</el-menu-item>
    </el-menu>
    <component :is="currentComponent"></component>

    <!-- 购物车页面 -->
    <!-- 这里是购物车页面的代码 -->
    <div class="cart" style="position: fixed; bottom: 0; right: 0">
      总金额：{{ totalPrice }}
      <el-button
        type="primary"
        plain
        round
        @click="goToCheckout"
        style="margin-left: 60px"
        >去支付</el-button
      >
    </div>
  </div>
</template>

<script>
import CCake from "../consumerView/CCake.vue";
import CBread from "../consumerView/CBread.vue";
import CDiscount from "../consumerView/CDiscount.vue";
import CNew from "../consumerView/CNew.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CNew,
    CDiscount,
    CCake,
    CBread,
  },
  data() {
    return {
      currentComponent: "CBread",
    };
  },

  computed: {
    ...mapGetters(["totalPrice"]),
  },

  methods: {
    goToCheckout() {
      // 这里是去支付的逻辑
      this.$router.push("shoppingCart");
    },
    handleSelect(index) {
      switch (index) {
        case "1":
          this.currentComponent = "CNew";
          break;
        case "2":
          this.currentComponent = "CDiscount";
          break;
        case "3":
          this.currentComponent = "CCake";
          break;
        case "4":
          this.currentComponent = "CBread";
          break;
      }
    },
  },
};
</script>

<style lang="less">
.cart {
  height: 48px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: larger;
  background-color: rgb(213, 235, 228);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>