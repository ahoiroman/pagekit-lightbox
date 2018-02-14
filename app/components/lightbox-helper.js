module.exports = {

	methods: {

		lightboxInfoFromPickerSelection: function lightboxInfoFromPickerSelection (pickerSelection) {
			var lightboxInfo = {
				data: {
					allowfullscreen: false,
					duration: 0,
					keyboard: false,
					hrefclass: '',
					imgclass: '',
					gridclass: '',
					rowclass: '',
					group: ''
				},
				images: []
			};

			if (!!pickerSelection.data.allowfullscreen === true) {
				lightboxInfo.data.allowfullscreen = pickerSelection.data.allowfullscreen;
			}
			if (!!pickerSelection.data.duration === true) {
				lightboxInfo.data.duration = pickerSelection.data.duration;
			}
			if (!!pickerSelection.data.keyboard === true) {
				lightboxInfo.data.keyboard = pickerSelection.data.keyboard;
			}
			if (!!pickerSelection.data.imgclass === true) {
				lightboxInfo.data.imgclass = pickerSelection.data.imgclass;
			}
			if (!!pickerSelection.data.hrefclass === true) {
				lightboxInfo.data.hrefclass = pickerSelection.data.hrefclass;
			}
			if (!!pickerSelection.data.gridclass === true) {
				lightboxInfo.data.gridclass = pickerSelection.data.gridclass;
			}
			if (!!pickerSelection.data.rowclass === true) {
				lightboxInfo.data.rowclass = pickerSelection.data.rowclass;
			}
			if (!!pickerSelection.data.group === true) {
				lightboxInfo.data.group = pickerSelection.data.group;
			}
			if (!!pickerSelection.images === true) {
				lightboxInfo.images = pickerSelection.images;
			}

			return lightboxInfo;
		},

		flatToNestedItemInfo: function flatToNestedItemInfo(flatItemInfo) {
			var nestedItemInfo = {};

			//flatItemInfo = this.validateFlatItemInfo (flatItemInfo);
			if (flatItemInfo.data) {
				nestedItemInfo.data = flatItemInfo.data;
			}

			if (flatItemInfo.data.images) {
				nestedItemInfo.images = flatItemInfo.data.images;
			}

			if (Object.keys(flatItemInfo).length > 0) {
				nestedItemInfo.data = flatItemInfo;
			}

			return nestedItemInfo;
		},
		validateFlatItemInfo: function (flatItemInfo) {
			var validFlatItemInfo = {};

			if (parseInt (flatItemInfo.id) > 0) {
				validFlatItemInfo.id = parseInt (flatItemInfo.id);
			}

			if (!!flatItemInfo.title === true) {
				validFlatItemInfo.title = flatItemInfo.title;
			}

			return validFlatItemInfo;
		},
	}
};