<template>
  <view class="bigBox">
    <view class="Box">
      <view class="Record">
        <view v-for="item in IngredientsData" :key="item.ingredient_id" class="Box1">
          <view class="listdata">
            <view class="historycontent" @click="navigateToDetail(item)">
				<view class="time">清真状态：</view>
				<view class="time">{{ item.halal_status }}</view>
				<view class="time">配料表：</view>
				<view class="words">{{ item.ingredient_name }}</view>
            </view>
            <button
              class="button2"
              style="color: #ffffff; background-color: #e70000; border-color: #1AAD19"
              @click.stop="showDeleteConfirmation(item.ocrId)"
            >
              删除
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 删除确认弹窗 -->
<!--  <uni-popup ref="deletePopup" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消"
      confirmText="确定"
      title="提示"
      content="您确定要删除此条记录吗?"
      @confirm="confirmDelete"
      @close="closeDeletePopup"
    ></uni-popup-dialog>
  </uni-popup> -->
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { AllIngredientData } from '@/api/DataEntryAPI.js'

	const IngredientsData = ref([])

	// 获取数据
	const getAllIngredientData = async () => {
	  try {
		let res = await AllIngredientData()
		console.log('配料表数据：' + res.data)
		IngredientsData.value = res.data.sort((a, b) => b.ingredient_id - a.ingredient_id)
	  } catch (error) {
		console.error('Failed to fetch historydata:', error)
	  }
	}

	// 跳转到详细页面
	const navigateToDetail = (item) => {
	  console.log('Navigating to detail with:', item)
	  uni.navigateTo({
		url: `/pages/Index/detail?status=${encodeURIComponent(item.halal_status)}&ingredients=${encodeURIComponent(item.ingredient_name)}`
	  }).catch(err => {
		console.error('Navigation failed:', err)
	  })
	}

	onMounted(async () => {
		await getAllIngredientData();
	});
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
    width: 97%;
    height: 100vh; /* 设置高度 */
    margin-top: 1%;
    margin-bottom: 1%;
    background-color: #fff;
    border-radius: 15rpx;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .selecttime {
      background-color: #fff;
      padding: 10px;
      height: 10%;
      width: 90%;
    }
    .Record {
      width: 97%;
      height: 100vh; /* 设置高度 */
      margin-top: 1%;
      margin-bottom: 1%;
      background-color: #fff;
      border-radius: 15rpx;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      overflow-y: auto; /* 允许上下滚动内容 */
      .Box1 {
        position: relative;
        width: 100%;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        margin-top: 5rpx;
        .listdata {
          width: 90%; /* 宽度为父元素的 90% */
          height: 15vh; /* 高度为父元素的 20% */
          border: 1px solid #ccc; /* 添加灰色边框 */
          border-radius: 5px; /* 设置圆角，半径为 10px */
          margin-top: 5px;
          display: flex; /* 使用 flexbox 布局 */
          justify-content: start; /* 主轴（水平方向）上居中对齐 */
          align-items: center; /* 交叉轴（垂直方向）上向左对齐 */
          .historycontent {
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: flex-start; /* 左对齐 */
            width: 65%;

            .time {
              font-size: 12px;
              padding: 3px;
              margin-left: 5px;
            }
            .words {
              font-size: 12px;
              padding: 3px;
              margin-left: 5px;
              width: 100%; /* 满宽度 */
              max-height: 5vh; /* 最大高度 */
              overflow: hidden; /* 隐藏超出部分 */
              text-overflow: ellipsis; /* 超出部分用省略号表示 */
              white-space: nowrap; /* 不允许换行 */
            }
          }
          .button2 {
            font-size: 12px;
          }
        }
      }
    }
  }
  .warningBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50%;
  }
}
</style>