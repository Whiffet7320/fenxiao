<template>
	<view class="index">
		<view class="container">
			<u-toast ref="uToast" />
			<view class="banner">
				<u-swiper :effect3d="true" mode='round' indicator-pos="bottomRight" height='640' :list="bannerList">
				</u-swiper>
			</view>
			<view class="nav1">
				<image class="pic1" src="/static/image/juxin995.png" mode=""></image>
				<view class="nav1-1">
					<view class="tit1">¥{{newPrice}}</view>
					<view class="tit2">月销{{shopObj.month_sell_num}}｜邮费:{{shopObj.deliver_fee}}</view>
				</view>
				<view class="nav1-2">{{shopObj.title}}</view>
				<view class="nav1-3">
					<view @click="shoucang(shopObj.id)">
						<view class="tit1" v-if="isShoucang == 1">
							<image class="pic1" src="/static/image/lujin871.png" mode=""></image>
							<view class="txt1 active">已收藏</view>
						</view>
						<view class="tit1" v-else>
							<image class="pic1" src="/static/image/lujin76.png" mode=""></image>
							<view class="txt1">收藏</view>
						</view>

					</view>
					<!-- 					<view class="tit2" @click="fengxiang(shopObj.id)">
						<image class="pic1" src="/static/image/zu453.png" mode=""></image>
						<view class="txt1">分享</view>
					</view> -->
					<button class="tit2-1" open-type="share">
						<!-- <view class="tit2" @click="fengxiang(shopObj.id)"> -->
						<image class="pic1" src="/static/image/zu453.png" mode=""></image>
						<view class="txt1">分享</view>
						<!-- </view> -->
					</button>
					<!-- <view class="tit2 active">
						<image class="pic1" src="/static/image/zu453.png" mode=""></image>
						<view class="txt1">分享</view>
					</view> -->
				</view>
			</view>
			<view class="nav2">
				<view class="tit1">选择规格</view>
				<view class="items">
					<view v-for="item in ggList" :key="item" @click="onGGBtn(item)"
						:class="{'item':true,'active':item.sku_id == gg}">{{item.size}}</view>
				</view>
				<view class="tit2">
					<view class="txt1">
						<view class="txt1-1">购买数量</view>
						<view class="txt1-2">库存187件</view>
					</view>
					<view class="txt2">
						<image @click="goodsjian" class="pic1" src="/static/image/zu488.png" mode=""></image>
						<view class="pic2">
							<image class="pic1" src="/static/image/juxin1000.png" mode=""></image>
							<view class="txt2-1">{{goods_num}}</view>
						</view>
						<image @click="goodsjia" class="pic1" src="/static/image/zu487.png" mode=""></image>
					</view>

				</view>
			</view>
			<view class="nav3">
				<view class="nav3-1">
					<view class="tit1">宝贝评价({{pjList.length}})</view>
					<view @click="topingjia" class="tit2">查看更多 >></view>
				</view>
				<view class="items">
					<view class="item" v-for="item in pjList" :key='item'>
						<view class="nav11">
							<image class="pic11" :src="item.user_info.avatar" mode=""></image>
							<view class="nav1-11">
								<view class="txt1">{{item.user_info.username}}</view>
								<view class="txt2">{{item.create_at}}</view>
							</view>
						</view>
						<view class="nav12">{{item.content}}</view>
					</view>
				</view>
			</view>
			<view class="nav4">
				<view class="tit1">商品详情</view>
				<u-parse :html="shopObj.desc"></u-parse>
				<view class="itemem"></view>
			</view>
			<view class="footer">
				<view class="tit1">
					<image class="pic1" src="/static/image/lujin871.png" mode=""></image>
					<view class="txt1 active">已收藏</view>
				</view>
				<view class="tit2" @click="addGwc">加入购物车</view>
				<view class="tit3" @click="toLijigoumai">立即购买</view>
			</view>
			<!-- 加入购物车 -->
			<u-popup v-model="gwcShow" mode="center" border-radius="34">
				<view class="gwcShow">
					<image class="pic1" src="/static/image/mcz14.png" mode=""></image>
					<view class="tit1">商品已成功加入购物车</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product_id: null,
				shopObj: null,
				ggList: [],
				bannerList: [],
				pjList: [],
				price: 0,
				newPrice: 0,
				gg: '', //规格按钮
				size: '',
				goods_num: 1, //商品数量
				gwcShow: false,
				isShoucang: 0
			}
		},
		watch: {
			goods_num: function() {
				console.log(this.goods_num)
				this.newPrice = this.price * this.goods_num;
			}
		},
		//用户点击右上角分享转发
		onShareAppMessage: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			console.log(res)

			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/shangpinxiangqin/shangpinxiangqin?scene=0_${res.data.p_user_id}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			console.log(res)
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/shangpinxiangqin/shangpinxiangqin?scene=0_${res.data.p_user_id}`,
			}
		},
		onLoad(option) {
			this.product_id = option.product_id;
			console.log(this.product_id)
			if (option.scene) {
				const arr = option.scene.split('_')
				uni.setStorageSync('scene', arr[1])
				this.product_id = arr[0];
				uni.setStorageSync('myUserId', arr[1])
			} else {
				uni.setStorageSync('scene', 0)
			}
			console.log(uni.getStorageSync('scene'))
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				this.bannerList = [];
				const res = await this.$api.indexProduct_detail(this.product_id);
				console.log(res);
				this.shopObj = res.data;
				res.data.pic_arr.forEach(ele => {
					if (ele.path.slice(0, 1) == ".") {
						ele.path = ele.path.substr(1);
					}
					ele.img = ele.domain + ele.path;
					this.bannerList.push(ele.img)
				})
				this.ggList = res.data.sku_arr;
				// 评论
				const res2 = await this.$api.indexCommit_list({
					product_id: this.product_id,
					limit: 5,
					page: 1
				})
				console.log(res2);
				this.pjList = res2.data.data
				// 是否收藏
				const res3 = await this.$api.userCheck_favor(this.shopObj.id)
				console.log(res3, '收藏')
				if (res3.code != 200) {
					uni.navigateTo({
						url: `/pages/wode/weixinshouquan/weixinshouquan?recommend_userid=${uni.getStorageSync('myUserId')}&goods_id=${this.product_id}`
					})
				}
				this.isShoucang = res3.data.check;
			},
			async shoucang(id) {
				const res = await this.$api.userChange_favor(id);
				console.log(res);
				this.getData();
			},
			async fengxiang(id) {
				const res = await this.$api.userShare({
					way: 2,
					product_id: id
				});
				console.log(res);
			},
			onGGBtn(item) {
				console.log(item)
				if (item.sku_id == this.gg) {
					this.gg = '';
				} else {
					this.gg = item.sku_id;
					this.size = item.size;
				}
				this.price = item.price;
				this.newPrice = item.price * this.goods_num;
			},
			goodsjian() {
				if (this.goods_num <= 1) {
					this.goods_num == 1;
				} else {
					this.goods_num--;
				}
			},
			goodsjia() {
				this.goods_num++;
			},
			async addGwc() {
				const res = await this.$api.cartAdd2cart({
					product_id: this.product_id,
					sku_id: this.gg,
					stock: this.goods_num,
				})
				console.log(res)
				if (res.code == 200) {
					this.gwcShow = true;
					setTimeout(() => {
						this.gwcShow = false;
					}, 1000)
				} else {
					// this.$refs.uToast.show({
					// 	title: res.message,
					// 	type: 'warning',
					// 	duration: 1000
					// })
					this.$refs.uToast.show({
						title: '请选择规格',
						type: 'warning',
						duration: 1000
					})
				}
			},
			toLijigoumai() {
				if (!this.size) {
					this.$refs.uToast.show({
						title: '请选择规格',
						type: 'warning',
						duration: 1000
					})
				} else {
					this.shopObj.buy_number = this.goods_num;
					this.shopObj.size = this.size;
					this.shopObj.sku_id = this.gg;
					this.shopObj.total_price = this.newPrice;
					delete this.shopObj.desc
					uni.navigateTo({
						url: `/pages/index/shangpinxiangqin/lijigoumai?xqshop=${JSON.stringify(this.shopObj)}`
					})
				}
			},
			topingjia() {
				uni.navigateTo({
					url: `/pages/index/shangpinxiangqin/shangpinpingjia?product_id=${this.product_id}`
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {}

	.container {
		.banner {}

		.nav1 {
			margin: 16rpx;
			position: relative;
			width: 718rpx;
			height: 244rpx;

			.pic1 {
				position: absolute;
				top: 0;
				left: 0;
				width: 718rpx;
				height: 244rpx;
				opacity: 1;
			}

			.nav1-1 {
				width: 100%;
				position: absolute;
				top: 30rpx;
				padding-left: 36rpx;
				padding-right: 38rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tit1 {
					opacity: 1;
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #dd2638;
				}

				.tit2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					color: #6f7070;
				}
			}

			.nav1-2 {
				position: absolute;
				top: 91rpx;
				padding-left: 36rpx;
				padding-right: 38rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #000000;
			}

			.nav1-3 {
				position: absolute;
				top: 189rpx;
				padding-left: 36rpx;
				padding-right: 38rpx;
				display: flex;

				.tit1 {
					display: flex;
					align-items: center;
					margin-left: 231rpx;

					.pic1 {
						margin-left: 231rpx;
						width: 28rpx;
						height: 26rpx;
						opacity: 1;
					}

					.txt1 {
						width: 70rpx;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: center;
						color: #6f7070;
						letter-spacing: 0rpx;
					}

					.txt1.active {
						color: #dd2638;
					}
				}

				.tit2-1::after {
					border: none;
				}

				.tit2-1 {
					margin: 0;
					padding: 0;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					width: 100rpx;
					height: 30rpx;
					margin-left: 100rpx;

					// .tit2 {
					// 	display: flex;
					// 	align-items: center;
					// 	margin-left: 138rpx;
					.pic1 {
						// margin-left: 108rpx;
						width: 28rpx;
						height: 26rpx;
						opacity: 1;
					}

					.txt1 {
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						color: #6f7070;
						letter-spacing: 0rpx;
						transform: translate(41rpx, 0);
					}

					// }
				}

				.tit2.active {
					margin-left: 110rpx;
				}

				// .tit2 {
				// 	display: flex;
				// 	align-items: center;
				// 	margin-left: 138rpx;

				// 	.pic1 {
				// 		margin-left: 108rpx;
				// 		width: 28rpx;
				// 		height: 26rpx;
				// 		opacity: 1;
				// 	}

				// 	.txt1 {
				// 		font-size: 20rpx;
				// 		font-family: PingFang SC, PingFang SC-Regular;
				// 		font-weight: 400;
				// 		color: #6f7070;
				// 		letter-spacing: 0rpx;
				// 	}
				// }
			}


		}

		.nav2 {
			overflow: hidden;
			margin: 12rpx 22rpx;
			width: 706rpx;
			// height: 366rpx;
			opacity: 1;
			background: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

			.tit1 {
				margin-top: 26rpx;
				margin-left: 30rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #000000;
			}

			.items {
				margin-top: 20rpx;
				margin-left: 30rpx;

				.item {
					margin-bottom: 20rpx;
					display: inline-block;
					width: 260rpx;
					height: 58rpx;
					margin-right: 24rpx;
					opacity: 1;
					background: #f7f7f7;
					border-radius: 20rpx;
					text-align: center;
					line-height: 58rpx;
					font-size: 22rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
				}

				.item.active {
					border: 2rpx solid #DD2638;
					background: rgb(255, 247, 248);
					color: #DD2638;
				}
			}

			.tit2 {
				height: 25rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 28rpx;
				margin-bottom: 36rpx;

				.txt1 {
					display: flex;

					.txt1-1 {
						margin-left: 40rpx;
						margin-right: 24rpx;
						opacity: 1;
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: left;
						color: #000000;
					}

					.txt1-2 {
						opacity: 1;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: left;
						color: #6f7070;
					}
				}

				.txt2 {
					margin-right: 32rpx;
					display: flex;

					.pic1 {
						width: 58rpx;
						height: 58rpx;
						opacity: 1;
						margin: 0 3rpx;
					}

					.pic2 {
						position: relative;

						.pic1 {
							width: 58rpx;
							height: 58rpx;
							opacity: 1;
							margin: 0 3rpx;
						}

						.txt2-1 {
							position: absolute;
							top: 46%;
							left: 50%;
							transform: translate(-50%, -50%);
							font-size: 24rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #6f7070;
						}
					}


				}


			}
		}

		.nav3 {
			margin: 20rpx 22rpx;
			width: 706rpx;
			opacity: 1;
			background: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
			padding: 26rpx 32rpx 37rpx 30rpx;
			;

			.nav3-1 {
				display: flex;
				justify-content: space-between;

				.tit1 {
					opacity: 1;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #000000;
				}

				.tit2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #dd2638;
				}
			}

			.items {
				.item {
					.nav11 {
						margin-top: 37rpx;
						display: flex;
						height: 76rpx;

						.pic11 {
							width: 74rpx;
							height: 76rpx;
							margin-right: 22rpx;
						}

						.nav1-11 {
							display: flex;
							flex-direction: column;

							.txt1 {
								opacity: 1;
								font-size: 20rpx;
								font-family: PingFang SC, PingFang SC-Bold;
								font-weight: 700;
								text-align: left;
								color: #000000;
							}

							.txt2 {
								opacity: 1;
								font-size: 20rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								text-align: right;
								color: #707070;
							}
						}


					}

					.nav12 {
						margin-left: 96rpx;
						opacity: 1;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #000000;
					}

				}
			}

		}

		.nav4 {
			overflow: hidden;
			margin: 0 22rpx 0 22rpx;
			width: 706rpx;
			opacity: 1;
			background: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
			.itemem{
				height: 118rpx;
			}
			.tit1 {
				margin: 30rpx 0 22rpx 0;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #000000;
			}
		}

		.footer {
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			width: 750rpx;
			height: 88rpx;
			opacity: 1;
			background: #ffffff;
			box-shadow: 0rpx -6rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);

			.tit1 {
				width: 158rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.pic1 {
					width: 28rpx;
					height: 26rpx;
					opacity: 1;
				}

				.txt1 {
					margin-left: 10rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #6f7070;
					letter-spacing: 0rpx;
				}

				.txt1.active {
					color: #dd2638;
				}
			}

			.tit2 {
				width: 296rpx;
				height: 88rpx;
				opacity: 1;
				background: #dd2638;
				border-radius: 44rpx 0rpx 0rpx 44rpx;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				color: #ffffff;
				letter-spacing: 0rpx;
				line-height: 88rpx;
			}

			.tit3 {
				width: 296rpx;
				height: 88rpx;
				opacity: 1;
				background: #ffcc02;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				color: #ffffff;
				letter-spacing: 0rpx;
				line-height: 88rpx;
			}
		}

		// 购物车
		.gwcShow {
			width: 480rpx;
			height: 386rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pic1 {
				margin-top: 72rpx;
				width: 194rpx;
				height: 132rpx;
			}

			.tit1 {
				margin-top: 72rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #000000;
			}
		}
	}
</style>
