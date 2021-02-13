import Thing from './Thing.js'
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

export default class NetWork extends Thing {
  constructor() {
    super()
    this.visRepresentation = {nodes:[], edges: []}
    this.jsonldRepresentation = {
      '@context': {
        // "owl":"http://www.w3.org/2002/07/owl#",
        // "as":"https://www.w3.org/ns/activitystreams",
        // "schema":"http://schema.org/",
        // "life": "http://purl.org/vocab/lifecycle/schema#",
        terms: "http://purl.org/dc/terms/",
        rdfs: "http://www.w3.org/2000/01/rdf-schema#",
        // dcm: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/",
        // ldp: "http://www.w3.org/ns/ldp#",
        // json: "http://www.w3.org/ns/iana/media-types/application/json#",
        motifs: "http://purl.org/net/wf-motifs#",
        ipgs: "https://scenaristeur.github.io/ipgs#"
      },
      '@id': '',
      'rdfs:label': '',
      '@type': "motifs:DataVisualization",
      '@graph': [
        // {'@id': "#One", '@type': 'ipgs:Node', 'rdfs:label': "One"},
        // {'@id': "#Two", '@type': 'ipgs:Node', 'rdfs:label': "Two"},
        // {
        //   //  '@id': "#EdgeOne",
        //   '@type': 'ipgs:Edge',
        //   'ipgs:from': {'@id': '#One'},
        //   'ipgs:to': {'@id': '#Two'},
        //   'rdfs:label': "First Edge"
        // },
        // { '@type': 'ipgs:Edge', 'ipgs:from': {'@id': '#Two'}, 'ipgs:to': {'@id': '#One'}, 'rdfs:label': "Second Edge"}
      ]
    }
  }

  setId(id){
    this.jsonldRepresentation['@id'] = id
    this.jsonldRepresentation['@context']['@base'] = id
    //  console.log(JSON.stringify(this.jsonldRepresentation))
  }

  async addNodeToVis(n){
    if (!(n.id.startsWith('http') || n.id.startsWith('#'))){
      n.id = "#"+n.label.trim().split(' ').join('_')
    }

    //  console.log("check if node exist",n.id)
    //this.visRepresentation.nodes.push(n)
    var index = this.visRepresentation.nodes.findIndex(x => x.id==n.id);
    index === -1 ? this.visRepresentation.nodes.push(n) : '' //console.log("object already exists")
    //console.log(this)
  }
  async addEdgeToVis(e){
    //console.log("check if edge exist",e.id)
    this.visRepresentation.edges.push(e)
    var indexPE = this.visRepresentation.edges.findIndex(x => x.from == e.from && x.to == e.to && x.label == e.label);
    indexPE === -1 ? this.visRepresentation.edges.push(e) : '' //console.log("object already exists")
    //console.log(this)
  }

  async hydrate(dat){
    console.log("dat",dat)
    if (dat.type == "folder"){
      await this.hydrateFolder(dat.folder)
    }else{
      console.log("HYDRATE FILE", dat)
      await this.hydrateFile(dat)
      //  this.network.hydrateFile(dat.file)
      //  this.read(url)
    }
  }

  async hydrateFile(f){
    this.jsonldRepresentation = f.json
    this.visRepresentation.nodes = []
    this.visRepresentation.edges = []
    let module = this
    await f.nodes.forEach(async function(n) {
      await module.addNodeToVis(n)
    });
    await f.edges.forEach(async function(e) {
      await module.addEdgeToVis(e)
    });
  }

  async hydrateFolder(f){
    let module = this
    this.visRepresentation.nodes = []
    this.visRepresentation.edges = []
    await module.addNodeToVis({id: f.url, label: f.name, shape: "image", image: "./assets/folder.png", type: "folder"})
    await module.addNodeToVis({id: f.parent, label: f.parent, shape: "image", image: "./assets/parentfolder.png", type: "folder"})
    await module.addEdgeToVis({from: f.parent, to: f.url, label: 'contains'})
    await f.folders.forEach(async function(fo) {
      await module.addNodeToVis({id: fo.url, label: fo.name, shape: "image", image: "./assets/folder.png", type: "folder"})
      await module.addEdgeToVis({from: f.url, to: fo.url, label: 'contains'})
    });
    await f.files.forEach(async function(fi) {
      await module.addNodeToVis({id: fi.url, label: fi.name, shape: "image", image: "./assets/document.png", type: "file"})
      await module.addEdgeToVis({from: f.url, to: fi.url, label: 'contains'})
    });

  }
  getVisRepresentation(){
    console.log("must convert this to vis", this.visRepresentation)
    return this.visRepresentation
  }

  getJsonldRepresentation(){
    console.log("return jsonld representation",this.jsonldRepresentation)
    return this.jsonldRepresentation
  }

  log(){
    console.log(this)
  }

  init(data){
    console.log(data)
    Object.assign(this, data)
    let nodes = this.jsonldRepresentation['@graph'][0]['@graph']
    let edges = this.jsonldRepresentation['@graph'][1]['@graph']
    console.log(nodes)
    console.log(edges)
  }


  async create(url){
    //  console.log("create",this.jsonldRepresentation['@id'], this)
    return await fc.postFile(url, JSON.stringify(this.jsonldRepresentation), 'application/json').then(
      f => {
        console.log(f)
        //    console.log(f.headers.get('location'))

        return f.headers.get('location')
        //  this.getData({url: res_url, group: ""})
      }
    )
  }

  // async saveNode(nodeData){
  //   var index = this.visRepresentation.nodes.findIndex(x => x.id==nodeData.id);
  //   index === -1 ? this.visRepresentation.nodes.push(nodeData) : Object.assign(this.nodes[index], nodeData)
  //   // this.network.visRepresentation.nodes = this.nodes
  //   // this.network.save()
  // }

  async save(){
    console.log(this)
    this.jsonldRepresentation['@graph'] = []
    this.visRepresentation.nodes.forEach((n) => {
      //  let n_clone = n.clone()
      let n_clone = {}
      Object.assign(n_clone, n)
      //  Object.defineProperty(n, '@id', Object.getOwnPropertyDescriptor(n, 'id'));
      //  Object.defineProperty(n, 'rdfs:label', Object.getOwnPropertyDescriptor(n, 'label'));
      n_clone['@id'] = n.id
      n_clone['@type'] = 'ipgs:Node'
      n_clone['rdfs:label'] = n.label
      delete n_clone.id
      delete n_clone.label
      this.jsonldRepresentation['@graph'].push(n_clone)
    });

    this.visRepresentation.edges.forEach((e) => {
      // Object.defineProperty(e, '@id', Object.getOwnPropertyDescriptor(e, 'id'));
      let e_clone = {}
      Object.assign(e_clone, e)
      e_clone['@id'] = e.id
      e_clone['@type'] = 'ipgs:Edge',
      e_clone['ipgs:from'] = {'@id': e.from}
      e_clone['ipgs:to'] = {'@id': e.to}
      // 'ipgs:from': {'@id': '#nodeOne'},
      // 'ipgs:to': {'@id': '#NodeTwo'},
      e_clone['rdfs:label'] = e.label
      delete e_clone.id
      delete e_clone.from
      delete e_clone.to
      delete e_clone.label
      this.jsonldRepresentation['@graph'].push(e_clone)
    });

    console.log("SAVE",this.jsonldRepresentation['@id'], this)
    await fc.createFile(this.jsonldRepresentation['@id'], JSON.stringify(this.jsonldRepresentation), 'application/json').then(
      f => {
        console.log(f)
        //console.log(f.headers.get('location'))
        //  let res_url = f.headers.get('location').startsWith('/') ? this.storage + f.headers.get('location').substring(1) : f.headers.get('location')
        //  console.log(res_url)
        //  this.getData({url: res_url, group: ""})
      }
    )

  }

  async save1(){
    this.jsonldRepresentation['@graph'][0]['@graph'] = []
    this.jsonldRepresentation['@graph'][1]['@graph'] = []
    this.visRepresentation.nodes.forEach((n) => {
      //  let n_clone = n.clone()
      let n_clone = {}
      Object.assign(n_clone, n)
      //  Object.defineProperty(n, '@id', Object.getOwnPropertyDescriptor(n, 'id'));
      //  Object.defineProperty(n, 'rdfs:label', Object.getOwnPropertyDescriptor(n, 'label'));
      n_clone['@id'] = '#'+n.id
      n_clone['@type'] = 'ipgs:Node'
      n_clone['rdfs:label'] = n.label
      delete n_clone.id
      delete n_clone.label
      this.jsonldRepresentation['@graph'][0]['@graph'].push(n_clone)
    });

    this.visRepresentation.edges.forEach((e) => {
      // Object.defineProperty(e, '@id', Object.getOwnPropertyDescriptor(e, 'id'));
      let e_clone = {}
      Object.assign(e_clone, e)
      e_clone['@id'] = '#'+e.id
      e_clone['@type'] = 'ipgs:Edge',
      e_clone['ipgs:from'] = {'@id': '#'+e.from}
      e_clone['ipgs:to'] = {'@id': '#'+e.to}
      // 'ipgs:from': {'@id': '#nodeOne'},
      // 'ipgs:to': {'@id': '#NodeTwo'},
      e_clone['rdfs:label'] = e.label
      delete e_clone.id
      delete e_clone.from
      delete e_clone.to
      delete e_clone.label
      this.jsonldRepresentation['@graph'][1]['@graph'].push(e_clone)
    });

    console.log("SAVE",this.jsonldRepresentation['@id'], this)
    await fc.createFile(this.jsonldRepresentation['@id'], JSON.stringify(this), 'application/json').then(
      f => {
        console.log(f)
        //console.log(f.headers.get('location'))
        //  let res_url = f.headers.get('location').startsWith('/') ? this.storage + f.headers.get('location').substring(1) : f.headers.get('location')
        //  console.log(res_url)
        //  this.getData({url: res_url, group: ""})
      }
    )
  }

}
