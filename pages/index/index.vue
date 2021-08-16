<template>
	<view class="shop">
		<!-- 		<view class="top">
			<u-toast ref="uToast" />
			<u-input class="shop-search" placeholder="请输入商品名称" placeholder-style="color: #9b9b9b" input-align="center"
				height="60" border="true" border-color="#eeeeee"  v-model="searchVal" type="text" @confirm='onSearch' />
		</view> -->
		<view class="banner">
			<u-input class="shop-search" placeholder="请输入商品名称" placeholder-style="color: #000000" input-align="center"
				height="60" border-color="#eeeeee" @click="toSousuo" v-model="searchVal" type="text"
				@confirm='onSearch' />
			<image class="searchIcon" src="/static/image/zu6.png" mode=""></image>
			<u-swiper mode='number' indicator-pos="bottomRight" height='340' :list="bannerList"></u-swiper>
		</view>
		<view class="scroll1">
			<view class="nav1">
				<scroll-horizontal-tab :tabBars="tabBars" @onTabTap="onTabTap"></scroll-horizontal-tab>
			</view>
		</view>
		<view class="container">
			<view class="nav1">
				<view class="tit1">商品列表</view>
			</view>
			<view class="nav2">
				<!-- 横向 -->
				<!-- 				<scroll-view class="scroll-view" scroll-x @scroll="scroll" style="width: 100%;white-space:nowrap;">
					<image v-for="(item,i) in list" class="pic1" :src="item.img" mode="">
					</image>
				</scroll-view> -->
				<!-- 纵向 -->
				<!-- <scroll-view class="scroll-view y" scroll-y @scroll="scroll"> -->
				<!-- 					<view class="box" v-for="(item,i) in list" :key='i'>
						<image class="pic1" :src="item.img" mode="">
						</image>
						<view class="title">{{item.title}}</view>
						<view class="nav1">￥{{item.price}}</view>
					</view> -->

				<view @click="toxiangqin(item)" class="box" v-for="(item,i) in shopList" :key='i'>
					<image class="pic1" :src="item.pic_arr[0].img" mode="">
					</image>
					<view class="title">{{item.title}}</view>
					<view class="nav1">
						<view class="nav1-1">￥{{item.sku_arr[0].price}}</view>
						<view class="nav1-2">销量100</view>
					</view>
				</view>

				<!-- </scroll-view> -->
			</view>
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["allshopPage", "allshopPageSize"]),
		},
		watch: {
			allshopPage: function(page) {
				console.log('ddpage')
				this.$store.commit("allshopPage", page);
				if (this.allshopPage != 1) {
					this.getData();
				}
			},
			// category_id:function(){
			// 	this.getData()
			// },
		},
		data() {
			return {
				searchVal: '',
				bannerList: [],
				shopList: [],
				category_id: 1,
				tabBars: [],
				swiperList: [],
				bannerlist: [],
				list: [],
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				}
			}
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
		async onLoad(option) {
			console.log(uni.getStorageSync('token'), 'token')
			console.log(option.scene)
			this.product_id = option.product_id;
			console.log(this.product_id)
			if (option.scene) {
				const arr = option.scene.split('_')
				uni.setStorageSync('scene', arr[1])
				this.product_id = arr[0];
				uni.setStorageSync('myUserId', arr[1])
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: `/pages/wode/weixinshouquan/weixinshouquan?recommend_userid=${uni.getStorageSync('myUserId')}`
					})
				}
			} else {
				uni.setStorageSync('scene', 0)
			}
			this.tabBars = [];
			const res3 = await this.$api.indexCategory();
			console.log(res3, 'fenlei')
			res3.data.forEach(ele => {
				this.tabBars.push({
					name: ele.title,
					id: ele.category_id
				});
			})
			this.bannerList = [];
			const res = await this.$api.indexBanner()
			res.data.forEach(ele => {
				if (ele.path.slice(0, 1) == ".") {
					ele.path = ele.path.substr(1);
				}
				ele.img = ele.domain + ele.path;
				this.bannerList.push(ele.img)
			})
		},
		onShow() {
			this.shopList = [];
			this.getData()
			this.$store.commit("allshopPage", 1);
		},
		onReachBottom() {
			this.$store.commit("allshopPage", this.allshopPage + 1);
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res2 = await this.$api.indexProduct_list({
						category_id: this.category_id,
						page: this.allshopPage,
						limit: this.allshopPageSize,
						keyword: '',
					})
					console.log(res2)
					res2.data.data.forEach(ele => {
						ele.pic_arr.forEach(item => {
							if (item.path.slice(0, 1) == ".") {
								item.path = item.path.substr(1);
							}
							item.img = item.domain + item.path;
						})
					})
					if (res2.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.shopList)
						this.shopList = this.shopList.concat(res2.data.data)
					}
				}, 200)
			},
			// 去商品详情
			toxiangqin(item) {
				uni.navigateTo({
					url: `/pages/index/shangpinxiangqin/shangpinxiangqin?product_id=${item.id}`
				})
			},
			// 搜索
			onSearch() {},
			toSousuo() {
				uni.navigateTo({
					url: '/pages/index/sousuo/sousuo'
				})
			},
			onTabTap(item) {
				console.log(item);
				this.category_id = item.id;
				this.shopList = [];
				this.$store.commit('allshopPage', 1)
				this.getData()
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/ .u-load-more-wrap {
		padding-bottom: 20rpx;
	}

	// .top {
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	margin: 30rpx 49rpx 0 49rpx;

	// 	.shop-search {
	// 		width: 658rpx;
	// 		height: 60rpx;
	// 		opacity: 1;
	// 		border-radius: 30rpx;
	// 	}

	// 	.search-icon {
	// 		width: 40rpx;
	// 		height: 40rpx;
	// 		opacity: 1;
	// 		margin-left: 28rpx;
	// 	}
	// }
	page {
		background: #f7f7f7;
	}

	.banner {
		margin: 0 auto;
		width: 750rpx;
		height: 340rpx;
		opacity: 1;
		background: rgba(0, 0, 0, 0.00);
		position: relative;

		.shop-search {
			position: absolute;
			top: 20rpx;
			right: 0;
			z-index: 999;
			width: 524rpx;
			height: 60rpx;
			opacity: 0.5;
			background: #ffffff;
			border-radius: 30rpx 0rpx 0rpx 30rpx
		}

		.searchIcon {
			position: absolute;
			top: 42rpx;
			z-index: 999;
			right: 30rpx;
			width: 18rpx;
			height: 18rpx;
			opacity: 1;
		}

		image {
			position: absolute;
			height: 100%;
			width: 100%;
		}
	}

	.scroll1 {
		height: 110rpx;
		// height: 85rpx;
		width: 750rpx;

		.nav1 {
			height: 110rpx;
			width: 100%
		}
	}


	.banner-bottom {
		width: 750rpx;
		height: 58rpx;
		opacity: 1;
		background: #f8f8f8;
		display: flex;
		align-items: center;

		.nav1 {
			display: flex;
			align-items: center;
			width: 141rpx;
			height: 40rpx;
			opacity: 1;
			background: #ebbfcc;
			border-radius: 0rpx 20rpx 20rpx 0rpx;

			.pic {
				margin-left: 17rpx;
				margin-right: 11rpx;
				width: 20rpx;
				height: 18rpx;
				opacity: 1;
			}

			.txt {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
			}
		}

		.nav2 {
			margin-left: 36rpx;
			display: flex;
			align-items: center;
			height: 40rpx;
			opacity: 1;

			.pic {
				margin-right: 7rpx;
				width: 20rpx;
				height: 18rpx;
				opacity: 1;
			}

			.txt {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #484848;
			}
		}

		.dian {
			width: 7rpx;
			height: 7rpx;
			opacity: 1;
			background: #ebbfcc;
			border-radius: 50%;
			margin: 0 18rpx 0 20rpx;
		}

		.nav3 {
			display: flex;
			align-items: center;
			height: 40rpx;
			opacity: 1;

			.pic {
				margin-right: 7rpx;
				width: 20rpx;
				height: 18rpx;
				opacity: 1;
			}

			.txt {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #484848;
			}
		}

		.nav4 {
			display: flex;
			align-items: center;
			height: 40rpx;
			opacity: 1;

			.pic {
				margin-right: 7rpx;
				width: 20rpx;
				height: 18rpx;
				opacity: 1;
			}

			.txt {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #484848;
			}
		}
	}

	.items {
		display: flex;
		justify-content: space-between;
		margin: 54rpx 100rpx 0rpx 100rpx;

		.item {
			opacity: 1;

			.item-cir {
				width: 110rpx;
				height: 110rpx;
				border: 2rpx solid #ebbfcc;
				border-radius: 60rpx;
			}

			.circle {
				margin: 7rpx 6rpx 6rpx 7rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 94rpx;
				height: 94rpx;
				opacity: 1;
				border-radius: 51rpx;
				background-color: #ebbfcc;

				.img1 {
					width: 53rpx;
					height: 49rpx;
					opacity: 1;
				}

				.img2 {
					width: 42rpx;
					height: 49rpx;
					opacity: 1;
				}

				.img3 {
					width: 56rpx;
					height: 47rpx;
					opacity: 1;
				}
			}

			.circle-title {
				margin-top: 16rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #333333;
				line-height: 30rpx;
			}
		}
	}

	.hots-arr {
		// margin: 0 22rpx 0 22rpx;
		margin: 0 49rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.hot-list {
			overflow: hidden;
			margin-top: 30rpx;
			width: 321rpx;
			height: 214rpx;
			opacity: 1;
			// background: url(/static/img.png) no-repeat;
			background-size: 100% 100%;
			position: relative;

			.hots {
				margin-top: 36rpx;

				.hotImg {
					position: absolute;
					top: 0;
					left: 0;
					width: 354rpx;
					height: 236rpx;
				}

				.bigT {
					position: absolute;
					top: 33rpx;
					left: 33rpx;
					width: 128rpx;
					heiFght: 32rpx;
					opacity: 1;
					font-size: 32rpx;
					color: #4a4a4a;
					line-height: 48rpx;
					font-weight: bold;
				}

				.smallT {
					position: absolute;
					top: 80rpx;
					left: 33rpx;
					width: 144rpx;
					height: 24rpx;
					opacity: 1;
					font-size: 24rpx;
					text-align: left;
					color: #9b9b9b;
					line-height: 36rpx;
				}
			}
		}
	}

	.henggang {
		margin: 63rpx auto 37rpx auto;
		width: 257rpx;
		height: 4rpx;
		opacity: 1;
		background: #121212;
	}

	.container {
		background: #ffffff;

		.nav1 {
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.tit1 {
				opacity: 1;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #000000;
			}
		}

		.nav2 {

			// margin: 0 0rpx;
			.box {
				display: inline-block;
				width: 330rpx;
				margin-left: 24rpx;

				.pic1 {
					width: 330rpx;
					height: 286rpx;
					opacity: 1;
					margin-left: 13rpx;
					margin-bottom: 16rpx;
				}

				.title {
					margin-left: 13rpx;
					padding: 0;
					width: 100%;
					opacity: 1;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #121314;
					line-height: 27rpx;
					letter-spacing: 1rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.nav1 {
					display: flex;
					justify-content: space-between;

					.nav1-1 {
						margin-left: 13rpx;
						// width: 100%;
						opacity: 1;
						font-size: 31rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #af0000;
						line-height: 92rpx;
					}

					.nav1-2 {
						opacity: 1;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: right;
						color: #c7c7c7;
					}
				}

			}

			.scroll-view.y {
				display: flex;
				justify-content: space-around;
			}

		}

	}

	/deep/ .u-tabbar__content__circle__border {
		display: none !important;
	}
</style>
