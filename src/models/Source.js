import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

import * as jsonld from 'jsonld';
import { /*handleIncomingRedirect, login,*/ fetch/*, getDefaultSession */} from '@inrupt/solid-client-authn-browser'
import { getSolidDataset/*, saveSolidDatasetAt*/, getFile } from "@inrupt/solid-client";

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
        case "sparql":
        await this.loadSparql(s)
        break;
        case "transiscope":
        //  s.url = s.url+"&excludeExternal=true"
        await this.loadJsonld(s)
        console.log("transi",this.graphs)
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
    let file = await getFile(s.url)
    console.log(file)
    if(file.type =="application/json" || s.url.endsWith('.json')){
      s.type = "json"
    }else{
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
      s.url.endsWith('.jsonld') ? s.type = "jsonld" : ""
      s.url.endsWith('sparql') || s.url.endsWith('sparql/') ? s.type = "sparql" : ""
      s.url.startsWith('https://transiscope.gogocarto.fr') ? s.type = "transiscope" : ""
    }
    console.log(s)
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
    await this.ldpToGraph(doc)
  }

  async loadSparql(s){
    console.log("loading sparql", s)
    const query = `
    CONSTRUCT {
      ?s0 ?p0 ?o0
    }
    WHERE
    {
      ?s0 ?p0 ?o0 .
    }`;
    let  method = {
      method: 'POST',
      headers: {
        'accept': 'application/ld+json',
      },
      body: query
    };

    try{
      let response = await fetch(s.url, method);

      if (response.ok){
        let triples = await response.json();
        console.log('Fin de récupération des données de Semapps...');
        console.log("triples", triples)
        //  let doc = {jsonld: triples}
        let graph = {nodes: [], edges: []}
        graph.nodes = triples['@graph'].map(obj=> ({ ...obj, id: obj['@id'] })) // if no name -> id as label
        console.log('graph', graph)
        this.graphs.push(graph)
        //      console.log(thisGraph.d3Data);
        console.log('Fin de conversion des données dans D3Data...');

      }
      else {
        console.log("Erreur lors de la récupération des données : ", response.status)

      }
    }
    catch (e){
      console.error("Erreur lors de la récupération des données : "+e);

    }
    //  let nodes = [], edges = []


  }

  async ldpToGraph(doc){
    let graph

    if (Array.isArray(doc.jsonld.nodes) && Array.isArray(doc.jsonld.edges) && doc.jsonld.nodes.length > 0){
      console.log("mode1")
      graph = doc.jsonld

    }else if (Array.isArray(doc.jsonld["ldp:contains"]) && doc.jsonld["ldp:contains"].length > 0){
      console.log("mode2")
      graph = await this.pairToGraph(doc)
    }else{
      console.log("mode3")
      //alert("no ldp:contains for ", doc.documentUrl)
      graph = await this.oneItemToGraph(doc)
    }
    this.graphs.push(graph)
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
    if(doc.jsonld['@graph'] != undefined){
      graph.nodes = doc.jsonld['@graph']
    }else{
      let item = doc.jsonld
      graph.nodes.push(item)
    }

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
