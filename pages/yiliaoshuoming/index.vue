<template>
	<view class="index">
		<view class="container">
			<view class="items">
				<view class="item">
					<view class="tit1">一、{{ylsmObj.title}}</view>
					<view class="tit2">
						{{ylsmObj.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ylsmObj :null,
			}
		},
		onShow() {
			this.getData()
		},
		methods:{
			async getData(){
				const res = await this.$api.indexMedical_article()
				console.log(res)
				this.ylsmObj = res.data;
			},
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			const res = await this.$api.userShare({
				way:2,
				product_id:this.product_id
			});
			// console.log(res)
		
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline:async function() {
			const res = await this.$api.userShare({
				way:2,
				product_id:this.product_id
			});
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
		},
	}
</script>

<style scoped lang="scss">
	page{
		background: #ffffff;
	}
	.container{
		.items{
			margin: 44rpx 50rpx;
			.item{
				.tit1{
					opacity: 1;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: left;
					color: #000000;
					letter-spacing: 2rpx;
				}
				.tit2{
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #707071;
					letter-spacing: 2rpx;
				}
			}
		}
	}
</style>
