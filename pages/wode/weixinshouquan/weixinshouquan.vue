<template>
	<view class="index">
		<view class="container">
			<image class="pic" src="/static/image/251.png" mode=""></image>
			<view class="tit">使用微信授权登录后才允许操作哦～</view>
		</view>
		<button @click="login" class="btn">
			点击授权
		</button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: null,
				recommend_userid: null,
				goods_id: null,
			}
		},
		onLoad(option) {
			console.log(option)
			this.goods_id = option.goods_id;
			this.recommend_userid = option.recommend_userid
		},
		methods: {
			login() {
				const that = this;
				uni.getUserProfile({
					desc: '登录',
					success: function(infoRes) {
						console.log(infoRes)
						uni.login({
							provider: 'weixin',
							success: async function(loginRes) {
								var code = loginRes.code;
								try {
									const res = await that.$api.login({
										code: code,
										userinfo: JSON.stringify(
											infoRes.userInfo),
										pid: that.recommend_userid ?
											that
											.recommend_userid : ''
									})
									console.log(res, '授权')
									if (res.code == 200) {
										if (that.goods_id) {
											// 商品
											uni.setStorage({
												key: 'token',
												data: res.data.token,
												success() {
													that.$refs.uToast
														.show({
															title: res
																.message,
															type: 'success',
															back: true,
														})
												}
											})
										} else if (that
											.recommend_userid) {
											uni.setStorage({
												key: 'token',
												data: res.data.token,
												success() {
													that.$refs.uToast
														.show({
															title: res
																.message,
															type: 'success',
															url: '/pages/index/index',
															isTab: true
														})
												}
											})
										} else {
											uni.setStorage({
												key: 'token',
												data: res.data.token,
												success() {
													that.$refs.uToast
														.show({
															title: res
																.message,
															type: 'success',
															url: '/pages/wode/wode',
															isTab: true
														})
												}
											})
										}

									} else {
										that.$refs.uToast.show({
											title: res.message,
											type: 'error',
										})
									}
								} catch (err) {
									console.log(err, 'err')
								}
							}
						})
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f8f8f8;
	}

	.index {}

	.container {
		width: 750rpx;
		height: 458rpx;
		opacity: 1;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.pic {
			width: 120rpx;
			height: 120rpx;
			opacity: 1;
		}

		.tit {
			margin-top: 40rpx;
			opacity: 1;
			font-size: 18rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #000000;
		}
	}

	.btn {
		margin: 63rpx auto;
		width: 428rpx;
		height: 80rpx;
		opacity: 1;
		background: #ebbfcc;
		border-radius: 18rpx;
		font-size: 22rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: center;
		line-height: 80rpx;
		color: #ffffff;
	}
</style>
