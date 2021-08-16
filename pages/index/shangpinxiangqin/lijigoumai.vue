<template>
	<view class="index">
		<view class="container">
			<view class="items">
				<view class="item" v-for="item in list" :key='item.product_id'>
					<view class="nav2">
						<image v-if="item.pic_arr[0].img" class="pic1" :src="item.pic_arr[0].img" mode=""></image>
						<image v-else class="pic1" :src="item.images" mode=""></image>
						<view class="tit" v-if="item.product_info">
							<view class="tit1">{{item.product_info.title}}</view>
							<view class="tit2">
								<view class="tit2">{{item.sku_info.size}} ×{{item.stock}}</view>
								<view class="tit1">￥{{item.sku_info.price * item.stock}}</view>
							</view>
						</view>
						<view class="tit" v-else>
							<view class="tit1">{{item.title}}</view>
							<view class="tit2">
								<view class="tit2">{{item.size}} ×{{item.buy_number}}</view>
								<view class="tit1">￥{{item.total_price}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="items2">
				<view class="item" v-if="addressObj">
					<image class="pic1" src="/static/image/zu252@2x.png" mode=""></image>
					<view class="nav1">
						<view class="tit">
							<view class="tit2">收件地址</view>
						</view>
					</view>
					<view class="nav2">
						<view>
							<view class="box1">
								<view class="box1-1">
									<view class="tit1">收货人：{{addressObj[0].name}}</view>
									<view class="tit2">联系方式：{{addressObj[0].number}}</view>
								</view>
								<view class="box1-2">
									收货地址：{{addressObj[0].province + addressObj[0].city + addressObj[0].area + addressObj[0].address}}
								</view>
							</view>
							<view class="box2" @click="toXiugaixinxi()">
								<u-icon name="arrow-right" color="#6F7070" size="28"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view v-else @click="toXinjiandizhi" class="btn">新建地址</view>
			</view>
		</view>
		<view class="item3">
			<view class="item" @click="zffangshi(1)">
				<view class="nav1">
					<image class="pic1" src="/static/image/lujin514.png" mode=""></image>
					<view class="tit1">微信支付</view>
				</view>
				<view v-if="zffangshiId == 1" class="nav2"></view>
			</view>
			<view class="item" @click="zffangshi(2)">
				<view class="nav1">
					<image class="pic1" src="/static/image/zu520.png" mode=""></image>
					<view class="tit1">余额支付</view>
				</view>
				<view v-if="zffangshiId == 2" class="nav2"></view>
			</view>
		</view>


		<view class="footer">
			<view class="nav1">
				<view class="tit1">合计</view>
				<view class="tit2">￥{{priceNum}}</view>
			</view>
			<view class="nav2" @click="pay">提交订单</view>
		</view>
		<!-- 请先填写收货地址后再提交该订单 -->
		<u-popup class='txshouhuoShow' z-index="99999" v-model="txshouhuoShow" mode="center" border-radius="34">
			<view class="txshouhuoShow2">
				<view class="tit2">提示</view>
				<view class="tit1">请先设置默认收货地址后再提交该订单</view>
				<view class="btns">
					<view class="btn2" size="mini" @click='qxqd'>取消</view>
					<view class="btn1" size="mini" @click='qd'>确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 支付成功 -->
		<u-popup class='zfcgShow' z-index="99999" v-model="zfcgShow" mode="center" border-radius="34">
			<view class="zfcgShow2">
				<view class="tit1">支付成功</view>
				<image class="pic1" src="/static/image/mcz16.png" mode=""></image>
				<view class="btn1" size="mini" @click='zfcgqd'>确定</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txshouhuoShow: false,
				zfcgShow: false,
				list: [],
				addressObj: null,
				priceNum: 0,
				orderId: null,
				to: '',
				zffangshiId: 1,
				myPay_cart_arr: null,
			}
		},
		async onLoad(option) {
			if (option.shopArr) {
				// 购物车
				this.to = 'gwc';
				console.log(JSON.parse(option.shopArr), 123);
				JSON.parse(option.shopArr).forEach(ele => {
					if (ele) {
						this.list.push(ele)
					}
				})
				this.priceNum = 0
				this.list.forEach(ele => {
					this.priceNum += ele.sku_info.price * ele.stock;
				})
			} else if (option.ddshopArr) {
				// 订单
				this.to = 'dd';
				console.log(JSON.parse(option.ddshopArr), 456)
				this.orderId = option.orderId;
				JSON.parse(option.ddshopArr).forEach(ele => {
					if (ele) {
						this.list.push(ele)
					}
				})
				this.priceNum = 0
				this.list.forEach(ele => {
					this.priceNum += Number(ele.total_price);
				})
				console.log(this.list)
				const resp = await this.$api.orderBuy_again(this.orderId);
				console.log(resp, '再来一单')
				this.myPay_cart_arr = resp.data.pay_cart_arr;
			} else if (option.xqshop) {
				// 详情直接购买
				this.to = 'xq';
				console.log(JSON.parse(option.xqshop), 789);
				this.list.push(JSON.parse(option.xqshop))
				this.priceNum = JSON.parse(option.xqshop).total_price;
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.addressIndex()
				this.addressObj = res.data.filter(ele => {
					return ele.is_default == 1
				})
				console.log(this.addressObj)
				if (this.addressObj.length == 0) {
					this.txshouhuoShow = true;
				}
				if (this.to == 'xq') {
					const res2 = await this.$api.orderBuy_now({
						product_id: this.list[0].id,
						sku_id: this.list[0].sku_id,
						buy_num: this.list[0].buy_number,
						address_id: this.addressObj[0].address_id
					})
					console.log(res2, 'xq')
					this.orderId = res2.data.order_id;
				}
			},
			qxqd() {
				this.txshouhuoShow = false;
			},
			qd() {
				this.txshouhuoShow = false;
				uni.navigateTo({
					url: '/pages/wode/shouhuodizhi/shouhuodizhi'
				})
			},
			zfcgqd() {
				this.zfcgShow = false
				uni.switchTab({
					url: '/pages/wode/wode'
				})
			},
			toXinjiandizhi() {
				uni.navigateTo({
					url: '/pages/index/shouhuoxinxi/xinjian'
				})
			},
			toXiugaixinxi() {
				uni.navigateTo({
					url: '/pages/wode/shouhuodizhi/shouhuodizhi?isShop=1'
				})
			},
			zffangshi(i) {
				this.zffangshiId = i
			},
			async pay() {
				this.txshouhuoShow = false;
				if (this.addressObj.length == 0) {
					console.log(this.txshouhuoShow)
					this.txshouhuoShow = true;
					console.log(this.txshouhuoShow)
				} else {
					const that = this;
					var pay_cart_arr = [];
					this.list.forEach(ele => {
						if (ele.cart_id) {
							pay_cart_arr.push(ele.cart_id)
						} else {
							pay_cart_arr = null;
						}
					})
					if (this.to == 'gwc') {
						const res = await this.$api.orderPost_order({
							pay_cart_arr: pay_cart_arr.toString(),
							user_note: '',
							address_id: this.addressObj[0].address_id
						})
						console.log(res);
						if (res.code == 200) {
							const res2 = await this.$api.orderPay2order({
								order_id: res.data.order_id,
								pay_way: this.zffangshiId == 1 ? 'wechat' : 'balance',
								mini: 1,
							})
							console.log(res2)
							if (res2.code == 200) {
								if (this.zffangshiId == 1) {
									uni.requestPayment({
										provider: 'wxpay',
										timeStamp: res2.data.timeStamp.toString(),
										nonceStr: res2.data.nonceStr,
										package: res2.data.package,
										signType: res2.data.signType,
										paySign: res2.data.paySign,
										success: function(res) {
											that.zfcgShow = true
											console.log('success:' + JSON.stringify(res));
										},
										fail: function(err) {
											console.log('fail:' + JSON.stringify(err));
										}
									});
								} else {
									that.zfcgShow = true
								}
							} else {
								this.$refs.uToast.show({
									title: res2.message,
									type: 'warning',
									duration: 1000
								})
							}
						}
					} else if (this.to == 'dd') {
						if (this.myPay_cart_arr) {
							const resp = await this.$api.orderPost_order({
								pay_cart_arr: this.myPay_cart_arr,
								user_note: '',
								address_id: this.addressObj[0].address_id
							})
							console.log(resp);
							this.orderId = resp.data.order_id;
						}
						const res2 = await this.$api.orderPay2order({
							order_id: this.orderId,
							pay_way: this.zffangshiId == 1 ? 'wechat' : 'balance',
							mini: 1,
						})
						console.log(res2)
						if (res2.code == 200) {
							if (this.zffangshiId == 1) {
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: res2.data.timeStamp.toString(),
									nonceStr: res2.data.nonceStr,
									package: res2.data.package,
									signType: res2.data.signType,
									paySign: res2.data.paySign,
									success: function(res) {
										that.zfcgShow = true
										console.log('success:' + JSON.stringify(res));
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
							} else {
								that.zfcgShow = true
							}
						} else {
							this.$refs.uToast.show({
								title: res2.message,
								type: 'warning',
								duration: 1000
							})
						}
					} else if (this.to == 'xq') {
						const res3 = await this.$api.orderPay2order({
							order_id: this.orderId,
							pay_way: this.zffangshiId == 1 ? 'wechat' : 'balance',
							mini: 1,
						})
						console.log(res3)
						if (res3.code == 200) {
							if (this.zffangshiId == 1) {
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: res3.data.timeStamp.toString(),
									nonceStr: res3.data.nonceStr,
									package: res3.data.package,
									signType: res3.data.signType,
									paySign: res3.data.paySign,
									success: function(res) {
										that.zfcgShow = true
										console.log('success:' + JSON.stringify(res));
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
							} else {
								that.zfcgShow = true
							}
						} else {
							this.$refs.uToast.show({
								title: res3.message,
								type: 'warning',
								duration: 1000
							})
						}
					}
				}

			},
		}
	}
</script>

<style scoped lang="scss">
	.index {
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.container {
		.items {
			.item {
				margin: 0 auto;
				width: 703rpx;
				height: 192rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 18rpx;
				box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

				.nav2 {
					display: flex;
					margin-top: 24rpx;
					height: 163rpx;

					.pic1 {
						margin-top: 24rpx;
						margin-left: 13rpx;
						width: 140rpx;
						height: 140rpx;
						opacity: 1;
					}

					.tit {
						margin-left: 20rpx;
						margin-top: 24rpx;
						width: 492rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.tit1 {
							opacity: 1;
							font-size: 24rpx;
							font-family: PingFang SC, PingFang SC-Medium;
							font-weight: 500;
							color: #000000;
						}

						.tit2 {
							margin-top: 13rpx;
							height: 36rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.tit1 {
								opacity: 1;
								font-size: 24rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								color: #dd2638;
							}

							.tit2 {
								opacity: 1;
								font-size: 20rpx;
								font-family: PingFang SC, PingFang SC-Medium;
								font-weight: 500;
								color: #6f7070;
							}
						}
					}

				}


			}
		}

		.items2 {
			.item {
				margin: 36rpx auto;
				position: relative;
				width: 714rpx;
				height: 214rpx;

				.pic1 {
					position: absolute;
					top: 0;
					left: 0;
					width: 714rpx;
					height: 214rpx;
					opacity: 1;
				}

				.nav1 {
					position: absolute;
					top: 27rpx;
					left: 10rpx;
					display: flex;
					width: 90%;
					align-items: center;
					justify-content: space-between;

					.tit {
						display: flex;

						.tit1 {
							width: 9rpx;
							height: 31rpx;
							opacity: 1;
							background: #ebbfcc;
						}

						.tit2 {
							margin-left: 18rpx;
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #000000;
						}

						.tit3 {
							margin-left: 18rpx;
							opacity: 1;
							font-size: 25rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #ebbfcc;
						}
					}


				}

				.nav2 {
					position: relative;

					.box1 {
						position: absolute;
						top: 94rpx;
						left: 56rpx;

						.box1-1 {
							display: flex;

							.tit1 {
								opacity: 1;
								font-size: 20rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								color: #6f7070;
							}

							.tit2 {
								margin-left: 54rpx;
								opacity: 1;
								font-size: 22rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								color: #6f7070;
							}
						}

						.box1-2 {
							margin-top: 13rpx;
							opacity: 1;
							font-size: 22rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #6f7070;
						}
					}

					.box2 {
						height: 100rpx;
						width: 100rpx;
						position: absolute;
						right: 32rpx;
						top: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}

				}


			}

			.btn {
				// position: absolute;
				// top: 106rpx;
				// left: 24rpx;
				margin: 0 auto;
				width: 658rpx;
				height: 68rpx;
				opacity: 1;
				background: #dd2638;
				border-radius: 34rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 68rpx;
			}

		}

	}

	.item3 {
		margin: 20rpx 22rpx;

		.item {
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 706rpx;
			height: 80rpx;
			opacity: 1;
			background: #FFFFFF;
			border-radius: 10rpx;
			box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

			.nav1 {
				display: flex;
				align-items: center;

				.pic1 {
					margin-left: 40rpx;
					margin-right: 28rpx;
					width: 34rpx;
					height: 28rpx;
					opacity: 1;
				}

				.tit1 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #000000;
					letter-spacing: 0rpx;
				}
			}

			.nav2 {
				width: 20rpx;
				height: 20rpx;
				opacity: 1;
				background: #ffffff;
				border: 4rpx solid #ffcc02;
				border-radius: 50%;
				margin-right: 40rpx;
			}

		}
	}



	.footer {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 750rpx;
		height: 80rpx;
		opacity: 1;
		background: #ffffff;
		box-shadow: 0rpx -2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

		.nav1 {
			display: flex;
			align-items: center;
			height: 80rpx;
			width: 388rpx;
			// justify-content: center;
			padding-left: 48rpx;

			.tit1 {
				opacity: 1;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #000000;
			}

			.tit2 {
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #dd2638;
			}
		}

		.nav2 {
			width: 362rpx;
			height: 88rpx;
			opacity: 1;
			background: #dd2638;
			border-radius: 44rpx 0rpx 0rpx 44rpx;
			opacity: 1;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			line-height: 88rpx;
		}
	}

	// 
	.txshouhuoShow {
		.txshouhuoShow2 {
			position: relative;
			width: 470rpx;
			height: 248rpx;

			.tit2 {
				margin: 30rpx;
				opacity: 1;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #dd2638;
			}

			.tit1 {
				margin-bottom: 16rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #000000;
			}

			.btns {
				width: 100%;
				position: absolute;
				bottom: 0;
				height: 90rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.btn2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: left;
					color: #000000;
					letter-spacing: 2rpx;
				}

				.btn1 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: left;
					color: #dd2638;
					letter-spacing: 2rpx;
				}
			}
		}
	}

	.zfcgShow {
		.zfcgShow2 {
			width: 480rpx;
			height: 388rpx;
			opacity: 1;
			position: relative;

			.tit1 {
				margin-top: 30rpx;
				margin-bottom: 22rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #000000;
			}

			.pic1 {
				display: block;
				margin: 0 auto;
				width: 262rpx;
				height: 200rpx;
				opacity: 1;
			}

			.btn1 {
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #dd2638;
				letter-spacing: 2rpx;
				position: absolute;
				bottom: 0;
				height: 100rpx;
				width: 100%;
				line-height: 100rpx;
				text-align: center;
			}
		}
	}
</style>
