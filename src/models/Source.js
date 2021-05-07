import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

import * as jsonld from 'jsonld';
import { /*handleIncomingRedirect, login,*/ fetch/*, getDefaultSession */} from '@inrupt/solid-client-authn-browser'
import { getSolidDataset/*, saveSolidDatasetAt*/ } from "@inrupt/solid-client";
let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", /*"type",*/ "title", "color", "image"]

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
      //this.tryGetHeaders()
      s.url == undefined ? alert("undefined url for ", s.name) : ""
      s.type == undefined ? await this.findType(s) : ""
      console.log(s);
      switch (s.type) {
        case "folder":
        await this.loadFolder(s)
        break;
        case "profile":
        case "ttl":
        await this.loadTtl(s)
        break;
        case "json":
        await this.loadJson(s)
        break;
        case "jsonld":
        await this.loadJsonld(s)
        break;
        default:
        try{
          await this.loadFolder(s)
        }catch(e){
          await this.loadTtl(s)

        }


        //  alert("I dont know how to read ",s.url)
      }
    }
    return this.graphs
  }

  async findType(s){
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

    s.url.endsWith('/') ? s.type = "folder" : ""
    s.url.endsWith('.ttl') ? s.type = "ttl" : ""
    s.url.endsWith('card#me') ? s.type = "profile" : ""
    s.url.endsWith('.json') ? s.type = "json" : ""
    s.url.endsWith('.jsonld') ? s.type = "jsonld" : ""
    return s
  }

  async loadFolder(s){
    console.log("Solid Folder or Semapps container ?",s)
    // try{
    let folder = await fc.readFolder(s.url)
    if (folder.size == undefined){

      await this.loadJsonld(s)
    }else{
      console.log(folder)
      await this.folderToGraph(folder)
    }
    // }catch(e){
    //   alert(e)
    // }
  }

  async loadTtl(s){
    console.log("Load",s)
    await this.rdfParse(s)
  }

  // async loadProfile(s){
  //   console.log("Load",s)
  // }

  async loadJson(s){
    console.log("Load",s)
    await this.loadJsonld(s)
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
    await this.addContext(doc)
    await this.ldpToGraph(doc)
  }

  async addContext(doc){
    let context = doc.jsonld['@context']
    console.log(context)
    context == undefined ? context = {} : ""
    // "id": "@id",
    // "type": "@type",
    if(typeof context == 'object'){
      // if (context['@base'] == undefined || context['@base'].length == 0 ){
      //   context['@base'] = doc.documentUrl
      // }
      context.id = "@id"
      context.type = "@type"
      context.graph = "@graph"
      //  context.label = [{'@id': 'pair:label'}, {'@id': 'rdfs:label'}]
      //  context.base = '@base'
      doc.jsonld['@context'] = context
    }
    console.log("context",doc.jsonld['@context'])
  }



  async ldpToGraph(doc){
    console.log(doc)
    let graph

    if (Array.isArray(doc.jsonld.nodes) && Array.isArray(doc.jsonld.edges) && doc.jsonld.nodes.length > 0){
      graph = doc.jsonld
      console.log("1")
    }else if (Array.isArray(doc.jsonld["ldp:contains"]) && doc.jsonld["ldp:contains"].length > 0){
      graph = await this.pairToGraph(doc)
      this.predsToEdge(graph)
      console.log("2")
    }else{
      //alert("no ldp:contains for ", doc.documentUrl)
      graph = await this.oneItemToGraph(doc)
      console.log("3")
    }

    this.graphs.push(graph)
  }

  predsToEdge(graph){
    this.nodes = graph.nodes
    this.edges = graph.edges
    let app = this
    this.nodes.forEach( function (n) {
      for (const [k, v] of Object.entries(n)) {
        app.parse(n,k,v)
      }
    });

    console.warn(graph)
  }


  parse11(n, k, v){
    if (typeof v == "string"){
      v = v.trim()
      let edgeLength = undefined
      if(!omitted.includes(k) && v.length > 0){
        var indexO = this.nodes.findIndex(x => x.id==v);
        if(indexO === -1){
          let ob =   {id: v, shape: "box", mass: 1}
          if (v.length > 20 ){
            ob.label = v.substring(0,20)+".."
            ob.title = v
          }
          else{
            ob.label = v
          }

          if (v.startsWith('http')){
            ob.color = "#7FD1B9"
            if (v.length > 50 ){
              let lab = v.endsWith('/') ? v.slice(0, -1) : v
              ob.label = lab.substr(lab.lastIndexOf('/') + 1);
              ob.label = ob.label.length > 20 ? ob.label.substring(0,20)+".." : ob.label
              ob.label = "->"+ob.label
              ob.title = v

            }else{
              ob.label = v
            }
          }else{
            ob.color = "#ECC046"
            edgeLength = 1
            ob.mass = 1
          }
          if( k == "type"){
            ob.shape = "star"
            ob.color= "#DE6E4B"
          }


          ob.built = true
          this.nodes.push(ob)
        }else{
          this.nodes[indexO].mass == undefined ? this.nodes[indexO].mass=1 : this.nodes[indexO].mass++
        }
        let o = this.nodes.find(n => n.id == v)
        o.mass++
        // if( k == "type"){
        //   // must do this test a second time after the node has been added to get network.nodes.length ????
        //   edgeLength = 1000
        // }
        let edge = {from: n.id, to: o.id, label: k }
        if (edgeLength != undefined){
          edge.length = edgeLength
          //edge.strength = 300
        }
        this.edges.push(edge)

      }else{
        k == "pair:label" ? n.label = v : ""
        k == "label" ? n.label = v : ""
        k == "name" ? n.label = v : ""
        if(k ==  "image"){
          n.shape = "circularImage"
          n.image = v
        }
        if(k ==  "depiction"){
          n.shape = "circularImage"
          n.image = v
        }
        if(k == "publicKey"){
          delete n[k]
        }

      }
    }else if (Array.isArray(v)){
      //console.log(v)
      v.forEach((_v) => {
        this.parse(n,k,_v)
      });


    } else{
      if(!omitted.includes(k) && typeof v == "object"){
        v['@id'] != undefined ? v.id = v['@id'] : ''
        var indexOBJ = this.nodes.findIndex(x => x.id==v.id);
        if(indexOBJ === -1){
          console.log("ADDING",n.id, typeof v,k, v)
          this.nodes.push(v)


        }
        this.edges.push({from: n.id, to: v.id, label: k})
        console.log("ADDING edge",n.id, k, v.id, v)
      }
      else  if(!omitted.includes(k) && typeof v == "number"){
        console.log("TODO",n.id, typeof v,k, v)
        //  this.parse(n, k, v)
      }
      else
      {
        console.log("TODO",n.id, typeof v,k, v)
      }

    }
  }



  parse(n, k, v){

    console.log(n, k, v)
    switch (typeof v) {
      case "string":
      v = v.trim()
      this.parseString(n,k,v)
      break;
      // case "object":
      // this.parseObject(n,k,v)
      // break;
      // case "array":
      // this.parseArray(n,k,v)
      // break;
      // case "number":
      // this.parseNumber(n,k,v)
      // break;
      default:
      console.log("TODO",n.id, typeof v,k, v)
    }

  }

  parseString(n,k,v){
    let edgeLength = undefined
    if(!omitted.includes(k) && v.length > 0){
      var indexO = this.nodes.findIndex(x => x.id==v);
      if(indexO === -1){
        let ob =   {id: v, shape: "box", mass: 1}
        if (v.length > 20 ){
          ob.label = v.substring(0,20)+".."
          ob.title = v
        }
        else{
          ob.label = v
        }

        if (v.startsWith('http')){
          ob.color = "#7FD1B9"
          if (v.length > 50 ){
            let lab = v.endsWith('/') ? v.slice(0, -1) : v
            ob.label = lab.substr(lab.lastIndexOf('/') + 1);
            ob.label = ob.label.length > 20 ? ob.label.substring(0,20)+".." : ob.label
            ob.label = "->"+ob.label
            ob.title = v

          }else{
            ob.label = v
          }
        }else{
          ob.color = "#ECC046"
          edgeLength = 1
          ob.mass = 1
        }
        if( k == "type"){
          ob.shape = "star"
          ob.color= "#DE6E4B"
        }


        ob.built = true
        this.nodes.push(ob)
      }else{
        this.nodes[indexO].mass == undefined ? this.nodes[indexO].mass=1 : this.nodes[indexO].mass++
      }
      let o = this.nodes.find(n => n.id == v)
      o.mass++
      // if( k == "type"){
      //   // must do this test a second time after the node has been added to get network.nodes.length ????
      //   edgeLength = 1000
      // }
      let edge = {from: n.id, to: o.id, label: k }
      if (edgeLength != undefined){
        edge.length = edgeLength
        //edge.strength = 300
      }
      this.edges.push(edge)

    }else{
      k == "pair:label" ? n.label = v : ""
      k == "label" ? n.label = v : ""
      k == "name" ? n.label = v : ""
      if(k ==  "image"){
        n.shape = "circularImage"
        n.image = v
      }
      if(k ==  "depiction"){
        n.shape = "circularImage"
        n.image = v
      }
      if(k == "publicKey"){
        delete n[k]
      }

    }
    this.debug('string',n,k,v)
  }
  parseObject(n,k,v){
    v['@id'] != undefined ? v.id = v['@id'] : ''
    var indexOBJ = this.nodes.findIndex(x => x.id==v.id);
    if(indexOBJ === -1){
      console.log("ADDING",n.id, typeof v,k, v)
      this.nodes.push(v)


    }
    this.edges.push({from: n.id, to: v.id, label: k})
    console.log("ADDING edge",n.id, k, v.id, v)
    this.debug('object',n,k,v)
  }
  parseArray(n,k,v){
    v.forEach((_v) => {
      this.parse(n,k,_v)
    });
    this.debug('array',n,k,v)
  }

  parseNumber(n,k,v){
    console.log("TODO",n.id, typeof v,k, v)
  }



  // shortLabel(n){
  //   if (n.id.length > 50 ){
  //     console.warn("todo text must not be a id")
  //   }
  //   if (n.id.length > 20 ){
  //     n.label = n.id.substring(0,20)+".."
  //     n.title = n.id
  //   }
  //   else{
  //     n.label = n.id
  //   }
  //   return n
  // },

  debug(p,n,k,v){
    console.warn(p,n,k,v)
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


    this.graphs.push({nodes: nodes, edges: edges})
  }


  async pairToGraph(doc){
    let graph = {nodes: [], edges: []}
    let items = doc.jsonld["ldp:contains"]
    graph.nodes = items//.map(obj=> ({ ...obj, label: this.getLabel(obj) })) // if no name -> id as label
    return graph
  }

  async oneItemToGraph(doc){
    let graph = {nodes: [], edges: []}
    let item = doc.jsonld
    graph.nodes.push(item)
    graph.nodes.map(n => n.id == null ? n.id = n['@id'] : '')
    console.log(graph.nodes)
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
    let graph = {nodes: [], edges: []}
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
    this.graphs.push(graph)
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



}
