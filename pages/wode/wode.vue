<template>
	<view class="index">
		<view class="nav1">
			<image class="pic1" src="/static/image/lujin519.png" mode=""></image>
			<view class="box1">
				<image @click="toLogin" v-if="user.nickname" class="pic2" :src="user.avatar" mode=""></image>
				<image @click="toLogin" v-else src="/static/Group.png" class="pic2" mode=""></image>
				<view class="tit" v-if="user.nickname">
					<view class="tit1">
						<view class="tit1-1">{{user.nickname}}</view>
						<view class="tit1-2">Lv.{{user.level}}</view>
					</view>
					<view class="tit2">{{user.mobile}}</view>
				</view>
				<view class="tit" v-else>
					<view class="tit1">
						<view class="tit1-1">请点击头像先登录</view>
					</view>
					<view class="tit2"></view>
				</view>
				<view v-if="user.balance" v-else class="tit3">余额：{{user.balance}}</view>
				<view v-else class="tit3">余额：0</view>
			</view>
			<view class="box2">
				<image class="pic1" src="/static/image/zu244.png" mode=""></image>
				<view class="tit1">
					<view class="tit1-1">余额</view>
					<view v-if="user.balance" class="tit1-2">￥{{user.balance}}</view>
					<view v-else class="tit1-2">￥0</view>
				</view>
				<view class="btn" @click="totixian">立即提现</view>
			</view>
		</view>
		<view class="nav2">
			<view class="btn2-1">认证中心</view>
			<view class="box2">
				<view class="box2-1" @click="tosfzrenzheng">
					<view class="tit1">
						<image v-if="user.is_realname == 1" class="pic1" src="/static/image/zu249active.png" mode="">
							<image v-else class="pic1" src="/static/image/zu249.png" mode=""></image>
						</image>
						<view class="tit1-1">身份证认证</view>
					</view>
					<view v-if="user.is_realname == 1" class="tit3">已认证</view>
					<view v-else class="tit2">未认证</view>
				</view>
				<view class="box2-1" @click="tothkrenzheng">
					<view class="tit1">
						<image v-if="user.is_bankcard == 1" class="pic1" src="/static/image/zu250active.png" mode="">
						</image>
						<image v-else class="pic1" src="/static/image/zu250.png" mode=""></image>
						<view class="tit1-1">银行卡认证</view>
					</view>
					<view v-if="user.is_bankcard == 1" class="tit3">已认证</view>
					<view v-else class="tit2">未认证</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view @tap="toQuanbudingdan(-1)" class="item">
				<image class="pic1" src="/static/image/zu463.png" mode=""></image>
				<view class="tit1">全部订单</view>
			</view>
			<view @tap="toQuanbudingdan(0)" class="item">
				<image class="pic1 dd3" src="/static/image/zu454.png" mode=""></image>
				<view class="tit1">待付款</view>
			</view>
			<view @tap="toQuanbudingdan(1)" class="item">
				<image class="pic1 dd1" src="/static/image/lujin872.png" mode=""></image>
				<view class="tit1">待发货</view>
			</view>
			<view @tap="toQuanbudingdan(2)" class="item">
				<image class="pic1 dd2" src="/static/image/zu455.png" mode=""></image>
				<view class="tit1">待收货</view>
			</view>
			<view @tap="toQuanbudingdan(3)" class="item">
				<image class="pic1 dd4" src="/static/image/zu456.png" mode=""></image>
				<view class="tit1">已完成</view>
			</view>
		</view>
		<view class="nav4">
			<view class="item" @click="toshouhuo">
				<image class="pic1" src="/static/image/lujin534.png" mode=""></image>
				<view class="box1">
					<view class="tit1">送货地址</view>
					<u-icon class="right-icon" name="arrow-right" color="#dddddd" size="24"></u-icon>
				</view>
			</view>
			<view class="item" @click="tokefu">
				<image class="pic1 dd1" src="/static/image/zu326.png" mode=""></image>
				<view class="box1">
					<view class="tit1">客服系统</view>
					<u-icon class="right-icon" name="arrow-right" color="#dddddd" size="24"></u-icon>
				</view>
			</view>
			<view class="item" @click="tofenxiang">
				<image class="pic1 dd2" src="/static/image/zu325.png" mode=""></image>
				<view class="box1">
					<view class="tit1">分享</view>
					<u-icon class="right-icon" name="arrow-right" color="#dddddd" size="24"></u-icon>
				</view>
			</view>
			<view class="item" @click="todengji">
				<image class="pic1 dd3" src="/static/image/zu484.png" mode=""></image>
				<view class="box1">
					<view class="tit1">等级说明</view>
					<u-icon class="right-icon" name="arrow-right" color="#dddddd" size="24"></u-icon>
				</view>
			</view>
		</view>
		<!-- 身份证验证通过后才可进行此操作 -->
		<u-popup class='txshouhuoShow' z-index="99999" v-model="txshouhuoShow" mode="center" border-radius="34">
			<view class="txshouhuoShow2">
				<view class="tit2">提示</view>
				<view class="tit1">身份证验证通过后才可进行此操作</view>
				<view class="btns">
					<view class="btn2" size="mini" @click='qxqd'>取消</view>
					<view class="btn1" size="mini" @click='qd'>确定</view>
				</view>
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
				userName: null,
				openid: null,
				user: null,
			}
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			// console.log(res)

			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.userInfo()
				console.log(res, 11)
				if (res.code == 200) {
					this.user = {
						...res.data
					}
				}
			},
			toshouhuo() {
				console.log(this.user)
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				} else {
					uni.navigateTo({
						url: '/pages/wode/shouhuodizhi/shouhuodizhi'
					})
				}
			},
			tokefu() {
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				} else {
					uni.navigateTo({
						url: '/pages/wode/kefu/kefu'
					})
				}

			},
			toQuanbudingdan(i) {
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				} else {
					uni.navigateTo({
						url: `/pages/wode/wodeQuanbudingdan/quanbudingdan?orders_status=${i}`
					})
				}

			},
			tofenxiang() {
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				} else {
					uni.navigateTo({
						url: `/pages/wode/fenxiang/fenxiang`
					})
				}

			},
			todengji() {
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				} else {
					uni.navigateTo({
						url: `/pages/wode/dengji/dengji?level=${this.user.level}`
					})
				}

			},
			totixian() {
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				} else {
					uni.navigateTo({
						url: `/pages/wode/lijitixian/lijitixian?money=${this.user.balance}`
					})
				}

			},
			qxqd() {
				this.txshouhuoShow = false;
			},
			qd() {
				this.txshouhuoShow = false;
				uni.navigateTo({
					url: '/pages/wode/shenfenzhengrenzheng/shenfenzhengrenzheng'
				})
			},
			tothkrenzheng() {
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				} else {
					if (this.user.is_realname == 0) {
						this.txshouhuoShow = true
					} else {
						uni.navigateTo({
							url: '/pages/wode/yinhangkarenzheng/yinhangkarenzheng'
						})
					}
				}

			},
			tosfzrenzheng() {
				if (!this.user) {
					this.$refs.uToast.show({
						title: '请登录',
						type: 'warning',
						duration: 1000
					})
				}else{
					uni.navigateTo({
					url: '/pages/wode/shenfenzhengrenzheng/shenfenzhengrenzheng'
				})
				}
				
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/wode/weixinshouquan/weixinshouquan'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}

	.index {}

	.nav1 {
		position: relative;
		height: 524rpx;

		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			width: 750rpx;
			height: 524rpx;
			opacity: 1;
		}

		.box1 {
			position: absolute;
			left: 50rpx;
			top: 164rpx;
			display: flex;
			align-items: center;

			.pic2 {
				width: 116rpx;
				height: 116rpx;
				opacity: 1;
			}

			.tit {
				width: 386rpx;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;

				.tit1 {
					display: flex;
					align-items: center;

					.tit1-1 {
						opacity: 1;
						font-size: 28rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
					}

					.tit1-2 {
						margin-left: 16rpx;
						width: 64rpx;
						height: 28rpx;
						opacity: 1;
						background: #dd2638;
						border-radius: 14rpx;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 28rpx;
					}
				}

				.tit2 {
					margin-top: 12rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #ffffff;
				}
			}

			.tit3 {
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #ffffff;
			}
		}

		.box2 {
			position: absolute;
			top: 300rpx;
			left: 28rpx;
			width: 694rpx;
			height: 102rpx;

			.pic1 {
				width: 694rpx;
				height: 102rpx;
				opacity: 1;
			}

			.tit1 {
				position: absolute;
				top: 32rpx;
				left: 74rpx;
				display: flex;
				align-items: flex-end;

				.tit1-1 {
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #dd2638;
				}

				.tit1-2 {
					opacity: 1;
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 800;
					text-align: center;
					color: #dd2638;
				}
			}

			.btn {
				position: absolute;
				right: 50rpx;
				top: 22rpx;
				width: 156rpx;
				height: 56rpx;
				opacity: 1;
				border: 2rpx solid #dd2638;
				border-radius: 28rpx;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #dd2638;
				line-height: 56rpx;
			}
		}

	}

	.nav2 {
		margin-left: 34rpx;
		transform: translateY(-80rpx);
		width: 682rpx;
		height: 140rpx;
		opacity: 1;
		background: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

		.btn2-1 {
			margin-left: 260rpx;
			transform: translateY(-26rpx);
			width: 164rpx;
			height: 52rpx;
			background: #dd2638;
			border-radius: 26rpx;
			opacity: 1;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 52rpx;
		}

		.box2 {
			width: 100%;
			height: 140rpx;
			display: flex;

			.box2-1 {
				width: 50%;
				height: 100%;
				transform: translateY(-20rpx);

				.tit1 {
					display: flex;
					align-items: center;
					justify-content: center;

					.pic1 {
						width: 24rpx;
						height: 20rpx;
						opacity: 1;
					}

					.tit1-1 {
						margin-left: 10rpx;
						opacity: 1;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: center;
						color: #c7c7c7;
					}
				}

				.tit2 {
					margin-top: 6rpx;
					text-align: center;
					opacity: 1;
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: center;
					color: #000000;
				}

				.tit3 {
					margin-top: 6rpx;
					text-align: center;
					opacity: 1;
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: center;
					color: #DD2638;
				}
			}
		}

	}

	.nav3 {
		margin-left: 34rpx;
		transform: translateY(-60rpx);
		width: 682rpx;
		height: 140rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
		display: flex;
		justify-content: space-between;
		padding: 0 34rpx;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.pic1 {
				width: 36rpx;
				height: 40rpx;
				opacity: 1;
			}

			.pic1.dd3 {
				width: 42rpx;
				height: 40rpx;
				opacity: 1;
			}

			.pic1.dd1 {
				width: 42rpx;
				height: 42rpx;
				opacity: 1;
			}

			.pic1.dd2 {
				width: 56rpx;
				height: 40rpx;
				opacity: 1;
			}

			.pic1.dd4 {
				width: 38rpx;
				height: 42rpx;
				opacity: 1;
			}

			.tit1 {
				margin-top: 15rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #121212;
				line-height: 36rpx;
			}
		}
	}

	.nav4 {
		margin-left: 34rpx;
		transform: translateY(-40rpx);
		width: 682rpx;
		height: 364rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

		.item {
			height: 25%;
			display: flex;
			align-items: center;

			.pic1 {
				margin-left: 54rpx;
				margin-right: 32rpx;
				width: 24rpx;
				height: 32rpx;
				opacity: 1;
			}

			.pic1.dd1 {
				margin-left: 50rpx;
				width: 28rpx;
				height: 24rpx;
				opacity: 1;
			}

			.pic1.dd2 {
				margin-left: 50rpx;
				width: 28rpx;
				height: 22rpx;
				opacity: 1;
			}

			.pic1.dd3 {
				margin-left: 52rpx;
				width: 26rpx;
				height: 32rpx;
				opacity: 1;
			}

			.box1 {
				height: 100%;
				width: 572rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx solid #ededed;

				.right-icon {
					margin-right: 45rpx;
				}
			}
		}
	}

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
</style>
