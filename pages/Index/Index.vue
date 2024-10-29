<template>
  <view class="bigBox">
    <view class="Box">

		<view class="Box1">
			<view class="history">
				<text class="queryText" @click="navToData">查询数据></text>
			</view>
			<view class="text1">
			   <uv-textarea v-model="value" maxlength="-1" height="1000rpx" border="none" customStyle="border: 1px solid #b6b6b6;border-radius: 5px;"
			   :maxlength="-1" placeholder="数据录入..." :adjustPosition="false"></uv-textarea>
			 </view>
			 <view class="buttonGroup1">
			   <button class="button" @click="uploadImageFromGallery">从相册选择</button>
			   	<button class="button" @click="takePhoto">拍照识别</button>
			 </view>
			 <view class="buttonGroup1">
			         <button class="button" @click="submitToBackend">提交数据</button>
			 </view>
		</view>
    </view>
	<ksp-cropper
		mode="free" 
		:width="600" 
		:height="250" 
		:maxWidth="1024" 
		:maxHeight="1024" 
		:url="src" @cancel="oncancel" @ok="onok"
		
		style="width: 100%;height: 100%;"></ksp-cropper>
		
	<ksp-cropper
		mode="free" 
		:width="600" 
		:height="250" 
		:maxWidth="1024" 
		:maxHeight="1024" 
		:url="filePath" @cancel="oncancel2" @ok="onok2"
		
		style="width: 100%;height: 100%;"></ksp-cropper>
  </view>
</template>

<script setup>
	import { ref } from 'vue'
	import { SaveIngredientsData } from "@/api/DataEntryAPI.js"
	
	const value = ref('') //文本数据
	const filePath = ref('')// 相册选择的图片地址
	const src = ref('')// 拍照上传的图片地址
	
	const selectedUrl = ref('');//选择裁剪的图片

	const navToData = () =>{
			uni.navigateTo({
				url:'/pages/Index/Record'
			})
		}

	//相册选择照片1张
	const uploadImageFromGallery = async () => { 
	  uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album'],
		success: async (res) => {
		  filePath.value = res.tempFilePaths[0];
		  console.log('选择的文件路径:', filePath);
		}
	  });
	};
	
	const onok2 = (res) =>{
		console.log("点击确认",res);
		filePath.value = "";
		selectedUrl.value = res.path;
		
		  // 显示加载提示
		  uni.showLoading({
		    title: '正在识别中...'
		  });
		
		uni.uploadFile({
			// 更改IP地址（2/3）
					url: 'http://192.168.100.71:5000/api/upload', //开发者服务器 url
					filePath: selectedUrl.value, //要上传文件资源的路径。
					name: 'image',
					//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
					success: (res) => { //接口调用成功的回调函数
						console.log('uploadImage success, res is:' + JSON.parse(res.data).data.result);
						  try {
							const response = JSON.parse(res.data).data; // 将JSON字符串解析为对象
							if (response != '') {
							  value.value = response.result;
							  uni.showToast({
								title: '识别成功',
								icon: 'success',
							  });
							} else {
							  uni.showToast({
								title: '操作失败',
								icon: 'none'
							  });
							}
						  } catch (error) {
							console.error('解析响应失败:', error);
							uni.showToast({
							  title: '解析失败',
							  icon: 'none'
							});
						  }
						  
						  uni.hideLoading();
					},fail: () => {
						uni.hideLoading();
					}
		})
	}
	
	const oncancel2 = (res)=>{
		filePath.value = "";
		console.log("点击取消",res);
	};
	
	//拍照上传
	const takePhoto = () => {
	  uni.chooseImage({  
	    count: 1,  
	    sizeType: ['original', 'compressed'], 
		sourceType:['camera'],
	    success: (res) => {  
			src.value = res.tempFilePaths[0];
			console.log('选择的文件路径:', src);
	    }  
	  });  
	};
	
	const onok = (res)=>{
		console.log("点击确认",res);
		src.value = "";
		selectedUrl.value = res.path;
		
		  // 显示加载提示
		  uni.showLoading({
		    title: '正在识别中...'
		  });
		
			// 更改IP地址（3/3）
		uni.uploadFile({
				  url: 'http://192.168.100.71:5000/api/upload', //开发者服务器 url
				filePath: selectedUrl.value, //要上传文件资源的路径。
				name: 'image', 
				success: (res) => { //接口调用成功的回调函数
					console.log('uploadImage success, res is:' + JSON.parse(res.data).data.result);
					  try {
					    const response = JSON.parse(res.data).data; // 将JSON字符串解析为对象
					    if (response != '') {
					      value.value = response.result;
					      uni.showToast({
					        title: '识别成功',
					        icon: 'success',
					      });
					    } else {
					      uni.showToast({
					        title: '识别失败,请重试',
					        icon: 'none'
					      });
					    }
					  } catch (error) {
					    console.error('解析响应失败:', error);
					    uni.showToast({
					      title: '解析失败',
					      icon: 'none'
					    });
					  }
					  
					  uni.hideLoading();
				},
				    fail: () => {
				      // 隐藏加载提示
				      uni.hideLoading();
				      uni.showToast({
				        title: '上传失败',
				        icon: 'none'
				      });
				    }
		})
	};
	const oncancel = (res)=>{
		src.value = "";
		console.log("点击取消",res);
	};
	
	//提交数据
	const submitToBackend = async () => {
		if (!value.value) return;

		const ocrResult = value.value;
		value.value = '';
		
		// 创建一个新变量 newOcrResult 并去掉 ocrResult 中的句号
		const newOcrResult = ocrResult.replace(/\./g, '');

		uni.showLoading({ title: '正在提交...' });

		try {
				const response = await SaveIngredientsData(newOcrResult); // 调用 SaveOcrData API
				uni.hideLoading();
				if (response.code === 200) {
					uni.showToast({ title: '提交成功', icon: 'success' });
				} else {
					uni.showToast({ title: '提交失败', icon: 'none' });
					console.error('Error in response:', response);
				}
			}
		catch (err) {
			uni.hideLoading();
			uni.showToast({ title: '提交失败', icon: 'none' });
			console.error('Error submitting data:', err);
		}
	};

	const onNavTest = () =>{
		uni.navigateTo({
			url:'/pages/Index/test'
		})
	}

</script>

<style lang="scss">
.bigBox {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .Box{
	  width: 96%;
	  height: 100%;
	  margin: 1%;
	  background-color: #fff;
	  border-radius: 15rpx;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  
	
	  .Box1 {
	      position: relative;
	      width: 100%;
	      height: 100%;
	      background-color: #fffaf8;
	      border-radius: 15rpx;
	      display: flex;
	      flex-direction: column;
	      justify-content: start;
	      align-items: center;
	      margin-top: 5rpx;
		  .history{
			  display: flex;
			  flex-direction: column;
			  align-self: flex-end;
			  padding: 12rpx;
			  .queryText{
				  font-size: 15px; 
				  font-weight: bold;
				  color: #00ad00; 
				  cursor: pointer; 
				  padding: 3rpx; 
				  transition: color 0.3s;
				  &:hover {
					  color: #009900; 
				  }
			  }
		  }
	  
	      .text1 {
	  	  width: 95%; 
	  	  //height: 100%;
	  	  padding: 10px; 
		  user-select: text; /* 允许文本选择 */
	      }
	  
	      .buttonGroup1 {
	        display: flex;
	        justify-content: center;
	        width: 100%;
	        margin-top: 20upx;
	  	  
	  
	        .button {
	          background-color: #00ad60;
	          color: white;
	          padding: 1upx 20upx;
	          border-radius: 25upx;
	          margin: 0 10upx;
	          font-size: 16px;
			  font-weight:540;
	  		background-color: #00ad60;
	  			color: white;
	  			&:active {
	  			        background-color: #009900; /* 点击时背景颜色变浅 */
	  			    }
	        }
	      }
	    }
  }
  .warningBox{
  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  	align-items: center;
  	margin-top: 50%;
  }
}
</style>