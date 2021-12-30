//https://github.com/peer-base/peer-base/commit/1e327a81940ae518ddaa4e12fe3f798136a08c5f

//import IPFS from 'ipfs'
//import * as IPFS from 'ipfs-core'
import * as IPFS from 'ipfs'


const plugin = {
  install(Vue, opts = {}) {
    console.log("IPFS",IPFS)
    Vue.prototype.$ipfs = IPFS.create(opts)
  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
