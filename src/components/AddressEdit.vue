<template>
	<div class="w-48 my-4 py-4 px-4 rounded border-box"
		:class="{
			'shadow' : address.uaddr_isdefault != 1,
			'shadow-red' : address.uaddr_isdefault == 1
		}">
		<!--  收货信息的显示状态  -->
		<div v-show="address != customer.address_edit">
			<div class="d-flex justify-between align-items-center mb-3">
				<div class="text-gray text-bolder">{{address.uaddr_name}}</div>
				<div class="text-gray text-bolder mr-auto ml-3">{{address.uaddr_province}}</div>
				<div class="text-muted text-hover-red hand" @click="delete_address(address.uaddr_id)">×</div>
			</div>
			<div class="text-xs text-muted d-flex justify-between mt-2">
				<div class="w-13 text-right">收货人：</div>
				<div class="flex-grow-1 text-gray">{{address.uaddr_name}}</div>
			</div>
			<div class="text-xs text-muted d-flex justify-between mt-2">
				<div class="w-13 text-right">所在地区：</div>
				<div class="flex-grow-1 text-gray">{{address.uaddr_province}}{{address.uaddr_city}}{{address.uaddr_district}}</div>
			</div>
			<div class="text-xs text-muted d-flex justify-between mt-2">
				<div class="w-13 text-right">地址：</div>
				<div class="flex-grow-1 text-gray">{{address.uaddr_address}}</div>
				<div class="w-13 text-right hand text-hover-red" @click="edit_button_clicked()">编辑</div>
			</div>
			<div class="text-xs text-muted d-flex justify-between mt-2">
				<div class="w-13 text-right">手机：</div>
				<div class="flex-grow-1 text-gray">{{address.uaddr_phone}}</div>
				<div class="w-13 text-right hand text-hover-red" @click="update_address_default(address.uaddr_id)">设为默认</div>
			</div>
		</div>
		<!--  /收货信息的显示状态  -->
		<!--  收货信息的编辑状态  -->
		<div class="d-flex flex-column" v-show="address == customer.address_edit">
			<input type="text" v-model="customer_name" class="px-3 py-2 border-gray-1 outline-0 text-muted hand" placeholder="请填写收货人姓名"/>
			<input type="text" v-model="customer_phone" class="px-3 py-2 border-gray-1 outline-0 text-muted hand my-2" placeholder="请填写收货人手机号码"/>
			<div class="d-flex justify-between">
				<select class="flex-grow-1 py-1 px-2 border-gray-1 text-muted outline-0 hand"
					v-model="province_name"
					@change="province_changed()">
					<option 
						v-for="province of customer.china_list"
						:key="`province-${province.id}`"
						:selected="province.name==address.uaddr_province">{{province.name}}</option>
				</select>
				<select class="flex-grow-1 mx-3 py-1 px-2 border-gray-1 text-muted outline-0 hand"
					v-model="city_name"
					@change="city_changed()">
					<option
						v-for="city of city_list"
						:key="`city-${city.id}`"
						:selected="city.name==address.uaddr_city">{{city.name}}</option>
				</select>
				<select class="flex-grow-1 py-1 px-2 border-gray-1 text-muted outline-0 hand"
					v-model="district_name">
					<option
						v-for="district of district_list"
						:key="`district-${district.id}`"
						:selected="district.name==address.district_list">{{district.name}}</option>
				</select>
			</div>
			<input type="text" v-model="customer_address" class="px-3 py-2 border-gray-1 outline-0 text-muted hand my-2" placeholder="请填写收货详细地址"/>
			<div class="d-flex justify-end">
				<button class="border-0 outline-0 py-2 px-4 text-white bg-green bg-hover-light-green hand rounded" @click="save_clicked()"> 保 存 </button>
				<button class="border-0 outline-0 py-2 px-4 text-white bg-red bg-hover-light-red hand rounded ml-3" @click="edit_status_clicked(undefined)"> 取 消 </button>
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
			edit_status_clicked : "customer/edit_status_clicked",
		}),
		...mapActions({
			update_address : "customer/update_address",
			update_address_default : "customer/update_address_default",
			delete_address : "customer/delete_address"
		}),
		// 编辑按钮被点击
		edit_button_clicked(){
			// 根据 当前收货信息的一级行政地区名称 查询 二级行政地区
			this.city_list = China.getChildrenByName( { search_list : this.customer.china_list , china_name : this.province_name } )
			// 根据 当前收货信息的二级行政地区名称 查询 三级行政地区
			this.district_list = China.getChildrenByName( { search_list : this.city_list , china_name : this.city_name } )
			// 改变 当前处于编辑状态的 收货信息
			this.edit_status_clicked(this.address)
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
		// 【保存】按钮被点击
		save_clicked(){
			// 将 编辑模式的临时数据 赋值给 当前收货信息对象
			this.customer.address_edit.uaddr_name = this.customer_name
			this.customer.address_edit.uaddr_phone = this.customer_phone
			this.customer.address_edit.uaddr_address = this.customer_address
			this.customer.address_edit.uaddr_province = this.province_name
			this.customer.address_edit.uaddr_city = this.city_name
			this.customer.address_edit.uaddr_district = this.district_name
			
			// 发送 ajax 请求 将 更新后的 收货信息 同步到 服务器端的数据库中
			this.update_address()
		}
	},
	mounted() {
		// 将 当前收货信息 赋值给 编辑模式临时数据
		this.customer_name = this.address.uaddr_name
		this.customer_phone = this.address.uaddr_phone
		this.customer_address = this.address.uaddr_address
		this.province_name = this.address.uaddr_province
		this.city_name = this.address.uaddr_city
		this.district_name = this.address.uaddr_district
	},
	props : ["address"]
}
</script>

<style>
</style>
