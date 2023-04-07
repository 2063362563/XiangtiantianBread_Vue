<template>
  <div id="app">
    <router-link to="/login">login</router-link>
    <router-link to="/buy">buy</router-link>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },

  data() {
    return {
      isRouterAlive: true,
    };
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="less">
html,
body,
p {
  margin: 0;
  padding: 0;
}
</style>
