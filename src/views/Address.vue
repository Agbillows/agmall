<template>
	<div class="container d-flex justify-between flex-wrap align-items-start">
		
		<AddressEdit
			v-for="address of customer.address_list"
			:key="`address-${address.uaddr_id}`"
			:address="address"></AddressEdit>
		
		<AddressAdd></AddressAdd>
		
	</div>
</template>

<script>
// 导入组件
import AddressEdit from '@/components/AddressEdit.vue'
import AddressAdd from '@/components/AddressAdd.vue'

// 导入 辅助函数
import {mapState,mapActions} from 'vuex'

export default {
	
	computed:{
		...mapState(["customer"])
	},
	methods:{
		...mapActions({
			get_address_list : "customer/get_address_list",
			get_china_list : "customer/get_china_list"
		})
	},
	components:{
		'AddressEdit' : AddressEdit,
		'AddressAdd' : AddressAdd
	},
	mounted() {
		// 获取 当前登录的用户的 所有收货信息
		this.get_address_list()
		// 获取 系统中所有的行政地区
		this.get_china_list()
	}
}

</script>

<style>
</style>
