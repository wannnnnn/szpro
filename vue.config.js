const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// require('vue-cli-plugin-style-resources-loader')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // open: true, // 是否自动打开浏览器页面
    // host: 'localhost',    // 指定使用一个 host，默认是 localhost
    // port: 8080,         // 端口地址
    
    disableHostCheck: true,
    proxy: {
      '^/api': {
        // target: 'http://api.qq.ydu6.com',
        target: 'http://112.125.27.11/',
        changeOrigin: true,
      }
    }
  },
  publicPath: './', // 打包后引用的资源路径
  outputDir: 'ipfs/www', // 打包目录
  configureWebpack: (config) => { // webpack自定义配置
    // 生产环境打包分析体积
    if (process.env.NODE_ENV === 'production' && process.env.npm_config_report) {
      return {
        plugins: [
          new BundleAnalyzerPlugin()
        ]
      }
    }
  },
  chainWebpack: config => { // CLI内部webpack配置
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("/src/components"))
      .set("views", resolve("/src/views"))
      .set("assets", resolve("/src/assets"))
      .set("router", resolve("/src/router"))
      .set("store", resolve("/src/store"))
      .set("utils", resolve("/src/utils"));
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },

}

// 全局样式 变量、函数
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('src/styles/variables.less'),
        resolve('src/styles/mixin.less'),
      ],
    })
}
