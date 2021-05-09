import { v4 as uuidv4 } from 'uuid';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
import * as jsonld from 'jsonld';
import { getSolidDataset/*, saveSolidDatasetAt*/ } from "@inrupt/solid-client";
import { /*handleIncomingRedirect, login,*/ fetch/*, getDefaultSession */} from '@inrupt/solid-client-authn-browser'


export default class Loader {
  constructor(opts) {
    this.options = opts

    this.loaded = {}
    console.log(this)
  }

  async load(){
    let worker = {id: uuidv4(), action: "Loader.load"}
    this.options.store.commit('ipgs/workersAdd', worker)
    console.log(this.options)
    this.options.type == undefined ? await this.findType(this.options) : ""
    console.log(this.options);
    switch (this.options.type) {
      case "folder":
      this.loaded = await this.loadFolder(this.options)
      break;
      case "profile":
      case "ttl":
      this.loaded = await this.loadTtl(this.options)
      break;
      case "json":
      this.loaded = await this.loadJson(this.options)
      break;
      case "jsonld":
      this.loaded = await this.loadJsonld(this.options)
      break;
      default:
      try{

        this.loaded = await this.loadFolder(this.options)
      }catch(e){
        this.loaded = await this.loadTtl(this.options)

      }


      //  alert("I dont know how to read ",s.url)
    }

    this.options.store.commit('ipgs/workersRemove', worker)
    return this.loaded
  }

  async findType(o){
    // var myHeaders = new Headers();
    //
    // var myInit = { method: 'GET',
    //                headers: myHeaders,
    //                mode: 'no-cors',
    //                cache: 'default' };
    // fetch(s.url)
    // .then(response => {
    //   return response.blob().then(blob => {
    //     return {
    //       contentType: response.headers.get("Content-Type"),
    //       raw: blob
    //     }
    //   })
    // })
    // .then(data => {
    //   console.log(data.contentType, data.raw);
    // });

    o.url.endsWith('/') ? o.type = "folder" : ""
    o.url.endsWith('.ttl') ? o.type = "ttl" : ""
    o.url.endsWith('card#me') ? o.type = "profile" : ""
    o.url.endsWith('.json') ? o.type = "json" : ""
    o.url.endsWith('.jsonld') ? o.type = "jsonld" : ""
    o.url.startsWith('ipfs://') ? o.type = "ipfs" : ""
    return o
  }


  async loadFolder(s){
    console.log("Solid Folder or Semapps container ?",s)
    // try{
    let folder = await fc.readFolder(s.url)
    if (folder.size == undefined){

      return await this.loadJsonld(s)
    }else{
      console.log(folder)
      return await this.folderToGraph(folder)
    }
    // }catch(e){
    //   alert(e)
    // }
  }



  async loadTtl(s){
    console.log("Load",s)
    return await this.rdfParse(s)
  }

  // async loadProfile(s){
  //   console.log("Load",s)
  // }

  async loadJson(s){
    console.log("Load",s)
    return await this.loadJsonld(s)
  }

  async loadJsonld(s){
    let worker = {id: uuidv4(), action: "Loader.load"+s.url}
    this.options.store.commit('ipgs/workersAdd', worker)
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
        this.options.store.commit('ipgs/workersRemove', worker)
    return await this.ldpToGraph(doc)
  }

  async ldpToGraph(doc){
    let graph

    if (Array.isArray(doc.jsonld.nodes) && Array.isArray(doc.jsonld.edges) && doc.jsonld.nodes.length > 0){
      graph = doc.jsonld

    }else if (Array.isArray(doc.jsonld["ldp:contains"]) && doc.jsonld["ldp:contains"].length > 0){
      graph = await this.pairToGraph(doc)
    }else{
      //alert("no ldp:contains for ", doc.documentUrl)
      graph = await this.oneItemToGraph(doc)
    }
    // graph.id == undefined ? graph.id = new Date(): ""
    // graph.name == undefined ? graph.name = "a jsonld graph": ""
    return graph

  }

  async folderToGraph(f){
    let nodes = [], edges = []
    console.log(f)

    nodes.push({id: f.url, label: f.name, shape: "image", image: "./assets/folder.png", type: "folder", built: true})
    nodes.push({id: f.parent, label: f.parent, shape: "image", image: "./assets/parentfolder.png", type: "folder", built: true})
    edges.push({from: f.parent, to: f.url, label: 'contains'})
    await f.folders.forEach(async function(fo) {
      nodes.push({id: fo.url, label: fo.name, shape: "image", image: "./assets/folder.png", type: "folder", built: true})
      edges.push({from: f.url, to: fo.url, label: 'contains'})
    });
    await f.files.forEach(async function(fi) {
      nodes.push({id: fi.url, label: fi.name, shape: "image", image: "./assets/document.png", type: "file", built: true})
      edges.push({from: f.url, to: fi.url, label: 'contains'})
    });
    let g = {nodes: nodes, edges: edges}
    g.id == undefined ? g.id = uuidv4(): ""
    g.name == undefined ? g.name = "a folder graph": ""
    return g
  }


  async pairToGraph(doc){
    let graph = {id: uuidv4(), name: "a pairTograph", nodes: [], edges: []}
    let items = doc.jsonld["ldp:contains"]
    graph.nodes = items//.map(obj=> ({ ...obj, label: this.getLabel(obj) })) // if no name -> id as label
    return graph
  }

  async oneItemToGraph(doc){
    let graph = {id: uuidv4(), name: "a oneItemTograph",nodes: [], edges: []}
    let item = doc.jsonld
    graph.nodes.push(item)
    return graph
  }

  // getLabel(obj){
  //   return obj.label || obj.name || obj["pair:label"] || obj.id || "NO LABEL KNOWN"
  // }


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

  async rdfParse(s){
    let module = this
    let graph = {id: new uuidv4(), name: "a rdfParse", nodes: [], edges: []}
    let dataset = await getSolidDataset(s.url, { fetch: fetch });
    console.log(dataset)
    await dataset._quads.forEach(async function (q)  {
      let [s,p,o] = [
        {id:q.subject.id, label: await module.lastPart(q.subject.id)},
        q.predicate.id,
        {id:q.object.id, label: await module.lastPart(q.object.id)}
      ]
      console.log(s,p,o)
      var indexS = graph.nodes.findIndex(x => x.id==s.id);
      indexS === -1 ? graph.nodes.push(s) : console.log("object already exists")
      var indexO = graph.nodes.findIndex(x => x.id==o.id);
      indexO === -1 ? graph.nodes.push(o) : console.log("object already exists")
      let edge = {from: s.id, to: o.id, label: await module.lastPart(p)}
      var indexP = graph.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
      indexP === -1 ? graph.edges.push(edge) : console.log("object already exists")
    });
    return graph
  }

  // async readFolder(url){
  //   //console.log(url)
  //   this.folder = await fc.readFolder(url)
  //   //  console.log(this)
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
  // tryGetHeaders(){
  //   // await fetch(s.url, { method: 'head', mode: 'no-cors' })
  //   // .then(response => { console.log("RESP",response)
  //   // const contentType = response.headers.get("content-type");
  //   // console.log(contentType)})
  //   // .catch(error => { console.log("ERR", error) });
  //
  //   // try{
  //   //
  //   //   fetch(s.url).then(response => {
  //   //     const contentType = response.headers.get("content-type");
  //   //     if (contentType && contentType.indexOf("application/json") !== -1) {
  //   //       return response.json().then(data => {
  //   //         console.log(data)
  //   //       });
  //   //     } else {
  //   //       return response.text().then(text => {
  //   //         console.log(text)
  //   //         // this is text, do something with it
  //   //       });
  //   //     }
  //   //   });
  //   //
  //   // }catch(e){
  //   //   console.log("EEEEE",e)
  //   // }
  //
  //   // var xhttp = new XMLHttpRequest();
  //   // xhttp.open('HEAD', s.url);
  //   // xhttp.onreadystatechange = function () {
  //   //     if (this.readyState == this.DONE) {
  //   //         console.log(this.status);
  //   //         console.log(this.getResponseHeader("Content-Type"));
  //   //     }
  //   // };
  //   // xhttp.send();
  //
  // }

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

  // async lastPart(text){
  //   //  console.log(text, typeof text)
  //   if (typeof text == 'object' && text['rdfs:label'] != undefined){
  //     return text['rdfs:label']
  //   }else if (typeof text == 'string' && text.startsWith('http')){
  //     var n = text.lastIndexOf('/');
  //     return text.substring(n + 1);
  //   }
  //   else{
  //     return text
  //   }
  // }





  async loadIpfs(opts){

    const CID = opts.url.replace('ipfs://', '')

    try {
      // Await for ipfs node instance.
      this.ipfs = await this.$ipfs;
      console.log(this.ipfs)
      // Call ipfs `id` method.
      // Returns the identity of the Peer.
      const { agentVersion, id } = await this.ipfs.id();
      console.log(agentVersion);
      console.log(id);
      // Set successful status text.
      console.log("Connected to IPFS =)")
      console.log(CID)
      const stream =  await this.ipfs.cat(CID)
      let data = ''
      console.log("st",stream)
      for await (const chunk of stream) {
        console.log(chunk)
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
      }
      //  this.restit = data
      console.log(data)
      console.info("must take a look at this solution if always preload error: https://github.com/ipfs/js-ipfs/issues/1481")

      try{
        let d = JSON.parse(data)
        console.log(d)
        d.id = uuidv4()
        d.name = "an ipfs network"
        if (Array.isArray(d.nodes) && Array.isArray(d.edges) && d.nodes.length > 0){
          return d

        }else{
          console.log("no node or edge")
        }

      }catch(e){
        console.log("i can't parse", data)
      }



    } catch (err) {
      // Set error status text.
      console.log(`Error: ${err}`);
    }


  }
}
