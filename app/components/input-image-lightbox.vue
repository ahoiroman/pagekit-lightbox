<template>

    <div>
        <v-modal v-ref:modal :closed="close" large>
            <form class="uk-form uk-form-stacked" @submit.prevent="update">
                <div class="uk-modal-header">
                    <h2>{{ 'Add Lightbox' | trans }}</h2>
                </div>
                <div class="uk-grid uk-grid-divider" data-uk-grid-match data-uk-grid-margin>
                    <div class="uk-width-large-1-3">
                        <h2>{{ 'Image' | trans }}</h2>
                        <div class="uk-form-row">
                            <input-image :source.sync="image.src"></input-image>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-src" class="uk-form-label">{{ 'URL' | trans }}</label>
                            <div class="uk-form-controls">
                                <input id="form-src" class="uk-width-1-1" type="text" v-model="image.src" lazy>
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-alt" class="uk-form-label">{{ 'Alt' | trans }}</label>
                            <div class="uk-form-controls">
                                <input id="form-alt" class="uk-width-1-1" type="text" v-model="image.alt">
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <div class="uk-form-controls">
                                <span class="uk-align-right">
                                    <button class="uk-button" @click.prevent="add"> {{ 'Add' | trans }}</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-large-1-3">
                        <h2>{{ 'Ordering' | trans }}</h2>
                        <div class="uk-alert" v-if="!lightbox.images.length">
                            {{ 'You can add one or more images using the image selection tool. Go ahead!' | trans }}
                        </div>
                        <div class="uk-sortable" v-show="lightbox.images.length" v-sortable>
                            <div class="form-row uk-margin" v-for="image in lightbox.images" data-src="{{image.src}}" data-alt="{{image.alt}}">
                                <div class="uk-overlay uk-overlay-hover uk-visible-hover">
                                    <img :src="$url(image.src)">
                                    <div class="uk-overlay-panel uk-overlay-background uk-overlay-fade"></div>
                                    <div class="uk-panel-badge pk-panel-badge uk-hidden">
                                        <ul class="uk-subnav pk-subnav-icon">
                                            <li>
                                                <a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove(image)"></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-large-1-3">
                        <h2>{{ 'Settings' | trans }}</h2>
                        <div class="uk-form-row">
                            <label class="uk-form-label">{{ 'Allow Fullscreen' | trans }}</label>
                            <div class="uk-form-controls uk-form-controls-text">
                                <input type="checkbox" v-model="lightbox.data.allowfullscreen">
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-duration"
                                   class="uk-form-label">{{ 'Duration' | trans }}</label>
                            <div class="uk-form-controls uk-form-controls-text">
                                <p class="uk-form-controls-condensed">
                                    <input id="form-duration" type="number" class="uk-form-width-large" v-model="lightbox.data.duration" min="0" number>
                                </p>
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label class="uk-form-label">{{ 'Enable Keyboard' | trans }}</label>
                            <div class="uk-form-controls uk-form-controls-text">
                                <input type="checkbox" v-model="lightbox.data.keyboard">
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-imgclass" class="uk-form-label">{{ 'Image Class' | trans }}</label>
                            <div class="uk-form-controls">
                                <input id="form-imgclass" class="uk-form-width-medium" type="text" v-model="lightbox.data.imgclass">
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-hrefclass" class="uk-form-label">{{ 'Link Class' | trans }}</label>
                            <div class="uk-form-controls">
                                <input id="form-hrefclass" class="uk-form-width-medium" type="text" v-model="lightbox.data.hrefclass">
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-gridclass" class="uk-form-label">{{ 'Grid Class' | trans }}</label>
                            <div class="uk-form-controls">
                                <input id="form-gridclass" class="uk-form-width-medium" type="text" v-model="lightbox.data.gridclass">
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-rowclass" class="uk-form-label">{{ 'Row Class' | trans }}</label>
                            <div class="uk-form-controls">
                                <input id="form-rowclass" class="uk-form-width-medium" type="text" v-model="lightbox.data.rowclass">
                            </div>
                        </div>
                        <div class="uk-form-row">
                            <label for="form-group" class="uk-form-label">{{ 'Group Name' | trans }}</label>
                            <div class="uk-form-controls">
                                <input id="form-group" class="uk- form-width-medium" type="text" v-model="lightbox.data.group">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-link uk-modal-close" type="button">{{ 'Cancel' | trans }}</button>
                    <button class="uk-button uk-button-link" type="submit">{{ 'Update' | trans }}</button>
                </div>
            </form>
        </v-modal>
    </div>

</template>

<script>

    module.exports = {

        data: function () {
            return {
                image: {
                	src: '',
                    alt: ''
                },
                lightbox: {
                	images: [],
                    data: {
						allowfullscreen: false,
                        duration: 0,
                        keyboard: false,
                        imgclass: '',
                        hrefclass: '',
                        gridclass: 'uk-grid-width-medium-1-4',
                        rowclass: '',
                        group: ''
                    }
                }
            }
        },

        ready: function () {

            this.$refs.modal.open();

            this.$on('image-selected', function(path) {

                if (path && !this.image.alt) {

                    var alt   = path.split('/').slice(-1)[0].replace(/\.(jpeg|jpg|png|svg|gif)$/i, '').replace(/(_|-)/g, ' ').trim(),
                        first = alt.charAt(0).toUpperCase();

                    this.image.alt = first + alt.substr(1);
                }

            });
		},

        methods: {

			add: function add(e) {
				e.preventDefault();
				if (!this.image.src) return;

				this.lightbox.images.push(this.image);

				this.image =  {
					src: '',
                    alt: ''
				}
			},

			remove: function (image) {
				this.lightbox.images.$remove(image);
			},

			close: function() {
                this.$destroy(true);
            },

            update: function () {
                this.$refs.modal.close();
                this.$emit('select', this.lightbox);
            },

        },
		directives: {

			sortable: {

				params: ['group'],

				bind: function bind() {

					var vm = this;

					Vue.nextTick(function () {

						UIkit.sortable(this.el).element.off('change.uk.sortable').on('change.uk.sortable', function (e, sortable, element, action) {
							var newimages = [];
							_.forEach(sortable.serialize(), function (nimage) {
								var image = {
										src: nimage.src,
										alt: nimage.alt
								};
								newimages.push(image);
							});
							vm.vm.$set('lightbox.images', newimages);
						});
					}.bind(this));
				}

			}

		}
    };

</script>