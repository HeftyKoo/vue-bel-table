// // 先清空 build 文件夹下的文件
var buildFolder = 'dist'
var path = require('path')
var fs = require('fs'),
    buildPath = './' + buildFolder + '/',
    folder_exists = fs.existsSync(buildPath)

if (folder_exists) {
    var dirList = fs.readdirSync(buildPath)
    dirList.forEach(function (fileName) {
        fs.unlinkSync(buildPath + fileName)
    })
    console.log("clearing " + buildPath)
}

var webpack = require('webpack')
var plugins = []
var devtool = false  // 是否开启source-map
if (process.env.PRODUCTION) {
    // 压缩
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
        }
    }))
    devtool = '#source-map'   // 生产环境不开启source-map
} else {
    devtool = '#eval-source-map'
}

module.exports = {
    entry: {
        build: './src/bel-table.js'
    },
    output: {
        path: path.resolve(__dirname, './' + buildFolder),
        publicPath: buildFolder + '/',
        filename: '[name].js',
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
          // 加载vue组件，并将css全部整合到一个style.css里面
          // 但是使用这种方式后 原先可以在vue组件中 在style里面加入 scoped 就不能用了,
          // 好处是使用了cssnext，那么样式按照标准的来写就行了，会自动生成兼容代码 http://cssnext.io/playground/
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
        ],
    },
    plugins: plugins,
    devtool: devtool,
}