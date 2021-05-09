import { v4 as uuidv4 } from 'uuid';
import Network from './Network.js'
import Loader from './Loader.js'
export default class Graph extends Network {
  constructor(opts, callback) {
    super()
    this.id = uuidv4()
    this.options = opts
    this.callback = callback
    this.status = "graph constructor"
    this.nodes = []
    this.edges = []
    this.init()

    //  console.log(this)


  }

  async init(){
    this.status = "before checkOptions"
    await this.checkOptions()
    this.status = "after checkOptions"

    this.status = "after loaded"
    //  console.log("LOADED",loaded)
    this.callback(this)
    // this.options.onUpdate(loaded)
    // await this.options.onUpdate(loaded)
  }

  async checkOptions(){

    if (this.options.url != undefined){
      this.status = "before loader"
      let loaded = await new Loader(this).load()
      this.status = "after loader"

      this.nodes = this.nodes.concat(loaded.nodes)
      this.edges = this.nodes.concat(loaded.edges)

    }

  }



}
