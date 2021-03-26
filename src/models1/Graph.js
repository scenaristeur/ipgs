import { v4 as uuidv4 } from 'uuid';
import Loader from '@/util/Loader.js'

export default class Graph {
  constructor(options = {}) {
    this.url = options.url || null
    this.name = options.name || uuidv4()
    this.nodes = []
    this.edges = []
    if (this.url != null){
      this.load()
    }
  }

  async load(){
    let loader = new Loader()
    let loaded = await loader.load(this.url)
    console.log("LOADED FROM",this.url, loaded)
  }
}
