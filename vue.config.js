module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        // 已经有 => '@': 'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}