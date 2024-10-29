// @ts-nocheck
// #ifdef VUE3
// import {computed, onMounted, ref} from 'vue';
// #endif
// #ifndef VUE3
// import {computed, onMounted, ref} from '@vue/composition-api';
// #endif

import {canIUseCanvas2d, getSystemInfoSync} from './version'
// import {getRect} from '@/uni_modules/lime-ui'
import {computed, onMounted, ref} from './vue'
import {Canvas} from './type'

export function getRect(selector : string, options: any = {}) {
	const typeDefault = 'boundingClientRect'
	const { context, type = typeDefault} = options
	return new Promise<any>((resolve, reject) => {
		const dom = uni.createSelectorQuery().in(context).select(selector);
		const result = (rect) => {
			if(rect) {
				 resolve(rect)
			} else {
				reject()
			}
		}
		if(type == typeDefault) {
			dom[type](result).exec()
		} else {
			dom[type]({
				node: true,
				size: true,
				rect: true
			}, result).exec()
		}
	});
};

export function useCanvas(selector: string, options) {
	const {context} = options
	const isCanvas2d = canIUseCanvas2d()
	const canvas = ref<Canvas>()
	onMounted(() => {
		if(isCanvas2d) {
			Promise.all([getRect(selector, {context, type: 'fields'}), getRect(selector + 'line', {context, type: 'fields'})]).then(([bg, line] )=> {
				if(bg && line) {
					const {pixelRatio} = getSystemInfoSync()
					const {bottom, width, height, left, node} = bg
					line.node.width = node.width = width * pixelRatio
					line.node.height = node.height = height * pixelRatio
					const context = node.getContext('2d')
					const offscreen = line.node.getContext('2d')
					context.scale(pixelRatio, pixelRatio)
					offscreen.scale(pixelRatio, pixelRatio)
					canvas.value = {
						bottom, width, height, left, 
						context, 
						offscreen, 
					}
				}
			})
		} else {
			getRect(selector, {context}).then(res => {
				if(res) {
					const ctx = uni.createCanvasContext(selector.replace('#', ''), context)
					const {bottom, width, height, left} = res
					canvas.value = {
						bottom, width, height, left, 
						context: uni.createCanvasContext(selector.replace('#', ''), context), 
						offscreen: uni.createCanvasContext(selector.replace('#', '') + 'line', context), 
					}
				}
			})
		}
	})
	return canvas //computed(() => canvas.value) 
}