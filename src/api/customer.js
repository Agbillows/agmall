// 导入 utils/request.js 中的 get\post\put\patch\del 五大方法
import {get,post,put,del} from '@/utils/request.js'

// 资源路径
const CHINA_RESOURCE = "china"		// 行政地区资源路径
const REGIST_RESOURCE = "regist"	// 注册资源路径
const LOGIN_RESOURCE = "login"		// 登录资源路径
const USER_RESOURCE = "customer/user"	// 客户资源路径
const USERADDRESS_RESOURCE = "customer/useraddress"	// 客户收货信息资源路径


// 导出 业务操作 方法

// 查询行政地区列表
export const getChinaList = data => get( CHINA_RESOURCE , data )

// 客户注册
export const regist = data => post( REGIST_RESOURCE , data )

// 客户登录
export const login = data => post( LOGIN_RESOURCE , data )

// 获取客户信息
export const getUser = () => get( USER_RESOURCE )

// 添加收货信息
export const postUserAddress = data => post( USERADDRESS_RESOURCE , data )

// 修改收货信息
export const putUserAddress = data => put( USERADDRESS_RESOURCE , data )

// 删除收货信息
export const deleteUserAddress = id => del( USERADDRESS_RESOURCE + "/" + id )

// 查询收货信息列表
export const getUserAddressList = () => get( USERADDRESS_RESOURCE )