/*  website 站点服务 仓库  */
export default {
	namespaced : true,
	state: {
		
		/*  首页 轮播栏  */
		/*  所有的轮播栏数据  */
		carousel_list : [
			{ carousel_id : 1 , carousel_image : 'carousel01.jpg' },
			{ carousel_id : 2 , carousel_image : 'carousel02.jpg' },
			{ carousel_id : 3 , carousel_image : 'carousel03.jpg' },
			{ carousel_id : 4 , carousel_image : 'carousel04.jpg' },
			{ carousel_id : 5 , carousel_image : 'carousel05.jpg' }
		],
		/*  当前选中的轮播图  */
		carousel_current: { carousel_id: 1, carousel_image: 'carousel01.jpg' },
		
		/*  首页 搜索栏 数据  */
		
		
	},
	mutations: {
		// 某个轮播控件被点击
		car_control_clicked( context , payload ){
			// 将 当前被点击的 轮播对象 设置给 state状态数据中的 carousel_current 成员
			context.carousel_current = payload
		}
	},
	actions: {
	},
}