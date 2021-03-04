import { v4 as uuidv4 } from 'uuid';

export default class Network {
  constructor(){
    this.nodes = []
    this.edges = []
    this.technicalPreds = ['@context',
    'id', 'publicKey', 'publicKeyPem',
    'http://www.w3.org/ns/posix/stat#size',
    'http://www.w3.org/ns/posix/stat#mtime',
    'dcterms:modified',
    'inbox', 'outbox',
    'x', 'y']
    this.predicates = []
    //  this.cid = 0
  }

  async buildVis(loadedSources){
    for await (const s of loadedSources) {
      console.error("main node",s.compacted.id)
      let n = {id: await s.compacted.id, label: this.label(await s.compacted), shape: 'circle', color: {background: "#CCFFCB", border:'green'}}
       this.addNode(n)
    this.expand(s.compacted)
      // remove noeud central
      //  this.nodes = this.nodes.filter(x => {return x.id != s.compacted.id})

    }
    console.log('verifier si on doit return ici puisqu on return a expand')
    return {nodes: this.nodes, edges: this.edges, predicates: this.predicates}
  }

  async expand(node){
    console.log(node)
    for await (const [key, value] of Object.entries(node)) {
      this.parse(node.id,key,value, node.id)
    }
    return {nodes: this.nodes, edges: this.edges, predicates: this.predicates}
  }

  label(d){
    return d.label || d['rdfs:label'] || d['pair:label'] || d.id || d
  }

  async parse(subjectId, predicateString, value, parent){
    if(!this.technicalPreds.includes(predicateString)){
      !this.predicates.includes(predicateString) ? this.predicates.push(predicateString) : ""
    //  console.log(predicateString, typeof value )
      if (Array.isArray(value)){
        for await (const v of value) {
          //  console.log("lazyload",v, parent)
          this.parse(subjectId, predicateString, v, parent)
        }
      }else{

        if (typeof value == 'string' && value.length > 0){
          //  console.warn(subjectId, predicateString, value/*, parent*/)
          let object = {shape: 'box'}
          if(value.startsWith('http') || value.startsWith('#') || value.startsWith('_:') ){
            object.id = value
          }else{
            object.id = uuidv4()
          }
          if(predicateString == 'type'){
            object.color = {background: 'red',border:'green'}
            object.shape = 'box'
            object.id = value
          }
          object.label = this.label(value)
          let node = this.addNode(object)
          let edge = {from: subjectId, to: node.id, label: predicateString }
          this.addEdge(edge)

        }else{
          //  console.log("-------------todo-object")
          if(typeof value == 'object'){
            if ( value.id == undefined || value.id.length==0){
              value.id = uuidv4()
            }


            value.label == undefined || value.label.length == 0 ? value.label = this.label(value) : ""
            let node = this.addNode(value)
            let edge = {from: subjectId, to: node.id, label: predicateString }
            this.addEdge(edge)

            for await (const [key, value] of Object.entries(node)) {
              this.parse(node.id,key,value, node.id)
            }
          }else{
            console.log("todo typeof ", typeof value)
          }
          // }else{
          //   console.info(subjectId, predicateString,value/*, parent*/)
          //
          // }
        }
      }
    }
  }


  addNode(n){
    let node = this.nodes.find(x => x.id == n.id)
    if (node == undefined){
      if(n.x == undefined){
        n.x = Math.floor(Math.random() * 500) -250;
        n.y = Math.floor(Math.random() * 500) -250;
      }
      this.nodes.push(n)
      node = n
    }
    return node
  }

  addEdge(e){
    let edge = this.edges.find(x => x.from == e.from && x.to == e.to && x.label == e.label)
    if (edge == undefined){
      //  edge = {from: e.from, to: e.to,  label: e.label}
      this.edges.push(e)
    }
    return edge
  }


  async parse1(id,key, value){
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


  async parseString(id, key, value){
    console.log("STRING",key, value)

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



  async parseArray(id, key, value){
    let module = this
    // example pour default pod Storage
    console.log("ARRAY",key, value)
    value.forEach(async function (v) {
      await module.parse(id, key, v)
    });

  }




}
