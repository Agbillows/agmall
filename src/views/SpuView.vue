<template>
  <div class="container" v-if="product.sku != undefined">
    <!--  基本信息部分  -->
    <div class="d-flex justify-between align-items-start">
      <!--  基本信息的左侧部分  -->
      <div class="spu-left">
        <img
          :src="`/api/img/${product.spu_image_current}`"
          class="w-100 rounded hand"
        />
        <div
          class="mt-2 d-flex justify-between align-items-center text-large text-light text-bolder"
        >
          <div class="hand" @click="image_left_clicked()">&lt;</div>
          <div class="spu-image-collection flex-grow-1 mx-2">
            <table
              border="0px"
              cellpadding="0px"
              cellspacing="4px"
              class="position-relative t-0"
              :style="{
                left: `-${product.spu_image_collection_left}px`,
              }"
            >
              <tbody>
                <tr>
                  <td
                    v-for="spu_image of product.spu_image_list"
                    :key="`td-${spu_image}`"
                    @click="spu_image_list_clicked(spu_image)"
                  >
                    <img
                      :src="`/api/img/${spu_image}`"
                      class="spu-image-thumbnail hand"
                      :class="{
                        'border-red-1': spu_image == product.spu_image_current,
                        'border-gray-1': spu_image != product.spu_image_current,
                      }"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="hand" @click="image_right_clicked()">&gt;</div>
        </div>
      </div>
      <!--  /基本信息的左侧部分  -->
      <!--  基本信息的右侧部分  -->
      <div class="spu-right">
        <div class="text-big text-gray text-bolder">
          {{ product.sku.sku_name }}
        </div>
        <div class="mt-3 d-flex align-items-baseline">
          <div class="text-big text-red text-bolder mr-1">现价：</div>
          <div class="text-larger text-red text-bolder mr-4">
            ￥{{ product.sku.sku_price }}
          </div>
          <div class="text-sm text-muted text-bold mr-1">原价：</div>
          <div
            class="text-big text-muted text-bold text-decoration-linethrough"
          >
            ￥{{ product.sku.sku_originalprice }}
          </div>
        </div>
        <div class="mt-3 text-muted text-bold">
          库存：{{ product.sku.sku_quantity }}
        </div>
        <!--  商品的规格属性  -->
        <div
          class="mt-3 d-flex justify-between align-items-start"
          v-for="attr of product.spu.attrKeyList"
          :key="`attr-${attr.key_id}`"
        >
          <div class="text-muted text-bold w-15 pt-2">{{ attr.key_name }}</div>
          <div class="w-85 d-flex flex-wrap">
            <template
              v-for="attr_value of attr.attrValueList"
              :key="`attr-value-${attr_value.value_id}`"
            >
              <div
                class="py-1 pl-1 pr-2 mr-2 mb-2 rounded hand text-sm text-muted d-flex align-items-center"
                :class="{
                  'border-red-1': sku_contains_attr_value(
                    attr.key_id,
                    attr_value.value_id
                  ),
                  'border-gray-1': !sku_contains_attr_value(
                    attr.key_id,
                    attr_value.value_id
                  ),
                }"
                v-if="attr_value.value_images.length > 0"
                @click="
                  sku_attr_value_clicked({
                    key_id: attr.key_id,
                    value_id: attr_value.value_id,
                  })
                "
              >
                <img
                  :src="`/api/img/${attr_value.value_images[0]}`"
                  class="spu-attr-value-image mr-1"
                />
                <div>{{ attr_value.value_name }}</div>
              </div>
              <div
                class="py-2 px-2 mr-2 mb-2 rounded hand text-sm text-muted"
                :class="{
                  'border-red-1': sku_contains_attr_value(
                    attr.key_id,
                    attr_value.value_id
                  ),
                  'border-gray-1': !sku_contains_attr_value(
                    attr.key_id,
                    attr_value.value_id
                  ),
                }"
                v-if="attr_value.value_images.length == 0"
                @click="
                  sku_attr_value_clicked({
                    key_id: attr.key_id,
                    value_id: attr_value.value_id,
                  })
                "
              >
                {{ attr_value.value_name }}
              </div>
            </template>
          </div>
        </div>
        <!--  /商品的规格属性  -->
        <div class="mt-3 d-flex">
          <input
            type="number"
            min="1"
            v-model="product.spu_count"
            class="spu-count px-3 py-2 border-red-1 outline-0"
          />
          <router-link
            to="/cart"
            @click="add_cart_clicked()"
            class="outline-0 border-0 py-2 px-3 bg-red bg-hover-light-red text-white text-decoration-none text-sm ml-3"
            >加入购物车</router-link
          >
          <router-link
            to="/pay"
            class="outline-0 border-0 py-2 px-3 bg-red bg-hover-light-red text-white text-decoration-none text-sm ml-3"
            >立即购买</router-link
          >
        </div>
      </div>
      <!--  /基本信息的右侧部分  -->
    </div>
    <!--  /基本信息部分  -->
    <!--  商品详情部分  -->
    <div class="mt-3 p-3 rounded shadow">
      <img src="/spu_introduce_01.jpg" class="w-100" />
    </div>
    <!--  /商品详情部分  -->
  </div>
</template>

<script>
// 导入辅助函数
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["product"]),
  },
  methods: {
    ...mapMutations({
      image_right_clicked: "product/image_right_clicked",
      image_left_clicked: "product/image_left_clicked",
      sku_attr_value_clicked: "product/sku_attr_value_clicked",
      get_image_list_by_sku: "product/get_image_list_by_sku",
      spu_image_list_clicked: "product/spu_image_list_clicked",
    }),
    ...mapActions({
      add_cart_clicked: "order/add_cart_clicked",
    }),
    // 判断 某个属性值 在 当前选中的sku中  是否存在
    sku_contains_attr_value(key_id, value_id) {
      // 将 当前处于选中状态的sku 中的 属性组合 转换成 json 数组
      let arr = JSON.parse(this.product.sku.sku_spuattr);
      // 遍历 每一个 属性 组合
      for (let attr of arr) {
        // 判断 当前遍历到的属性  是否 就是 要判断的属性
        if (attr.key_id == key_id && attr.value_id == value_id) {
          // 当前要判断的 属性 在 选中的sku属性组合中 存在
          return true;
        }
      }
      // 代码执行 到 这一行 还没有遇到过return 关键字
      // 当前要判断的 属性 在 选中的sku属性组合中 不存在
      return false;
    },
  },
  mounted() {
    // 判断 当前页面 要显示的 spu 是否是 undefined
    if (this.product.spu == undefined) {
      // 从本地缓存中 恢复  spu
      this.product.spu = JSON.parse(sessionStorage.getItem("spu"));
    }
    // 将 当前被点击的商品Spu中的SkuList中的第一个Sku 要赋值给 product仓库中的state状态数据中的 sku 成员
    this.product.sku = this.product.spu.skuList[0];
    // 根据 当前选中的sku 获取 对应的图片相册列表
    this.get_image_list_by_sku();
  },
};
</script>

<style scoped="scoped">
/*  基本信息的左侧部分  */
.spu-left {
  width: 450px;
}
/*  基本信息的右侧部分  */
.spu-right {
  width: 740px;
}
/*  相册  */
.spu-image-collection {
  overflow: hidden;
}
/*  相册中的缩略图  */
.spu-image-thumbnail {
  height: 94px;
}
/*  购买数量  */
.spu-count {
  width: 40px;
}
/*  规格属性值上的图片  */
.spu-attr-value-image {
  width: 34px;
}
</style>
