

###  代码块

直接引入就可以使用，代码如下：
```xml
<template>
	<view class="content">
		<zeng-calen  :actDay="actDay" :chooseDay="chooseDay" @onDayClick='onDayClick'></zeng-calen>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actDay: [], //用户选择的日期
				chooseDay: ["2023-04-13", "2023-04-15", "2023-04-16", "2023-04-05"], //已被投标的数据
			}
		},
		onLoad() {

		},
		methods: {
			// 展开日历
			onDayClick(data) {
				let choose = data.date //用户点中的数据
				if (this.actDay.includes(choose)) { //如果用户点击的日期已经存在
					// 移除元素下标
					const index = this.actDay.indexOf(choose);
					//删除用户点击的日期
					this.actDay.splice(index, 1)
				} else if (this.chooseDay.includes(choose)) { //判断是否已经被投标
					uni.showToast({
						title: "这个日期已经被投标了",
						icon: "none"
					})
				} else {
					//添加用户点击的日期
					this.actDay.push(choose)
				}
			},
		}
	}
</script>

<style>
 
</style>

```
### 
Calendar Props：

| 属性名   | 类型 |   默认值	 |     说明  	 |  
| :----- | :--: | :-------: | :-------: |
| weekstart |  Number  | 0 | 星期几为第一天(0为星期日) |
| markDays |  Array  | null |  已标记的日期 |
| headerBar |  Boolean  | true | 是否展示月份切换按钮 |
| disabledAfter |  Boolean  | false | 过去日期是否不可点击 |
| actDay |  Array  | null | 接收用户选择的参数 |
| chooseDay |  Array  | null | 接受已经被选择的参数 |

### 
Calendar Events：

| 事件   | 说明 |
| :----- | :--: |
| onDayClick |  选中的日期  |