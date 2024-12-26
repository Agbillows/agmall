// order 订单模块的仓库
// 导入 api 中的方法
import {getCartList,postCart,putCart,deleteCart,emptyCart,postOrder,getOrderList} from '@/api/order.js'

export default {
	namespaced : true,
	state : {
		/*  ----  购物车页面  ----  */
		// 当前登录的用户的购物车列表
		cart_list : [],
		// 全选复选框是否需要选择
		cart_checked_all : false,
		// 购物车的总价
		cart_total : 0,
		/*  ----  结算页面  ----  */
		// 配送费
		distribution : 0,
		// 优惠金额
		discount : 0,
		/*  ----  订单列表  ----  */
		// 当前登录的用户的所有的订单信息
		order_list : []
	},
	mutations : {
		/*  ----  购物车页面  ----  */
		// 更新 全选复选框是否需要选择
		reload_cart_checked_all(context){
			// 遍历 当前登录的用户的购物车列表
			for( let cart of context.cart_list ){
				// 判断 当前遍历到的 购物车 是否是非选中状态
				if( cart.cart_checked != 0 ){
					// 有一个购物车 不选中 那么全选复选框就不能选中
					context.cart_checked_all = false
					// 已经得出结论 不需要继续循环
					return
				}
			}
			context.cart_checked_all = true
		},
		// 更新 购物车 总价 的方法
		reload_cart_total( context ){
			// 将 总价 归位
			context.cart_total = 0
			// 遍历 购物车列表
			for( let cart of context.cart_list ){
				// 判断 当前遍历到的购物车 是否处于 选中状态
				if( cart.cart_checked == 0 ){
					// 当前遍历到的购物车 处于 选中状态 要累加 小计金额
					context.cart_total += cart.cart_count * cart.cart_price
				}
			}
		}
	},
	actions : {
		/*  ----  购物车页面  ----  */
		// 获取 当前登录的用户 的 购物车列表
		get_customer_cart_list( context ){
			getCartList().then(response=>{
				// 将 查询到的 购物车列表 赋值给 state状态数据中 cart_list
				context.state.cart_list = response.data.data
				// 更新 全选复选框是否需要选择
				context.commit('reload_cart_checked_all')
				// 更新 购物车 总价
				context.commit('reload_cart_total')
			})
		},
		// 【加入购物车】 按钮 被点击
		add_cart_clicked( context ){
			// 将 当前 用户选择的 商品 Sku 封装成 购物车对象
			let cart = {
				cart_spuid : context.rootState.product.spu.spu_id,
				cart_name : context.rootState.product.sku.sku_name,
				cart_skuid : context.rootState.product.sku.sku_id,
				cart_sku : context.rootState.product.sku.sku_spuattr,
				cart_thumburl : context.rootState.product.spu_image_list[0],
				cart_price : context.rootState.product.sku.sku_price,
				cart_count : context.rootState.product.spu_count,
				cart_checked : 0
			}
			// 新添加的购物车商品 在购物车列表中 是否已经存在
			// 将 新添加的购物车信息 追加到 state 状态数据中的 cart_list
			context.state.cart_list.push( cart )
			// 更新 购物车 总价
			context.commit('reload_cart_total')
			// 将 新添加的购物车信息 添加 服务器端的数据库中
			postCart(cart)
		},
		// 【购物车的复选框】被点击
		cart_checked_changed(context,payload){
			// 更新 当前要修改的购物车中的 选中属性
			payload.cart_checked = 1 - payload.cart_checked
			// 将 当前购物车 更新到 服务器端的 数据库中
			putCart({
				cart_count : payload.cart_count,
				cart_checked : payload.cart_checked,
				car_id : payload.car_id
			})
			// 重新 更新 全选复选框的选中状态
			context.commit( "reload_cart_checked_all" )
			// 更新 购物车 总价
			context.commit('reload_cart_total')
		},
		// 【全选复选框】被点击
		cart_checked_all_changed( context ){
			// 将 state 状态数据中的 cart_checked_all 成员 取反
			context.state.cart_checked_all = !context.state.cart_checked_all
			// 遍历 购物车 列表
			for( let cart of context.state.cart_list ){
				// 判断 当前遍历到的 购物车 是否需要 修改 选中状态
				if( (cart.cart_checked == 0) != context.state.cart_checked_all ){
					// 当前循环到的购物车 需要更新
					cart.cart_checked = 1 - cart.cart_checked
					// 更新到 服务器端的 数据库中
					putCart({
						cart_count : cart.cart_count,
						cart_checked : cart.cart_checked,
						car_id : cart.car_id
					})
				}
			}
			// 更新 购物车 总价
			context.commit('reload_cart_total')
		},
		// 购物车 订购数量 改变
		cart_count_changed(context,payload){
			// 将 购物车 数据 更新到 服务器端的数据库中
			putCart({
				cart_count : payload.cart_count,
				cart_checked : payload.cart_checked,
				car_id : payload.car_id
			})
			// 判断 当前购物车 是否是选中状态
			if( payload.cart_checked == 0 ){
				// 当前购物车 是 选中状态
				// 更新总价
				context.commit('reload_cart_total')
			}
		},
		// 删除 按钮 被点击
		delete_clicked( context , payload ){
			// 循环 购物车列表
			for( let i = 0 ; i <= context.state.cart_list.length - 1; i++ ){
				// 判断 当前循环到的购物车 是否就是 要删除的购物车
				if( context.state.cart_list[i].car_id == payload ){
					// 当前循环到的购物车 就是 要删除的购物车
					context.state.cart_list.splice(i,1)
					// 重新 更新 全选复选框的选中状态
					context.commit( "reload_cart_checked_all" )
					// 更新总价
					context.commit('reload_cart_total')
					// 不需要继续循环
					break
				}
			}
			// 将 要删除的购物车 从服务器端的数据库中删除
			deleteCart(payload)
		},
		// 清空购物车 按钮 被点击
		empty_clicked( context ){
			// 将 购物车 的 本地数据  清空
			context.state.cart_list = []
			// 重新 更新 全选复选框的选中状态
			context.commit( "reload_cart_checked_all" )
			// 更新 购物车 总价
			context.commit('reload_cart_total')
			// 将 服务器端 数据库中的 购物车 清空
			emptyCart()
		},
		/*  ----  结算页面  ----  */
		// 【生成订单】按钮被点击
		add_order_clicked( context ){
			// 准备 请求 参数
			let param = `{`
			// 订单的支付信息
			param += `"order_spuamount":${context.state.cart_total}`
			param += `,"order_expressfee":${context.state.distribution}`
			param += `,"order_totalamount":${context.state.cart_total+context.state.distribution}`
			param += `,"order_discountamount":${context.state.discount}`
			param += `,"order_payamount":${context.state.cart_total+context.state.distribution-context.state.discount}`
			// 订单的收货信息
			param += `,"orderAddress.consignee":"${context.rootState.customer.selected_address.uaddr_name}"`
			param += `,"orderAddress.phone":"${context.rootState.customer.selected_address.uaddr_phone}"`
			param += `,"orderAddress.province":"${context.rootState.customer.selected_address.uaddr_province}"`
			param += `,"orderAddress.city":"${context.rootState.customer.selected_address.uaddr_city}"`
			param += `,"orderAddress.district":"${context.rootState.customer.selected_address.uaddr_district}"`
			param += `,"orderAddress.address":"${context.rootState.customer.selected_address.uaddr_address}"`
			// 订单的订购商品信息
			// 定义变量 存放 需要订购的商品的索引
			let index = 0
			// 遍历 当前用户的购物车信息
			for(let cart of context.state.cart_list ){
				// 判断  当前遍历到的购物车信息是否选中
				if( cart.cart_checked == 0 ){
					param += `,"orderDetailList[${index}].odtails_name":"${cart.cart_name}"`
					param += `,"orderDetailList[${index}].odtails_thumburl":"${cart.cart_thumburl}"`
					param += `,"orderDetailList[${index}].odtails_price":"${cart.cart_price}"`
					param += `,"orderDetailList[${index}].odtails_count":"${cart.cart_count}"`
					param += `,"orderDetailList[${index}].odtails_amount":"${cart.cart_price*cart.cart_count}"`
					param += `,"orderDetailList[${index}].odtails_scorestatus":"0"`
					param += `,"orderDetailList[${index}].odtails_spu_id":"${cart.cart_spuid}"`
					param += `,"orderDetailList[${index}].odtails_sku":${cart.cart_sku}`
					// 需要订购的商品的索引自增
					index++
				}	
			}
			param += `}`
			// 将 参数 字符串 转换成 json对象
			param = JSON.parse(param)
			// 将 参数中的 orderDetailList[${index}].odtails_sku 的值 转换成字符串
			// 遍历 json 对象中的所有的 key
			for( let key in param ){
				// 判断 当前遍历到的 参数 的 key 是否以  .odtails_sku 结尾
				if( key.endsWith(".odtails_sku") ){
					// 将 当前 遍历到的 成员的值 转换成 字符串
					param[key] = JSON.stringify( param[key] )
				}
			}
			// 发送请求 将 订单 添加到 服务器端的数据库中
			postOrder( param ).then(response=>{
				if( response.data.httpcode == 200 ){
					// 将 已经生成订单的商品 从购物车中 移除
					// 遍历 购物车中的所有数据
					for( let cart of context.state.cart_list ){
						// 判断 当前遍历到的购物车 信息 是否 选中
						if( cart.cart_checked == 0 ){
							// 删除 当前选中的购物车信息
							deleteCart(cart.car_id)
						}
					}
				}
			})
		},
		/*  ----  订单列表页面  ----  */
		// 获取 当前登录的用户的所有订单
		get_order_list( context ){
			getOrderList().then(response=>{
				// 将 获取到的 订单列表 赋值给 state 状态数据中的 order_list 成员
				context.state.order_list = response.data.data
			})
		}
	}
}