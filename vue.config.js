const { resolve, join } = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const isBuild = process.env.VUE_APP_GLOBAL_ENV !== 'development'
const productionGzipExtensions = ['js', 'css']
const cdn = {
  css: [],
  js: ['//unpkg.com/axios@0.21.4/dist/axios.min.js']
}
module.exports = {
  chainWebpack: (config) => {
    // 解决热更失效问题
    config.resolve.symlinks(true)
    // 文件名路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@styles', resolve('src/styles'))
    // 降低带宽请求
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 减小打包体积，抽取cdn
    if (isBuild) {
      config.plugin('html').tap((args) => {
        args[0].title = 'piece'
        // html中添加cdn
        args[0].cdn = cdn
        return args
      })
    }
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  configureWebpack: (config) => {
    // Gizp压缩
    if (isBuild) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
    }
    // 依赖包隔离
    if (isBuild) {
      config.externals = { axios: 'axios' }
    }
    // 去除console
    if (isBuild) {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: [
                'console.log',
                'console.warn',
                'console.info',
                'console.error',
                'console.debug'
              ] // 移除console信息打印
            },
            warnings: false
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
    // 预加载
    if (isBuild && process.env.use_spa) {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: join(__dirname, 'dist'),
          routes: ['/home'],
          // 忽略重定向redirects
          postProcess(renderedRoute) {
            renderedRoute.route = renderedRoute.originalRoute
            return renderedRoute
          },
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            renderAfterDocumentEvent: 'render-event'
          })
        })
      )
    }
  },
  css: {
    extract: true,
    // requireModuleExtension: false,
    modules: false,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    port: '8088',
    hot: true,
    open: true,
    https: isBuild,
    proxy: {
      '/coudMusicApi': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/coudMusicApi': '/'
        }
      }
    }
  }
}
