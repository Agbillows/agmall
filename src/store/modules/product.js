// 从 api 中导入需要使用的业务方法
import {getCategoryList,getSpuList,getAttributeList} from '@/api/product.js'

/*  product 商品服务 仓库  */
export default {
	namespaced : true,
	state : {
		
		//  ----  首页  ----  
		// 商品分类列表
		category_list : [],
		// 当前选中的一级分类
		category_current : undefined,
		
		// 首页 的 推荐分类栏
		home_recommend_category_list : [
			{cate_id:26,cate_name:'4K超清电视'},
			{cate_id:34,cate_name:'变频空调'},
			{cate_id:130,cate_name:'手机'},
			{cate_id:219,cate_name:'笔记本'}
		],
		
		// 首页 的 推荐分类栏 中的 商品列表
		home_recommend_spu_list : [],
		
		//  ----  商品筛选页面  ----  
		// 商品分类列表
		cate_list : [],
		// 商品筛选属性列表
		attr_list : [],
		// 选中的 商品筛选属性列表
		attr_selected_value_list : [],
		// 满足筛选条件的商品spu列表
		spu_list : [],
		// 当前 选中的 商品分类
		cate_selected : undefined,
		// 当前 用户输入的 商品搜索关键字
		search : "",
		// 当前 要查询商品的起始索引
		spu_start : 0,
		// 当前 要查询商品的每一页的显示数量
		spu_length : 10,
		// 是否 还有 更多 商品数据 可以加载
		spu_has_more : true,
		
		//  ----  商品详情页面  ----
		// 相册 向左滚动的距离
		spu_image_collection_left : 0,
		
		// 当前要显示在 商品详情页面中的 单个商品Spu
		spu : undefined,
		// 当前选中的 商品Sku
		sku : undefined,
		// 当前商品的相册
		spu_image_list : [],
		// 当前商品相册中选中的图片
		spu_image_current : undefined,
		// 用户输入的购买数量
		spu_count : 1
	},
	mutations : {
		//  ----  首页  ----  
		// 鼠标略过某个 一级分类
		category_hovered( context , payload){
			// 将 当前鼠标略过的 一级分类 设置为 当前选中的一级分类
			context.category_current = payload
		},
		// 鼠标离开某个 一级分类
		category_outed( context ){
			// 将 当前选中的一级分类 重新设置为 undefined
			context.category_current = undefined
		},
		//  ----  商品筛选页面  ----
		// 给 商品分类 列表 赋值
		set_cate_list( context , payload ){
			context.cate_list = payload
		},
		//  ----  商品详情页面  ----
		// 相册 右箭头 被点击
		image_right_clicked(context){
			context.spu_image_collection_left = 
				context.spu_image_collection_left > (context.spu_image_list.length - 5) * 100 ?
				context.spu_image_collection_left :
				context.spu_image_collection_left + 100
		},
		// 相册 左箭头 被点击
		image_left_clicked(context){
			context.spu_image_collection_left = context.spu_image_collection_left < 100 ? context.spu_image_collection_left : context.spu_image_collection_left - 100
		},
		// 某个 规格属性值 被点击
		sku_attr_value_clicked( context , payload ){
			// 当前 被选中的 sku 的 属性组合
			let arr = JSON.parse(context.sku.sku_spuattr)
			// [
			// 	{"spu_id": "100008348542","value_id": 2853,"value_name": "黑色","key_id": 1.8143813616270905e+38,"key_name": "颜色"}
			// 	{"spu_id": "100008348542","value_id": 2859,"value_name": "64GB","key_id": 8.64099429190236e+35,"key_name": "版本"}
			// 	{"spu_id": "100008348542","value_id": 2862,"value_name": "公开版","key_id": 2.8870576309104785e+38,"key_name": "购买方式"}
			// ]
			// 改变 被选中的 sku 的 属性组合
			// 循环 当前选中的sku的属性组合
			for( let i = 0 ; i <= arr.length - 1; i++ ){
				// 当前 循环到的属性 是否就是 被点击需要更改的属性
				if( arr[i].key_id == payload.key_id ){
					// 当前循环到的属性 就是 被点击 需要更改的属性
					arr[i].value_id = payload.value_id
				}
			}
			//////////////////////////////////////////////////////////
			// 去 当前 spu 中的 sku 列表 中 寻找 匹配规格属性组合方式的 sku
			// 标记变量
			let flag = 0
			// 遍历 当前 spu 中的 sku列表
			for( let sku of context.spu.skuList ){
				// 标记变量 归位
				flag = 0
				// 将 当前遍历到的 sku 的 规格属性组合  转换成 json 数组
				let current_arr = JSON.parse( sku.sku_spuattr )
				// 循环 当前遍历到的 sku 的规格属性组合 中的 每一个 规格属性
				for( let i = 0 ; i <= current_arr.length - 1 ; i++ ){
					// 判断 当前循环到的 属性 是否和 对应的 arr中的属性 相等
					if( current_arr[i].key_id != arr[i].key_id || current_arr[i].value_id != arr[i].value_id ){
						// 改变标记变量的值
						flag = 13
						// 当前 循环到的属性 和 arr中的 对应的属性 不相等  不用继续循环
						break
					}
				}
				// 判断 当前循环到的sku的属性组合 和 希望的arr中的属性组合 完全相等
				if( flag == 0 ){
					// 当前 遍历到的 sku 就应该是 新的 选中的sku
					context.sku = sku
					// 根据 新的 sku 去 获取 新的 相册列表
					this.commit( 'product/get_image_list_by_sku' )
					// 已经找到新的sku了，不需要继续遍历后续的sku的
					break
				}
			}	
		},
		// 根据 当前选中的sku 获取 对应的图片相册列表
		get_image_list_by_sku( context ){
			// 当前 选中的 sku 的 属性组合
			let arr = JSON.parse( context.sku.sku_spuattr )
			// [
			// 	{"spu_id": "100008348542","value_id": 2853,"value_name": "黑色","key_id": 1.8143813616270905e+38,"key_name": "颜色"}
			// 	{"spu_id": "100008348542","value_id": 2859,"value_name": "64GB","key_id": 8.64099429190236e+35,"key_name": "版本"}
			// 	{"spu_id": "100008348542","value_id": 2862,"value_name": "公开版","key_id": 2.8870576309104785e+38,"key_name": "购买方式"}
			// ]
			// 遍历 当前商品spu中的 属性列表
			for( let attr of context.spu.attrKeyList ){
				// 遍历 当前属性的 属性值 列表
				for( let attr_value of attr.attrValueList){
					// 当前遍历到的属性的 key_id => attr.key_id
					// 当前遍历到的属性的 value_id => attr_value.value_id
					// 当前遍历到的属性的相册 => attr_value.value_images
					// 判断 当前遍历到的属性的相册 是否是 空
					if( attr_value.value_images.length == 0 ){
						continue
					}
					// 判断 当前遍历到的 属性值 在 当前sku的属性组合中 是否存在 
					// 遍历 当前sku的 属性组合
					for( let sku_attr of arr ){
						// 判断 当前遍历到的属性  是否和 当前遍历到的sku中的属性相等
						if( attr.key_id == sku_attr.key_id && attr_value.value_id == sku_attr.value_id  ){
							// 当前 循环到的属性 的 相册列表 就应该是 当前商品的相册列表
							context.spu_image_list = attr_value.value_images
							// 将 当前商品的相册列表 中的 第一张图片 设置为 选中的图片
							context.spu_image_current = attr_value.value_images[0]
							// 将 相册的向左滚动距离 重新变成 0
							context.spu_image_collection_left = 0
							// 函数的目的已经达成 函数返回
							return
						}
					}
				}
			}
		},
		// 商品相册中的某个图片被点击
		spu_image_list_clicked( context , payload ){
			// 将 当前被点击的图片 赋值给 state状态数据中的 当前选中的图片 spu_image_current 成员
			context.spu_image_current = payload
		}
	},
	actions : {
		//  ----  首页  ----  
		// 获取系统商品分类列表
		getCategoryList( context ){
			// 发送 ajax 异步请求 去 获取 服务器端的 商品分类列表
			getCategoryList({ pid : '' }).then( response=>{
				// 将 获取到的 商品分类列表 赋值给 state中的成员 category_list
				context.state.category_list = response.data.data
				// 将 获取到的 商品分类列表 存储 到 本地缓存 中
				sessionStorage.setItem( "category_list" , JSON.stringify( response.data.data ) )
			} )
		},
		
		// 获取 首页的 推荐分类栏 中的 商品列表
		getHomeRecommendSpuList( context ){
			
			// 循环 首页 的 推荐分类栏
			for( let i = 0 ; i <= context.state.home_recommend_category_list.length - 1 ; i++ ){
				// 根据 当前循环到的 推荐分类  发送ajax请求 查询 该分类下的前5个推荐商品
				getSpuList({
					spu_status : 1,	// 商品状态 1：上架状态
					cate_id : context.state.home_recommend_category_list[i].cate_id,	// 商品所属分类
					start : 0,	// 查询商品的起始索引
					length : 5	// 查询的商品的数量
				}).then(response=>{
					// 将 当前查询到的 推荐 商品列表 添加到 state状态数据中的 home_recommend_spu_list 成员中
					context.state.home_recommend_spu_list[i] = response.data.data
				})
			}
			
		},
		//  ----  商品筛选页面  ----
		// 某个商品分类 被点击
		category_clicked( context , payload ){

			// 将 用户 选择 的 商品分类 存入 到 本地缓存中
			// localStorage.setItem( "category" , JSON.stringify( payload ) )
			sessionStorage.setItem( "category" , JSON.stringify( payload ) )
			
			
			// 将 当前被点击的分类 赋值给 state状态数据中的 cate_selected成员
			context.state.cate_selected = payload
			
			// 发送 ajax请求 根据 当前选择的分类 获取 该分类的 筛选属性列表
			getAttributeList({
				cate_id : payload == undefined ? "" : payload.cate_id,
				key_issku : 0
			}).then(response=>{
				// 将 获取到的 筛选属性列表 赋值给 state 状态数据中的 attr_list 成员
				context.state.attr_list = response.data.data
				// 给 state 状态数据中的 attr_selected_value_list 选中的 商品筛选属性列表 成员赋值
				// 循环 商品筛选属性列表  
				for( let i = 0 ; i <= context.state.attr_list.length - 1 ; i++ ){
					context.state.attr_selected_value_list[i] = {
						key_id : context.state.attr_list[i].key_id,
						value_id : undefined
					}
				}
			})
			
			// 发送 ajax请求 根据 当前选择的分类 获取 满足条件的商品spu列表
			context.dispatch( "getSpuListByFilter" , false )
		},
		// 某个商品筛选属性 被点击
		attr_value_clicked( context , payload ){
			// 改变 state 状态数据中  选中的 商品筛选属性列表 attr_selected_value_list 成员
			context.state.attr_selected_value_list[payload.index].value_id = payload.value_id
			
			// 发送 ajax请求 根据 当前选择的分类 获取 满足条件的商品spu列表
			context.dispatch( "getSpuListByFilter" , false  )
		},
		
		// 获取满足条件的商品Spu列表
		getSpuListByFilter( context , payload ){
			
			// 判断 当前 是否存在 搜索关键字
			if( context.state.search.length > 0 ){
				// 将 搜索关键词 持久化 存放到 本地缓存中
				sessionStorage.setItem( "search" , context.state.search )
			}
			
			// 准备 查询 参数
			let params = {}
			
			// 增加 用户输入的搜索关键字
			params.spu_name = context.state.search
			// 添加 商品的上架状态
			params.spu_status = 1
			// 添加 商品的分类编号
			params.cate_id = context.state.cate_selected == undefined ? "" : context.state.cate_selected.cate_id
			// 拼接 商品选中的属性值
			// 准备 数组 存放有效的选中的属性值的id
			let arr = []
			// 遍历 选中的商品属性值 列表
			for( let attr_value of context.state.attr_selected_value_list ){
				// attr_value => { key_id : 1001 , value_id : undefined|11101 }
				// 判断 当前遍历到的 属性的选中状态 是否是 【全部】（undefined）
				if( attr_value.value_id != undefined ){
					// 将 当前遍历到的 有效 属性值 追加到 arr
					arr.push( attr_value.value_id )
				}
			}
			// 有效选中属性值的数组 arr => [ 10001 , 10003 , 10007 ]
			params.valueList = arr.join(",")	// "10001,10003,10007"
			// 添加 起始索引 和 查询数量\
			params.start = context.state.spu_start
			params.length = context.state.spu_length
			
			// 发送 ajax 请求 查询 商品spu列表
			getSpuList( params ).then(response=>{
				// 将 获取到的 满足条件的 商品spu列表 赋值给 state状态数据中的 spu_list 成员
				// 判断 是 追加商品 还是 更新商品
				if( payload ){
					// 追加 商品
					context.state.spu_list = context.state.spu_list.concat( response.data.data )
					// 判断 是否还有 更多数据
					if( response.data.data.length < context.state.spu_length ){
						context.state.spu_has_more = false
					}
				}else{
					// 更新 商品
					context.state.spu_list = response.data.data
				}
				
				// 判断 是否需要 根据 响应报文 更新 商品分类列表
				if( context.state.cate_selected == undefined ){
					context.state.cate_list = response.data.categoryList
				}
			})
		}
	}
}