import { createStore } from 'vuex'

// 导入子仓库
import website from './modules/website.js'
import product from './modules/product.js'
import customer from './modules/customer.js'
import order from './modules/order.js'

// 创建 总仓库 拼装 子仓库
export default createStore({
  modules: {
	website,
	product,
	customer,
	order
  }
})
