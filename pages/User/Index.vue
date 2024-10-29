<template>
	<view class="bigBoxlogin">
		<view class="Boxlogin">
			<!-- 图片和欢迎词区域 -->
			<view class="imageBox">
				<uv-image src="https://cdn.uviewui.com/uview/album/1.jpg" 
				shape="circle" width="200rpx" height="200rpx"></uv-image>
			</view>
			<view class="textBox">
				<text> 您好，欢迎登录 </text>
			</view>
			<!-- 登录+条款区域 -->
			<view class="loginBox">
				<!-- 登录表单组件 -->
				<uv-form labelAlign="center" labelPosition="left" :model="loginModel"
				:rules="rules">
					<uv-form-item label="账号:" prop="userInfo.account">
						<uv-input v-model="loginModel.userInfo.account"
						placeholder="请输入手机号码"></uv-input>
					</uv-form-item>
					<uv-form-item label="密码:" prop="userInfo.password">
						<uv-input v-model="loginModel.userInfo.password" 
						placeholder="请输入登录密码" password></uv-input>
					</uv-form-item>
					<uv-button type="primary" shape="circle" @tap="login" style="margin-top: 10px;"
					color="linear-gradient(to right, rgba(5, 170, 10, 0.3), rgba(1, 112, 27, 0.5))">登录</uv-button>
				</uv-form>
				<!-- 协议区域 -->
				
			</view>
			<view class="infoBox">
				<text style="font-size: 20rpx;color: #4c4c4c;">点击[登录]表示已阅读并同意</text>
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
	
	 const loginModel = reactive({
		userInfo : {
			account : '',
			password: '',
		},
	});
	
	const rules = ref({
	  'userInfo.account': {  
	    type: 'string',
		len:11,
		required:true,
	    message: '请输入11位的手机号码',  
	    trigger: ['blur', 'change'],  
	  },
	  'userInfo.password':{  
	    type: 'number',
		required:true,
	    message: '点击“忘记密码”，即可找回密码',  
	    trigger: ['blur', 'change'],  
	  },  
	});
	
	const isLogin = useLoginStore()
	// 表单提交
	
	const login = async () => {
		let res = await LoginByPhone({
			phone:loginModel.userInfo.account,
			password:loginModel.userInfo.password,
		});
		console.log(res)

		if (res.code == 200){
			isLogin.login = true,
				uni.showToast({
					icon: 'success',
					title: '登录成功',
					
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/Index/Index',
					})
				}, 300)
		}
		else {
			uni.showToast({
				title: '账号或密码有误，请重新输入',
				icon: "error",
				duration: 2000
			});
		}
	}
	
	const navTodetail = () =>{
		uni.navigateTo({
			url:'/pages/User/detail',
		})
	}
</script>

<style lang="scss">
	.bigBoxlogin{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to right, #a8efb9, #def8e4);
		
		.Boxlogin{
			width: 100%;
			height: 100%;
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
			
			.loginBox{
				margin-top: 50rpx;
				height: auto; /* 改成自适应高度 */
				width: 80%;
				padding: 30rpx;
				padding-bottom: 50rpx;
				border-radius: 15rpx;
				// background-color: #fff;
			}
			
			.infoBox{
				margin-top: 20rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
			}
			
			.blankBox{
				
			}
		}
	}
</style>