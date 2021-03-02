import * as jsonld from 'jsonld';
import jsonldcontext from '@/util/ldp.json' // https://gist.github.com/nandana/661d5961b91b78ff50b6
console.log(jsonldcontext)

export default class Parser {
  constructor(doc) {
    this.doc = doc
    this.network = {nodes: [], edges: []}
    console.log('new parser')
    console.log('contextUrl',doc.contextUrl)
    console.log('documentUrl',doc.documentUrl)

    //this.testjsonld

  }

  async buildVisNetwork(){
    this.docu = await JSON.parse(this.doc.document)
    console.log("THE DOC", this.docu)
    console.log('docu type',typeof this.docu)

    this.rootnode = {id: this.doc.documentUrl, label: this.doc.documentUrl}
    this.network.nodes.push(this.rootnode)
    await this.parse(this.docu)
    console.log("PARSER HAS FINISHED", this.network)
    return this.network
  }


  async parse(data){
    console.log("PARSE",data)
    switch (typeof data) {
      case 'object':
      await this.parseObject(data)
      break;
      case 'string':
      await this.parseString(data)
      break;
      case 'array':
      await this.parseArray(data)
      break;
      default:
      console.log('type non traité: ',typeof data)
    }

  }

  async parseObject(data){
    if (Array.isArray(data)){
      await this.parseArray(data)
    //  return
  }else{
    console.log("OBJECT",data)
    let node = {id: data['@id'], label: data['@id']}
    await this.network.nodes.push(node)
      console.log('net',this.network)
    const compacted = await jsonld.compact(data, jsonldcontext);


    //console.log("compacted",JSON.stringify(compacted, null, 2));
    console.log("compacted",compacted)
  }
  }

  async parseString(data){
    console.log("STRING",data)
  }

  async parseArray(data){
    let module = this
    // example pour default pod Storage
    console.log("ARRAY",data)
    data.forEach(async function (d) {
      await module.parse(d)
    });
  }

  async testjsonld(){
    // let context = docu['@context']
    // console.log(context)
    // const compacted = await jsonld.compact(this.url, context);
    // console.log("compacted",JSON.stringify(compacted, null, 2));
    // const expanded = await jsonld.expand(this.url);
    // console.log("expanded",JSON.stringify(expanded, null, 2));
    // const flattened = await jsonld.flatten(this.url);
    // console.log("COOL",flattened)
    // //const framed = await jsonld.frame(doc, frame);
    //
    // const canonized = await jsonld.canonize(this.url, {
    //   algorithm: 'URDNA2015',
    //   format: 'application/n-quads'
    // });
    // console.log(canonized)
    // const nquads = await jsonld.toRDF(this.url, {format: 'application/n-quads'});
    // console.log(nquads)
    //
    // this.nodes = await docu['ldp:contains']
  }
}
