const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
    // const { tr } = require('element-plus/es/locale')

module.exports = defineConfig({
    chainWebpack: (config) => {
        config.resolve.symlinks(true) // 修复热更新失效
    },
    lintOnSave: false,
    transpileDependencies: true,
    // 基本路径   整个文件夹在哪
    publicPath: './',
    // 输出文件目录   文件夹名
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
    assetsDir: "./static",
    configureWebpack: {
        //配置自动引入element-plus
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        // devServer: {
        //     historyApiFallback: true,
        //     //热更新
        //     // hotOnly: false,
        //     // 跨域配置  还需修改env配置文件的url为/api
        //     proxy: {
        //         "/api": { //捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
        //             target: "http://cai.zvooo.com/", //代理的api地址，就是要跨域的地址
        //             changeOrigin: true, // 这个参数可以让target参数是域名
        //             ws: true, //是否启用websockets，用不到可设为false
        //             pathRewrite: { //对路径匹配到的字符串重写
        //                 "^/api": "",
        //             },
        //         },
        //         // [process.env.VUE_APP_BASEURL]: {
        //         //     target: `http://cai.zvooo.com/`,
        //         //     changeOrigin: true,
        //         //     pathRewrite: {
        //         //         ['^' + process.env.VUE_APP_BASEURL]: ''
        //         //     }
        //         // }
        //     }
        // },

    },
    devServer: {
        proxy: {
            "/api": { //捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
                target: "http://cai.zvooo.com/", //代理的api地址，就是要跨域的地址
                changeOrigin: true, // 这个参数可以让target参数是域名
                ws: true, //是否启用websockets，用不到可设为false
                pathRewrite: { //对路径匹配到的字符串重写
                    "^/api": ""
                },
                headers: {
                    referer: 'http://cai.zvooo.com/', //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
                }
            }
        }
        // // host: '0.0.0.0',
        // // open: true,
        // proxy: {
        //     [process.env.VUE_APP_BASE_API]: {
        //         target: process.env.VUE_APP_BASE_URL,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             [`^${process.env.VUE_APP_BASE_API}`]: ''
        //         }
        //     }
        // },
        // // disableHostCheck: true
    },
    // devServer: {
    //     historyApiFallback: true,
    //     //热更新
    //     // hotOnly: false,
    //     // 跨域配置  还需修改env配置文件的url为/api
    //     proxy: {
    //         "/api": { //捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
    //             target: "http://cai.zvooo.com/", //代理的api地址，就是要跨域的地址
    //             changeOrigin: true, // 这个参数可以让target参数是域名
    //             ws: true, //是否启用websockets，用不到可设为false
    //             pathRewrite: { //对路径匹配到的字符串重写
    //                 "^/api": "",
    //             },
    //         },
    //         // [process.env.VUE_APP_BASEURL]: {
    //         //     target: `http://cai.zvooo.com/`,
    //         //     changeOrigin: true,
    //         //     pathRewrite: {
    //         //         ['^' + process.env.VUE_APP_BASEURL]: ''
    //         //     }
    //         // }
    //     }
    // }
})