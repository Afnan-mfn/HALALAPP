# 心电图
- uniapp vue3 canvas 心电图
- Q群 1169785031
- 初版，可能存在不足，希望能帮到大家

### 安装
- 在市场导入插件即可在任意页面使用，无须再`import`

### 使用
- 提供简单的使用示例，更多请查看下方的demo

```html
<view style="height: 350rpx;">
	<l-ecg ref="ecgRef"></l-ecg>
</view>
<button @click="resume">播放</button>
<button @click="pause">暂停</button>
```
```js
const value = [122, 122, 122, 122, -122, -122, -122, -122, -122, -122, -122, -122, -122, -122, 122, 122, 122, 123, 125, 127, 130, 133, 135, 137, 138, 139, 140, 140, 139, 138, 136, 134, 130, 127, 125, 124, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 121, 119, 116, 113, 111, 132, 151, 171, 190, 210, 229, 210, 190, 171, 151, 132, 112, 114, 117, 120, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 124, 126, 128, 131, 133, 134, 136, 140, 143, 144, 146, 149, 150, 152, 153, 153, 154, 155, 156, 157, 156, 155, 153, 153, 152, 150, 149, 146, 145, 142, 138, 135, 133, 129, 127, 124, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122]
const ecgRef = ref(null)
onMounted(() => {
	ecgRef.value.init({
		// 小格和大格的border color
		lineColor: ['#c7dff5', '#63b3f8'],
		ampTime: 'Amp: 10mm/mv  Time: 25mm/sec',
		textColor: '#000',
		wave: {
			// ecg
			// 1秒多少个点
			frameSize: 250,
			yMax: 250,
			waveHeight: 100,
			// 每次画几个点
			step: 10,
			// 扫纸速度，1 默认 表示 25mm/s (1秒25个小格子 每个小格子0.04s)。 0.5表示扫纸速度为 12.5mm/s。2表示扫纸速度为 50mm/s。
			speedRatio: 1,
			lineColor: 'red'
		},
	})
})
const resume = () => {
	ecgRef.value.update(value)
	ecgRef.value.resume()
	setInterval(() => {
		ecgRef.value.update(value)
	}, 1000)
}
const pause = () => {
	ecgRef.value.pause()
}
```


### 查看示例
- 导入后直接使用这个标签查看演示效果

```html
// 代码位于 uni_modules/lime-ecg/compoents/lime-ecg
<lime-ecg />
```



### 插件标签
- 默认 l-ecg 为 component
- 默认 lime-ecg 为 demo


### 关于vue2的使用方式
- 插件使用了`composition-api`, 如果你希望在vue2中使用请按官方的教程[vue-composition-api](https://uniapp.dcloud.net.cn/tutorial/vue-composition-api.html)配置
- 关键代码是: 在main.js中 在vue2部分加上这一段即可,官方是把它单独成了一个文件.
```js
// vue2
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```
另外插件也用到了TS，vue2可能会遇过官方的TS版本过低的问题,找到HX目录下的`compile-typescript`目录
```js
// \HBuilderX\plugins\compile-typescript
yarn add typescript -D
- or - 
npm install typescript -D
```



## API

### Props

| 参数                       | 说明                                                         | 类型             | 默认值       |
| --------------------------| ------------------------------------------------------------ | ---------------- | ------------ |
| gridLength                | 大格子数量，非必填                                                      | <em>[number, number]</em>  | `[]`     |
| gridSize                    | 小格子尺寸                  | <em>number</em>  | `5` |

### Expose
| 参数                       | 说明                                                         | 参数             | 
| --------------------------| ------------------------------------------------------------ | ---------------- |
| init              		| 初始化  |  | 
| update             		| 更新数据  |  | 
| resume             		| 播放  |  | 
| pause             		| 暂停  |  | 



## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)