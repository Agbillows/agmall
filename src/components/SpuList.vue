<template>
	<div class="d-flex flex-wrap">
		<Spu v-for="spu of spuList"
			:key="`spu-${spu.spu_id}`"
			:spu="spu"></Spu>
	</div>
</template>

<script>
// 导入 组件
import Spu from '@/components/Spu.vue'

export default {
	components:{
		'Spu' : Spu
	},
	props:["spuList"]
}
</script>

<style>
</style>
