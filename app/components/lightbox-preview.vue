<template>

    <div class="uk-overlay uk-overlay-hover uk-visible-hover">
        <div class="uk-grid" v-bind:class="lightbox.data.gridclass" data-uk-margin data-uk-grid-match>
            <div v-bind:class=" lightbox.data.rowclass" v-for="image in lightbox.images" :title="image.alt" data-uk-lightbox="{group:'group1'}">
                <img :src="$url(image.src)" :alt="image.alt" v-bind:class="lightbox.data.imgclass">
                <div class="uk-overlay-panel uk-overlay-background uk-overlay-fade"></div>
                <a class="uk-position-cover" v-bind:class="lightbox.data.hrefclass" @click.prevent="config"></a>
                <div class="uk-panel-badge pk-panel-badge uk-hidden">
                    <ul class="uk-subnav pk-subnav-icon">
                        <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
module.exports = {
    props: ['index'],

    data: function() {
        return {
            lightbox: ''
        }
    },
    computed: {
        lightbox: function() {
        	return this.$parent.lightboxes[this.index] || {};
        }
    },
    ready: function () {
	},
	methods: {
		config: function() {
			this.$parent.openModal(this.lightbox);
		},
		remove: function() {
			this.lightbox.replace('');
		}
	}
};

</script>