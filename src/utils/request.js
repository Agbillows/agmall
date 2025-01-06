// 导入 axios 模块
import axios from "axios";
// 导入 qs 模块
import qs from "qs";
// 导入 路由
import router from "@/router";

// 配置 axios
const request = axios.create({
  // 所有请求的统一基底路径  后端网络域
  baseURL: "/api/",
  // 发送 POST请求（POST/PUT/PATCH/DELETE） 之前 调用的方法
  transformRequest(data) {
    // 形参 data 是 json 格式
    return qs.stringify(data);
    // 返回 是 通过 qs.stringify() 序列化 后的 字符串
  },
});

// 配置 Axios 的 请求 拦截器
request.interceptors.request.use((config) => {
  // 每次发送请求之前 从 localStorage中 获取 token令牌 放在 请求头中
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

// 配置 Axios 的 响应 拦截器
request.interceptors.response.use((response) => {
  // 根据 响应报文体 中的 业务 状态号 进行 判断 业务错误类型
  switch (response.data.httpcode) {
    case 401:
      router.push({
        name: "Error",
        params: { message: response.data.message },
      });
      break;
    case 403:
      router.push({ name: "Error", params: { message: "没有访问权限！" } });
      break;
    default:
      return response;
  }
});

// 分别导出 get post  put  patch delete 5种请求方法

/**
 * @description 发送 get 请求的方法
 * @param {String} resource_url 请求的资源的路径
 * @param {Object} data 请求的参数
 * @return {Object} Promise异步任务对象
 */
export const get = (resource_url, data = {}) => {
  return request({
    url: resource_url,
    method: "GET",
    params: data,
  });
};

/**
 * @description 发送 post 请求的方法
 * @param {String} resource_url 请求的资源的路径
 * @param {Object} data 请求的参数
 * @return {Object} Promise异步任务对象
 */
export const post = (resource_url, data = {}) => {
  return request({
    url: resource_url,
    method: "POST",
    data: data,
  });
};

/**
 * @description 发送 put 请求的方法
 * @param {String} resource_url 请求的资源的路径
 * @param {Object} data 请求的参数
 * @return {Object} Promise异步任务对象
 */
export const put = (resource_url, data = {}) => {
  return request({
    url: resource_url,
    method: "PUT",
    data: data,
  });
};

/**
 * @description 发送 patch 请求的方法
 * @param {String} resource_url 请求的资源的路径
 * @param {Object} data 请求的参数
 * @return {Object} Promise异步任务对象
 */
export const patch = (resource_url, data = {}) => {
  return request({
    url: resource_url,
    method: "PATCH",
    data: data,
  });
};

/**
 * @description 发送 delete 请求的方法
 * @param {String} resource_url 请求的资源的路径
 * @param {Object} data 请求的参数
 * @return {Object} Promise异步任务对象
 */
export const del = (resource_url, data = {}) => {
  return request({
    url: resource_url,
    method: "DELETE",
    data: data,
  });
};
