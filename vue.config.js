const publicPath = process.env.NODE_ENV === 'production' ? '/ipgs/' : '/'

module.exports = {
  // options...
  publicPath: publicPath,
  // browser-vue https://github.com/ipfs/js-ipfs/blob/c47a6335b77d5284711f13a83349000820f85775/examples/browser-vue/vue.config.js
  chainWebpack: config => config.resolve.symlinks(false),
}
