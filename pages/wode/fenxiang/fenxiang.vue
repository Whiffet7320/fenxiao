<template>
	<view class="index">
		<view class="nav1">
			<image class="pic1" src="/static/image/zu440.png" mode=""></image>
			<image class="pic2" src="/static/image/mcz116.png" mode=""></image>
		</view>
		<view class="nav2" @click="fenxiangshow">分享二维码</view>
		<view class="nav3">
			<!-- <image class="pic1" src="/static/image/juxin983.png" mode=""></image> -->
			<view class="tit1">
				<image class="pic1" src="/static/image/lujin863.png" mode=""></image>
				<view class="tit1-1">分销所得佣金：{{money}}</view>
			</view>
			<view class="tit2">
				<view class="tit2-1">
					<view class="tit2-1-1">我的团队</view>
					<!-- <view class="tit2-2-2">我的上级:JAYJONE</view> -->
				</view>
				<view class="tit2-2">团队总人数:{{total}}</view>
			</view>
			<view class="items">
				<view class="item" v-for="(item,i) in list" :key='i'>
					<view class="pic1">
						<image class="pic1-1" src="/static/Group.png" mode=""></image>
						<image v-if="i == 1" class="pic1-2" src="/static/image/zu443.png" mode=""></image>
						<image v-if="i == 2" class="pic1-2" src="/static/image/zu444.png" mode=""></image>
						<image v-if="i == 3" class="pic1-2" src="/static/image/zu445.png" mode=""></image>
					</view>
					<view class="tit11">{{item.nickname}}</view>
					<view class="tit12"></view>
					<view class="tit13">返利总额:{{item.money}}</view>
				</view>
			</view>
		</view>
		<!-- 转发 -->
		<u-popup v-model="zfshow" mode="bottom" border-radius="14">
			<view class="zfshow">
				<view class="tit1">转发</view>
				<view class="tit2">
					<button class="tit2-1" open-type="share">
						<image class="pic1" src="/static/image/zu495.png" mode=""></image>
						<view class="tit11">转发至微信好友</view>
					</button>
					<!-- <button class="tit2-2" open-type="share">
						<image class="pic1" src="/static/image/zu496.png" mode=""></image>
						<view class="tit11">转发至朋友圈</view>
					</button> -->
				</view>
				<view class="tit3" @click="gbzfshow">取消</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		async onLoad(option) {
			console.log(uni.getStorageSync('token'), 'token')
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
			console.log(uni.getStorageSync('scene'))
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
				path: `/pages/index/index?scene=0_${res.data.p_user_id}`,
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
				path: `/pages/index/index?scene=0_${res.data.p_user_id}`,
			}
		},
		data() {
			return {
				zfshow: false,
				list:[],
				total:0,
				money:0,
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.userMy_team('asc')
				console.log(res)
				this.total = res.data.total;
				this.money = res.data.money;
				this.list = res.data.list.data;
			},
			fenxiangshow() {
				this.zfshow = true;
			},
			gbzfshow() {
				this.zfshow = false;
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}

	.index {
		position: fixed;
	}

	.nav1 {
		position: relative;
		width: 752rpx;
		height: 258rpx;
		opacity: 1;

		.pic1 {
			position: absolute;
			top: 0;
			left: 0;
			width: 752rpx;
			height: 258rpx;
			opacity: 1;
		}

		.pic2 {
			position: absolute;
			top: 62rpx;
			right: 78rpx;
			width: 140rpx;
			height: 142rpx;
			opacity: 1;
		}
	}

	.nav2 {
		margin: 28rpx auto;
		width: 656rpx;
		height: 72rpx;
		opacity: 1;
		background: #dd2638;
		border-radius: 36rpx;
		font-size: 20rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 72rpx;
	}

	.nav3 {
		position: fixed;
		bottom: 0;
		overflow-y: scroll;
		border-top-left-radius: 80rpx;
		border-top-right-radius: 80rpx;
		box-shadow: 0px 2rpx 5rpx 5rpx #DDDDDD;
		width: 762rpx;
		height: 64%;
		opacity: 1;
		padding-top: 36rpx;

		.tit1 {
			// margin-top: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.pic1 {
				width: 20rpx;
				height: 22rpx;
				opacity: 1;
			}

			.tit1-1 {
				margin-left: 21rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #dd2638;
			}
		}

		.tit2 {
			margin-top: 28rpx;
			margin-left: 68rpx;
			margin-right: 52rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tit2-1 {
				display: flex;
				align-items: center;

				.tit2-1-1 {
					opacity: 1;
					font-size: 28rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					color: #000000;
				}

				.tit2-2-2 {
					margin-left: 30rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					color: #c7c7c7;
				}
			}


			.tit2-2 {
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #000000;
			}
		}

		.items {
			margin-left: 68rpx;
			margin-top: 46rpx;

			.item {
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;

				.pic1 {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 56rpx;
					height: 56rpx;

					.pic1-1 {
						position: absolute;
						top: 0;
						left: 0;
						width: 56rpx;
						height: 56rpx;
						opacity: 1;
					}

					.pic1-2 {
						position: absolute;
						top: 42rpx;
						left: 50%;
						transform: translateX(-50%);
						width: 18rpx;
						height: 28rpx;
						opacity: 1;
					}
				}

				.tit11 {
					margin-left: 24rpx;
					width: 180rpx;
					opacity: 1;
					font-size: 24rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #000000;
				}

				.tit12 {
					width: 250rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #000000;
				}

				.tit13 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #ffcc02;
				}
			}
		}
	}

	.zfshow {
		width: 762rpx;
		height: 406rpx;
		opacity: 1;

		.tit1 {
			padding-top: 38rpx;
			padding-bottom: 26rpx;
			opacity: 1;
			font-size: 30rpx;
			font-family: PingFang SC, PingFang SC-Heavy;
			font-weight: 800;
			text-align: center;
			color: #216bd3;
			line-height: 38rpx;
			letter-spacing: -1rpx;
			border-bottom: 2rpx solid #eeeeee;
		}

		.tit2 {
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 46rpx;

			.tit2-1::after {
				border: none;
			}

			.tit2-1 {
				background: #FFFFFF;
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic1 {
					margin-top: 41rpx;
					width: 76rpx;
					height: 76rpx;
					opacity: 1;
				}

				.tit11 {
					margin-top: 19rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #000000;
					line-height: 26rpx;
					letter-spacing: 0rpx;
				}
			}

			.tit2-2::after {
				border: none;
			}

			.tit2-2 {
				background: #FFFFFF;
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic1 {
					margin-top: 41rpx;
					width: 76rpx;
					height: 76rpx;
					opacity: 1;
				}

				.tit11 {
					margin-top: 19rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #000000;
					line-height: 26rpx;
					letter-spacing: 0rpx;
				}
			}
		}

		.tit3 {
			width: 762rpx;
			height: 92rpx;
			opacity: 1;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			line-height: 92rpx;
			background: #f7f7f7;
			color: #707070;
		}

	}
</style>
