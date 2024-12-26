<template>
	<div class="container">
		<div class="text-muted text-bold">我的订单</div>
		<!--  一个订单详情  -->
		<div class="mt-3 rounded shadow p-3 text-xs text-muted"
			v-for="order of order.order_list"
			:key="`order-${order.id}`">
			<div class="d-flex mb-3">
				<div class="mr-3">{{order.createtime}}</div>
				<div class="mr-3">订单号：{{order.order_no}}</div>
				<div class="mr-3">
					订单状态：
					<template v-if="order.order_status == 0">已下单</template>
					<template v-if="order.order_status == 2">已付款</template>
					<template v-if="order.order_status == 4">已配货</template>
					<template v-if="order.order_status == 6">已发货</template>
					<template v-if="order.order_status == 8">已收货</template>
					<template v-if="order.order_status == 10">已评价</template>
					<template v-if="order.order_status == 30">退货中</template>
					<template v-if="order.order_status == 32">已退款</template>
					<template v-if="order.order_status == 34">退款失败</template>
					<template v-if="order.order_status == 40">已取消</template>
				</div>
				<div >支付金额：{{order.order_payamount}}</div>
			</div>
			<!--  标题行  -->
			<div class="py-1 border-gray-1 bg-lighter d-flex justify-between align-items-center text-sm text-muted">
				<div class="text-center flex-grow-1">
					商品
				</div>
				<div class="text-center w-10">
					单价
				</div>
				<div class="text-center w-10">
					数量
				</div>
				<div class="text-center w-10">
					小计
				</div>
			</div>
			<!--  /标题行  -->
			<!--  数据行  -->
			<div class="my-2 py-1 d-flex justify-between align-items-center text-sm text-gray"
				v-for="detail of order.orderDetailList"
				:key="`detail-${detail.id}`">
				<div class="text-center flex-grow-1 d-flex">
					<img :src="`/api/img/${detail.odtails_thumburl}`" class="hand cart-thumbnail"/>
					<div class="ml-2 d-flex flex-column justify-around align-items-start">
						<div class="hand text-hover-red">{{detail.odtails_name}}</div>
						<div class="d-flex text-muted">
							<div class="text-xs text-hover-red hand mr-1"
								v-for="attr of JSON.parse(detail.odtails_sku)"
								:key="`attr-${attr.key_id}`">{{attr.value_name}}</div>
						</div>
					</div>
				</div>
				<div class="text-center w-10">
					￥{{detail.odtails_price}}
				</div>
				<div class="text-center w-10">
					{{detail.odtails_count}}
				</div>
				<div class="text-center w-10">
					{{detail.odtails_amount}}
				</div>
			</div>
			<!--  /数据行  -->
			<div class="mt-3 d-flex justify-end">
				<div class="mr-3">收货人：{{order.orderAddress.consignee}}</div>
				<div class="mr-3">联系电话：{{order.orderAddress.phone}}</div>
				<div class="mr-3">
					配送地址：
					{{order.orderAddress.province}} 
					{{order.orderAddress.city}} 
					{{order.orderAddress.district}} 
					{{order.orderAddress.address}}
				</div>
			</div>
		</div>
		<!--  /一个订单详情  -->
	</div>
</template>

<script>
// 导入 辅助函数
import {mapState,mapActions} from 'vuex'

export default {
	computed:{
		...mapState(["order"])
	},
	methods:{
		...mapActions({
			get_order_list : "order/get_order_list"
		})
	},
	mounted() {
		// 发送 ajax请求 获取当前登录的用户的所有订单信息
		this.get_order_list()
	}
}
</script>

<style scoped="scoped">
.cart-thumbnail{
	width: 80px;
}
</style>
