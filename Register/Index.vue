<template>
	<view class="bigBox">
		<view class="Box">
			<!-- 图片和欢迎词区域 -->
			<view class="imageBox">
				<uv-image src="https://cdn.uviewui.com/uview/album/1.jpg" 
				shape="circle" width="200rpx" height="200rpx"></uv-image>
			</view>
			<view class="textBox">
				<uv-text text="注册属于你的账号吧!" align="center" size="40rpx" bold="true"></uv-text>
			</view>
			<view class="infoBox">
				<uv-text type="info" text="已有账号？" align="right" size="30rpx"></uv-text>
				<uv-text type="primary" text="直接登录" align="left" size="30rpx"
				@click="navToLogin"></uv-text>
			</view>
			
			<!-- 登录+条款区域 -->
			<view class="loginBox">
				<!-- 登录表单组件 -->
				<uv-form labelAlign="center"
				labelPosition="left" :model="registerModel"
				:rules="rules" label-align="left">
					<uv-form-item label="用户名:" prop="userInfo.username" 
					labelWidth="150rpx">
						<uv-input v-model="registerModel.userInfo.username"
						placeholder="请输入用户名"></uv-input>
					</uv-form-item>
					<uv-form-item label="账号:" prop="userInfo.account"
					labelWidth="150rpx">
						<uv-input v-model="registerModel.userInfo.account"
						placeholder="请输入手机号码"></uv-input>
					</uv-form-item>
					<uv-form-item label="密码:" prop="userInfo.password"
					labelWidth="150rpx">
						<uv-input v-model="registerModel.userInfo.password" 
						placeholder="请输入密码" password></uv-input>
					</uv-form-item>
					<uv-form-item label="确认密码:" prop="userInfo.checkedPassword"
					labelWidth="150rpx">
						<uv-input v-model="registerModel.userInfo.checkedPassword" 
						placeholder="请输入相同的密码" password></uv-input>
					</uv-form-item>
				</uv-form>
				<uv-button type="primary" shape="circle" @click="register" style="margin-top: 10px;"
				color="linear-gradient(to right, rgba(5, 170, 10, 0.3), rgba(1, 112, 27, 0.5))">注册</uv-button>
				<!-- 协议区域 -->
				
			</view>
			<view class="infoBox">
				<text style="font-size: 20rpx;color: #4c4c4c;">已阅读并同意</text>
				<text style="font-size: 20rpx;color: blue;" @tap="navTodetail">服务协议</text>
				<text style="font-size: 20rpx;color: #4c4c4c;">和</text>
				<text style="font-size: 20rpx;color: blue;" @tap="navTodetail">xx隐私保护协议</text>
			</view>
			<!-- 注册账号、切换账号等区域 -->
			<view class="blankBox"></view>
		</view>
	</view>
</template>

<script setup>
	import { reactive,ref} from 'vue';
	import { RegisterByPhone } from "@/Register/RegisterAPI.js";
	
	const registerModel = reactive({
		userInfo : {
			username:'',
			account : '',
			password: '',
			checkedPassword:'',
		},
	});
	
	const rules = ref({
		'userInfo.username': {
			type: 'string',
			required:true,
			message: '请输入规范的用户名',
			trigger: ['blur', 'change'],
		},
		'userInfo.account': {  
			type: 'string',
			len:11,
			required:true,
			message: '请输入11位的手机号码',
			trigger: ['blur', 'change'],
		},
		'userInfo.password':{  
			type: 'string',
			required:true,
			message: '请记住输入的密码',  
			trigger: ['blur', 'change'],  
		},
		'userInfo.checkedPassword':{
			type: 'string',
			required:true,
			message: '确认密码与密码必须相同',  
			trigger: ['blur', 'change'],  
		},
	});
	// 表单提交
	
	const register = async () => {
		let res = await RegisterByPhone({
			username:registerModel.userInfo.username,
			phone:registerModel.userInfo.account,
			password:registerModel.userInfo.password,
			checkedPassword:registerModel.userInfo.checkedPassword
		});
		console.log(res + registerModel.userInfo.username + registerModel.userInfo.account
		+ registerModel.userInfo.password + registerModel.userInfo.checkedPassword)

		if (res.code === 200 && res.message === '添加成功'){
				uni.showToast({
					icon: 'success',
					title: '注册成功'
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/Login/Index',
					})
				}, 300)
		}else if(res.code === 200 && res.message === '该账号已被注册'){
			uni.showToast({
				title: '该账号已被注册，请直接登录',
				icon: "error",
				duration: 2000
			});
		}
		else {
			uni.showToast({
				title: '密码或确认密码有误，请重新输入',
				icon: "error",
				duration: 2000
			});
		}
	}
	
	const navToLogin = () =>{
		uni.redirectTo({
			url:'/Login/Index'
		})
	}
	
	const navTodetail = () =>{
		uni.navigateTo({
			url:'/Login/detail',
		})
	}
</script>

<style lang="scss">
	.bigBox{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to right, #a8efb9, #def8e4);
		
		.Box{
			width: 97%;
			height: 99%;
			border-radius: 15rpx;
			margin-top: 5rpx;
			margin-bottom: 5rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.imageBox{
				margin-top: 10%;
			}
			
			.textBox{
				font-size: 40rpx;
				font-weight: 800;
				padding-top: 20rpx;
			}
			
			.infoBox{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: left;
				align-items: center;
			}
			
			.loginBox{
				margin-top: 50rpx;
				height: auto; /* 改成自适应高度 */
				width: 80%;
				padding: 30rpx;
				padding-bottom: 50rpx;
				border-radius: 15rpx;
				background-color: #fff;
			}
			
			.infoBox{
				margin-top: 10rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
			}
			
			.blankBox{
				
			}
		}
	}
</style>