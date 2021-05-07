import { loadFolder, loadTtl } from './ouiz-solid.js';
import { loadJson, loadJsonld } from './ouiz-json.js';
import { buildEdges } from './ouiz-common.js';


export default class Ouiz {
  constructor(sources) {
    console.log(sources)
    this.sources = sources
    this.graphs = []
  }

  async load(clear = true){
    clear == true ? this.graphs = [] : ""
    console.log(this.sources)
    for await (let s of this.sources) {
      //this.tryGetHeaders()
      let g = {}
      s.url == undefined ? alert("undefined url for ", s.name) : ""
      s.type == undefined ? await this.findType(s) : ""
      console.log(s);
      switch (s.type) {
        case "folder":
        g = await loadFolder(s)
        break;
        case "profile":
        case "ttl":
        g = await loadTtl(s)
        break;
        case "json":
        g = await loadJson(s)
        break;
        case "jsonld":
        g = await loadJsonld(s)
        break;
        default:
        try{
          g = await loadFolder(s)
        }catch(e){
          g = await loadTtl(s)
        }
      }
      this.graphs.push(g)
    }
    return this.graphs
  }


  async build(){
    console.log(this.graphs)
    for await (const g of this.graphs){
    // await this.graphs.forEach(async function(g)  {
      console.log(g)
      await buildEdges(g)
    }
    console.log(this.graphs)
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
}
