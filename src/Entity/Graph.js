import Network from './Network.js'
import Loader from './Loader.js'
export default class Graph extends Network {
  constructor(opts) {
    super()
    this.options = opts
    this.init()

    console.log(this)

  }

  async init(){
    let loaded = await this.checkOptions()
    console.log("LOADED",loaded)
    this.options.onUpdate(loaded)
    await this.options.onUpdate(loaded)
  }

  async checkOptions(){

    if (this.options.url != undefined){
      let loader = new Loader(this)
      return await loader.load()

    }



  }



}
