import * as jsonld from 'jsonld';
import jsonldcontext from '@/util/ldp.json' // https://gist.github.com/nandana/661d5961b91b78ff50b6
// console.log(jsonldcontext)

export default class DataLoader {
  constructor(){

  }

  async load(sources){
    // let documentLoaderType = 'xhr'
    // await jsonld.useDocumentLoader(documentLoaderType/*, options*/);

    let doc = {}
    let data = []
    //  console.log(doc)
    for (const s of sources)  {
      //  console.log(s)
      try{
        doc = await jsonld.documentLoader(s.url, function(err) {
          if(err) {
            console.log(err)
          }
        })
      }catch(e){
        alert(e)
      }
      //  console.log('doc',doc)
      //return doc
      doc = await this.prepare(doc)
      doc = await this.sanitize(doc)
      doc = await this.buildNetwork(doc)
      data.push(doc)
    }
    //  console.log('data',data)
    return data
  }

  async prepare(doc){
    doc.jsonld = JSON.parse(doc.document)
    doc = await this.compact(doc)
    delete doc.document
    delete doc.jsonld
    //this.parse(doc) // without await for a lazy parser ;-)
    // doc.jsonld['@context'] != undefined && doc.jsonld['@context'].length > 0
    //  ajouter jsonldcontext
    return doc
  }

  async sanitize(doc){


    return doc
  }

  async buildNetwork(doc){
    doc.network = {}
    doc.network.nodes = []
    doc.network.edges = []
    let main_node = {id: await doc.compacted.id || await doc.compacted['@id']}
    doc.network.nodes.push(main_node)

    //  let module = this
    for await (const [key, value] of Object.entries(doc.compacted)) {
      console.log(key, value);
      //   if(key != 'id'){
      //     doc.network = await module.parse(key, value, doc)
      //   }

    }



    return doc
  }

  async parse(key, value, network){
    console.log(key, value)
    return await network
  }

  async compact(doc){
    // doc['@id']= doc.jsonld['@id']
    // doc.id = doc.jsonld.id
    let context = doc.jsonld['@context'] || jsonldcontext['@context']
    //  console.log(typeof context, context )


    if(typeof context == 'object'){
      if (context['@base'] == undefined || context['@base'].length == 0 ){
        context['@base'] = doc.documentUrl
      }
      context.id = "@id"
      context.type = "@type"
      context.base = '@base'
    }

    const compacted = await jsonld.compact(doc.jsonld, context);
    doc.compacted = compacted
    if (doc.compacted.id == undefined || doc.compacted.id.length == 0 ){
      doc.compacted.id = doc.documentUrl
    }

    //  console.log(doc.compacted)
    return doc
  }
  //
  // async parse1(data){
  //   console.log("PARSE",data)
  //   switch (typeof data) {
  //     case 'object':
  //     await this.parseObject(data)
  //     break;
  //     case 'string':
  //     await this.parseString(data)
  //     break;
  //     case 'array':
  //     await this.parseArray(data)
  //     break;
  //     default:
  //     console.log('type non traité: ',typeof data)
  //   }
  // }
  //
  // async parseObject(data){
  //   if (Array.isArray(data)){
  //     await this.parseArray(data)
  //     //  return
  //   }else{
  //     console.log("OBJECT",data)
  //     let node = {id: data['@id'], label: data['@id']}
  //     //await this.network.nodes.push(node)
  //     console.log('node',node)
  //     const compacted = await jsonld.compact(data, jsonldcontext);
  //
  //
  //     //console.log("compacted",JSON.stringify(compacted, null, 2));
  //     console.log("compacted",compacted)
  //   }
  // }
  //
  // async parseString(data){
  //   console.log("STRING",data)
  // }
  //
  // async parseArray(data){
  //   let module = this
  //   // example pour default pod Storage
  //   console.log("ARRAY",data)
  //   data.forEach(async function (d) {
  //     await module.parse(d)
  //   });
  // }



}
