

export default class Network {
  constructor(){

  }

  async buildVis(loadedSources){
    let nodes = []
    let edges = []

    //let module = this
    for await (const s of loadedSources) {
      console.warn("main node",s.compacted.id)
      let id = s.compacted.id

      nodes.push({id: id, label: this.label(s.compacted) })
      for await (const [key, value] of Object.entries(s.compacted)) {
        console.log(key, value);
        edges.push(key)
        // if(key != 'id' && key != '@context'){
        //   doc.network = await module.parse(key, value, doc.network)
        // }

      }
    }



    return {nodes: nodes, edges: edges}
  }

  label(d){
    return d.label || d['rdfs:label'] || d['pair:label'] || d.id
  }


}
