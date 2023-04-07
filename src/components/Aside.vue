<template>
  <el-row class="tac">
    <el-col :span="12">
      <h1 class="biaoti">{{ isCollapse ? "后台" : "香甜甜后台管理系统" }}</h1>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 没有子菜单 -->
        <el-menu-item
          @click="clickmenu(item)"
          v-for="item in noChildren"
          :key="item.name"
          :index="item.name"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <!-- 有子菜单 -->
        <el-submenu
          v-for="item in hasChildren"
          :key="item.label"
          :index="item.label"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.label }}</span>
          </template>
          <el-menu-item-group
            v-for="subItem in item.children"
            :key="subItem.path"
          >
            <el-menu-item @click="clickmenu(subItem)" :index="subItem.path">{{
              subItem.label
            }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.biaoti {
  padding-right: 17px;
  padding-left: 17px;
  text-align: center;
  color: #fff;
  // font-size:22px;
  font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
}

.el-col-12 {
  width: 100%;
  background-color: #545c64;
}

.el-menu {
  height: 105vh;
}

.el-menu--collapse {
  width: auto;
}
</style>
  
<script>
export default {
  data() {
    return {
      menuDate: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "el-icon-s-home",
          url: "Home/Home",
        },
        {
          path: "/goods",
          name: "goods",
          label: "商品管理",
          icon: "el-icon-s-goods",
          children: [
            {
              path: "/cake",
              name: "cake",
              label: "香甜蛋糕",
              url: "goods/cake",
            },
            {
              path: "/bread",
              name: "bread",
              label: "香软面包",
              url: "goods/bread",
            },
          ],
        },
        {
          path: "/vip",
          name: "vip",
          label: "会员管理",
          icon: "el-icon-s-custom",
          url: "Vip/Vip",
        },
        {
          path: "/employee",
          name: "employee",
          label: "员工管理",
          icon: "el-icon-user-solid",
          url: "Employee/Empoyee",
        },
        {
          path: "/my",
          name: "my",
          label: "个人中心",
          icon: "el-icon-user-solid",
          url: "My/My",
        },
        {
          path: "/setting",
          name: "setting",
          label: "设置",
          icon: "el-icon-user-solid",
          url: "Setting/Setting",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickmenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuDate.filter((item) => !item.children);
    },
    //有子菜单
    hasChildren() {
      return this.menuDate.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>