<template>
  <div>
    <h1>会员管理</h1>
    <form>
      <div>
        <label for="birthdayDiscount">生日折扣:</label>
        <input type="number" id="birthdayDiscount" v-model="birthdayDiscount" />
      </div>

      <!-- 用户等级折扣 -->
      <h2>用户等级折扣</h2>
      <div v-for="(discount, level) in levelDiscounts" :key="level">
        <label :for="'level-' + level">{{ level }}级用户折扣:</label>
        <input
          :id="'level-' + level"
          type="number"
          v-model.number="levelDiscounts[level]"
        />
      </div>

      <!-- 其他设置项 -->

      <!-- 保存按钮 -->
      <button @click.prevent="saveSettings">保存</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberDayDiscount: 0,
      birthdayGift: "",
      birthdayDiscount: 0,

      // 用户等级折扣
      levelDiscounts: {
        1: 0,
        2: 0,
        3: 0,
        // ...
      },

      // 其他设置项
    };
  },

  methods: {
    saveSettings() {
      // 发送请求，保存设置到服务器
    },
  },
};
</script>

<style scoped>
/* 页面样式 */
</style>