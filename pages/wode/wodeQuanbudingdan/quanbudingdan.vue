<template>
	<view class="index">
		<view class="container">
			<u-toast ref="uToast" />
			<u-tabs-swiper bg-color="#282828" font-size="25" gutter="40" inactive-color="#ffffff" bar-height="6"
				bar-width="40" active-color="#EBBFCC" ref="uTabs" :list="list" :current="current" @change="tabsChange"
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="[{height: height + 'px'}]" :current="swiperCurrent">
				<swiper-item @touchmove.stop class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view @scrolltolower="lower" scroll-y='true' style="height: 90vh;">
						<view class="items">
							<!-- {{item.name}} -->
							<!-- 全部订单 -->
							<view v-if="swiperCurrentIndex==0">
								<view class="item" v-for="item in allList" :key="item.id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view v-if="item.status == 1" class="tit2">待付款</view>
										<view v-else-if="item.status == 2" class="tit2">等待发货</view>
										<view v-else-if="item.status == 3" class="tit2">待收货</view>
										<view v-else-if="item.status == 4" class="tit2">已完成</view>
										<view v-else-if="item.status == 5" class="tit2">已取消</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.product_arr" :key="ele.product_id">
										<image @click="toxiangqin(ele)" class="pic1" :src="ele.images" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.title}}</view>
												<view class="tit1-4">规格:{{ele.size}}</view>
												<view class="tit1-2">数量:{{ele.buy_number}}</view>
												<view class="tit1-3">实付款：￥{{ele.total_price}}</view>
											</view>
										</view>
									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{formatDate(item.confirm_time * 1000)}}
										</view>
										<view class="btns">
											<view class="tit3" v-if="item.status== 1" @click="deldd(item)">取消订单</view>
											<view class="tit2" v-if="item.status== 1"
												@click="lijigoumai(item.product_arr,item.id)">立即支付</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 待付款 -->
							<view v-if="swiperCurrentIndex==1">
								<view class="item" v-for="item in dfkList" :key="item.id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2">{{item.status == 1 ? '待付款' : ''}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.product_arr" :key="ele.product_id">
										<image @click="toxiangqin(ele)" class="pic1" :src="ele.images" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.title}}</view>
												<view class="tit1-4">规格:{{ele.size}}</view>
												<view class="tit1-2">数量:{{ele.buy_number}}</view>
												<view class="tit1-3">实付款：￥{{ele.total_price}}</view>
											</view>
										</view>
									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{formatDate(item.confirm_time * 1000)}}</view>
										<view class="btns">
											<view class="tit3" @click="deldd(item)">取消订单</view>
											<view class="tit2" v-if="item.status== 1"
												@tap="lijigoumai(item.product_arr,item.id)">立即支付
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 代发货 -->
							<view v-if="swiperCurrentIndex==2">
								<view class="item md" v-for="item in dfhList" :key="item.id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2">{{item.status == 2 ? '等待发货' : ''}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.product_arr" :key="ele.product_id">
										<image @click="toxiangqin(ele)" class="pic1" :src="ele.images" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.title}}</view>
												<view class="tit1-4">规格:{{ele.size}}</view>
												<view class="tit1-2">数量：{{ele.buy_number}}</view>
												<view class="tit1-3">实付款：￥{{ele.total_price}}</view>
											</view>
										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{formatDate(item.confirm_time * 1000)}}</view>
										<view class="btns">
											<view class="tit2" v-if="item.status== 2" @tap="lijigoumai(item)">等待发货
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 待收货 -->
							<view v-if="swiperCurrentIndex==3">
								<view class="item md" v-for="item in dshList" :key="item.id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2">{{item.status == 3 ? '等待收货' : ''}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.product_arr" :key="ele.product_id">
										<image @click="toxiangqin(ele)" class="pic1" :src="ele.images" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.title}}</view>
												<view class="tit1-4">规格:{{ele.size}}</view>
												<view class="tit1-2">数量：{{ele.buy_number}}</view>
												<view class="tit1-3">实付款：￥{{ele.total_price}}</view>
											</view>
											<view class="tit2-2">
												<!-- 												<view class="tit2" @tap="toShenqinshouhou(item)">
													申请售后
												</view> -->
											</view>

										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{formatDate(item.confirm_time * 1000)}}</view>
										<view class="btns">
											<view class="tit2" @tap="shouhuo(item)">签收</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 已完成 -->
							<view v-if="swiperCurrentIndex==4">
								<view class="item md" v-for="item in ywcList" :key="item.id">
									<view class="nav1">
										<view class="tit1">订单编号：{{item.order_no}}</view>
										<view class="tit2">{{item.status == 4 ? '交易完成' : ''}}</view>
									</view>
									<view class="nav2" v-for="(ele,i) in item.product_arr" :key="ele.product_id">
										<image @click="toxiangqin(ele)" class="pic1" :src="ele.images" mode=""></image>
										<view class="title">
											<view class="tit1">
												<view class="tit1-1">{{ele.title}}</view>
												<view class="tit1-4">规格:{{ele.size}}</view>
												<view class="tit1-2">数量：{{ele.buy_number}}</view>
												<view class="tit1-3">实付款：￥{{ele.total_price}}</view>
											</view>
											<view class="tit2-2">
												<!-- <view class="tit2" @tap="toShenqinshouhou(item)">
													售后结果
												</view> -->
												<view v-if="ele.user_is_comments == 0" class="tit2-2-2"
													@tap="toPingjia(item,ele)">
													评价
												</view>
												<view v-else class="tit2-2-3">您已评价</view>
											</view>
										</view>

									</view>
									<view class="nav3">
										<view class="tit1">下单时间：{{formatDate(item.confirm_time * 1000)}}</view>
										<view class="btns">
											<view class="tit2" @tap="zaixiayidan(item.product_arr,item.id)">再下一单</view>
										</view>
									</view>
								</view>
							</view>

							<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />

						</view>
					</scroll-view>

				</swiper-item>
			</swiper>
			<!-- 直接购买 -->
			<u-popup class='zjgmShow' z-index="99999" v-model="zjgmShow" mode="bottom" border-radius="34">
				<view class="zjgmShow2">
					<view class="item3">
						<view class="item" @click="zffangshi(1)">
							<view class="nav1">
								<image class="pic1" src="/static/image/lujin514.png" mode=""></image>
								<view class="tit1">微信支付</view>
							</view>
							<view v-if="zffangshiId == 1" class="nav2"></view>
						</view>
						<view class="item" @click="zffangshi(2)">
							<view class="nav1">
								<image class="pic1" src="/static/image/zu520.png" mode=""></image>
								<view class="tit1">余额支付</view>
							</view>
							<view v-if="zffangshiId == 2" class="nav2"></view>
						</view>
					</view>
					<view class="footer">
						<view class="nav1">
							<view class="tit1">合计</view>
							<view class="tit2">￥{{total_price}}</view>
						</view>
						<view class="nav2" @click="pay">提交订单</view>
					</view>
				</view>
			</u-popup>
			<!-- 支付成功 -->
			<u-popup class='zfcgShow' z-index="99999" v-model="zfcgShow" mode="center" border-radius="34">
				<view class="zfcgShow2">
					<view class="tit1">支付成功</view>
					<image class="pic1" src="/static/image/mcz16.png" mode=""></image>
					<view class="btn1" size="mini" @click='zfcgqd'>确定</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["ddPage", "ddPageSize"]),
		},
		watch: {
			ddPage: function(page) {
				console.log('ddpage')
				this.$store.commit("ddPage", page);
				if (this.ddPage != 1) {
					this.getData();
				}
			},
		},
		onLoad(option) {
			this.orders_status = option.orders_status
			this.current = +option.orders_status + 1;
			console.log(this.current)
		},
		data() {
			return {
				zhifuId: null,
				total_price: 0,
				zffangshiId: 1,
				pay_money: 0,
				openid: '',
				orders_status: -1,
				// 是否免单
				is_free: 0,
				mylist: [],
				// 全部订单
				allList: [],
				// 待付款
				dfkList: [],
				// 待发货
				dfhList: [],
				// 待收货
				dshList: [],
				// 已完成
				ywcList: [],
				pay_type: 1,
				zjgmShow: false,
				isH5: false,
				swiperCurrentIndex: 0,
				height: 0,
				list: [{
					name: '全部订单'
				}, {
					name: '待付款'
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '已完成'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: null, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
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
		onShow() {
			this.tabsChange(this.current)
			this.$store.commit("ddPage", 1);
			this.allList = [];
			this.dfkList = [];
			this.dfhList = [];
			this.dshList = [];
			this.ywcList = [];
		},
		// mounted() {
		// 	this.getCurrentSwiperHeight('.items')
		// },
		// onReachBottom() {
		// 	this.$store.commit("ddPage", this.ddPage + 1);
		// },
		methods: {
			async getData() {
				console.log(1111111)
				this.status = 'loading';
				console.log(this.orders_status, 'order')
				const res = await this.$api.orderIndex({
					page: this.ddPage,
					limit: this
						.ddPageSize,
					order_status: this
						.orders_status
				});
				// this.mylist = res.list;
				console.log(res)
				if (res.code == 200) {
					setTimeout(() => {
						if (!res.data.data) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore';
							if (this.orders_status == -1) {
								this.allList = this.allList.concat(res.data.data)
							} else if (this.orders_status == 1) {
								this.dfkList = this.dfkList.concat(res.data.data)
							} else if (this.orders_status == 2) {
								this.dfhList = this.dfhList.concat(res.data.data)
							} else if (this.orders_status == 3) {
								this.dshList = this.dshList.concat(res.data.data)
							} else if (this.orders_status == 4) {
								this.ywcList = this.ywcList.concat(res.data.data)
							}
							console.log(this.allList)
						}
						if (res.data.data) {
							if (res.data.data.length < this.ddPageSize) {
								this.status = 'nomore'
							}
						}

					}, 200)
				}
				setTimeout(() => {
					this.getCurrentSwiperHeight('.items');
				}, 500)
			},
			// 时间戳转日期
			formatDate(now) {
				var now = new Date(now);
				var year = now.getFullYear(); //取得4位数的年份
				var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
				var date = now.getDate(); //返回日期月份中的天数（1到31）
				var hour = now.getHours(); //返回日期中的小时数（0到23）
				var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
				var second = now.getSeconds(); //返回日期中的秒数（0到59）
				return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
			},
			// 点击图片跳转至购物车
			toxiangqin(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/shangpinxiangqin/shangpinxiangqin?id=${item.goods_id}`
				})
			},
			zffangshi(i) {
				this.zffangshiId = i
			},
			lower() {
				this.$store.commit("ddPage", this.ddPage + 1);
			},
			// 提交售后
			toTijiaoshouhou(item) {
				uni.navigateTo({
					url: `/shenqinshouhou/pages/tijiaoshenqing?order_id=${item.order_id}`
				})
			},
			// 取消支付
			async deldd(item) {
				console.log(item)
				this.allList = [];
				this.dfkList = [];
				this.dfhList = [];
				this.dshList = [];
				this.ywcList = [];
				const res = await this.$api.orderCancel_order(item.id)
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
						duration: 500
					})
					this.$store.commit('ddPage', 1)
					this.getData()
				}
			},
			goTo() {
				uni.switchTab({
					url: '/pages/wode/wode'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				if (index == 1) {
					this.orders_status = 1
				} else if (index == 2) {
					this.orders_status = 2
				} else if (index == 3) {
					this.orders_status = 3
				} else if (index == 4) {
					this.orders_status = 4
				} else if (index == 0) {
					this.orders_status = -1
				}
				this.allList = [];
				this.dfkList = [];
				this.dfhList = [];
				this.dshList = [];
				this.ywcList = [];
				this.swiperCurrent = index;
				this.current = index;
				this.swiperCurrentIndex = index;
				console.log('tabsChange')
				this.$store.commit('ddPage', 1)
				this.getData()
			},
			getCurrentSwiperHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(element).boundingClientRect();
				query.exec((res) => {
					console.log(res, 'res', this.swiperCurrentIndex)
					this.height = 50 + res[0][this.swiperCurrentIndex].height;
				})
			},
			async pay() {
				const that = this;
				const res = await this.$api.orderPay2order({
					order_id: this.zhifuId,
					pay_way: this.zffangshiId == 1 ? 'wechat' : 'balance',
					mini: 1,
				})
				if (res.code == 200) {
					if (this.zffangshiId == 1) {
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.data.timeStamp.toString(),
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: res.data.signType,
							paySign: res.data.paySign,
							success: function(res) {
								that.zfcgShow = true;
								this.getData()
								that.zjgmShow = false;
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					} else {
						that.zfcgShow = true;
						this.getData()
						that.zjgmShow = false;
					}
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
						duration: 1000
					})
					that.zjgmShow = false;
				}
			},
			async lijigoumai(ele, id) {
				this.zjgmShow = true
				this.total_price = 0;
				ele.forEach(item => {
					this.total_price += Number(item.total_price);
				})
				this.zhifuId = id
			},
			zaixiayidan(ele, id) {
				uni.navigateTo({
					url: `/pages/index/shangpinxiangqin/lijigoumai?ddshopArr=${JSON.stringify(ele)}&orderId=${id}`
				})
			},
			// 免单列表
			async miandan(ele) {
				console.log(ele)
				const res = await this.$api.wx_freeordersubmit(this.openid, ele.sub_orderid)
				console.log(res)
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success',
						url: '/pages/miandan/miandan',
						params: {
							sub_orderid: ele.sub_orderid,
						},
						duration: 500
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'warning',
					})
				}
			},
			// 售后
			toShenqinshouhou(item) {
				if (item.is_examine == -1) {
					uni.navigateTo({
						url: `/shenqinshouhou/pages/shenqinshouhou?order_id=${item.order_id}`
					})
				} else {
					uni.navigateTo({
						url: `/shenqinshouhou/pages/tijiaoshenqing?order_id=${item.order_id}`
					})
				}

			},
			// 评价
			toPingjia(item, ele) {
				console.log(item, ele)
				uni.navigateTo({
					url: `/pages/wode/wodeQuanbudingdan/pingjia?order_id=${item.id}&product_id=${ele.product_id}`
				})
			},
			// 收货
			async shouhuo(item) {
				console.log(item)
				const res = await this.$api.orderConfirm_deliver(item.id)
				console.log(res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'success',
					})
					this.allList = [];
					this.dfkList = [];
					this.dfhList = [];
					this.dshList = [];
					this.ywcList = [];
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: res.message,
						type: 'warning',
					})
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	page {
		width: 750rpx;
		height: 1333rpx;
		opacity: 1;
		background: #f7f7f7;
	}

	.index {
		position: relative;
		// padding-top: 60rpx;
		height: 100%;
		width: 100%;
	}

	.nav {
		// position: fixed;
		// top: 60rpx;
		// left: 0;
		display: flex;
		align-items: center;
		height: 36rpx;
		// padding: 60rpx 50rpx 33rpx 46rpx;
		margin: 0rpx 50rpx 0rpx 46rpx;

		.nav-title {
			margin-left: 23rpx;
			opacity: 1;
			font-size: 36rpx;
			font-family: SourceHanSansCN-Regular;
			text-align: left;
			color: #121212;
		}
	}

	.container {
		.item.md {
			.title {
				display: flex;
				justify-content: space-between;

				.tit2-2 {
					.tit2 {
						margin-top: 20rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}

		.items {
			margin: 16rpx 16rpx 10rpx 12rpx;
			border-radius: 20rpx;
			border: 2rpx solid #eeeeee;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 5rpx 5rpx #eeeeee;

			.item {
				width: 708rpx;
				// height: 362rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 18rpx;
				padding: 0 28rpx;

				.nav1 {
					margin: 0 auto;
					height: 74rpx;
					border-bottom: 2rpx solid #eeeeee;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.tit1 {
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						color: #000000;
					}

					.tit2 {
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #DD2638;
					}

				}

				.nav2 {
					padding: 25rpx 0;
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #eeeeee;
					// justify-content: space-between;

					.pic1 {
						width: 127rpx;
						height: 127rpx;
						opacity: 1;
					}

					.title {
						margin-left: 20rpx;
						display: flex;
						flex: 1;
						align-items: center;
						justify-content: space-between;

						.tit1 {
							.tit1-1 {
								opacity: 1;
								font-size: 25rpx;
								font-family: PingFang SC, PingFang SC-Bold;
								font-weight: 700;
								color: #141313;
							}

							.tit1-2 {
								margin-top: 4rpx;
								opacity: 1;
								font-size: 18rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								color: #b1b1b1;
							}

							.tit1-3 {
								margin-top: 4rpx;
								opacity: 1;
								font-size: 18rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								text-align: left;
								color: #b1b1b1;
							}

							.tit1-4 {
								margin-top: 18rpx;
								opacity: 1;
								font-size: 18rpx;
								font-family: PingFang SC, PingFang SC-Regular;
								font-weight: 400;
								text-align: left;
								color: #b1b1b1;
							}
						}

						.tit2 {
							// margin-left: 107rpx;
							width: 116rpx;
							height: 36rpx;
							opacity: 1;
							background: #ffffff;
							border: 2rpx solid #b1b1b1;
							border-radius: 20rpx;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							color: #b1b1b1;
						}

						.tit3 {
							width: 116rpx;
							height: 36rpx;
							opacity: 1;
							background: #ffffff;
							border: 2rpx solid #EBBFCC;
							border-radius: 20rpx;
							font-size: 18rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							color: #EBBFCC;
						}

						.tit2-2-2 {
							margin-left: 16rpx;
							width: 154rpx;
							height: 60rpx;
							opacity: 1;
							border: 1rpx solid #dd2638;
							border-radius: 29rpx;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							color: #dd2638;
							line-height: 60rpx;
						}

						.tit2-2-3 {
							margin-top: 90rpx;
							opacity: 1;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: left;
							color: #000000;
						}
					}

				}

				.nav3 {
					margin: 0 auto;
					height: 100rpx;
					border-bottom: 2rpx solid #eeeeee;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.tit1 {
						opacity: 1;
						font-size: 18rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						color: #000000;
					}

					.btns {
						display: flex;

						.tit2 {
							margin-left: 16rpx;
							width: 154rpx;
							height: 60rpx;
							opacity: 1;
							border: 1rpx solid #dd2638;
							border-radius: 29rpx;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							color: #dd2638;
							line-height: 60rpx;
						}

						.tit3 {
							width: 154rpx;
							height: 60rpx;
							opacity: 1;
							border: 2rpx solid #eaeaea;
							border-radius: 30rpx;
							font-size: 20rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							text-align: center;
							color: #6f7070;
							line-height: 60rpx;
						}
					}

				}

			}
		}
	}

	.zjgm {
		.container {
			position: absolute;
			width: 750rpx;
			height: 716rpx;
			opacity: 1;

			image {
				width: 100%;
				height: 100%;
			}

			.tit1 {
				position: absolute;
				top: 63rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				font-size: 29rpx;
				font-family: Source Han Sans CN, Source Han Sans CN-Medium;
				font-weight: 500;
				text-align: center;
				color: #4a4a4a;
				line-height: 36rpx;
				font-weight: 800;
			}

			.close {
				position: absolute;
				top: 37rpx;
				right: 64rpx;
				width: 31rpx;
				height: 31rpx;
				opacity: 1;
			}

			.bottom {
				position: absolute;
				top: 150rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 659rpx;
				opacity: 1;
				display: flex;
				align-items: center;

				.wx {
					position: relative;
					width: 621rpx;
					height: 125rpx;
					opacity: 1;

					.ditu {
						width: 100%;
						height: 200rpx;
					}

					.wxpic {
						position: absolute;
						top: 40rpx;
						left: 34rpx;
						width: 43rpx;
						height: 43rpx;
						opacity: 1;
					}

					.tit {
						position: absolute;
						top: 45rpx;
						left: 96rpx;
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #141313;
					}
				}

				.zfb {
					position: relative;
					width: 621rpx;
					height: 125rpx;
					opacity: 1;

					.ditu {
						width: 100%;
						height: 200rpx;
					}

					.wxpic {
						position: absolute;
						top: 40rpx;
						left: 34rpx;
						width: 43rpx;
						height: 43rpx;
						opacity: 1;
					}

					.tit {
						position: absolute;
						top: 45rpx;
						left: 96rpx;
						opacity: 1;
						font-size: 22rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: #141313;
					}
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			background: #ebbfcc;
			width: 750rpx;
			height: 80rpx;
			opacity: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.tit {
				opacity: 1;
				font-size: 25rpx;
				font-family: SourceHanSansCN-Regular;
				text-align: center;
				color: #ffffff;
				line-height: 36rpx;
			}
		}
	}

	.zjgmShow2 {
		.item3 {
			margin: 20rpx 22rpx;

			.item {
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 706rpx;
				height: 80rpx;
				opacity: 1;
				background: #FFFFFF;
				border-radius: 10rpx;
				box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

				.nav1 {
					display: flex;
					align-items: center;

					.pic1 {
						margin-left: 40rpx;
						margin-right: 28rpx;
						width: 34rpx;
						height: 28rpx;
						opacity: 1;
					}

					.tit1 {
						opacity: 1;
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: center;
						color: #000000;
						letter-spacing: 0rpx;
					}
				}

				.nav2 {
					width: 20rpx;
					height: 20rpx;
					opacity: 1;
					background: #ffffff;
					border: 4rpx solid #ffcc02;
					border-radius: 50%;
					margin-right: 40rpx;
				}

			}
		}

		.footer {
			// position: fixed;
			// bottom: 0;
			display: flex;
			width: 750rpx;
			height: 80rpx;
			opacity: 1;
			background: #ffffff;
			box-shadow: 0rpx -2rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);

			.nav1 {
				display: flex;
				align-items: center;
				height: 80rpx;
				width: 388rpx;
				// justify-content: center;
				padding-left: 48rpx;

				.tit1 {
					opacity: 1;
					font-size: 18rpx;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					color: #000000;
				}

				.tit2 {
					opacity: 1;
					font-size: 20rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #dd2638;
				}
			}

			.nav2 {
				width: 362rpx;
				height: 88rpx;
				opacity: 1;
				background: #dd2638;
				border-radius: 44rpx 0rpx 0rpx 44rpx;
				opacity: 1;
				font-size: 20rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: center;
				color: #ffffff;
				line-height: 88rpx;
			}
		}
	}

	.zfcgShow2 {
		width: 480rpx;
		height: 388rpx;
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
			width: 262rpx;
			height: 200rpx;
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
</style>
