module.exports = {

	plugin: true,

	data: function () {
		return {
			helper: this.$parent.$options.utils['lightbox-helper'].methods
		};
	},

	created: function () {
		var vm = this, editor = this.$parent.editor;

		if (!editor || !editor.htmleditor) {
			return;
		}

		this.lightboxes = [];

		editor.addButton ('lightbox', {
			title: 'Lightbox',
			label: '<i class="uk-icon-th-large"></i>'
		});

		editor.options.toolbar.push ('lightbox');

		editor
		.on ('action.lightbox', function (e, editor) {
			vm.openModal (_.find (vm.lightboxes, function (lightbox) {
				return lightbox.inRange (editor.getCursor ());
			}));
		})
		.on ('render', function () {
			vm.lightboxes = editor.replaceInPreview (/\(lightbox\)(\{.+\})/gi, vm.replaceInPreview);
		})
		.on ('renderLate', function () {
			while (vm.$children.length) {
				vm.$children[0].$destroy ();
			}

			Vue.nextTick (function () {
				editor.preview.find ('lightbox-preview').each (function () {
					vm.$compile (this);
				});
			});
		});

		editor.debouncedRedraw ();
	},

	methods: {

		openModal: function (lightbox) {
			var vm = this, editor = this.$parent.editor, cursor = editor.editor.getCursor ();

			if (!lightbox) {
				lightbox = {
					replace: function (value) {
						editor.editor.replaceRange (value, cursor);
					}
				};
			}

			new this.$parent.$options.utils['input-image-lightbox'] ({
				parent: this,
				data: {
					lightbox: lightbox
				}
			})
			.$mount ()
			.$appendTo ('body')
			.$on ('select', function (lightbox) {
				var content, lightboxInfo;
				lightboxInfo = vm.helper.lightboxInfoFromPickerSelection (lightbox);
				content = '(lightbox)' + JSON.stringify (lightboxInfo);
				lightbox.replace (content);
			});
		},
		replaceInPreview: function replaceInPreview(data, index) {
			var lightbox,
				parsed = {};
			try {
				parsed = JSON.parse(data.matches[1]);
			} catch (e) {
			}
			lightbox = this.helper.flatToNestedItemInfo(parsed);

			if (lightbox.data.data) {
				data.data = lightbox.data.data;
			}

			if (lightbox.data.images) {
				data.images = lightbox.data.images;
			}

			return '<lightbox-preview index="' + index + '"></lightbox-preview>';
		}

	},

	components: {
		'lightbox-preview': require ('./lightbox-preview.vue')
	}

};

window.Editor.components['editor-lightbox'] = module.exports;
window.Editor.utils['input-image-lightbox'] = Vue.extend (require ('./input-image-lightbox.vue'));
window.Editor.utils['lightbox-helper'] = require ('./lightbox-helper.js');