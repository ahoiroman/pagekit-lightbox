module.exports = {

	plugin: true,

	data: function () {
		return {
			helper: this.$parent.$options.utils['lightbox-helper'].methods
		};
	},

	created: function () {
		var vm = this;

		if (typeof tinyMCE === 'undefined') {
			return;
		}

		this.$parent.editor.plugins.push ('-lightbox');
		tinyMCE.PluginManager.add ('lightbox', function (editor) {

			var showDialog = function () {
				var element = editor.selection.getNode (), lightbox = {}, parsed = {};

				if (element.nodeName === 'DIV' && !!element.attributes['data-lightbox'].value) {
					editor.selection.select (element);

					try {
						parsed = JSON.parse (vm.helper.decodeHTML (element.attributes['data-lightbox'].value));
					} catch (e) {
					}

					lightbox = vm.helper.flatToNestedItemInfo (parsed);
				}

				new vm.$parent.$options.utils['input-image-lightbox'] ({
					data: {
						lightbox: lightbox
					}
				}).$mount ()
				.$appendTo ('body')
				.$on ('select', function (lightbox) {
					var lightboxInfo = vm.helper.lightboxInfoFromPickerSelection (lightbox);

					editor.selection.setContent (
						vm.getLightboxContent (lightboxInfo)
					);

					editor.fire ('change');
				});
			};

			editor.addButton ('lightboxPicker', {
				tooltip: vm.$trans ('Insert Lightbox'),
				icon: 'none uk-icon-th-large" style="font-family: FontAwesome;',
				onclick: showDialog
			});

			editor.addContextToolbar (function (element) {
				return element && element.nodeName === 'DIV' && !!element.attributes['data-lightbox'].value;
			}, 'lightboxPicker');

			editor.addMenuItem ('lightboxPicker', {
				text: vm.$trans ('Insert Lightbox'),
				icon: 'none uk-icon-th-large" style="font-family: FontAwesome;',
				context: 'insert',
				onclick: showDialog
			});
		});
	},

	methods: {
		getLightboxContent: function (lightboxInfo) {
			return '(lightbox)%dataString%'.replace ('%dataString%', JSON.stringify (lightboxInfo));
		}
	}

};

window.Editor.components['editor-lightbox'] = module.exports;