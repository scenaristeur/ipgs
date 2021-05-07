import * as jsonld from 'jsonld';

export async function loadJson(s){
  console.log(s.url)
}

export async function loadJsonld(s){
    console.log(s.url)
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
    await addContext(doc)
    return await ldpToGraph(doc)
}

async function addContext(doc){
  let context = doc.jsonld['@context']
  console.log(context)
  context == undefined ? context = {} : ""
  // "id": "@id",
  // "type": "@type",
let complem_ctx = {
  id: "@id",
  type: "@type",
  graph: "@graph",
  label: "pair:label"
}

if(typeof context == 'string'){
  //https://stackoverflow.com/questions/47227586/multiple-contexts-in-json-ld
  doc.jsonld['@context'] = [context, complem_ctx]
}


  if(typeof context == 'object'){
    // if (context['@base'] == undefined || context['@base'].length == 0 ){
    //   context['@base'] = doc.documentUrl
    // }
    context.id = "@id"
    context.type = "@type"
    context.graph = "@graph"
    context.label = "pair:label"
    //  context.label = [{'@id': 'pair:label'}, {'@id': 'rdfs:label'}]
    //  context.base = '@base'
    doc.jsonld['@context'] = context
  }
  console.log("context",doc.jsonld['@context'])
}



async function ldpToGraph(doc){
  console.log(doc)

  let graph

  if (Array.isArray(doc.jsonld.nodes) && Array.isArray(doc.jsonld.edges) && doc.jsonld.nodes.length > 0){
    graph = doc.jsonld
    console.log("1")
  }else if (Array.isArray(doc.jsonld["ldp:contains"]) && doc.jsonld["ldp:contains"].length > 0){
    graph = await pairToGraph(doc)
    //this.predsToEdge(graph)
    console.log("2")
  }else{
    //alert("no ldp:contains for ", doc.documentUrl)
    graph = await oneItemToGraph(doc)
    console.log("3")
  }
return graph
  //this.graphs.push(graph)
}

async function pairToGraph(doc){
  let graph = {nodes: [], edges: []}
  const compacted = await jsonld.compact(doc.jsonld, doc.jsonld['@context']);
  console.log(compacted)
  let items = compacted["ldp:contains"]
  graph.nodes = items//.map(obj=> ({ ...obj, label: this.getLabel(obj) })) // if no name -> id as label
  return graph
}

async function oneItemToGraph(doc){
  let graph = {nodes: [], edges: []}
  let item = doc.jsonld
  graph.nodes.push(item)
  graph.nodes.map(n => n.id == null ? n.id = n['@id'] : '')
  console.log(graph.nodes)
  return graph
}
