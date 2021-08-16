<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<image class="pic1" src="/static/image/lujin519.png" mode=""></image>
			<view class="tit1">可提现金额（元）</view>
			<view class="tit2">
				<view class="tit2-1">¥</view>
				<view class="tit2-2">{{money}}</view>
			</view>
			<view class="tit3">
				<view class="txt1">提现金额</view>
				<view class="txt2">
					<view class="txt22">
						<view class="tit3-1">￥</view>
						<u-input placeholder="请输入金额" height="80" v-model="txprice" />
					</view>
					<view @click="qbtx" class="tit3-2">全部提现</view>
				</view>
			</view>
			<view class="tit4">
				<view class="txt1">提现至</view>
				<view class="txt2">
					<image class="pic11" src="/static/image/lujin514.png" mode=""></image>
					<view class="txt2-1">微信零钱</view>
				</view>
			</view>
		</view>
		<view class="nav2">
			<view class="tit1">提现须知</view>
			<view class="tit2">
				<view class="txt1">一、这里是提现须知</view>
				<view class="txt2">二、这里是提现须知这里是提现须知这里是提现须知</view>
			</view>
		</view>
		<view class="footer" @click="tx">申请提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				txprice: 0,
			}
		},
		onLoad(option) {
			console.log(option.money);
			this.money = option.money;
		},
		methods: {
			qbtx() {
				this.txprice = this.money;
			},
			async tx() {
				const res = await this.$api.balanceWithdraw({
					money: this.txprice,
					bank_id: '',
				})
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: '提现成功！',
						type: 'success',
						url: '/pages/wode/wode',
						duration: 1000,
						isTab: true
					})
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {}

	.nav1 {
		position: relative;
		width: 750rpx;
		height: 496rpx;
		opacity: 1;

		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			width: 750rpx;
			height: 496rpx;
			opacity: 1;
		}

		.tit1 {
			position: absolute;
			left: 62rpx;
			top: 62rpx;
			opacity: 1;
			font-size: 22rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #ffffff;
			letter-spacing: 0rpx;
		}

		.tit2 {
			position: absolute;
			top: 98rpx;
			left: 62rpx;
			display: flex;
			align-items: flex-end;

			.tit2-1 {
				opacity: 1;
				font-size: 42rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				color: #ffffff;
				letter-spacing: -1rpx;
				transform: translateY(-6rpx);
			}

			.tit2-2 {
				margin-left: 12rpx;
				opacity: 1;
				font-size: 62rpx;
				font-family: PingFang SC, PingFang SC-Heavy;
				font-weight: 800;
				text-align: center;
				color: #ffffff;
				letter-spacing: -1rpx;
			}
		}

		.tit3 {
			position: absolute;
			top: 206rpx;
			left: 16rpx;
			border-radius: 16rpx;
			width: 718rpx;
			height: 326rpx;
			opacity: 1;
			background-color: #FFFFFF;
			box-shadow: 0px 2rpx 2rpx 0rpx #DDDDDD;

			.txt1 {
				margin-top: 36rpx;
				margin-left: 46rpx;
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #000000;
				letter-spacing: 0rpx;
			}

			.txt2 {
				margin: 50rpx 54rpx 0 44rpx;
				padding-bottom: 29rpx;
				border-bottom: 2rpx solid #ededed;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;

				.txt22 {
					display: flex;
					.tit3-1 {
						opacity: 1;
						font-size: 58rpx;
						font-family: PingFang SC, PingFang SC-Heavy;
						font-weight: 800;
						color: #141313;
						margin-right: 10rpx;
					}
				}
				.tit3-2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #dd2638;
					letter-spacing: 0rpx;
				}
			}
		}

		.tit4 {
			position: absolute;
			top: 464rpx;
			margin-left: 62rpx;
			display: flex;
			width: 616rpx;
			justify-content: space-between;

			.txt1 {
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #000000;
				letter-spacing: 0rpx;
			}

			.txt2 {
				display: flex;
				align-items: center;

				.pic11 {
					width: 34rpx;
					height: 28rpx;
					opacity: 1;
					margin-right: 20rpx;
				}

				.txt2-1 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #000000;
					letter-spacing: 0rpx;
				}
			}
		}

	}

	.nav2 {
		margin-left: 16rpx;
		margin-top: 50rpx;
		width: 718rpx;
		height: 226rpx;
		opacity: 1;
		background-color: #FFFFFF;
		box-shadow: 0px 2rpx 2rpx 0rpx #DDDDDD;
		padding-top: 38rpx;

		.tit1 {
			opacity: 1;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: center;
			color: #000000;
		}

		.tit2 {
			margin-top: 32rpx;
			margin-left: 46rpx;

			.txt1 {
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #000000;
				letter-spacing: 0rpx;
			}

			.txt2 {
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #000000;
				letter-spacing: 0rpx;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 762rpx;
		height: 100rpx;
		opacity: 1;
		background: #DD2638;
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		letter-spacing: 0rpx;
		line-height: 100rpx;
	}
</style>
