<template>
	<div class="w-48 my-4 py-4 px-4 rounded shadow shadow-hover-red text-gray text-hover-red border-box hand">
		<!--  收货信息的显示状态  -->
		<div class="px-5 py-3" v-show="edit_mode == false">
			<div class="border-dashed border-dashed-hover-red py-3 text-center text-xl text-bolder" @click="edit_clicked()">+</div>
		</div>
		<!--  /收货信息的显示状态  -->
		<!--  收货信息的编辑状态  -->
		<div class="d-flex flex-column" v-show="edit_mode == true">
			<input type="text" v-model="customer_name" class="px-3 py-2 border-gray-1 outline-0 text-muted hand" placeholder="请填写收货人姓名"/>
			<input type="text" v-model="customer_phone" class="px-3 py-2 border-gray-1 outline-0 text-muted hand my-2" placeholder="请填写收货人手机号码"/>
			<div class="d-flex justify-between">
				<select class="flex-grow-1 py-1 px-2 border-gray-1 text-muted outline-0 hand"
					v-model="province_name"
					@change="province_changed()">
					<option 
						v-for="province of customer.china_list"
						:key="`province-${province.id}`">{{province.name}}</option>
				</select>
				<select class="flex-grow-1 mx-3 py-1 px-2 border-gray-1 text-muted outline-0 hand"
					v-model="city_name"
					@change="city_changed()">
					<option
						v-for="city of city_list"
						:key="`city-${city.id}`">{{city.name}}</option>
				</select>
				<select class="flex-grow-1 py-1 px-2 border-gray-1 text-muted outline-0 hand"
					v-model="district_name">
					<option
						v-for="district of district_list"
						:key="`district-${district.id}`">{{district.name}}</option>
				</select>
			</div>
			<input type="text" v-model="customer_address" class="px-3 py-2 border-gray-1 outline-0 text-muted hand my-2" placeholder="请填写收货详细地址"/>
			<div class="d-flex justify-end">
				<button class="border-0 outline-0 py-2 px-4 text-white bg-green bg-hover-light-green hand rounded" @click="save_clicked()"> 保 存 </button>
				<button class="border-0 outline-0 py-2 px-4 text-white bg-red bg-hover-light-red hand rounded ml-3" @click="cancel_clicked()"> 取 消 </button>
			</div>
		</div>
		<!--  /收货信息的编辑状态  -->
	</div>
</template>

<script>
// 导入 utils中的 China辅助类
import China from '@/utils/china.js'

// 导入辅助函数
import {mapState,mapMutations,mapActions} from 'vuex'

export default {
	data(){
		return {
			// 给 编辑模式 临时使用的数据
			// 是否是编辑状态
			edit_mode : false,
			// 用户填写的 收货人姓名
			customer_name : "",
			// 用户填写的 收货人手机号码
			customer_phone : "",
			// 用户填写的 详细地址
			customer_address : "",
			// 用户选择 一级行政地区 名称
			province_name : "",
			// 用户选择 二级行政地区 名称
			city_name : "",
			// 用户选择 三级行政地区 名称
			district_name : "",
			// 二级行政地区列表
			city_list : [],
			// 三级行政地区列表
			district_list : [],
		}
	},
	computed:{
		...mapState(["customer"])
	},
	methods:{
		...mapMutations({
			
		}),
		...mapActions({
			add_address : "customer/add_address"
		}),
		// 点击了 【+】div 进入编辑模式
		edit_clicked(){
			// 设置 当前选中的一级地区 是所有一级地区中的 第0个
			this.province_name = this.customer.china_list[0].name
			// 根据 当前选中的 一级地区 获取 二级地区 列表
			this.city_list = China.getChildrenByName( { search_list : this.customer.china_list , china_name : this.province_name } )
			// 让 二级行政地区 默认选中 第一个选项
			this.city_name = this.city_list[0].name
			// 根据 当前选中的 二级地区 获取 三级地区 列表
			this.district_list = China.getChildrenByName( { search_list : this.city_list , china_name : this.city_name } )
			// 让 三级行政地区列表 默认选中 第一个选项
			this.district_name = this.district_list.length == 0 ? '' : this.district_list[0].name
			// 将 当前收货信息 赋值给 编辑模式临时数据
			this.edit_mode = true
		},
		// 点击了 【取消】按钮  退出编辑模式
		cancel_clicked(){
			this.edit_mode = false
		},
		// 点击了 【保存】按钮
		save_clicked(){
			
			// 将 编辑模式中的 用户填写的数据 封装成 收货信息对象 
			let address = {
				uaddr_name : this.customer_name,
				uaddr_phone : this.customer_phone,
				uaddr_province : this.province_name,
				uaddr_city : this.city_name,
				uaddr_district : this.district_name,
				uaddr_address : this.customer_address,
				uaddr_isdefault : 0
			}
			
			// 调用 customer仓库中 异步方法 add_address
			this.add_address(address)
			
			// 退出编辑模式
			this.edit_mode = false
		},
		// 二级行政地区 修改时
		city_changed(){
			// 当前选中的二级行政地区名称 this.city_name 会自动更改  因为双向绑定
			// 根据 修改后的 二级行政地区 变更 三级行政地区列表
			this.district_list = China.getChildrenByName( { search_list : this.city_list , china_name : this.city_name } )
			// 让 新的三级行政地区列表 默认选中 第一个选项
			this.district_name = this.district_list.length == 0 ? '' : this.district_list[0].name
		},
		// 一级行政地区 修改时
		province_changed(){
			// 当前选中的一级行政地区名称  this.province_name 会自动更改 因为双向绑定
			// 根据 修改后的 一级行政地区 变更 二级行政地区列表
			this.city_list = China.getChildrenByName( { search_list : this.customer.china_list , china_name : this.province_name } )
			// 让 新的二级行政地区 默认选中 第一个选项
			this.city_name = this.city_list[0].name
			// 让 三级行政地区 重新更新
			this.city_changed()
		},
		
	},
	mounted() {
		
		// 将 当前收货信息 赋值给 编辑模式临时数据
		// this.province_name = 
		// this.city_name = 
		// this.district_name = 
	},
}
</script>

<style>
</style>
