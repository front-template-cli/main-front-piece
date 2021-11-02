const CompressionPlugin = require('compression-webpack-plugin')
const isBuild = process.env.VUE_APP_GLOBAL_ENV !== 'development'
const productionGzipExtensions = ['js', 'css']
module.exports = {
  configureWebpack: (config) => {
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
