import { v4 as uuidv4 } from 'uuid';
export default class Network {
  constructor(opts) {
    this.id = uuidv4()
    this.options = opts
    this.nodes= []
    this.edges= []
    console.log(this.nodes, this.edges, this.options)
  }
}
