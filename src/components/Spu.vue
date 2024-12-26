<template>
	<router-link to="/spu" class="text-decoration-none" @click="spu_clicked(spu)">
		<div class="spu p-2 shadow-hover mt-3 rounded hand" v-if="current_attr_value != undefined">
			<img :src="`/api/img/${current_attr_value.value_images[0]}`" class="w-100"/>
			<div class="d-flex mt-2 flex-wrap">
				<template 
					v-for="attrValue of spu.attrKeyList[0].attrValueList"
					:key="`attrValue-${attrValue.value_id}`">
					<img class="w-15 mr-1 mt-1"
						:class="{
							'border-red-1' : attrValue == current_attr_value,
							'border-gray-1' : attrValue != current_attr_value
						}"
						:src="`/api/img/${attrValue.value_images[0]}`"
						@mouseover="attrValueMouseovered(attrValue)"/>
				</template>
			</div>
			<div class="mt-3 text-big text-red text-bolder">
				￥{{spu.skuList[0].sku_price}}
			</div>
			<div class="mt-3 text-xs text-muted">
				{{spu.spu_name}}
			</div>
		</div>
	</router-link>
</template>

<script>
// 导入 辅助函数 
import {mapState} from 'vuex'

export default {
	props:["spu"],
	data(){
		return {
			// 当前选中的属性值
			current_attr_value : undefined
		}
	},
	computed:{
		...mapState(["product"])
	},
	methods:{
		// 某个属性值 鼠标略过 事件
		attrValueMouseovered( attrValue ){
			// 将 当前鼠标略过的 属性值 赋值给 data成员 current_attr_value
			this.current_attr_value = attrValue
		},
		// 某个商品被点击了
		spu_clicked( spu ){
			// 将 当前被点击的商品Spu 要赋值给 product仓库中的state状态数据中的 spu 成员
			this.product.spu = spu
			// 将 当前被点击的商品Spu 存入 本地缓存
			sessionStorage.setItem("spu", JSON.stringify( spu ) )
		}
	},
	mounted(){
		// 将 当前选中的属性值 默认设置为 当前商品spu的第一个属性值
		this.current_attr_value = this.spu.attrKeyList[0].attrValueList[0]
	}
}
</script>

<style scoped="scoped">
/*  一个商品的样式  */
.spu{
	width: 220px;
}
</style>
