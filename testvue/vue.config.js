const path = require('path')

// const SentryPlugin = require('webpack-sentry-plugin')


const env = process.env.VUE_APP_ENV

// gzip

module.exports = {
  outputDir: 'releases',
  assetsDir: 'dist',

  css: {
    // 提取至独立CSS文件中
    extract: { ignoreOrder: true },
    // 是否为 CSS 开启 source map, 设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    loaderOptions: {
      stylus: {}
    }
  },

  configureWebpack: {
    plugins: [
      // new SentryPlugin({
      //   // Sentry options are required
      //   organization: 'fontend',
      //   project: 'kd-web-active',
      //   apiKey: '14385e0985454e22953d7bd28ac749023ed4f0563d3d400891b66c84731db2c9',
      //   // Release version name/hash is required
      //   release: `kd-web-active@${env}@${packages.version}`,
      //   exclude: /\.html$/
      // })
    ]
  },

  // 生产环境的 source map
  productionSourceMap: true,

  chainWebpack: config => {
    // 关闭预加载
    config.plugins.delete('prefetch')
    // 关闭文件过大时产生的警告
    config.performance.set('hints', false)

    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })

    // 设置别名
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@view', path.resolve(__dirname, 'src/views'))
      .set('@conf', path.resolve(__dirname, 'src/_config'))
      .set('@img', path.resolve(__dirname, 'src/assets'))
      .set('@utils', path.resolve(__dirname, 'src/utils'))
      .set('@comp', path.resolve(__dirname, 'src/components'))
      .set('core', path.resolve(__dirname, 'source/core'))
      .set('shared', path.resolve(__dirname, 'source/shared'))
      // .set('sfc', path.resolve(__dirname, 'source/sfc'))

    config.externals({})
  },

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: true,

  // 第三方插件配置
  pluginOptions: {
    vconsole: {
      enable: env !== 'production'
    },
    // Stylus 全局变量在其他文件无法使用
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        // 引入全局变量文件 .styl
        path.resolve(__dirname, 'src/stylus/base/index.styl')
      ]
    }
  },

  // 本地开发服务配置
  devServer: {
    compress: true,
    open: false,
    port: 9092,
    hot: true
  }
}
