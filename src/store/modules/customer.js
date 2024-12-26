// 导入 路由对象
import router from '@/router'

// 导入 api中的方法
import {regist,login,getUser,getUserAddressList,getChinaList,putUserAddress,deleteUserAddress,postUserAddress} from '@/api/customer.js'

export default {
	namespaced : true,
	state : {
		/*    ---- 注册、登录页面 ----    */
		// 用户填写的手机号码
		user_phone : "",
		// 用户填写的账户密码
		user_password : "",
		// 用户填写的确认密码
		check_password : "",
		// 用户填写的昵称
		user_name : "",
		// 当前登录的用户信息
		customer_current : undefined,
		/*    ---- 收货信息管理页面 ----    */
		// 当前登录的用户的所有的收货信息
		address_list : [],
		// 当前处于编辑状态的收货信息
		address_edit : undefined,
		// 当前系统中的所有的行政地区
		china_list : [],
		/*    ---- 结算页面 ----    */
		// 用户选择的收货信息
		selected_address : undefined,
		// 收货信息管理面板是否需要显示
		address_admin : false
	},
	mutations : {
		/*    ---- 收货信息管理页面 ----    */
		// 某个 【编辑】按钮被点击了
		edit_status_clicked(context,payload){
			// 将 当前被点击的收货信息 赋值给 state状态数据中的 address_edit
			context.address_edit = payload
		},
		/*    ---- 结算页面 ----    */
		// 【修改收货信息】按钮被点击
		address_admin_clicked(context){
			context.address_admin = !context.address_admin
		},
		// 某个 收货地址被点击
		address_clicked(context,payload){
			// 将 当前被点击的收货地址 赋值给 state状态数据中的 用户选择的收货信息 selected_address 成员
			context.selected_address = payload
			// 将 收货信息管理面板 隐藏
			context.address_admin = false
		}
	},
	actions : {
		/*    ---- 注册页面 ----    */
		// 点击 【立即注册】 按钮
		regist_clicked(context){
			// 数据有效性验证（只验证密码一致性）
			if( context.state.user_password != context.state.check_password ){
				// 路由转发
				router.push( { name : "Error" , params : { message : "两次密码不一致！" } } )
			}
			// 向服务器发送注册请求
			regist({
				user_phone : context.state.user_phone,
				user_password : context.state.user_password,
				user_name : context.state.user_name
			}).then(response=>{
				// 注册业务 出现错误 不需要判断 因为在axios的响应拦截器中 已经做了统一判断
				if( response.data.httpcode == 200 ){
					// 路由转发到成功页面
					router.push( { name : "Success" , params:{ message : "恭喜您！注册成功！" } } )
				}
			})
		},
		/*    ---- 登录页面 ----    */
		// 点击 【登录】 按钮
		login_clicked( context ){
			// 向服务器发送登录请求
			login({
				username : context.state.user_phone,
				password : context.state.user_password
			}).then(response=>{
				// 业务错误 不需要判断  因为axios中的响应拦截器中已经统一判断
				// 判断 登录成功
				if( response.data.httpcode == 200 ){
					// 将 服务器端 登录成功后 签发的token令牌 存入 本地缓存
					localStorage.setItem("token",response.data.data)
					// 获取当前登录的用户的信息
					context.dispatch( 'get_customer_current' )
					// 路由转发到 成功页面
					router.push( { name : "Success" , params:{ message : "恭喜您！登录成功！" } } )
				}
			})
		},
		// 获取当前登录的用户的信息
		get_customer_current(context){
			// 获取当前登录的用户的 基本信息
			getUser().then(response=>{
				// 将 获取到的 当前登录的用户信息 赋值 state状态数据中的 customer_current 成员
				context.state.customer_current = response.data.data
			})
			// 获取当前登录的用户的 购物车信息
			// context 表示 当前子仓库的上下文
			// this 表示 总仓库的上下文
			this.dispatch( "order/get_customer_cart_list" )
		},
	
		/*    ---- 收货信息管理页面 ----    */
		// 获取当前登录的用户的收货信息列表
		get_address_list( context ){
			getUserAddressList().then(response=>{
				// 将 获取到的 收货信息列表 赋值给 state状态数据中 address_list 成员
				context.state.address_list = response.data.data
				// 遍历 当前用户的所有收货信息
				for( let address of context.state.address_list ){
					// 判断 当前遍历到的收货信息 是否是 默认收货信息
					if( address.uaddr_isdefault == 1 ){
						// 将 默认收货信息 设置为 默认的 用户选择的收货信息
						context.state.selected_address = address
						break
					}
				}
			})
		},
		// 获取所有的行政地区
		get_china_list( context  ){
			getChinaList({
				pid : 0
			}).then( response=>{
				// 将 获取到的所有行政地区列表 赋值给 state状态数据中的 china_list
				context.state.china_list = response.data.data
			} )
		},
		// 修改收货信息
		update_address( context ){
			// 准备请求参数
			let params = {
				uaddr_name : context.state.address_edit.uaddr_name,
				uaddr_phone : context.state.address_edit.uaddr_phone,
				uaddr_province : context.state.address_edit.uaddr_province,
				uaddr_city : context.state.address_edit.uaddr_city,
				uaddr_district : context.state.address_edit.uaddr_district,
				uaddr_address : context.state.address_edit.uaddr_address,
				uaddr_isdefault : context.state.address_edit.uaddr_isdefault,
				uaddr_id : context.state.address_edit.uaddr_id
			}
			putUserAddress(params).then(response=>{
				if( response.data.httpcode == 200 ){
					// 取消 当前地址信息的编辑状态
					context.state.address_edit = undefined
				}
			})
		},
		// 修改默认收货信息
		update_address_default( context , payload ){
			// 遍历 当前用户的所有收货信息
			for( let address of context.state.address_list ){
				// 判断当前遍历到的收货信息 是否是 原来的默认收货信息
				if( address.uaddr_isdefault == 1 ){
					// 将  原来的默认收货信息 修改为 非默认收货信息
					address.uaddr_isdefault = 0
					// 将 本次修改 同步到 服务器端的 数据库
					putUserAddress({
						uaddr_name : address.uaddr_name,
						uaddr_phone : address.uaddr_phone,
						uaddr_province : address.uaddr_province,
						uaddr_city : address.uaddr_city,
						uaddr_district : address.uaddr_district,
						uaddr_address : address.uaddr_address,
						uaddr_id : address.uaddr_id,
						uaddr_isdefault : 0
					})
				}
				// 判断 当前遍历到的收货信息 是否就是 当前被点击的 收货信息
				if( address.uaddr_id == payload ){
					// 将 当前被点击的收货信息 修改为 默认收货信息
					address.uaddr_isdefault = 1
					// 将 本次修改 同步到 服务器端的 数据库
					putUserAddress({
						uaddr_name : address.uaddr_name,
						uaddr_phone : address.uaddr_phone,
						uaddr_province : address.uaddr_province,
						uaddr_city : address.uaddr_city,
						uaddr_district : address.uaddr_district,
						uaddr_address : address.uaddr_address,
						uaddr_id : address.uaddr_id,
						uaddr_isdefault : 1
					})
				}
			}
		},
		// 删除收货信息
		delete_address( context , payload ){
			// 循环 当前用户的所有收货信息
			for( let i = 0 ; i <= context.state.address_list.length - 1 ; i++ ){
				// 判断 当前循环到的收货信息 是否就是 当前被点击的收货信息
				if( context.state.address_list[i].uaddr_id == payload ){					
					// 当前循环到的收货信息 要删除
					context.state.address_list.splice(i,1)
				}
			}
			// 将 服务器端 数据库 中的数据 删除
			deleteUserAddress(payload)
		},
		// 添加收货信息
		add_address( context , payload ){
			// 将 要添加的收货信息 追加到 state 状态数据中 address_list 成员中
			context.state.address_list.push(payload)
			// 将 要添加的收货信息 添加到 服务器端的数据库中
			postUserAddress( payload )
		}
	}
}