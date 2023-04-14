<template>
  <div>
    <el-button size="mini" @click="back">返回</el-button>
    <el-table :data="cart" style="width: 100%">
      <el-table-column prop="goodName" label="商品" width="180">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="180"> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-card class="box-card" style="width: calc(100% / 6); float: right">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <span>总金额: {{ totalPrice }}</span>
          <el-button type="primary" round @click="outerVisible = true"
            >支付</el-button
          >
        </div>
      </el-card>
    </div>
    <el-dialog title="是否使用会员卡" :visible.sync="outerVisible">
      <el-input
        placeholder="请输入手机号"
        prefix-icon="el-icon-mobile-phone"
        v-model.number="outerPhone"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = true">去免费注册</el-button>
        <el-button type="primary" @click="payWithVip">会员优惠支付</el-button>
        <el-button type="primary" @click="pay">普通支付</el-button>
      </div>
      <!-- 内层 -->
      <el-dialog
        width="30%"
        title="新会员注册"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="addVip">注册</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  inject: ["reload"],

  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      outerPhone: "",
      cart: this.$store.state.cart,
      form: {
        name: "",
        tel: "",
        birth: "",
      },
    };
  },
  computed: {
    ...mapGetters(["totalPrice"]),
  },
  created: function () {},
  methods: {
    addVip() {
      axios.post("/api/consumer/saveVip", this.form);
      this.reload();
    },
    payWithVip() {
      axios
        .post(
          "/api/common/payWithVip",
          {
            cart: this.$store.state.cart,
            tel: this.outerPhone,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          this.$message({
            message:
              "原价为" +
              this.totalPrice +
              "元,优惠后价格为" +
              response.data.data +
              "元,欢迎下次光临!",
            type: "success",
          });

          this.$store.commit("cleanCart");
          this.$router.push("buy");
        });
    },
    pay() {
      axios
        .post("/api/common/pay", this.$store.state.cart, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          this.$alert(
            "您一共消费" + response.data.data + "元,欢迎下次光临!",
            "购买成功",
            {
              confirmButtonText: "确定",
            }
          );
          this.$store.commit("cleanCart");
          this.$router.push("buy");
        });
    },
    back() {
      this.$router.push("buy");
    },
    handleDelete(index, row) {
      this.$store.commit("deleteCart", row.goodName);
    },
  },
};
</script>

<style lang="less">
</style>