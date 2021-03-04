

export default class Network {
  constructor(){
    this.nodes = []
    this.edges = []
  }

  async buildVis(loadedSources){


    //let module = this
    for await (const s of loadedSources) {
      console.warn("main node",s.compacted.id)
      let id = s.compacted.id

      this.addNode(s.compacted)

      //  this.nodes.push({id: id, label: this.label(s.compacted) })
      for await (const [key, value] of Object.entries(s.compacted)) {
        console.log(key, value);
        //this.edges.push(key)
        this.parse(id,key,value)
        // if(key != 'id' && key != '@context'){
        //   doc.network = await module.parse(key, value, doc.network)
        // }

      }
    }

    return {nodes: this.nodes, edges: this.edges}
  }



  async parse(id,key, value){
    console.warn("PARSE",typeof value, value)
    switch (typeof value) {
      case 'object':
      await this.parseObject(id, key, value)
      break;
      case 'string':
      await this.parseString(id, key, value)
      break;
      case 'array':
      await this.parseArray(id, key, value)
      break;
      default:
      console.log('type non traité: ',typeof value)
    }

  }

  async parseObject(id,key, value){
    if (Array.isArray(value)){
      await this.parseArray(id, key, value)
      //  return
    }else{
      console.log("OBJECT",key, value)
      this.addNode(value, key)
      // let node  = this.nodes.find(x => x.id == value.id)
      // //  console.log("NODE EXIST",node)
      // if (node == undefined){
      //   node = {id: value.id, label: this.label(value)}
      //   this.nodes.push(node)
      //
      // }else{
      //   console.log("something to do with ",key, value)
      // }
      let edge = {from: id, to: value.id, label: this.label(key)}
      console.log(edge)
      this.edges.push(edge)
      //
      //await this.network.nodes.push(node)
      //console.log('node',node)
      //
    }

  }

  async parseString(id, key, value){
    console.log("STRING",key, value)

  }

  async parseArray(id, key, value){
    let module = this
    // example pour default pod Storage
    console.log("ARRAY",key, value)
    value.forEach(async function (v) {
      await module.parse(id, key, v)
    });

  }

  addNode(n,key=null){
    let node  = this.nodes.find(x => x.id == n.id)
    //  console.log("NODE EXIST",node)
    if (node == undefined){
      node = {id: n.id, label: this.label(n)}
      this.nodes.push(node)

    }else{
      console.log("something to do with ",key, n)
    }
  }

  label(d){
    return d.label || d['rdfs:label'] || d['pair:label'] || d.id || d
  }


}
