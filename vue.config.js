const { defineConfig } = require('@vue/cli-service')

// 按需自动引入element-plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      require('unplugin-icons/webpack')({
        autoInstall: true
      })
    ],
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://152.136.185.210:4000',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        views: '@/views'
      }
    }
  }
})
