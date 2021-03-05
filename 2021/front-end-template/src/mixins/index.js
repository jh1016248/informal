function getOptionsValue(list, value) {
	if(value === null || value === undefined || value === '') return ''
	if(!list) {
		return ''
	}
	const item = list.find(item => item.value == value || item.value == value * 1);
	if(!item) {return ''}
	return item.label
}

export default {
	data() {
		return {
			loadingControl: null,
		}
	},
	methods: {
		getOptionsValue,
		$showLoading(options = {}) {
			let normalOptions = {
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(255, 255, 255, 0.7)",
			}
			this.loadingControl = this.$loading({
				...normalOptions,
				...options,
			});

			this._loadingTimer = setTimeout(() => {
				this.loadingControl && this.loadingControl.close()
			}, 5000)
		},
		$hideLoading() {
			clearTimeout(this._loadingTimer)
			this.loadingControl.close();
		}
	}
}