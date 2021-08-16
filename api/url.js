export default {
    // baseUrl: 'http://192.168.1.128:8094',
	// baseUrl:'https://hii7mo3m.dnat.tech',
	baseUrl:'https://fenxiao.5laoye.com',
    login: '/api/auth/mini_login', //登录
    userInfo:'/api/user/info',//用户信息
	addressIndex:'/api/address/index',//收货地址列表
	addressAdd:'/api/address/add',//添加收货地址
	addressEdit:'/api/address/edit',//修改收货地址
	indexBanner:'/api/index/banner',//首页轮播图
	indexProduct_list:'/api/index/product_list',//商品列表
	indexProduct_detail:'/api/index/product_detail',//商品详情页
	indexCommit_list:'/api/index/commit_list',//商品评价列表
	cartAdd2cart:'/api/cart/add2cart',//添加到购物车
	cartIndex:'/api/cart/index',//购物车列表
	cartChange_cart_num:'/api/cart/change_cart_num',//修改购物车数量
	del_cart_product:'/api/cart/del_cart_product',//删除购物车商品
	orderPost_order:'/api/order/post_order',//提交订单
	orderPay2order:'/api/order/pay2order',//付款
	indexCategory:'/api/index/category',//日常商品批发分类
	orderIndex:'/api/order/index',//订单列表
	orderCancel_order:'/api/order/cancel_order',//取消订单
	orderConfirm_deliver:'/api/order/confirm_deliver',//确认收货
	userAdd_commit:'/api/user/add_commit',//商品评论
	userChange_favor:'/api/user/change_favor',//收藏商品
	userCheck_favor:'/api/user/check_favor',//是否收藏某商品
	orderBuy_now:'/api/order/buy_now',//立即购买
	orderBuy_again:'/api/order/buy_again',//再买一单
	balanceWithdraw:'/api/balance/withdraw',//提现
	indexWeb_config:'/api/index/web_config',//网站配置信息
	userId_card_orc:'/api/user/id_card_orc',//身份证验证
	userAdd_bank_card:'/api/user/add_bank_card',//添加银行卡
	indexSearch_history:'/api/index/search_history',//热搜词
	indexRandom_product:'/api/index/random_product',//猜你喜欢
	userAdd_bank_card:'/api/user/add_bank_card',//添加银行卡
	userShare:'/api/user/share',//
	userMy_team:'/api/user/my_team',//我的团队
	addressDel:'/api/address/del',//删除收货地址
	cartDel_all_cart:'/api/cart/del_all_cart',//清空购物车
	indexMedical_article:'/api/index/medical_article',//医疗说明
	userLevel_article:'/api/user/level_article',//医疗说明
}