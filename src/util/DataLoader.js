import * as jsonld from 'jsonld';
import jsonldcontext from '@/util/ldp.json' // https://gist.github.com/nandana/661d5961b91b78ff50b6
// console.log(jsonldcontext)

export default class DataLoader {
  constructor(){

  }

  /** Accept an array of sources
  [{name: 'Source One', url: 'http://urlofthefiletoread.json'}]
  */
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
      doc.name = s.name
      doc = await this.prepare(doc)
      //  doc = await this.sanitize(doc)
      //  doc = await this.buildNetwork(doc)
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

  async compact(doc){
    // doc['@id']= doc.jsonld['@id']
    // doc.id = doc.jsonld.id
    let context = doc.jsonld['@context'] || jsonldcontext['@context']
    //  console.log(typeof context, context )


    if(typeof context == 'object'){
      // if (context['@base'] == undefined || context['@base'].length == 0 ){
      //   context['@base'] = doc.documentUrl
      // }
      context.id = "@id"
      context.type = "@type"
      context.graph = "@graph"
      //  context.label = [{'@id': 'pair:label'}, {'@id': 'rdfs:label'}]
      //  context.base = '@base'
    }

    const compacted = await jsonld.compact(doc.jsonld, context);
    doc.compacted = compacted
    if (doc.compacted.id == undefined || doc.compacted.id.length == 0 ){
      doc.compacted.id = doc.documentUrl
    }

    //  console.log(doc.compacted)
    return doc
  }

  // async sanitize(doc){
  //
  //
  //   return doc
  // }
  //
  // async buildNetwork(doc){
  //   // doc.network = {}
  //   // doc.network.nodes = []
  //   // doc.network.edges = []
  //   //
  //   // doc.network.nodes.push({id: doc.compacted.id})
  //
  //   // let module = this
  //   // for await (const [key, value] of Object.entries(doc.compacted)) {
  //   //   //  console.log(key, value);
  //   //   if(key != 'id' && key != '@context'){
  //   //     doc.network = await module.parse(key, value, doc.network)
  //   //   }
  //   //
  //   // }
  //   // doc.nodes_length = doc.network.nodes.length
  //   return doc
  // }

  // async parse(key, value, network){
  //   console.log(key, value)
  //   return await network
  // }






}
