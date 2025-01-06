<template>
  <div class="container">
    <!--  购物车为空的界面  -->
    <div
      class="py-4 text-center shadow rounded text-muted text-big text-bolder"
      v-show="order.cart_list.length == 0"
    >
      购物车中暂无任何记录！
    </div>
    <!--  /购物车为空的界面  -->
    <!--  购物车不为空的界面  -->
    <div v-show="order.cart_list.length > 0">
      <!--  标题行  -->
      <div
        class="py-1 border-gray-1 bg-lighter d-flex justify-between align-items-center text-sm text-muted"
      >
        <div class="w-5" align="center">
          <input
            type="checkbox"
            :checked="order.cart_checked_all"
            @change="cart_checked_all_changed()"
          />
        </div>
        <div class="text-center flex-grow-1">商品</div>
        <div class="text-center w-10">单价</div>
        <div class="text-center w-10">数量</div>
        <div class="text-center w-10">小计</div>
        <div class="text-center w-10">操作</div>
      </div>
      <!--  /标题行  -->
      <!--  数据行  -->
      <div
        class="my-2 py-1 d-flex justify-between align-items-center text-sm text-gray"
        v-for="cart of order.cart_list"
        :key="`cart-${cart.car_id}`"
      >
        <div class="w-5" align="center">
          <input
            type="checkbox"
            :checked="cart.cart_checked == 0"
            @change="cart_checked_changed(cart)"
          />
        </div>
        <div class="text-center flex-grow-1 d-flex">
          <img
            :src="`/api/img/${cart.cart_thumburl}`"
            class="hand cart-thumbnail"
          />
          <div class="ml-2 d-flex flex-column justify-around align-items-start">
            <div class="hand text-hover-red">{{ cart.cart_name }}</div>
            <div class="d-flex text-muted">
              <div
                class="text-xs text-hover-red hand mr-1"
                v-for="attr of JSON.parse(cart.cart_sku)"
                :key="`attr-${attr.value_id}`"
              >
                {{ attr.value_name }}
              </div>
            </div>
          </div>
        </div>
        <div class="text-center w-10">￥{{ cart.cart_price }}</div>
        <div class="text-center w-10">
          <input
            type="number"
            v-model="cart.cart_count"
            @change="cart_count_changed(cart)"
            min="1"
            class="w-100 outline-0 border-gray-1 px-2 py-1 text-gray text-right rounded"
          />
        </div>
        <div class="text-center w-10">
          ￥{{ cart.cart_price * cart.cart_count }}
        </div>
        <div
          class="text-center w-10 hand text-hover-red"
          @click="delete_clicked(cart.car_id)"
        >
          删除
        </div>
      </div>
      <!--  /数据行  -->

      <!--  底部  -->
      <div
        class="my-2 py-1 d-flex justify-between align-items-center text-sm text-gray"
      >
        <div class="w-5" align="center">
          <input
            type="checkbox"
            :checked="order.cart_checked_all"
            @change="cart_checked_all_changed()"
          />
        </div>
        <div class="flex-grow-1">
          <div
            class="text-xs text-muted text-hover-red hand"
            @click="empty_clicked()"
          >
            清空购物车
          </div>
        </div>

        <div class="text-center w-20 d-flex align-items-baseline justify-end">
          <div class="text-gray text-sm">总价：</div>
          <div class="text-large text-red text-bolder">
            ￥{{ order.cart_total }}
          </div>
        </div>
        <div class="w-10" align="center">
          <router-link
            to="/pay"
            class="outline-0 border-0 text-white bg-red bg-hover-light-red rounded hand px-3 py-2 text-decoration-none"
            >去结算</router-link
          >
        </div>
      </div>
      <!--  /底部  -->
    </div>
    <!--  /购物车不为空的界面  -->
  </div>
</template>

<script>
// 导入 辅助函数
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["order"]),
  },
  methods: {
    ...mapMutations({
      reload_cart_checked_all: "order/reload_cart_checked_all",
    }),
    ...mapActions({
      cart_checked_changed: "order/cart_checked_changed",
      cart_checked_all_changed: "order/cart_checked_all_changed",
      cart_count_changed: "order/cart_count_changed",
      delete_clicked: "order/delete_clicked",
      empty_clicked: "order/empty_clicked",
    }),
  },
  mounted() {},
};
</script>

<style scoped="scoped">
.cart-thumbnail {
  width: 80px;
}
</style>
