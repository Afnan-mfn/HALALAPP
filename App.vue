<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			var Color = plus.android.importClass("android.graphics.Color");
			plus.android.importClass("android.view.Window");
			var mainActivity = plus.android.runtimeMainActivity();
			var window_android = mainActivity.getWindow();
			window_android.setNavigationBarColor(Color.parseColor("#0b1729"));
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uv-ui-tools/index.scss';
	
	page{
		background-image: linear-gradient(to bottom right, #a8efb9 25%, #e5f9e9 60%);
		display: flex;
		flex-direction: column;
		min-height: 100%; 
		height: auto; 
		width: 100%;
	}
</style>
