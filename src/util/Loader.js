import { /*handleIncomingRedirect, login,*/ fetch/*, getDefaultSession */} from '@inrupt/solid-client-authn-browser'
import { getSolidDataset/*, saveSolidDatasetAt*/ } from "@inrupt/solid-client";
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

export default class Loader {
  constructor() {
    this.type = null
    this.dataset = {}
    this.url = ""
    this.file = {}
    this.json = {}
    this.nodes = []
    this.edges = []
    this.folder = {}

  }

  async load(url){
    console.log(url)
    this.url = url
    try{
      if (this.url.endsWith('/')){
        // test jsonld container
        //await  this.jsonParse()
         this.type = "folder"
         this.folder = await fc.readFolder(this.url)
      }else{
        this.type = "file"
        this.extension = this.url.split('.').pop();
        switch (this.extension) {
          case 'rdf':
          case 'ttl':
          case 'n3':
          case 'n3t':
          case 'owl':
          console.log(this.extension)
          await this.rdfParse()
          break;
          case 'json':
          case 'jsonld':
          console.log(this.extension)
          this.type = 'json'
          await this.jsonParse()
          break;
          case 'default':
          try{
            await this.rdfParse()
          }catch(e){
            await this.jsonParse()
          }

        }

      }
      console.log("LOADER",this)
      return this

    }
    catch(e){
      alert(e)
    }
  }

  async jsonParse(){
    this.file = await fc.readFile(this.url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // method: "POST",
      // body: JSON.stringify({a: 1, b: 2})
    })
    console.log("FILE",this.file)
    this.json = JSON.parse(this.file)
    //  console.log(this.json)

    if (this.json['@id'].length == 0){
      this.json['@id'] = this.url
      this.json['@context']['@base'] = this.url
    }
    if (this.json['@id'] != this.url){
      let update = window.confirm("@id="+this.json['@id']+" est différent du nom du fichier= "+this.url+". It is recommanded to update @id ")
      console.log(update)
      if (update == true){
        this.json['@id'] = this.url
        this.json['@context']['@base'] = this.url
      }
    }
    let module = this
    //console.log(this.json)
    console.log(this.json['@graph'])
    if(this.json['@graph'] != undefined){
      await this.json['@graph'].forEach(async function(item) {
        item.id = item['@id']
        item.label = item['rdfs:label']
        //  console.log(item['@type'], item)
        switch (item['@type']) {
          case 'ipgs:Node':
          module.nodes.push(item)
          break;
          case 'ipgs:Edge':
          //      console.log("edge",item)
          item.from = item['ipgs:from']['@id']
          item.to = item['ipgs:to']['@id']

          module.edges.push(item)
          break;
          default:
          console.log('TODO', item['@type'], item)
        }
      });
    }else{
      console.log("no @graph in jsonld")
      console.log(this.json)



      for (const [key, value] of Object.entries(this.json)) {
        console.log(key, value);
        if (key == 'ldp:contains'){
          value.forEach((v) => {
          //  console.log(v)
            v.id = v['@id']
            v.label = v['pair:label']


          Object.entries(v).forEach( async function([prop, object]) {
              if (prop != '@id' && prop != 'pair:label' && prop != 'id' && prop != 'label'){
                console.log("----",prop)
                if(Array.isArray(object)){
                  object.forEach(async function(o) {
                    console.log(o)
                    o.id = o['@id']
                    o.label = o['pair:label']
                    var indexO = module.nodes.findIndex(x => x.id==o.id);
                    indexO === -1 ? module.nodes.push({id: o.id, label: o.label}) : console.log("object already exists")
                    let edge = {from: v.id, to: o.id, label: prop}
                    var indexE = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
                    indexE === -1 ? module.edges.push(edge) : console.log("object already exists")
                  });
                }else{
                  console.log('object',object)
                  // var indexO = module.nodes.findIndex(x => x.id==object);
                  // indexO === -1 ? module.nodes.push({id: object, label: await module.lastPart(object)}) : console.log("object already exists")
                  // let edge = {from: v.id, to: object, label: await module.lastPart(prop)}
                  // var indexE = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
                  // indexE === -1 ? module.edges.push(edge) : console.log("object already exists")
                }
              }
            });
            module.nodes.push(v)




          });

        }






      }



    }
    console.log("LOADER NODES EDGES", this.nodes, this.edges)


  }
  async jsonParse2(){
    //  let module = this
    this.file = await fc.readFile(this.url)
    this.json = JSON.parse(this.file)
    console.log(this.json)
    // si visRepresentation
    if (this.json.visRepresentation != undefined && this.json.visRepresentation.nodes.length > 0){
      this.nodes = this.json.visRepresentation.nodes
      this.edges = this.json.visRepresentation.edges
    }else if (this.json.jsonldRepresentation != undefined && this.json.jsonldRepresentation['@id'] != undefined){
      if (this.json.jsonldRepresentation['@id'].length == 0){
        this.json.jsonldRepresentation['@id'] = this.url
        this.json.jsonldRepresentation['@context']['@base'] = this.url
      }
      if (this.json.jsonldRepresentation['@id'] != this.url){
        let update = window.confirm("@id="+this.json.jsonldRepresentation['@id']+" est différent du nom du fichier= "+this.url+". It is recommanded to update @id ")
        console.log(update)
        if (update == true){
          this.json.jsonldRepresentation['@id'] = this.url
          this.json.jsonldRepresentation['@context']['@base'] = this.url
        }
      }


      console.log(this.json.jsonldRepresentation['@graph'])
      if(this.json.jsonldRepresentation['@graph'] != undefined){
        this.json.jsonldRepresentation['@graph'].forEach((item) => {
          item.id = item['@id']
          item.label = item['rdfs:label']
          console.log(item['@type'], item)
          switch (item['@type']) {
            case 'ipgs:Node':
            this.nodes.push(item)
            break;
            case 'ipgs:Edge':
            item.from = item['ipgs:from']['@id']
            item.to = item['ipgs:to']['@id']
            console.log("edge",item)
            this.edges.push(item)
            break;
            default:
            console.log('TODO', item['@type'], item)
          }
        });
      }
      // for (const [key, value] of Object.entries(this.json.jsonldRepresentation)) {
      //   //  if (key != 'id' && key != '@id' && key != '@context'){
      //
      //   if(Array.isArray(value)){
      //     value.forEach(async function(v) {
      //       console.warn(typeof v, key,v)
      //       var indexO = module.nodes.findIndex(x => x.id==v);
      //       indexO === -1 ? module.nodes.push({id: v, label: await module.lastPart(v)}) : console.log("object already exists")
      //       let edge = {from: module.json.id, to: v, label: await module.lastPart(key)}
      //       var indexE = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
      //       indexE === -1 ? module.edges.push(edge) : console.log("object already exists")
      //     });
      //   }else if (typeof value == 'string'){
      //     //  console.log(value)
      //     var indexO = module.nodes.findIndex(x => x.id==value);
      //     indexO === -1 ? module.nodes.push({id: value, label: await module.lastPart(value)}) : console.log("object already exists")
      //     let edge = {from: module.json.id, to: value, label: await module.lastPart(key)}
      //     var indexE = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
      //     indexE === -1 ? module.edges.push(edge) : console.log("object already exists")
      //   }else{
      //     console.log("TODO",typeof value, key,value)
      //   }
      //   //  }
      // }
    }
    console.log("LOADER NODES EDGES", this.nodes, this.edges)
  }

  async jsonParse1(){
    let module = this
    this.file = await fc.readFile(this.url)
    this.json = JSON.parse(this.file)
    //  this.jsonContent = this.json
    //  console.log(source.group,file, json)
    this.json.id == null ? this.json.id = this.json['@id'] : ''
    var indexS = this.nodes.findIndex(x => x.id == this.json.id);
    indexS === -1 ? this.nodes.push(this.json) : console.log("object already exists")

    //  console.log('module', this)

    for (const [key, value] of Object.entries(this.json)) {
      //  if (key != 'id' && key != '@id' && key != '@context'){
      console.log(key,value)
      if(Array.isArray(value)){
        value.forEach(async function(v) {
          var indexO = module.nodes.findIndex(x => x.id==v);
          indexO === -1 ? module.nodes.push({id: v, label: await module.lastPart(v)}) : console.log("object already exists")
          let edge = {from: module.json.id, to: v, label: await module.lastPart(key)}
          var indexE = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
          indexE === -1 ? module.edges.push(edge) : console.log("object already exists")
        });
      }else{
        var indexO = module.nodes.findIndex(x => x.id==value);
        indexO === -1 ? module.nodes.push({id: value, label: await module.lastPart(value)}) : console.log("object already exists")
        let edge = {from: module.json.id, to: value, label: await module.lastPart(key)}
        var indexE = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
        indexE === -1 ? module.edges.push(edge) : console.log("object already exists")
      }
      //  }
    }
  }
  async rdfParse(){
    let module = this
    this.dataset = await getSolidDataset(this.url, { fetch: fetch });
    console.log(this.dataset)
    await this.dataset.quads.forEach(async function (q)  {
      let [s,p,o] = [
        {id:q.subject.id, label: await module.lastPart(q.subject.id)},
        q.predicate.id,
        {id:q.object.id, label: await module.lastPart(q.object.id)}
      ]
      console.log(s,p,o)
      var indexS = module.nodes.findIndex(x => x.id==s.id);
      indexS === -1 ? module.nodes.push(s) : console.log("object already exists")
      var indexO = module.nodes.findIndex(x => x.id==o.id);
      indexO === -1 ? module.nodes.push(o) : console.log("object already exists")
      let edge = {from: s.id, to: o.id, label: await module.lastPart(p)}
      var indexP = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
      indexP === -1 ? module.edges.push(edge) : console.log("object already exists")
    });
  }

  // async readFolder(url){
  //   //console.log(url)
  //   this.folder = await fc.readFolder(url)
  //   //  console.log(this)
  // }

  async lastPart(text){
    //  console.log(text, typeof text)
    if (typeof text == 'object' && text['rdfs:labale'] != undefined){
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
