<template>
	<view class="l-ecg l-class" :style="[styles]">
		<canvas class="l-ecg__canvas" :canvas-id="canvasId" :id="canvasId" type="2d"></canvas>
		<canvas class="l-ecg__canvas" :canvas-id="canvasId + 'line'" :id="canvasId + 'line'" type="2d"></canvas>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	import {computed, getCurrentInstance, watch, reactive, defineComponent} from './vue'
	import {useCanvas} from './useCanvas';
	import {Ecg} from './ecg';
	import EcgProps from './props';
	import type {EcgOptions} from './type';
	
	export default defineComponent({
		name: 'l-ecg',
		externalClasses: ['l-class'],
		options: {
			addGlobalClass: true,
			virtualHost: true,
		},
		props: EcgProps,
		setup(props, {expose}) {
			const app = getCurrentInstance()
			const canvasId = `l-ecg-${app.uid}`
			const canvas = useCanvas(`#${canvasId}` ,{context: app.proxy})
			
			let ecgChart = null
			let grid = reactive({
				length: props.gridLength,
				size: props.gridSize
			})
			
			const styles = computed(() => {
				const lineWidth = 1 / 2
				if(grid.length) {
					return {
						// 每小格5px 每大格为 5小格
						width: grid.length[0] * grid.size * 5 + lineWidth + 'px',
						height: grid.length[1] * grid.size * 5 + lineWidth + 'px',
					}
				}
				
			})
			
			const init = (options: EcgOptions) => {
				if(ecgChart) {return}
				watch(canvas, (v) => {
					if(v) {
						ecgChart = new Ecg(canvas.value, Object.assign({ }, props, options))
					}
				}, {immediate: true})
			}
			const update = (data: number[]) => ecgChart.update(data)
			const resume = () => ecgChart.resume()
			const pause = () => ecgChart.pause()
			
			// #ifdef VUE3
			expose({
				init,
				update,
				resume,
				pause
			})
			// #endif
			
			return {
				styles,
				canvasId,
				// #ifndef VUE3
				init,
				update,
				resume,
				pause
				// #endif
			}
		}
	})
</script>
<style lang="scss">
	.l-ecg {
		width: 100%;
		height: 100%;
		position: relative;
		&__canvas {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
		}
	}
</style>
