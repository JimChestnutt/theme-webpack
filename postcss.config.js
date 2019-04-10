module.exports = {
    plugins: [
    	require('autoprefixer')(),
        require('postcss-preset-env')(),
        require('css-mqpacker')(),
        require('cssnano')({
            preset: 'default',
            zindex: false
        }),
    ],
};
