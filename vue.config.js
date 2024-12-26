module.exports = {
  // 开发环境 服务器端配置
  devServer: {
    // 反向代理
    proxy: {
      // 代理路径  http://124.222.209.62/api/api
      "/api": {
        // 代理目标路径
        target: "http://124.222.209.62/api/",
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
