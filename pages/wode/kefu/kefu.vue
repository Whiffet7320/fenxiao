<template>
	<view class="index">
		<view class="item">
			<image class="pic1" src="/static/image/juxin995.png" mode=""></image>
			<view class="box">
				<image class="pic2" src="/static/image/lujin571.png" mode=""></image>
				<view class="tit1">手机号</view>
				<view class="tit2">{{phone}}</view>
				<image class="pic3" @click="callPhone" src="/static/image/zu339.png" mode=""></image>
			</view>
		</view>
		<view class="item">
			<image class="pic1" src="/static/image/juxin995.png" mode=""></image>
			<view class="box">
				<image class="pic2 dd" src="/static/image/lujin514.png" mode=""></image>
				<view class="tit1 dd">微信号</view>
				<view class="tit2">{{vx}}</view>
				<image class="pic3 dd" src="/static/image/lujin370.png" mode=""></image>
				<view @click="fuzhi" class="tit3">复制</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				vx:'',
				phone:''
			}
		},
		onShow() {
			this.getData()
		},
		methods:{
			async getData(){
				const res = await this.$api.indexWeb_config()
				console.log(res);
				this.vx = res.data.wechat_account;
				this.phone = res.data.web_mobile;
			},
			fuzhi(){
				uni.setClipboardData({
				    data: this.vx,
				});
			},
			callPhone(){
				uni.makePhoneCall({
				    phoneNumber: this.phone,
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #f7f7f7;
	}
	.index{
		
	}
	.item{
		position: relative;
		width: 720rpx;
		height: 142rpx;
		opacity: 1;
		margin: 20rpx 16rpx 8rpx 16rpx;
		.pic1{
			position: absolute;
			left: 0;
			top: 0;
			width: 720rpx;
			height: 142rpx;
			opacity: 1;
		}
		.box{
			position: absolute;
			width: 100%;
			left: 68rpx;
			top: 58rpx;
			display: flex;
			align-items: center;
			.pic2{
				width: 16rpx;
				height: 22rpx;
				opacity: 1;
			}
			.tit1{
				margin-left: 26rpx;
				opacity: 1;
				font-size: 22rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #000000;
				letter-spacing: 2rpx;
			}
			.tit2{
				margin-left: 112rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: left;
				color: #707070;
			}
			.pic3{
				position: absolute;
				right: 117rpx;
				width: 76rpx;
				height: 30rpx;
				opacity: 1;
			}
			.pic2.dd{
				transform: translateX(-10rpx);
				width: 28rpx;
				height: 22rpx;
				opacity: 1;
			}
			.tit1.dd{
				margin-left: 14rpx;
			}
			.pic3.dd{
				position: absolute;
				right: 167rpx;
				width: 24rpx;
				height: 24rpx;
				opacity: 1;
			}
			.tit3{
				position: absolute;
				right: 118rpx;
				font-size: 18rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: right;
				color: #707070;
			}
		}
	}
	
</style>
