<template>
	<demo-block title="心电图">
		<view style="height: 350rpx;">
			<l-ecg ref="ecgRef"></l-ecg>
		</view>
	</demo-block>
</template>

<script>
	import { ref, onMounted, defineComponent, nextTick } from '../l-ecg/vue';
	const value = [
		122, 122, 122, 122, -122, -122, -122, -122, -122, -122, -122, -122, -122, -122, 122, 122, 122, 123, 125, 127, 130, 133, 135, 137, 138, 139, 140, 140, 139, 138, 136, 134, 130, 127, 125, 124, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 121, 119, 116, 113, 111, 132, 151, 171, 190, 210, 229, 210, 190, 171, 151, 132, 112, 114, 117, 120, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 123, 124, 124, 126, 128, 131, 133, 134, 136, 140, 143, 144, 146, 149, 150, 152, 153, 153, 154, 155, 156, 157, 156, 155, 153, 153, 152, 150, 149, 146, 145, 142, 138, 135, 133, 129, 127, 124, 123, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122
	];

	export default defineComponent({
		setup() {
			const ecgRef = ref(null);

			onMounted(async () => {
				// Initialize ECG component
				await nextTick();
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
					}
				});

				// Ensure the DOM is updated before calling update and resume
				await nextTick();

				// Update and resume ECG
				const updateAndResume = () => {
					ecgRef.value.update(value);
					ecgRef.value.resume();
					setInterval(() => {
						ecgRef.value.update(value);
					}, 1000);
				};

				updateAndResume();
			});

			return {
				ecgRef
			};
		}
	});
</script>

<style>
</style>
