<template>
  <div class="d-flex flex-wrap">
    <SpuPage
      v-for="spu of spuList"
      :key="`spu-${spu.spu_id}`"
      :spu="spu"
    ></SpuPage>
  </div>
</template>

<script>
// 导入 组件
import SpuPage from "@/components/SpuPage.vue";

export default {
  components: {
    SpuPage,
  },
  props: ["spuList"],
};
</script>

<style></style>
