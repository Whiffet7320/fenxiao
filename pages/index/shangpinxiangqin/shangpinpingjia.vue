<template>
	<view class="index">
		<view class="container">
			<view class="nav3">
				<!-- <view class="nav3-1">
					<view class="tit1">宝贝评价(10)</view>
					<view class="tit2">查看更多 >></view>
				</view> -->
				<view class="items">
					<view class="item" v-for="item in list" :key='item'>
						<view class="nav11">
							<image class="pic11" :src="item.user_info.avatar" mode=""></image>
							<view class="nav1-11">
								<view class="txt1">{{item.user_info.username}}</view>
								<view class="txt2">{{item.create_at}}</view>
							</view>
						</view>
						<view class="nav12">{{item.content}}</view>
					</view>
				</view>
				<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["pinglunPage", "pinglunPageSize"]),
		},
		watch: {
			pinglunPage: function(page) {
				console.log('ddpage')
				this.$store.commit("pinglunPage", page);
				if (this.pinglunPage != 1) {
					this.getData();
				}
			},
		},
		data() {
			return {
				product_id: null,
				list:[],
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有了更多了'
				}
			}
		},
		onLoad(option) {
			this.product_id = option.product_id;
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				this.status = 'loading';
				setTimeout(async () => {
					const res = await this.$api.indexCommit_list({
						product_id: this.product_id,
						limit: this.pinglunPageSize,
						page: this.pinglunPage
					})
					console.log(res);
					if (res.data.data.length == 0) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore';
						console.log(this.list)
						this.list = this.list.concat(res.data.data)
					}
				}, 200)
			},
		}
	}
</script>

<style scoped lang="scss">
	.nav3 {
		margin: 0rpx 22rpx;
		width: 706rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
		padding: 26rpx 32rpx 37rpx 30rpx;
		;

		.nav3-1 {
			display: flex;
			justify-content: space-between;

			.tit1 {
				opacity: 1;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #000000;
			}

			.tit2 {
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #dd2638;
			}
		}

		.items {
			.item {
				.nav11 {
					margin-top: 37rpx;
					display: flex;
					height: 76rpx;

					.pic11 {
						width: 74rpx;
						height: 76rpx;
						margin-right: 22rpx;
					}

					.nav1-11 {
						display: flex;
						flex-direction: column;

						.txt1 {
							opacity: 1;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Bold;
							font-weight: 700;
							text-align: left;
							color: #000000;
						}

						.txt2 {
							opacity: 1;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: right;
							color: #707070;
						}
					}


				}

				.nav12 {
					margin-left: 96rpx;
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					text-align: left;
					color: #000000;
				}

			}
		}

	}
</style>
