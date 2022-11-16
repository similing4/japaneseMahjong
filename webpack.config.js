const path = require("path");
module.exports = {
	mode: 'production',
	entry: './src/JapaneseMaj.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'japanesemaj.min.js',
		library: 'JapaneseMaj',
		globalObject: 'this',
		libraryTarget: 'umd'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['es2015']
					],
					plugins: [
						['transform-class-properties']
					]
				}
			}]
		}]
	}
};
