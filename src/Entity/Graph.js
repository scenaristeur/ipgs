import Network from './Network.js'
import Loader from './Loader.js'
export default class Graph extends Network {
  constructor(opts) {
    super()
    this.options = opts
    this.checkOptions()
    console.log(this)
  }

  async checkOptions(){

    if (this.options.url != undefined){
      let loader = new Loader(this.options)
      let loaded = await loader.load()
      console.log("LOADED",loaded)
      this.options.store.commit('ipgs/updateGraph', loaded)
    }



  }



}
