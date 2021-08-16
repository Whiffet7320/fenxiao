<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="items">
			<u-swipe-action v-for="(item,i) in list" :key="item.address_id" :index="i" @click="swipeclick(item)"
				:options="options">
				<view class="item">
					<view class="left">0{{i+1}}</view>
					<view class="right" @click="editMoren(item)">
						<image class="pic1" src="/static/image/juxin76.png" mode=""></image>
						<view class="box">
							<view class="tit1">
								<view class="tit1-1">收货人：{{item.name}}</view>
								<view class="tit1-2">联系方式：{{item.number}}</view>
								<view v-if="item.is_default == 1" class="tit1-3">默认地址</view>
								<view v-if="isShop && item.is_default != 1" class="tit1-3">设为默认地址</view>
							</view>
							<view class="tit2">收货地址：{{item.province+''+item.city+''+item.area}}{{item.address}}</view>
						</view>
						<u-icon @click="toXiugaixinxi(item)" class='right-icon' name="arrow-right" color="#cccccc"
							size="28"></u-icon>
					</view>
				</view>
			</u-swipe-action>

		</view>
		<view @click="toXinjiandizhi" class="btn">新建地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				list: [],
				isShop: null,
			}
		},
		onLoad(option) {
			console.log(option.isShop,'cyyyy')
			this.isShop = option.isShop
		},
		onShow() {
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.addressIndex()
				console.log(res)
				this.list = res.data;
			},
			async editMoren(item) {
				console.log(item)
				if (this.isShop) {
					const res = await this.$api.addressEdit({
						province: item.province,
						city: item.city,
						area: item.area,
						address: item.address,
						name: item.name,
						number: item.number,
						is_default: 1,
						address_id: item.address_id,
					})
					console.log(res)
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: res.message,
							type: 'success',
							duration: 1000,
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.message,
							type: 'warning',
							duration: 1000,
						})
					}
				}
			},
			toXiugaixinxi(item) {
				uni.navigateTo({
					url: `/pages/index/shouhuoxinxi/xinjian?name=${item.name}&number=${item.number}&province=${item.province}&city=${item.city}&area=${item.area}&address=${item.address}&is_default=${item.is_default}&id=${item.address_id}`
				})
			},
			toXinjiandizhi() {
				uni.navigateTo({
					url: '/pages/index/shouhuoxinxi/xinjian'
				})
			},
			// 删除
			async swipeclick(item) {
				console.log(item)
				const res = await this.$api.addressDel(item.address_id);
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
						duration: 500,
					})
					setTimeout(() => {
						this.getData()
					}, 500)
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
						duration: 500
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {}

	.items {
		margin-top: 16rpx;

		.item {
			height: 160rpx;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.left {
				margin-left: 46rpx;
				margin-right: 16rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #000000;
			}

			.right {
				position: relative;
				height: 160rpx;
				width: 670rpx;
				height: 160rpx;

				.pic1 {
					position: absolute;
					top: 0;
					left: 0;
					width: 670rpx;
					height: 160rpx;
					opacity: 1;
				}

				.box {
					.tit1 {
						position: absolute;
						top: 40rpx;
						left: 46rpx;
						display: flex;

						.tit1-1 {
							width: 228rpx;
							opacity: 1;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #6f7070;
						}

						.tit1-2 {
							width: 348rpx;
							opacity: 1;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #6f7070;
						}

						.tit1-3 {
							position: absolute;
							top: -24rpx;
							right: 0;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #dd2638;
						}
					}

					.tit2 {
						position: absolute;
						top: 88rpx;
						left: 46rpx;
						width: 580rpx;
						opacity: 1;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #6f7070;
					}
				}

				.right-icon {
					position: absolute;
					right: 29rpx;
					top: 66rpx;
				}

			}
		}
	}

	.btn {
		margin-left: 50rpx;
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

	/deep/ .u-swipe-del {
		height: 154rpx;
	}
</style>
