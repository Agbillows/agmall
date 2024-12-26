// 导入 utils/request.js 中的 get\post\put\patch\del 五大方法
import {get,post,put,patch,del} from '@/utils/request.js'

// 资源路径
const CART_RESOURCE = "customer/cart"		// 购物车资源路径
const ORDER_RESOURCE = "customer/order"		// 订单资源路径

// 导出 业务操作 方法

// 添加购物车
export const postCart = data => post( CART_RESOURCE , data )

// 修改购物车
export const putCart = data => put( CART_RESOURCE , data )

// 删除购物车
export const deleteCart = id => del( CART_RESOURCE + "/" + id )

// 清空购物车
export const emptyCart = () => del( CART_RESOURCE )

// 查询购物车
export const getCartList = () => get( CART_RESOURCE )

// 添加订单
export const postOrder = data => post( ORDER_RESOURCE , data )

// 修改订单
export const patchOrder = data => patch( ORDER_RESOURCE , data )

// 查询单个订单信息
export const getOrder = id => get( ORDER_RESOURCE + "/" + id )

// 查询订单列表
export const getOrderList = () => get( ORDER_RESOURCE )