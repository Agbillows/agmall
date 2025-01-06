<template>
  <!--  页头部分  -->
  <!--  导航栏  -->
  <NavbarPage></NavbarPage>
  <!--  /导航栏  -->
  <!--  搜索栏  -->
  <SearchBar></SearchBar>
  <!--  /搜索栏  -->
  <!--  /页头部分  -->

  <!--  每个页面的正文部分  -->
  <router-view />
  <!--  /每个页面的正文部分  -->

  <!--  页脚部分  -->
  <FooterPage></FooterPage>
  <!--  /页脚部分  -->
</template>

<script>
// 导入 需要的 组件
import NavbarPage from "@/components/NavbarPage.vue";
import SearchBar from "@/components/SearchBar.vue";
import FooterPage from "@/components/FooterPage.vue";

export default {
  // 注册 组件
  components: {
    NavbarPage,
    SearchBar,
    FooterPage,
  },
};
</script>

<style>
/*  整个项目的全局样式  */

body {
  margin: 0px;
}

/*  用户分辨率兼容性  */
.container {
  width: 1200px;
  margin: 0rem auto;
}

/*  盒子模型  */

.w-100 {
  width: 100%;
}
.w-96 {
  width: 96%;
}
.w-95 {
  width: 95%;
}
.w-92 {
  width: 92%;
}
.w-90 {
  width: 90%;
}
.w-85 {
  width: 85%;
}
.w-80 {
  width: 80%;
}
.w-75 {
  width: 75%;
}
.w-66 {
  width: 66%;
}
.w-50 {
  width: 50%;
}
.w-48 {
  width: 48%;
}
.w-33 {
  width: 33%;
}
.w-25 {
  width: 25%;
}
.w-20 {
  width: 20%;
}
.w-18 {
  width: 18%;
}
.w-15 {
  width: 15%;
}
.w-13 {
  width: 13%;
}
.w-10 {
  width: 10%;
}
.w-8 {
  width: 8%;
}
.w-6 {
  width: 6%;
}
.w-5 {
  width: 5%;
}
.w-4 {
  width: 4%;
}
.w-0 {
  width: 0%;
}
.w-1rem {
  width: 1rem;
}

.h-100 {
  height: 100%;
}
.h-75 {
  height: 75%;
}
.h-50 {
  height: 50%;
}
.h-25 {
  height: 25%;
}
.h-0 {
  height: 0%;
}

.p-1 {
  padding: 0.25rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 1rem;
}
.p-4 {
  padding: 2rem;
}
.p-5 {
  padding: 4rem;
}

.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-3 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-4 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.px-5 {
  padding-left: 4rem;
  padding-right: 4rem;
}
.px-6 {
  padding-left: 8.4rem;
  padding-right: 8.4rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-3 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.py-4 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.py-5 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.pt-1 {
  padding-top: 0.25rem;
}
.pt-2 {
  padding-top: 0.5rem;
}
.pt-3 {
  padding-top: 1rem;
}
.pt-4 {
  padding-top: 2rem;
}
.pt-5 {
  padding-top: 4rem;
}

.pr-1 {
  padding-right: 0.25rem;
}
.pr-2 {
  padding-right: 0.5rem;
}
.pr-3 {
  padding-right: 1rem;
}
.pr-4 {
  padding-right: 2rem;
}
.pr-5 {
  padding-right: 4rem;
}

.pb-1 {
  padding-bottom: 0.25rem;
}
.pb-2 {
  padding-bottom: 0.5rem;
}
.pb-3 {
  padding-bottom: 1rem;
}
.pb-4 {
  padding-bottom: 2rem;
}
.pb-5 {
  padding-bottom: 4rem;
}

.pl-1 {
  padding-left: 0.25rem;
}
.pl-2 {
  padding-left: 0.5rem;
}
.pl-3 {
  padding-left: 1rem;
}
.pl-4 {
  padding-left: 2rem;
}
.pl-5 {
  padding-left: 4rem;
}

.border-0 {
  border: 0rem;
}
.border-bottom {
  border-bottom: 1px solid #eee;
}
.border-gray-1 {
  border: 1px solid #ccc;
}
.border-red-1,
.border-hover-red-1:hover {
  border: 1px solid #e1251b;
}
.border-blue-1 {
  border: 1px solid #aac;
}
.border-dashed {
  border: 1px dashed #ccc;
}
.border-dashed-hover-red:hover {
  border: 1px dashed #e1251b;
}

.shadow,
.shadow-hover:hover {
  box-shadow: 0rem 0rem 0.625rem #ccc;
}
.shadow-hover-blue:hover {
  box-shadow: 0rem 0rem 0.625rem #acc;
}
.shadow-red,
.shadow-hover-red:hover {
  box-shadow: 0rem 0rem 0.625rem #e1251b;
}
.rounded {
  border-radius: 0.375rem;
}
.rounded-circle {
  border-radius: 50%;
}
.rounded-left {
  border-radius: 0.375rem 0rem 0rem 0.375rem;
}
.rounded-right {
  border-radius: 0rem 0.375rem 0.375rem 0rem;
}

.m-1 {
  margin: 0.25rem;
}
.m-2 {
  margin: 0.5rem;
}
.m-3 {
  margin: 1rem;
}
.m-4 {
  margin: 2rem;
}
.m-5 {
  margin: 4rem;
}
.m-auto {
  margin: auto;
}

.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.mx-3 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.mx-4 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.mx-5 {
  margin-left: 4rem;
  margin-right: 4rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.my-3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.my-4 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.my-5 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.my-auto {
  margin-top: auto;
  margin-bottom: auto;
}

.mt-1 {
  margin-top: 0.25rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-3 {
  margin-top: 1rem;
}
.mt-4 {
  margin-top: 2rem;
}
.mt-5 {
  margin-top: 4rem;
}
.mt-auto {
  margin-top: auto;
}

.mr-1 {
  margin-right: 0.25rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.mr-3 {
  margin-right: 1rem;
}
.mr-4 {
  margin-right: 2rem;
}
.mr-5 {
  margin-right: 4rem;
}
.mr-auto {
  margin-right: auto;
}

.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.mb-4 {
  margin-bottom: 2rem;
}
.mb-5 {
  margin-bottom: 4rem;
}
.mb-auto {
  margin-bottom: auto;
}

.ml-1 {
  margin-left: 0.25rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.ml-3 {
  margin-left: 1rem;
}
.ml-4 {
  margin-left: 2rem;
}
.ml-5 {
  margin-left: 4rem;
}
.ml-auto {
  margin-left: auto;
}

.border-box {
  box-sizing: border-box;
}

/*  弹性布局  */

.d-flex {
  display: flex;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}
.flex-column {
  flex-direction: column;
}
.flex-column-reverse {
  flex-direction: column-reverse;
}

.justify-center {
  justify-content: center;
}
.justify-end {
  justify-content: flex-end;
}
.justify-between {
  justify-content: space-between;
}
.justify-around {
  justify-content: space-around;
}

.align-items-start {
  align-items: flex-start;
}
.align-items-center {
  align-items: center;
}
.align-items-end {
  align-items: flex-end;
}
.align-items-baseline {
  align-items: baseline;
}

.flex-wrap {
  flex-wrap: wrap;
}

.align-content-start {
  align-content: flex-start;
}
.align-content-center {
  align-content: center;
}
.align-content-end {
  align-content: flex-end;
}
.align-content-between {
  align-content: space-between;
}
.align-content-around {
  align-content: space-around;
}

.align-self-start {
  align-self: flex-start;
}
.align-self-center {
  align-self: center;
}
.align-self-end {
  align-self: flex-end;
}
.align-self-baselind {
  align-self: baseline;
}
.align-self-stretch {
  align-self: stretch;
}

.flex-grow-0 {
  flex-grow: 0;
}
.flex-grow-1 {
  flex-grow: 1;
}

/*  主题  */

.text-big {
  font-size: 1.125rem;
}
.text-biger {
  font-size: 1.25rem;
}
.text-large {
  font-size: 1.5rem;
}
.text-larger {
  font-size: 1.75rem;
}
.text-xl {
  font-size: 2rem;
}
.text-md {
  font-size: 1rem;
}
.text-sm {
  font-size: 0.875rem;
}
.text-xs {
  font-size: 0.75rem;
}

.text-bold {
  font-weight: 600;
}
.text-bolder {
  font-weight: 900;
}

.text-black {
  color: #000;
}
.text-dark {
  color: #333;
}
.text-gray {
  color: #666;
}
.text-muted {
  color: #999;
}
.text-light {
  color: #ccc;
}
.text-white {
  color: #fff;
}
.text-red,
.text-hover-red:hover {
  color: #e1251b;
}
.text-blue {
  color: #aac;
}

.text-decoration-none {
  text-decoration: none;
}
.text-decoration-linethrough {
  text-decoration: line-through;
}

.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}

.bg-black {
  background-color: #000;
}
.bg-dark {
  background-color: #333;
}
.bg-gray {
  background-color: #666;
}
.bg-muted {
  background-color: #999;
}
.bg-light {
  background-color: #ccc;
}
.bg-lighter {
  background-color: #eee;
}
.bg-white {
  background-color: #fff;
}
.bg-white-alpha {
  background-color: rgba(255, 255, 255, 0.5);
}
.bg-white-alpha:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
.bg-red,
.bg-hover-red:hover {
  background-color: #e1251b;
}
.bg-red-alpha {
  background-color: rgba(230, 70, 40, 0.5);
}
.bg-red-alpha:hover {
  background-color: rgba(230, 70, 40, 0.7);
}
.bg-hover-light-red:hover {
  background-color: #f1452b;
}
.bg-hover-light:hover {
  background-color: #ccc;
}
.bg-blue {
  background-color: #aac;
}
.bg-green {
  background-color: #3b3;
}
.bg-hover-light-green:hover {
  background-color: #3a3;
}
.outline-0 {
  outline: none;
}

/*  用户界面  */
.hand {
  cursor: pointer;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*  定位  */
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.position-fixed {
  position: fixed;
}

.l-0 {
  left: 0rem;
}
.l-1 {
  left: 0.25rem;
}
.l-2 {
  left: 0.5rem;
}
.l-3 {
  left: 1rem;
}
.l-4 {
  left: 2rem;
}
.l-5 {
  left: 4rem;
}

.r-0 {
  right: 0rem;
}
.r-1 {
  right: 0.25rem;
}
.r-2 {
  right: 0.5rem;
}
.r-3 {
  right: 1rem;
}
.r-4 {
  right: 2rem;
}
.r-5 {
  right: 4rem;
}

.t-0 {
  top: 0rem;
}
.t-1 {
  top: 0.25rem;
}
.t-2 {
  top: 0.5rem;
}
.t-3 {
  top: 1rem;
}
.t-4 {
  top: 2rem;
}
.t-5 {
  top: 4rem;
}

.b-0 {
  bottom: 0rem;
}
.b-1 {
  bottom: 0.25rem;
}
.b-2 {
  bottom: 0.5rem;
}
.b-3 {
  bottom: 1rem;
}
.b-4 {
  bottom: 2rem;
}
.b-5 {
  bottom: 4rem;
}
.b-negative-3 {
  bottom: -1rem;
}

.z-low {
  z-index: 1;
}
.z-mid {
  z-index: 2;
}
.z-high {
  z-index: 3;
}
</style>
