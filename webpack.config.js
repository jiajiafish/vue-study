const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV ==='development'
// 判断是否是开发环境，所有的变量，通过process.env来读取

const config  = {
    target:'web',
    // 开发目标是web平台
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        // 下面这个是一定要用的，变量很重要，NODE_ENV
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"':'"production"'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,
                        }
                    },
                    'stylus-loader'
                ]
            }
            ,
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }

        ]
    }
}

if (isDev) {
    // 因为写的es6的代码浏览器无法直接运行，下面这个配置是官方推荐的，所以我们不需要在改
    config.devtool ='#cheap-module-eval-source-map'
    // 关于devserver全部在这里
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        // 每次改webpack的时候会打开一个新的页面
        open:true,
        // historyFallback:{
            // 
        // }
        // 其实就是hotmodulereplacement
        hot:true,

    }
    config.plugins.push(
        // 为了启用热加载，因为使用vue所以过程变得很简单。
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}


module.exports = config