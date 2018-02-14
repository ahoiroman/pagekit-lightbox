module.exports = [

	{
		entry: {
			"editor-lightbox": "./app/components/editor-lightbox.js",
			"editor-lightbox-tinymce": "./app/components/tinymce-plugin.js"
		},
		output: {
			filename: "./app/bundle/[name].js"
		},
		module: {
			loaders: [
				{test: /\.vue$/, loader: "vue"},
				{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
			]
		}
	}

];