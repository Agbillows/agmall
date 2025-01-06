<template>
  <div class="container">
    <!--  收货信息  -->
    <div class="text-muted text-bold">填写并核对订单信息</div>
    <div
      class="mt-3 p-3 rounded shadow"
      v-if="customer.selected_address != undefined"
    >
      <div class="text-sm text-gray text-bold">收货人信息</div>
      <div
        class="mt-2 text-sm text-gray d-flex justify-between align-items-center"
      >
        <div class="py-2 px-3 hand border-red-1 rounded text-hover-red ml-4">
          {{ customer.selected_address.uaddr_name }}
        </div>
        <div class="mr-auto ml-4 d-flex">
          <div class="mr-3">{{ customer.selected_address.uaddr_name }}</div>
          <div class="mr-3">{{ customer.selected_address.uaddr_province }}</div>
          <div class="mr-3">{{ customer.selected_address.uaddr_city }}</div>
          <div class="mr-3">{{ customer.selected_address.uaddr_district }}</div>
          <div class="mr-3">{{ customer.selected_address.uaddr_address }}</div>
          <div class="mr-3">{{ customer.selected_address.uaddr_phone }}</div>
        </div>
        <div class="hand text-hover-red" @click="address_admin_clicked()">
          修改收货信息
        </div>
      </div>
    </div>
    <!--  收货信息  -->
    <!--  收货管理  -->
    <div
      class="mt-3 d-flex justify-between flex-wrap"
      v-show="customer.address_admin"
    >
      <AddressEdit
        class="hand"
        v-for="address of customer.address_list"
        :key="`address-${address.uaddr_id}`"
        :address="address"
        @click="address_clicked(address)"
      ></AddressEdit>
      <AddressAdd></AddressAdd>
    </div>
    <!--  /收货管理  -->
    <!--  配送清单  -->
    <div class="mt-3 p-3 shadow rounded">
      <div class="text-sm text-gray text-bold mb-3">配送清单</div>
      <!--  标题行  -->
      <div
        class="py-1 border-gray-1 bg-lighter d-flex justify-between align-items-center text-sm text-muted"
      >
        <div class="text-center flex-grow-1">商品</div>
        <div class="text-center w-10">单价</div>
        <div class="text-center w-10">数量</div>
        <div class="text-center w-10">小计</div>
      </div>
      <!--  /标题行  -->
      <!--  数据行  -->
      <template v-for="cart of order.cart_list" :key="`cart-${cart.car_id}`">
        <div
          class="my-2 py-1 d-flex justify-between align-items-center text-sm text-gray"
          v-if="cart.cart_checked == 0"
        >
          <div class="text-center flex-grow-1 d-flex">
            <img
              :src="`/api/img/${cart.cart_thumburl}`"
              class="hand cart-thumbnail"
            />
            <div
              class="ml-2 d-flex flex-column justify-around align-items-start"
            >
              <div class="hand text-hover-red">{{ cart.cart_name }}</div>
              <div class="d-flex text-muted">
                <div
                  class="text-xs text-hover-red hand mr-1"
                  v-for="attr of JSON.parse(cart.cart_sku)"
                  :key="`attr-${attr.key_id}`"
                >
                  {{ attr.value_name }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-center w-10">￥{{ cart.cart_price }}</div>
          <div class="text-center w-10">
            {{ cart.cart_count }}
          </div>
          <div class="text-center w-10">
            ￥{{ cart.cart_price * cart.cart_count }}
          </div>
        </div>
      </template>
      <!--  /数据行  -->
    </div>
    <!--  /配送清单  -->
    <!--  结算清单  -->
    <div class="mt-4 text-xs text-muted">
      <div class="d-flex justify-end">
        <div>商品总金额：</div>
        <div class="w-10 text-right">￥{{ order.cart_total }}</div>
      </div>
      <div class="d-flex justify-end mt-2">
        <div>配送费：</div>
        <div class="w-10 text-right">￥{{ order.distribution }}</div>
      </div>
      <div class="d-flex justify-end mt-2">
        <div>订单总金额：</div>
        <div class="w-10 text-right">
          ￥{{ order.cart_total + order.distribution }}
        </div>
      </div>
      <div class="d-flex justify-end mt-2">
        <div>优惠金额：</div>
        <div class="w-10 text-right">￥{{ order.discount }}</div>
      </div>
      <div class="d-flex justify-end mt-3 align-items-baseline">
        <div class="text-md text-gray text-bold">应付总金额：</div>
        <div class="w-10 text-right text-big text-red text-bolder">
          ￥{{ order.cart_total + order.distribution - order.discount }}
        </div>
      </div>
      <div
        class="d-flex justify-end mt-3"
        v-if="customer.selected_address != undefined"
      >
        <div>配送至：</div>
        <div class="ml-1">{{ customer.selected_address.uaddr_province }}</div>
        <div class="ml-1">{{ customer.selected_address.uaddr_city }}</div>
        <div class="ml-1">{{ customer.selected_address.uaddr_district }}</div>
        <div class="ml-1">{{ customer.selected_address.uaddr_address }}</div>
        <div class="ml-3">收货人：</div>
        <div class="ml-1">{{ customer.selected_address.uaddr_name }}</div>
        <div class="ml-1">{{ customer.selected_address.uaddr_phone }}</div>
      </div>
    </div>
    <!--  /结算清单  -->
    <div class="d-flex justify-end">
      <router-link
        to="/order_list"
        @click="add_order_clicked()"
        class="mt-3 text-decoration-none outline-0 text-white bg-red bg-hover-light-red py-2 px-3 rounded hand"
        >提交订单</router-link
      >
    </div>
  </div>
</template>

<script>
// 导入 辅助函数
import { mapState, mapActions, mapMutations } from "vuex";

// 导入 组件
import AddressEdit from "@/components/AddressEdit.vue";
import AddressAdd from "@/components/AddressAdd.vue";

export default {
  computed: {
    ...mapState(["customer", "order"]),
  },
  methods: {
    ...mapMutations({
      address_admin_clicked: "customer/address_admin_clicked",
      address_clicked: "customer/address_clicked",
    }),
    ...mapActions({
      get_address_list: "customer/get_address_list",
      get_china_list: "customer/get_china_list",
      add_order_clicked: "order/add_order_clicked",
    }),
  },
  mounted() {
    // 获取 当前登录的用户的所有收货信息
    this.get_address_list();
    // 获取 系统中所有的行政地区
    this.get_china_list();
  },
  components: {
    AddressEdit: AddressEdit,
    AddressAdd: AddressAdd,
  },
};
</script>

<style scoped="scoped">
.cart-thumbnail {
  width: 80px;
}
</style>
