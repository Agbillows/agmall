<template>
	<div class="container d-flex justify-between">
		<img src="/login_bg.png"/>
		<div class="flex-grow-1 ml-5 d-flex flex-column justify-between">
			<div class="text-muted text-bolder text-big text-center">注册新账户</div>
			<input type="text" v-model="customer.user_phone" placeholder="请输入手机号码" class="py-2 px-3 border-gray-1 outline-0 rounded"/>
			<input type="password" v-model="customer.user_password" placeholder="请输入账户密码" class="py-2 px-3 border-gray-1 outline-0 rounded"/>
			<input type="password" v-model="customer.check_password" placeholder="请再次确认密码" class="py-2 px-3 border-gray-1 outline-0 rounded"/>
			<input type="text" v-model="customer.user_name" placeholder="请输入用户昵称" class="py-2 px-3 border-gray-1 outline-0 rounded"/>
			<button class="py-2 border-0 outline-0 text-white bg-red bg-hover-light-red rounded hand" @click="regist_clicked()">立即注册</button>
		</div>
	</div>
</template>

<script>
	
// 导入 辅助函数
import {mapState,mapActions} from 'vuex'

export default {
	computed:{
		...mapState(["customer"])
	},
	methods:{
		...mapActions({
			regist_clicked : "customer/regist_clicked"
		})
	}
}
	
</script>

<style>
</style>
