<template>
  <div class="container my-4 d-flex align-items-end">
    <img src="/logo.png" style="width: 140px" />
    <div class="ml-5 flex-grow-1">
      <div class="ml-5 d-flex">
        <input
          type="text"
          class="w-33 px-3 py-2 rounded-left border-red-1 outline-0"
          placeholder="商品名称、品牌、分类、规格属性……"
          v-model="product.search"
        />
        <router-link
          to="/spu_list"
          class="px-3 py-2 border-0 outline-0 bg-red bg-hover-light-red text-white rounded-right hand text-decoration-none text-sm"
          @click="getSpuListByFilter(false)"
        >
          搜索
        </router-link>
        <router-link
          to="/cart"
          class="ml-4 py-2 px-4 text-red bg-white outline-0 border-gray-1 rounded hand border-hover-red-1 text-decoration-none text-sm"
        >
          我的购物车
        </router-link>
      </div>
      <div class="mt-2 ml-2 text-xs text-muted d-flex">
        <div class="text-red hand">春日环游记</div>
        <div class="hand ml-3 text-hover-red">iphone新品</div>
        <div class="hand ml-3 text-hover-red">小米</div>
        <div class="hand ml-3 text-hover-red">榴莲尝鲜</div>
        <div class="hand ml-3 text-hover-red">生鲜五折</div>
        <div class="hand ml-3 text-hover-red">品质家电</div>
        <div class="hand ml-3 text-hover-red">新品激光</div>
        <div class="hand ml-3 text-hover-red">春茶</div>
        <div class="hand ml-3 text-hover-red">正品农贸</div>
        <div class="hand ml-3 text-hover-red">嗨9购了</div>
        <div class="hand ml-3 text-hover-red">鱼人节好物</div>
      </div>
      <div class="mt-3 text-muted d-flex">
        <div class="text-red hand">秒杀</div>
        <div class="hand ml-3 text-hover-red">优惠券</div>
        <div class="hand ml-3 text-hover-red">学掌门会员</div>
        <div class="hand ml-3 text-hover-red">品牌闪购</div>
        <div class="hand ml-3 text-hover-red">拍卖</div>
        <div class="hand ml-3 text-hover-red">家电数码</div>
        <div class="hand ml-3 text-hover-red">超市日用</div>
        <div class="hand ml-3 text-hover-red">蔬果生鲜</div>
        <div class="hand ml-3 text-hover-red">国际好货</div>
        <div class="hand ml-3 text-hover-red">潮流服饰</div>
      </div>
    </div>
  </div>
</template>

<script>
// 辅助函数
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["product"]),
  },
  methods: {
    ...mapActions({
      getSpuListByFilter: "product/getSpuListByFilter",
    }),
  },
};
</script>

<style></style>
