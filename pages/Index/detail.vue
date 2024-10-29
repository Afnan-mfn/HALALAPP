<template>
  <view class="bigBox">
    <view class="Box">
      <view class="detailBox1">
        <text class="title">清真状态:</text>
        <text v-if="status === '清真'" class="text" style="color: greenyellow;">{{ status }}</text>
		<text v-else-if="status === '非清真'" class="text" style="color: orangered;">{{ status }}</text>
		<text v-else class="text" style="color: yellow;">{{ status }}</text>
      </view>
      <view class="detailBox2">
        <text class="title">配料表:</text>
        <view class="ingredientList">
          <view v-for="(ingredient, index) in ingredientList" :key="index" class="ingredientItem" @click="showPopup(ingredient)">
            {{ ingredient }}
          </view>
        </view>
      </view>
    </view>
    <!--UniPopup插件对应的弹窗组件-->
    <uni-popup ref="popupRef" type="center">
      <view class="popup-content">
		<text class="title">配料名：</text>
		<text class="text">{{ selectedIngredient }}</text>
		<text class="title">清真状态：</text>
        <text class="text">{{ ingredientStatus }}</text>
		<text class="title">嫌疑解释：</text>
		<text class="text">{{mushboohExplanation}}</text>
		<text class="title">清真状态解释：</text>
		<text class="text">{{ ingredientExplanation }}</text>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { IngredientExplanationData } from '@/api/DataEntryAPI.js'

	const status = ref('');
	const ingredients = ref('');
	const ingredientList = ref([]);
	const selectedIngredient = ref('');
	
	const popupRef = ref(null);
	
	const ingredientStatus = ref('')
	const ingredientExplanation = ref('')
	const mushboohExplanation = ref('')

	onLoad((options) => {
		console.log('接收传值：', options);
		if (options.status && options.ingredients) {
			status.value = decodeURIComponent(options.status);
			ingredients.value = decodeURIComponent(options.ingredients);
			ingredientList.value = ingredients.value.split('、');
		} else {
			console.error('没有接收到');
		}
	});
	
	// 获取配料解释
	const showPopup = async (ingredient) => {
		selectedIngredient.value = ingredient;
		uni.showLoading({
			title: '正在加载...',
			mask: true
		});
		
		// 去除selectedIngredient中的括号及其内容
		const newIngredient = selectedIngredient.value.replace(/（[^）]*）/g, '');
		
		// 使用UniPopup插件显示弹窗
		if (popupRef.value) {
			try {
				const res = await IngredientExplanationData(newIngredient);
				console.log('Response:', res);
				if(res.code === 200){
					ingredientStatus.value = res.data.halal_status;
					ingredientExplanation.value = res.data.halal_status_explanation || '无';
					mushboohExplanation.value = res.data.mushbooh_explanation || '无';
					popupRef.value.open();
				}else{
					console.error('请求失败:'+ res);
				}
			} 
			catch (error) {
				console.log('Failed to fetch historydata:', error);
				uni.hideLoading();
			} 
			finally {
				uni.hideLoading();
				
			}
		} 
		else {
			console.error('popupRef 组件引用为空');
		}
	};
</script>

<style lang="scss">
.bigBox {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  .Box {
    width: 97%; /* 设置宽度为100% */
    height: 100%; /* 设置高度为100% */
    margin-top: 1%;
    margin-bottom: 1%;
    background-color: #fff;
    border-radius: 15rpx;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    overflow-y: auto; /* 允许上下滚动内容 */
	overflow-x: hidden; /* 禁止水平滚动 */
	
	.detailBox1 {
		width: 80%;
		height: 12%;
		margin-top: 1%;
		margin-left: 10%;
		display: flex;
		flex-direction: row; /* 横向布局 */
		align-items: center; /* 垂直居中对齐 */
		justify-content: center; /* 水平左对齐 */
		padding: 5px;
		box-sizing: border-box; /* 全局设置 */
		border: 2rpx solid #ccc; /* 添加灰色边框 */
		
		.title {
			font-size: 70rpx;
			font-weight: bold;
			padding-right: 10rpx;
		}
		.text {
			font-size: 70rpx;
		}
	}
	
	.detailBox2 {
		width: 100%;
		padding: 5px;
		box-sizing: border-box; /* 全局设置 */
	
		.title {
			font-size: 30rpx;
			font-weight: bold;
			padding-right: 10rpx;
		}
		.content {
			font-size: 18px;
			line-height: 2; /* 设置合适的行高 */
			white-space: normal; /* 允许文本换行 */
			overflow-wrap: break-word; /* 确保长单词也能换行 */
			user-select: text; /* 确保文本可选 */
		}
	
		.ingredientList {
			display: flex;
			flex-wrap: wrap;
		.ingredientItem {
			margin: 5px;
			padding: 5px;
			border: 1px solid #ccc;
			border-radius: 5px;
			cursor: pointer;
			}
		}
	}
  }
  .popup-content {
	height: 1000rpx;
	width: 600rpx;;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: start;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 10rpx;
    text-align: center;
	
	.title{
		font-size: 32rpx;
		font-weight: bold;
		
	}
	.text{
		font-size: 32rpx;
		
	}
  }
}
</style>