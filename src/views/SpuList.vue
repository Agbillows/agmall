<template>
  <!--  筛选面板  -->
  <div class="container px-3 py-1 rounded shadow text-sm text-muted">
    <!--  商品分类 筛选面板   -->
    <div class="d-flex align-items-start my-2">
      <div class="w-10 text-right">商品分类：</div>
      <div class="w-90 d-flex flex-wrap">
        <div
          class="ml-3 hand"
          :class="{
            'text-red': product.cate_selected == undefined,
            'text-muted': product.cate_selected != undefined,
            'text-hover-red': product.cate_selected != undefined,
          }"
          @click="category_clicked(undefined)"
        >
          全部
        </div>
        <div
          class="ml-3 hand"
          :class="{
            'text-red': product.cate_selected == cate,
            'text-muted': product.cate_selected != cate,
            'text-hover-red': product.cate_selected != cate,
          }"
          v-for="cate of product.cate_list"
          :key="`cate-${cate.cate_id}`"
          @click="category_clicked(cate)"
        >
          {{ cate.cate_name }}
        </div>
      </div>
    </div>
    <!--  /商品分类 筛选面板   -->

    <!--  商品筛选属性   -->
    <div
      class="d-flex align-items-start my-2"
      v-for="(attr, attr_index) of product.attr_list"
      :key="`attr-${attr.key_id}`"
    >
      <div class="w-10 text-right">{{ attr.key_name }}：</div>
      <div class="w-90 d-flex flex-wrap">
        <div
          class="ml-3 hand"
          :class="{
            'text-red':
              product.attr_selected_value_list[attr_index].value_id ==
              undefined,
            'text-muted':
              product.attr_selected_value_list[attr_index].value_id !=
              undefined,
            'text-hover-red':
              product.attr_selected_value_list[attr_index].value_id !=
              undefined,
          }"
          @click="
            attr_value_clicked({ index: attr_index, value_id: undefined })
          "
        >
          全部
        </div>
        <div
          class="ml-3 hand"
          :class="{
            'text-red':
              product.attr_selected_value_list[attr_index].value_id ==
              attr_value.id,
            'text-muted':
              product.attr_selected_value_list[attr_index].value_id !=
              attr_value.id,
            'text-hover-red':
              product.attr_selected_value_list[attr_index].value_id !=
              attr_value.id,
          }"
          v-for="attr_value of attr.spuAttrValueList"
          :key="`attr-value-${attr_value.id}`"
          @click="
            attr_value_clicked({ index: attr_index, value_id: attr_value.id })
          "
        >
          {{ attr_value.value_name }}
        </div>
      </div>
    </div>
    <!--  /商品筛选属性   -->
  </div>
  <!--  /筛选面板  -->

  <!--  满足条件的商品列表  -->
  <div class="container">
    <SpuList :spuList="product.spu_list"></SpuList>
  </div>
  <!--  /满足条件的商品列表  -->
</template>

<script>
// 导入 组件
import SpuList from "@/components/SpuList.vue";

// 导入 辅助 函数
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["product"]),
  },
  methods: {
    ...mapMutations({
      set_cate_list: "product/set_cate_list",
    }),
    ...mapActions({
      attr_value_clicked: "product/attr_value_clicked",
      getSpuListByFilter: "product/getSpuListByFilter",
      category_clicked: "product/category_clicked",
    }),
  },
  unmounted() {
    // 清空 当前 选择的分类
    this.product.cate_selected = undefined;
    sessionStorage.removeItem("category");
  },
  mounted() {
    // 判断 是否 需要 从 本地缓存中 获取 商品分类 数据
    if (this.product.cate_selected == undefined) {
      // 判断 本地缓存中 是否 存在 商品分类 数据
      if (sessionStorage.getItem("category")) {
        // 从 本地缓存 中  获取  选择的 商品分类
        this.product.cate_selected = JSON.parse(
          sessionStorage.getItem("category")
        );
        // 根据 选中的 商品分类 加载 商品属性、商品spu列表
        this.category_clicked(this.product.cate_selected);
      }
    }

    // 判断 是否 需要 从 本地缓存中 获取  搜索关键字
    if (this.product.search.length == 0) {
      // 判断 本地缓存中 是否存在 搜索关键字
      if (sessionStorage.getItem("search")) {
        // 使用 本地缓存数据 更新 仓库中的数据
        this.product.search = sessionStorage.getItem("search");
        // 根据 搜索关键字 加载 商品分类、商品spu列表
        this.getSpuListByFilter(false);
      }
    }

    // 判断 是否含有 选中的分类
    if (this.product.cate_selected != undefined) {
      // 给 state中的 商品分类列表 cate_list 成员赋值
      this.set_cate_list([this.product.cate_selected]);
    }

    // 监听 窗体的滚动事件
    window.onscroll = () => {
      // console.log( document.documentElement.offsetHeight )		// 当前页面的总高度
      // console.log( document.documentElement.scrollTop )		// 窗口向下滚动的距离
      // console.log( window.innerHeight )						// 内窗口高度
      // 判断 当前窗口 是否滚动到了 底部
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        // 页面 滚到了 底部 加载更多商品
        // 判断 是否还有 更多数据 可以加载
        if (this.product.spu_has_more) {
          // 改变 商品查询的起始索引
          this.product.spu_start += this.product.spu_length;
          // 加载 更多的 满足条件的商品数据  追加到 商品列表中
          this.getSpuListByFilter(true);
        }
      }
    };
  },
  components: {
    SpuList: SpuList,
  },
};
</script>

<style></style>
