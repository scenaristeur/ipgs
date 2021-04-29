const publicPath = process.env.NODE_ENV === 'production' ? '/ipgs/' : '/'

module.exports = {
  // https://stackoverflow.com/questions/64205612/how-to-correct-preload-key-requests-performance-problem-on-lighthouse-with-vue
  configureWebpack: {
   output: {
       crossOriginLoading: 'anonymous'
   },
 },
  // options...
  publicPath: publicPath,
  // browser-vue https://github.com/ipfs/js-ipfs/blob/c47a6335b77d5284711f13a83349000820f85775/examples/browser-vue/vue.config.js
  chainWebpack: config => config.resolve.symlinks(false),
}
