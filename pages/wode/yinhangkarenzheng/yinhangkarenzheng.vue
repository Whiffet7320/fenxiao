<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="nav1">
			<u-form :label-style='labelStyle' :model="form" ref="uForm">
				<u-form-item :label-style='labelStyle2' label="手机号">
					<u-input v-model="form.mobile" />
				</u-form-item>
				<u-form-item label="卡号">
					<u-input @blur="onBink" v-model="form.bank_number" />
				</u-form-item>
			</u-form>
		</view>
		<view class="nav2">
			<image class="pic1" :src="bankImg" mode=""></image>
			<view class="tit">{{bankName}}-{{cardTypeName}}</view>
		</view>
		<!-- <view class="nav3">请填写预留信息</view>
		<view class="nav1">
			<u-form :label-style='labelStyle' :model="form2" ref="uForm">
				<u-form-item label="姓名">
					<u-input v-model="form2.name" />
				</u-form-item>
				<u-form-item :label-style='labelStyle2' label="手机号">
					<view class="nav1-1">
						<u-input v-model="form2.phone" />
						<u-verification-code ref="uCode" @change="codeChange">
						</u-verification-code>
						<view class="tit1-1" @click="getCode">{{tips}}</view>
					</view>
				</u-form-item>
				<u-form-item :label-style='labelStyle2' label="验证码">
					<u-input v-model="form2.yzm" />
				</u-form-item>
			</u-form>
		</view> -->
		<view @click="yanz" class="footer">认证</view>
		<!-- 认证成功 -->
		<u-popup class='bccgShow' z-index="99999" v-model="bccgShow" mode="center" border-radius="34">
			<view class="bccgShow2">
				<view class="tit1">认证成功</view>
				<image class="pic1" src="/static/image/zu336.png" mode=""></image>
				<view class="btn1" size="mini" @click='zfcgqd'>确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import bankApi from '@/static/yhk.js';
	export default {
		data() {
			return {
				bccgShow: false,
				labelStyle: {
					width: '164rpx',
					fontSize: '20rpx',
					fontFamily: 'PingFang SC, PingFang SC-Bold',
					fontWeight: '700',
					textAlign: 'left',
					color: '#000000',
					letterSpacing: '24rpx',
				},
				labelStyle2: {
					width: '164rpx',
					fontSize: '20rpx',
					fontFamily: 'PingFang SC, PingFang SC-Bold',
					fontWeight: '700',
					textAlign: 'left',
					color: '#000000',
					letterSpacing: '2rpx',
				},
				form: {
					mobile: '',
					bank_number: '',
				},
				form2: {
					name: '',
					phone: '',
					yzm: '',
				},
				bankName: "",
				cardTypeName: '',
				bankImg: '',
				tips: '',
			}
		},
		methods: {
			async onBink() {
				try {
					const res = await bankApi.getBankBin(this.form.bank_number);
					console.log(res)
					this.bankName = res.bankName;
					this.bankImg = `https://apimg.alipay.com/combo.png?d=cashier&t=${res.bankCode}_s`;
					this.cardTypeName = res.cardTypeName;
				} catch (error) {
					this.$refs.uToast.show({
						title: error,
						type: 'warning',
					})
				};
			},
			async yanz(){
				const res = await this.$api.userAdd_bank_card({
					mobile:this.form.mobile,
					bank_number:this.form.bank_number,
				})
				console.log(res)
				if(res.code == 200){
					this.bccgShow = true;
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				console.log(this.$refs.uCode.canGetCode)
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					}, 500);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
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

	.index {}

	.nav1 {
		margin: 16rpx 18rpx;
		padding: 0 0 0 44rpx;
		width: 714rpx;
		opacity: 1;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 2rpx 0rpx #DDDDDD;
		border-radius: 10rpx;

		.nav1-1 {
			display: flex;
			align-items: center;

			.tit1-1::after {
				border: none;
			}

			.tit1-1 {
				background-color: #fff;
				border-radius: 0;
				padding: 0;
				margin: 0;
				width: 200rpx;
				border-left: 2rpx solid #eaeaea;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				text-align: center;
				color: #dd2638;
			}
		}

	}

	.nav2 {
		display: flex;
		align-items: center;

		.pic1 {
			margin-left: 62rpx;
			margin-right: 12rpx;
			width: 32rpx;
			height: 28rpx;
			opacity: 1;
		}

		.tit {
			opacity: 1;
			font-size: 20rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #6f7070;
		}
	}

	.nav3 {
		margin-left: 38rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		opacity: 1;
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: left;
		color: #000000;
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
