<template>
  <div class="bg-light">
    <div class="container d-flex justify-between align-items-center py-1">
      <router-link to="/" class="text-decoration-none text-red text-bold"
        >Ag商城</router-link
      >
      <div class="d-flex">
        <router-link
          to="/login"
          class="text-decoration-none text-muted text-xs text-hover-red"
        >
          {{
            customer.customer_current == undefined
              ? "你好，请登录"
              : `您好，${customer.customer_current.user_name}`
          }}
        </router-link>
        <div class="mx-2 text-xs text-muted">|</div>
        <router-link to="/regist" class="text-decoration-none text-red text-xs"
          >免费注册</router-link
        >
        <div class="mx-2 text-xs text-muted">|</div>
        <router-link
          to="/order_list"
          class="text-decoration-none text-muted text-xs text-hover-red"
          >我的订单</router-link
        >
        <div class="mx-2 text-xs text-muted">|</div>
        <router-link
          to="/error"
          class="text-decoration-none text-muted text-xs text-hover-red"
          >我的会员</router-link
        >
        <div class="mx-2 text-xs text-muted">|</div>
        <router-link
          to="/address"
          class="text-decoration-none text-muted text-xs text-hover-red"
          >收货地址</router-link
        >
        <div class="mx-2 text-xs text-muted">|</div>
        <router-link
          to="/error"
          class="text-decoration-none text-muted text-xs text-hover-red"
          >客户服务</router-link
        >
        <div class="mx-2 text-xs text-muted">|</div>
        <router-link
          to="/error"
          class="text-decoration-none text-muted text-xs text-hover-red"
          >网站导航</router-link
        >
        <div class="mx-2 text-xs text-muted">|</div>

        <div class="dropdown text-decoration-none text-muted text-xs">
          <div class="dropbtn text-hover-red">手机商城</div>
          <div class="dropdown-content text-center">
            <div>扫码下载软件</div>
            <img src="/index_bottom_wechat.png" />
            <div>扫码关注官方公众号</div>
            <img src="/index_bottom_wechat.png" />
            <div>扫码关注官方服务号</div>
            <img src="/index_bottom_wechat.png" />
            <div>其实是 localhost:8080 网址</div>
          </div>
        </div>
      </div>
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
      get_customer_current: "customer/get_customer_current",
    }),
  },
  mounted() {
    // 防止用户刷新页面
    // 判断 本地缓存中 是否存在 用户登录的token令牌
    if (localStorage.getItem("token")) {
      // 获取当前登录的用户
      this.get_customer_current();
    }
  },
};
</script>

<style scoped>
.dropbtn {
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative; /*相对定位*/
  display: inline-block;
  background: transparent;
}

.dropdown-content {
  padding: 15px;
  display: none;
  position: absolute; /*绝对定位 */
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
