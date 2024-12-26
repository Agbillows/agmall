// 导入 utils/request.js 中的 get\post\put\patch\del 五大方法
import {get} from '@/utils/request.js'

// 申明 资源路径
const BRAND_RESOURCE = "brand"			// 商品品牌资源路径
const CATEGORY_RESOURCE = "category"	// 商品分类资源路径
const ATTRIBUTE_RESOURCE = "attr"		// 商品属性资源路径
const SPU_RESOURCE = "spu"				// 商品Spu资源路径

// 导出 业务操作 方法

// 查询品牌列表
export const getBrandList = data => get( BRAND_RESOURCE , data )

// 查询分类列表
export const getCategoryList = data => get( CATEGORY_RESOURCE, data )

// 查询单个分类信息
export const getCategory =  id => get( CATEGORY_RESOURCE + "/" + id  )

// 查询商品属性列表
export const getAttributeList = data => get( ATTRIBUTE_RESOURCE , data )

// 查询单个商品Spu
export const getSpu = id => get( SPU_RESOURCE + "/" + id )

// 查询商品Spu列表
export const getSpuList = data => get( SPU_RESOURCE , data )