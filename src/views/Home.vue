<template>
	<!--  轮播栏   -->
	<div class="container d-flex justify-between">
		<!--  左侧分类   -->
		<div class="carousel-category shadow rounded-left py-2 position-relative">
			<!--  一级分类  -->
			<div class="text-xs text-gray bg-hover-light text-hover-red"
				v-for="cate_big of product.category_list"
				:key="`category-${cate_big.cate_id}`"
				@mouseover="category_hovered(cate_big)" @mouseout="category_outed()">
				<div class="hand py-1 px-3" >{{cate_big.cate_name}}</div>
				<!--  分类右面板  -->
				<div class="category-panel bg-white shadow p-3" 
					v-show="cate_big == product.category_current">
					<!--  二级分类  -->
					<div class="text-xs d-flex align-items-start mb-1"
						v-for="cate_mid of cate_big.children"
						:key="`category-${cate_mid.cate_id}`">
						<div class="text-gray text-hover-red text-bold hand w-10 text-right"> <span class="mr-2">{{cate_mid.cate_name}}</span> <span> &gt; </span> </div>
						<div class="d-flex flex-wrap w-90 ml-2">
							<!--  三级分类  -->
							<router-link to="/spu_list" class="text-muted text-hover-red text-decoration-none mx-2 mb-2"
								v-for="cate_small of cate_mid.children"
								:key="`category-${cate_small.cate_id}`"
								@click="category_clicked(cate_small)">{{cate_small.cate_name}}</router-link>
							<!--  /三级分类  -->
						</div>
					</div>
					<!--  /二级分类  -->
				</div>
				<!--  /分类右面板  -->
			</div>
			<!--  /一级分类  -->
		</div>
		<!--  /左侧分类   -->
		<!--  中间轮播图   -->
		<div class="carousel-image-list position-relative">
			<table class="carousel-table position-relative l-0 t-0 z-low" border="0px" cellpadding="0px" cellspacing="0px"
					:style="{left:`-${(website.carousel_current.carousel_id-1)*790}px`}" >
				<tr>
					<td v-for="carousel of website.carousel_list"
						:key="`carousel-image-${carousel.carousel_id}`">
						<img :src="`/${carousel.carousel_image}`" class="carousel-image-item"/>
					</td>
				</tr>
			</table>
			<div class="position-absolute b-4 r-5 z-high d-flex">
				<div class="p-2 rounded-circle hand ml-2"
					:class="{
						'bg-white' : car_control.carousel_id == website.carousel_current.carousel_id,
						'bg-white-alpha' : car_control.carousel_id != website.carousel_current.carousel_id
					}"
					v-for="car_control of website.carousel_list"
					:key="`car_control-${car_control.carousel_id}`"
					@click="car_control_clicked( car_control )"></div>
			</div>
		</div>
		<!--  /中间轮播图   -->
		<!--  右侧侧边栏   -->
		<div class="carousel-aside d-flex flex-column justify-between">
			<img src="/carousel-right01.jpg" class="w-100"/>
			<img src="/carousel-right02.jpg" class="w-100"/>
			<img src="/carousel-right03.jpg" class="w-100"/>
			<img src="/carousel-right01.jpg" class="w-100"/>
		</div>
		<!--  /右侧侧边栏   -->
	</div>
	<!--  /轮播栏   -->
	
	<!--  推荐商品 栏位  -->
	<div class="container mt-4" 
		v-for="(recommend_category,recommend_index) of product.home_recommend_category_list"
		:key="`recommend-${recommend_category.cate_id}`">
		
		<div class="d-flex">
			<div class="spu-list-title text-big text-bolder text-muted py-2 px-4 shadow">{{recommend_category.cate_name}} 专场</div>
		</div>
		
		<SpuList :spuList="product.home_recommend_spu_list[recommend_index]"></SpuList>
		
	</div>
	<!--  /推荐商品 栏位  -->
	
</template>

<script>
// 导入 组件
import SpuList from '@/components/SpuList.vue'
// 导入 辅助函数
import {mapState,mapMutations,mapActions} from 'vuex'

export default {
	computed:{
		...mapState(["website","product"])
	},
	methods:{
		...mapMutations({
			car_control_clicked : "website/car_control_clicked",
			category_hovered : "product/category_hovered",
			category_outed : "product/category_outed"
		}),
		...mapActions({
			getCategoryList : "product/getCategoryList",
			getHomeRecommendSpuList : "product/getHomeRecommendSpuList",
			category_clicked : "product/category_clicked"
		})
	},
	mounted() {
		// 获取 系统的分类列表
		// 先 尝试 从 本地缓存中 获取 分类列表
		// 判断 本地缓存中 是否存在 分类列表
		if( sessionStorage.getItem("category_list") ){
			// 本地缓存 中 存在 分类列表
			console.log( "从本地缓存中获取分类列表" )
			this.product.category_list = JSON.parse( sessionStorage.getItem("category_list") )
		}else{
			// 本地缓存 中 没有 分类列表
			console.log( "从服务器端获取分类列表" )
			this.getCategoryList()
		}
		
		// 获取 首页 的 推荐分类栏 中的 商品列表
		this.getHomeRecommendSpuList()
	},
	components:{
		'SpuList' : SpuList
	}
}

</script>

<style scoped="scoped">
/*  轮播中的分类栏  */
.carousel-category{
	width: 200px;
}
/*  轮播中的图片栏  */
.carousel-image-list{
	width: 790px;
	overflow: hidden;
}
/*  轮播中的图片栏表格  */
.carousel-table{
	transition: left .3s;
}
/*  轮播图片  */
.carousel-image-item{
	width: 790px;
}
/*  轮播中的侧边栏  */
.carousel-aside{
	width: 190px;
}

/*  分类面板  */
.category-panel{
	box-sizing: border-box;
	width: 800px;
	height: 100%;
	position: absolute;
	left: 200px;
	top: 0px;
	z-index: 10;
}

/*  商品列表的标题  */
.spu-list-title{
	border-radius: 6px 20px 20px 6px;
}
</style>
