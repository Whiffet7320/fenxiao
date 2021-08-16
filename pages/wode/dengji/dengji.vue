<template>
	<view class="index">
		<view class="nav1">
			<image class="pic1" src="/static/image/lujin908.png" mode=""></image>
			<image class="pic2" src="/static/Group.png" mode=""></image>
			<view class="tit1">
				<view class="tit1-1">当前等级：</view>
				<view class="tit1-2">Lv.{{dengji}}</view>
			</view>
			<view class="tit2">
				<view class="num">
					<view class="num1">
						<image v-if="dengji == 1" class="picNum" src="/static/image/lujin909.png" mode=""></image>
						<view :class="{'txt':true,'no':dengji<1,'yes':dengji>1}">1</view>
					</view>
					<view class="num2">
						<image v-if="dengji == 2" class="picNum" src="/static/image/lujin909.png" mode=""></image>
						<view :class="{'txt':true,'no':dengji<2,'yes':dengji>2}">2</view>
					</view>
					<view class="num3">
						<image v-if="dengji == 3" class="picNum" src="/static/image/lujin909.png" mode=""></image>
						<view :class="{'txt':true,'no':dengji<3,'yes':dengji>3}">3</view>
					</view>
					<view class="num4">
						<image v-if="dengji == 4" class="picNum" src="/static/image/lujin909.png" mode=""></image>
						<view :class="{'txt':true,'no':dengji<4,'yes':dengji>4}">4</view>
					</view>
					<view class="num5">
						<image v-if="dengji == 5" class="picNum" src="/static/image/lujin909.png" mode=""></image>
						<view :class="{'txt':true,'no':dengji<5,'yes':dengji>5}">5</view>
					</view>
					<view class="num6">
						<image v-if="dengji == 6" class="picNum" src="/static/image/lujin909.png" mode=""></image>
						<view :class="{'txt':true,'no':dengji<6,'yes':dengji>6}">6</view>
					</view>
				</view>
				<image class="pic1" src="/static/image/zu493.png" mode=""></image>
			</view>
		</view>
		<view class="nav2">
			<view class="tit1">
				<view class="tit1-1">
					<image class="pic1" src="/static/image/lujin905.png" mode=""></image>
					<view class="txt1">团队总消费额(元)</view>
					<view class="txt2">{{djObj.money}}</view>
				</view>
				<view class="shu"></view>
				<view class="tit1-1">
					<image class="pic1" style="width: 38rpx;height: 32rpx;" src="/static/image/lujin906.png" mode="">
					</image>
					<view class="txt1">团队人数(人)</view>
					<view class="txt2">{{djObj.total}}</view>
				</view>
				<view class="shu"></view>
				<view class="tit1-1">
					<image class="pic1" src="/static/image/lujin907.png" mode=""></image>
					<view class="txt1">距离下一级还差(元)</view>
					<view class="txt2">{{djObj.next_money}}</view>
				</view>
			</view>
			<view class="tit2">
				<view class="txt1">当前等级权限</view>
				<view class="txt2">(假设5级=1000W，4级=800W，3级=500W，2级=200W，一级=100W，则如下)</view>
			</view>
			<view class="tit3">
				<view class="txt1"></view>
				<view class="txt2">{{djObj.article}}</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1">
				<view class="tit1-1">
					<view class="txt1">距离下一级：</view>
					<view class="txt2">Lv.{{dengji + 1}}</view>
				</view>
				<view class="tit1-2">
					<view class="txt1">当前等级：</view>
					<view class="txt2">Lv.{{dengji}}</view>
				</view>
			</view>
			<view class="tit2">
				<view class="box1">
					<image class="pic1" src="/static/image/zu494.png" mode=""></image>
					<view class="txt1">还需</view>
					<view class="txt2">{{djObj.next_money}}</view>
				</view>
				<view class="box2">团队总消费(元)</view>
			</view>
		</view>
		<view class="nav4">团队总消费是指团队累计消费的金额而非个人消费金额。</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dengji: 1,
				djObj:null,
			}
		},
		onLoad(option) {
			console.log(option)
			this.dengji = Number(option.level);
		},
		onShow() {
			this.getData();
		},
		methods:{
			async getData(){
				const res = await this.$api.userLevel_article();
				console.log(res);
				this.djObj = res.data;
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
		height: 300rpx;

		.pic1 {
			position: absolute;
			left: 0;
			top: 0;
			width: 750rpx;
			height: 668rpx;
			opacity: 1;
		}

		.pic2 {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 46rpx;
			width: 120rpx;
			height: 120rpx;
			opacity: 1;
		}

		.tit1 {
			position: absolute;
			top: 194rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;

			.tit1-1 {
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #ffffff;
			}

			.tit1-2 {
				width: 64rpx;
				height: 28rpx;
				opacity: 1;
				border-radius: 16rpx;
				background: #DD2638;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 28rpx;
			}
		}

		.tit2 {
			position: absolute;
			top: 296rpx;
			left: 26rpx;

			.num {
				transform: translateY(-30rpx);
				position: relative;
				display: flex;

				.picNum {
					position: absolute;
					top: 0;
					left: 0;
					width: 28rpx;
					height: 30rpx;
					opacity: 1;
				}

				.txt {
					position: absolute;
					top: -2rpx;
					left: 8rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #ffffff;
				}

				.txt.no {
					color: #6f7070;
				}

				.txt.yes {
					color: #dd2638;
				}

				.num1 {
					position: absolute;
					left: -10rpx;
				}

				.num2 {
					position: absolute;
					left: 130rpx;
				}

				.num3 {
					position: absolute;
					left: 268rpx;
				}

				.num4 {
					position: absolute;
					left: 406rpx;
				}

				.num5 {
					position: absolute;
					left: 544rpx;
				}

				.num6 {
					position: absolute;
					left: 678rpx;
				}
			}

			.pic1 {
				width: 700rpx;
				height: 8rpx;
				opacity: 1;
			}
		}
	}

	.nav2 {
		position: relative;
		margin-top: 40rpx;
		margin-left: 22rpx;
		width: 706rpx;
		height: 384rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

		.tit1 {
			display: flex;
			align-items: center;
			height: 182rpx;
			border-bottom: 2rpx solid #eaeaea;
			justify-content: space-between;
			padding: 0 40rpx;

			.shu {
				width: 2rpx;
				height: 56rpx;
				opacity: 1;
				border: 2rpx solid #707070;
			}

			.tit1-1 {
				display: flex;
				flex-direction: column;
				align-items: center;

				.pic1 {
					width: 32rpx;
					height: 32rpx;
					opacity: 1;
				}

				.txt1 {
					margin-top: 10rpx;
					margin-bottom: 6rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #000000;
				}

				.txt2 {
					opacity: 1;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Heavy;
					font-weight: 800;
					text-align: center;
					color: #000000;
				}
			}
		}

		.tit2 {
			display: flex;
			margin-top: 34rpx;

			.txt1 {
				margin-left: 50rpx;
				width: 144rpx;
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #000000;
			}

			.txt2 {
				margin-left: 44rpx;
				width: 430rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #b7b7b7;
			}
		}

		.tit3 {
			display: flex;
			margin-top: 16rpx;

			.txt1 {
				margin-top: 8rpx;
				margin-left: 50rpx;
				width: 12rpx;
				height: 12rpx;
				opacity: 1;
				background: #dd2638;
				border-radius: 50%;
			}

			.txt2 {
				margin-left: 18rpx;
				width: 608rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #6f7070;
			}
		}

	}

	.nav3 {
		margin-top: 18rpx;
		margin-left: 20rpx;
		width: 706rpx;
		height: 318rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
		padding-top: 38rpx;

		.tit1 {
			margin: 0 50rpx;
			display: flex;
			justify-content: space-between;

			.tit1-1 {
				display: flex;
				align-items: center;

				.txt1 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: center;
					color: #6f7070;
				}

				.txt2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: center;
					color: #FFCC02;
				}
			}

			.tit1-2 {
				display: flex;
				align-items: center;

				.txt1 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: center;
					color: #6f7070;
				}

				.txt2 {
					width: 64rpx;
					height: 28rpx;
					opacity: 1;
					border-radius: 16rpx;
					background: #DD2638;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: center;
					color: #ffffff;
					line-height: 28rpx;
				}
			}
		}

		.tit2 {
			position: relative;
			top: 42rpx;
			height: 171rpx;
			display: flex;
			align-items: center;
			.box1 {
				position: absolute;
				top: 0rpx;
				left: 179rpx;
				width: 171rpx;
				.pic1 {
					position: absolute;
					top: 0rpx;
					left: 0rpx;
					width: 172rpx;
					height: 172rpx;
					opacity: 1;
				}
				.txt1{
					position: absolute;
					width: 76rpx;
					top: 54rpx;
					left: 50%;
					transform: translateX(-50%);
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: center;
					color: #000000;
				}
				.txt2{
					position: absolute;
					top: 84rpx;
					left: 50%;
					transform: translateX(-50%);
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					// text-align: center;
					color: #000000;
				}
			}


			.box2 {
				position: absolute;
				left: 397rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #b7b7b7;
			}
		}

	}
	.nav4{
		margin-top: 16rpx;
		margin-left: 26rpx;
		opacity: 1;
		font-size: 20rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: left;
		color: #6f7070;
	}

</style>
