module.exports = {
    entry: {
        main: './js/main'
    },
    output: {
        filename: 'bundle.js' // 打包好的文件位置
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}