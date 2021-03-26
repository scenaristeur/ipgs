import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

import * as jsonld from 'jsonld';

/**
* Represents a Source of Data.
* @constructor
* @param {array} sources - An array of sources [{name: "blabla", url:"https://..."}].
*/

export default class Source {
  constructor(sources) {
    console.log(sources)
    this.sources = sources
    this.graphs = []
  }

  async load(clear = true){
    console.log(this.sources)
    clear == true ? this.graphs = [] : ""
    for await (let s of this.sources) {
      s.url == undefined ? alert("undefined url for ", s.name) : ""
      s.type == undefined ? this.findType(s) : ""
      console.log(s);
      switch (s.type) {
        case "folder":
        await this.loadFolder(s)
        break;
        case "ttl":
        await this.loadTtl(s)
        break;
        case "profile":
        await this.loadProfile(s)
        break;
        case "json":
        await this.loadJson(s)
        break;
        case "jsonld":
        await this.loadJsonld(s)
        break;
        default:
        alert("I dont know how to read ",s.url)
      }
    }
    return this.graphs
  }

  findType(s){
    s.url.endsWith('/') ? s.type = "folder" : ""
    s.url.endsWith('.ttl') ? s.type = "ttl" : ""
    s.url.endsWith('card#me') ? s.type = "profile" : ""
    s.url.endsWith('.json') ? s.type = "json" : ""
    s.url.endsWith('.jsonld') ? s.type = "jsonld" : ""
    return s
  }

  async loadFolder(s){
    console.log("Solid Folder or Semapps container ?",s)
    try{
      let folder = await fc.readFolder(s.url)
      if (folder.size == undefined){
        await this.loadJsonld(s)
      }else{
        console.log(folder)
        await this.folderToGraph(folder)
      }
    }catch(e){
      alert(e)
    }
  }

  async loadTtl(s){
    console.log("Load",s)
  }

  async loadProfile(s){
    console.log("Load",s)
  }

  async loadJson(s){
    console.log("Load",s)
  }

  async loadJsonld(s){
    let documentLoaderType = 'xhr'
    await jsonld.useDocumentLoader(documentLoaderType/*, options*/);
    let doc = await jsonld.documentLoader(s.url, function(err) {
      if(err) {
        alert(err)
      }
    })
    doc.jsonld = JSON.parse(doc.document)
    delete doc.document
    console.log(doc)
    await this.ldpContainsToGraph(doc)
  }

  async ldpContainsToGraph(doc){
    let graph

    if (Array.isArray(doc.jsonld["ldp:contains"]) && doc.jsonld["ldp:contains"].length > 0){
      graph = await this.pairToGraph(doc)
    }else{
      alert("no ldp:contains for ", doc.documentUrl)
    }
    this.graphs.push(graph)
  }

  async folderToGraph(folder){
    let nodes, edges
    console.log(folder)


    this.graphs.push({nodes: nodes, edges: edges})
  }


  async pairToGraph(doc){
    let graph = {nodes: [], edges: []}
    let items = doc.jsonld["ldp:contains"]
    graph.nodes = items//.map(obj=> ({ ...obj, label: this.getLabel(obj) })) // if no name -> id as label
    return graph
  }

  getLabel(obj){
    return obj.label || obj.name || obj["pair:label"] || obj.id || "NO LABEL KNOWN"
  }


  async pairToGraph1(doc){
    let module = this
    let graph = {nodes: [], edges: []}
    console.log(doc)
    let omittedKeys = ["id", "publicKey"]
    let items = doc.jsonld["ldp:contains"]
    //  graph.nodes = items.map(obj=> ({ ...obj, label: obj.id })) // if no name -> id as label
    items.forEach(async function(n) {
      //  n.id == null ? this.json.id = this.json['@id'] : ''
      var indexS = graph.nodes.findIndex(x => x.id == n.id);
      indexS === -1 ? graph.nodes.push(n) : console.log("object already exists")


      for await (const [key, value] of Object.entries(n)) {
        if (!omittedKeys.includes(key)){
          if (Array.isArray(value)) {
            value.forEach(async function(v) {
              console.log(key, v)
              graph = await module.addEdge(n,key,v,graph)
            });
          }else{
            console.log(`${key}: ${value}`);
            graph = await module.addEdge(n,key,value,graph)
          }
        }
        //  delete n.key
      }
    });
    return graph
  }

  // async addEdge(n,key,v,graph){
  //   console.log(n.id, key, v, graph)
  //   // let e ={}
  //   // graph.edges.push(e)
  //   try{
  //     var indexO = graph.nodes.findIndex(x => x.id==v);
  //     indexO === -1 ? graph.nodes.push({id: v, label: await this.lastPart(v)}) : console.log("object already exists")
  //     let edge = {from: n.id, to: v, label: await this.lastPart(key)}
  //     var indexE = graph.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
  //     indexE === -1 ? graph.edges.push(edge) : console.log("object already exists")
  //   }catch(e){
  //     console.log("todo", e,v)
  //   }
  //
  //   return graph
  // }

  async lastPart(text){
    //  console.log(text, typeof text)
    if (typeof text == 'object' && text['rdfs:label'] != undefined){
      return text['rdfs:label']
    }else if (typeof text == 'string' && text.startsWith('http')){
      var n = text.lastIndexOf('/');
      return text.substring(n + 1);
    }
    else{
      return text
    }
  }



}
