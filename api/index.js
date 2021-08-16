import axios from 'axios';
import Vue from 'vue'
// import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
let myPost = axios.create({
	baseURL: urls.baseUrl,
	method: 'post',
	// timeout: 1000,
})
let myGet = axios.create({
	baseURL: urls.baseUrl,
	method: 'get',
	// timeout: 1000,
})
let myDelete = axios.create({
	baseURL: urls.baseUrl,
	method: 'delete',
	// timeout: 1000,
})
axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

myPost.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'token':  uni.getStorageSync('token'),
			'Access-Control-Allow-Origin': '*',
			"access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myGet.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			// 'token': sessionStorage.token,
			'Access-Control-Allow-Origin': '*',
			"access-control-allow-credentials": "true"
		}
		config.headers.token = uni.getStorageSync('token');
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myPost.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		return response.data
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		sessionStorage.setItem("isLogin", false);
		console.log(sessionStorage.getItem("isLogin"));
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myGet.interceptors.response.use(response => {
	if (response.status === 200) {
		return response.data
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error);
	if (error.response.status === 500) {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		sessionStorage.setItem("isLogin", false);
		console.log(sessionStorage.getItem("isLogin"));
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})

export default {
	login(obj) {
		return myPost({
			url: urls.login,
			params: {
				...obj
			},
		})
	},
	userInfo(){
		return myPost({
			url: urls.userInfo,
		})
	},
	addressIndex(){
		return myPost({
			url: urls.addressIndex,
		})
	},
	addressAdd(obj){
		return myPost({
			url: urls.addressAdd,
			params: {
				...obj
			},
		})
	},
	addressEdit(obj){
		return myPost({
			url: urls.addressEdit,
			params: {
				...obj
			},
		})
	},
	indexBanner(){
		return myPost({
			url: urls.indexBanner,
		})
	},
	indexProduct_list(obj){
		return myPost({
			url: urls.indexProduct_list,
			params: {
				...obj
			},
		})
	},
	indexProduct_detail(product_id){
		return myPost({
			url: urls.indexProduct_detail,
			params: {
				product_id
			},
		})
	},
	indexCommit_list(obj){
		return myPost({
			url: urls.indexCommit_list,
			params: {
				...obj
			},
		})
	},
	cartAdd2cart(obj){
		return myPost({
			url: urls.cartAdd2cart,
			params: {
				...obj
			},
		})
	},
	cartIndex(){
		return myPost({
			url: urls.cartIndex,
		})
	},
	cartChange_cart_num(obj){
		return myPost({
			url: urls.cartChange_cart_num,
			params: {
				...obj
			},
		})
	},
	del_cart_product(cart_id){
		return myPost({
			url: urls.del_cart_product,
			params: {
				cart_id
			},
		})
	},
	orderPost_order(obj){
		return myPost({
			url: urls.orderPost_order,
			params: {
				...obj
			},
		})
	},
	orderPay2order(obj){
		return myPost({
			url: urls.orderPay2order,
			params: {
				...obj
			},
		})
	},
	indexCategory(){
		return myPost({
			url: urls.indexCategory,
		})
	},
	orderIndex(obj){
		return myPost({
			url: urls.orderIndex,
			params: {
				...obj
			},
		})
	},
	orderCancel_order(order_id){
		return myPost({
			url: urls.orderCancel_order,
			params: {
				order_id
			},
		})
	},
	orderConfirm_deliver(order_id){
		return myPost({
			url: urls.orderConfirm_deliver,
			params: {
				order_id
			},
		})
	},
	userAdd_commit(obj){
		return myPost({
			url: urls.userAdd_commit,
			params: {
				...obj
			},
		})
	},
	userChange_favor(product_id){
		return myPost({
			url: urls.userChange_favor,
			params: {
				product_id
			},
		})
	},
	userCheck_favor(product_id){
		return myPost({
			url: urls.userCheck_favor,
			params: {
				product_id
			},
		})
	},
	userShare(obj){
		return myPost({
			url: urls.userShare,
			params: {
				...obj
			},
		})
	},
	orderBuy_now(obj){
		return myPost({
			url: urls.orderBuy_now,
			params: {
				...obj
			},
		})
	},
	orderBuy_again(order_id){
		return myPost({
			url: urls.orderBuy_again,
			params: {
				order_id
			},
		})
	},
	balanceWithdraw(obj){
		return myPost({
			url: urls.balanceWithdraw,
			params: {
				...obj
			},
		})
	},
	indexWeb_config(){
		return myPost({
			url: urls.indexWeb_config,
		})
	},
	userId_card_orc(obj){
		return myPost({
			url: urls.userId_card_orc,
			data: {
				...obj
			},
		})
	},
	userAdd_bank_card(obj){
		return myPost({
			url: urls.userAdd_bank_card,
			params: {
				...obj
			},
		})
	},
	indexSearch_history(){
		return myPost({
			url: urls.indexSearch_history,
		})
	},
	indexRandom_product(){
		return myPost({
			url: urls.indexRandom_product,
		})
	},
	userAdd_bank_card(obj){
		return myPost({
			url: urls.userAdd_bank_card,
			params: {
				...obj
			},
		})
	},
	userShare(obj){
		return myPost({
			url: urls.userShare,
			params: {
				...obj
			},
		})
	},
	userMy_team(){
		return myPost({
			url: urls.userMy_team,
		})
	},
	addressDel(address_id){
		return myPost({
			url: urls.addressDel,
			params: {
				address_id
			},
		})
	},
	cartDel_all_cart(){
		return myPost({
			url: urls.cartDel_all_cart,
		})
	},
	indexMedical_article(){
		return myPost({
			url: urls.indexMedical_article,
		})
	},
	userLevel_article(){
		return myPost({
			url: urls.userLevel_article,
		})
	},
}
