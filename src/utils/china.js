export default class China{
	// 根据 行政地区名称 获取 下属行政地区
	// payload中的成员：search_list : []  要搜索的行政地区数组
	//                 china_name  :     要查询的行政地区名称
	static getChildrenByName( payload ){
		// 遍历 要搜索的行政地区数组
		for(  let search of payload.search_list  ){
			// 判断 当前遍历到的行政地区 是否就是 要查询的行政地区
			if( search.name == payload.china_name ){
				// 当前遍历到的行政地区 就是 要查询的行政地区
				// 返回 当前遍历到的行政地区的 下属 行政地区列表
				return search.children
			}
		}
	}
}