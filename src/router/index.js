import { createRouter, createWebHistory } from "vue-router";

// 导入 页面级 组件
import HomeView from "@/views/HomeView.vue";
import SpuList from "@/views/SpuList.vue";
import SpuView from "@/views/SpuView.vue";
import CartView from "@/views/CartView.vue";
import PayView from "@/views/PayView.vue";
import ErrorView from "@/views/ErrorView.vue";
import SuccessView from "@/views/SuccessView.vue";
import RegistView from "@/views/RegistView.vue";
import LoginView from "@/views/LoginView.vue";
import AddressView from "@/views/AddressView.vue";
import OrderList from "@/views/OrderList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/spu_list",
    name: "SpuList",
    component: SpuList,
  },
  {
    path: "/spu",
    name: "Spu",
    component: SpuView,
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessView,
  },
  {
    path: "/error",
    name: "Error",
    component: ErrorView,
  },
  {
    path: "/regist",
    name: "Regist",
    component: RegistView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/pay",
    name: "Pay",
    component: PayView,
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/address",
    name: "Address",
    component: AddressView,
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/order_list",
    name: "OrderList",
    component: OrderList,
    meta: {
      needLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断 当前要访问的路由 是否需要登录
  if (to.meta.needLogin) {
    // 当前要访问的路由 需要登录
    // 判断 用户是否已经登录  判断 本地缓存中 是否存在 用户登录的 token令牌
    if (localStorage.getItem("token") == null) {
      // 当前用户还没登录 路由转发到 统一错误页面
      next({ name: "Error", params: { message: "请先登录！" } });
    }
  }
  // 代码执行到这一步 当前访问的页面不需要登录 或则 当前页面需要登录但是用户已经登录过了
  next();
});

export default router;
