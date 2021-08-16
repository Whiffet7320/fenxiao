<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<image class="pic1" src="/static/image/lujin519.png" mode=""></image>
		</view>
		<view class="nav2">
			<view class="tit1">请上传真实有效的证件</view>
			<view class="tit2">无法识别无效或失效证件</view>
			<view class="box1" @click="chooseImg(1)">
				<view v-if="img1 == ''">
					<image class="pic1" src="/static/image/zu327.png" mode=""></image>
					<view class="tit11">上传证件照正面</view>
				</view>
				<view v-else>
					<image class="pic2" :src="img1" mode=""></image>
				</view>
			</view>
			<view class="box1" @click="chooseImg(2)">
				<view v-if="img2 == ''">
					<image class="pic1" src="/static/image/zu328.png" mode=""></image>
					<view class="tit11">上传证件照反面</view>
				</view>
				<view v-else>
					<image class="pic2" :src="img2" mode=""></image>
				</view>
			</view>
		</view>
		<!-- <view class="nav3">
			<u-form :model="form2" ref="uForm">
				<u-form-item label-width=168 :label-style='labelStyle' label="证件信息识别">
					<u-input v-model="form2.name" />
				</u-form-item>
				<u-form-item label-width=119 :label-style='labelStyle2' label="姓名">
					<u-input v-model="form2.phone" />
				</u-form-item>
				<u-form-item label-width=119 :label-style='labelStyle3' label="身份证号">
					<u-input v-model="form2.yzm" />
				</u-form-item>
			</u-form>
		</view> -->
		<!-- 认证成功 -->
		<u-popup class='bccgShow' z-index="99999" v-model="bccgShow" mode="center" border-radius="34">
			<view class="bccgShow2">
				<view class="tit1">认证成功</view>
				<image class="pic1" src="/static/image/zu330.png" mode=""></image>
				<view class="btn1" size="mini" @click='zfcgqd'>确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		watch: {
			img1True: {
				handler: function() {
					console.log(this.img1True , this.img2True)
					if(this.img1True && this.img2True){
						this.bccgShow = true;
					}else if(!this.img1True && !this.img2True && this.img1True != null && this.img2True != null){
						this.$refs.uToast.show({
							title: '验证失败,请上传正确的图片',
							type: 'warning',
							duration: 1000
						})
					}
				},
				deep: true,
			},
			img2True: {
				handler: function() {
					console.log(this.img1True , this.img2True)
					if(this.img1True && this.img2True){
						this.bccgShow = true;
					}else if(!this.img1True && !this.img2True && this.img1True != null && this.img2True != null){
						this.$refs.uToast.show({
							title: '验证失败,请上传正确的图片',
							type: 'warning',
							duration: 1000
						})
					}
				},
				deep: true,
			},
		},
		data() {
			return {
				img1True:null,
				img2True:null,
				bccgShow: false,
				form2: {
					name: '',
					phone: '',
					yzm: '',
				},
				labelStyle: {
					width: '164rpx',
					fontSize: '20rpx',
					fontFamily: 'PingFang SC, PingFang SC-Bold',
					fontWeight: '700',
					textAlign: 'left',
					color: '#000000',
				},
				labelStyle2: {
					width: '164rpx',
					fontSize: '20rpx',
					fontFamily: 'PingFang SC, PingFang SC-Bold',
					fontWeight: '700',
					textAlign: 'left',
					color: '#000000',
					letterSpacing: '24rpx',
				},
				labelStyle3: {
					width: '164rpx',
					fontSize: '20rpx',
					fontFamily: 'PingFang SC, PingFang SC-Bold',
					fontWeight: '700',
					textAlign: 'left',
					color: '#000000',
					letterSpacing: '2rpx',
				},
				img1: '',
				img2: '',
			}
		},
		methods: {
			chooseImg(i) {
				const that = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						const img = JSON.stringify(res.tempFilePaths[0])
						const newImg = img.substring(1, img.length - 1);
						console.log(newImg)
						uni.getFileSystemManager().readFile({
							filePath: newImg, //选择图片返回的相对路径
							encoding: "base64", //这个是很重要的
							success: async res => { //成功的回调
								//返回base64格式
								console.log(res.data)
								var side;
								if (i == 1) {
									that.img1 = newImg;
									side = 'face';
								} else if (i == 2) {
									that.img2 = newImg;
									side = 'back';
								}
								const res2 = await that.$api.userId_card_orc({
									img_data:res.data,
									side,
								})
								console.log(res2,'saadasd')
								if(res2.code == 200){
									if (i == 1) {
										that.img1True = true;
									} else if (i == 2) {
										that.img2True = true;
									}
									// if(that.img1True && that.img2True){
									// 	that.bccgShow = true;
									// }
								}
								else{
									if (i == 1) {
										that.img1True = false;
									} else if (i == 2) {
										that.img2True = false;
									}
									that.$refs.uToast.show({
										title: res2.message,
										type: 'warning',
										duration: 1000
									})
								}
							}
						})
					}
				});
			},
			zfcgqd() {
				this.bccgShow = false;
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}

	.index {
		position: relative;
	}

	.nav1 {
		width: 750rpx;
		height: 260rpx;
		opacity: 1;

		.pic1 {
			width: 750rpx;
			height: 260rpx;
			opacity: 1;
		}
	}

	.nav2 {
		position: absolute;
		top: 30rpx;
		margin-left: 16rpx;
		width: 718rpx;
		height: 822rpx;
		opacity: 1;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0px 2rpx 2rpx 0rpx #DDDDDD;

		.tit1 {
			margin-top: 44rpx;
			margin-left: 46rpx;
			opacity: 1;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			color: #000000;
		}

		.tit2 {
			margin-left: 46rpx;
			opacity: 1;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #c7c7c7;
		}

		.box1 {
			margin-top: 22rpx;
			margin-left: 40rpx;
			width: 638rpx;
			height: 312rpx;
			opacity: 1;
			background: #eeeeee;
			margin-bottom: 24rpx;

			.pic1 {
				margin-top: 80rpx;
				margin-bottom: 25rpx;
				width: 146rpx;
				height: 100rpx;
				opacity: 1;
				margin-left: 246rpx;
			}

			.tit11 {
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #6f7070;
			}

			.pic2 {
				width: 638rpx;
				height: 312rpx;
				opacity: 1;
			}
		}
	}

	.nav3 {
		position: absolute;
		top: 856rpx;
		margin: 16rpx 18rpx;
		padding: 0 0 0 44rpx;
		width: 714rpx;
		opacity: 1;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 2rpx 0rpx #DDDDDD;
		border-radius: 10rpx;

		.tit::after {
			border: none;
		}

		.tit {
			background: #FFFFFF;
			width: 181rpx;
			border-left: 2rpx solid #eaeaea;
			opacity: 1;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: center;
			color: #dd2638;
		}
	}

	.bccgShow {
		.bccgShow2 {
			width: 480rpx;
			height: 308rpx;
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
				width: 178rpx;
				height: 144rpx;
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
