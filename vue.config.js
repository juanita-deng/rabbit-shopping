const path = require('path')
module.exports = {
  pluginOptions: {
    /**
     * 自动化导入样式
     * https://cli.vuejs.org/zh/guide/css.html#%E8%87%AA%E5%8A%A8%E5%8C%96%E5%AF%BC%E5%85%A5
     * https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
     */
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, 'src/assets/styles/variables.less'),
        path.join(__dirname, 'src/assets/styles/mixins.less')
      ]
    }
  },
  devServer: {
    overlay: {
      errors: false, // 关闭页面的错误警告提示
      warnings: false
    }
  },
  // 这个是给webpack-dev-server开启可IP和域名访问权限。(vue中默认只能访问localhost和IP)
  chainWebpack: (config) => {
    config.devServer.disableHostCheck(true)
  },
  // 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}
