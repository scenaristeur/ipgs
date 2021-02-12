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
      '@id': 'fakeId',
      'rdfs:label': "",
      '@type': "motifs:DataVisualization",
      '@graph': [
        {'@id': "#NodeOne", '@type': 'ipgs:Node', 'rdfs:label': "One"},
        {'@id': "#NodeTwo", '@type': 'ipgs:Node', 'rdfs:label': "Two"},
        {
          '@id': "#EdgeOne",
          '@type': 'ipgs:Edge',
          'ipgs:from': {'@id': '#nodeOne'},
          'ipgs:to': {'@id': '#NodeTwo'},
          'rdfs:label': "First Edge"
        },
        {'@id': "#EdgeTwo", '@type': 'ipgs:Edge', 'ipgs:from': {'@id': '#NodeTwo'}, 'ipgs:to': {'@id': '#NodeOne'}, 'rdfs:label': "Second Edge"}


      ]
    }
  }

  setId(id){
    this.jsonldRepresentation['@id'] = id
    this.jsonldRepresentation['@context']['@base'] = id
    console.log(JSON.stringify(this.jsonldRepresentation))
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

  async save(){
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
      e_clone['igps:from'] = {'@id': '#'+e.from}
      e_clone['igps:to'] = {'@id': '#'+e.to}
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
