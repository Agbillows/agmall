<template>
  <div class="container d-flex justify-between">
    <img src="/login_bg.png" />
    <div class="flex-grow-1 ml-5 d-flex flex-column justify-center">
      <div class="text-muted text-bolder text-big text-center">客户登录</div>
      <input
        type="text"
        v-model="customer.user_phone"
        placeholder="请输入手机号码"
        class="py-2 px-3 border-gray-1 outline-0 rounded my-3"
      />
      <input
        type="password"
        v-model="customer.user_password"
        placeholder="请输入账户密码"
        class="py-2 px-3 border-gray-1 outline-0 rounded mb-3"
      />
      <button
        class="py-2 border-0 outline-0 text-white bg-red bg-hover-light-red rounded hand"
        @click="login_clicked()"
      >
        登 录
      </button>
    </div>
  </div>
</template>

<script>
// 导入辅助函数
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["customer"]),
  },
  methods: {
    ...mapActions({
      login_clicked: "customer/login_clicked",
    }),
  },
};
</script>

<style></style>
