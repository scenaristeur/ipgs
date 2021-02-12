import Thing from './Thing.js'
//import VCardContext from '@/models/Vcard.jsonld.js'
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

let default_options = {
  "@context":{
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
  'rdfs:label': "",
  '@type': "motifs:DataVisualization",
  '@graph' : [
    {
      "@id": "#nodes",
      "@type": "rdfs:Set",
      '@graph':[
        // {'@id': "#NodeOne", '@type': 'ipgs:Node', 'rdfs:label': "One"},
        // {'@id': "#NodeTwo", '@type': 'ipgs:Node', 'rdfs:label': "Two"}
      ]
    },
    {
      "@id": "#edges",
      "@type": "rdfs:Set",
      '@graph':[
        // {
        //   '@id': "#EdgeOne",
        //   '@type': 'ipgs:Edge',
        //   'ipgs:from': {'@id': '#nodeOne'},
        //   'ipgs:to': {'@id': '#NodeTwo'},
        //   'rdfs:label': "First Edge"
        // },
        // {'@id': "#EdgeTwo", '@type': 'ipgs:Edge', 'ipgs:from': {'@id': '#NodeTwo'}, 'ipgs:to': {'@id': '#NodeOne'}, 'rdfs:label': "Second Edge"}
      ]
    },
  ],
  nodes:[],
  edges:[]
  // 'vcard:given-name': "",
  // 'vcard:family-name': "",
  //  'vcard:hasPhoto': 'https://image.flaticon.com/icons/svg/149/149992.svg'

}
//https://raw.githubusercontent.com/lanthaler/vCardOntology/master/Vcard.jsonld

export default class NetWork extends Thing {
  constructor(options = default_options) {
    super()
    // assign context
    //  Object.assign(this.jsonld['@context'], VCardContext)
    // default


    // assign options
    Object.assign(this, options)


    //this.jsonld['@type'] = "vcard:VCard",
    //this.jsonld['vcard:hasName'] = "__NEW__vcard:Name__"


    // this.basic_fields = [
    //   this.picture = 'https://image.flaticon.com/icons/svg/149/149992.svg',
    //   this.name = '',
    //   this.birth = '',
    //   this.email = '',
    //   this.phone = '',
    //   this.nationality = '',
    // ]

    //   this['@context'] = {
    //     as: "https://www.w3.org/ns/activitystreams",
    //     schema: "http://schema.org/"
    //   },
    //   this['@id'] = null
    //   this['@type'] = "Vcard"
    //   this['schema:name'] = "__NEW__VCARD__"
  }

  setId(id){
    this['@id'] = id
    this['@context']['@base'] = id
  }

  init(data){
    Object.assign(this, data)
    let nodes = this['@graph'][0]['@graph']
    let edges = this['@graph'][1]['@graph']
    console.log(nodes)
    console.log(edges)
  }

  async save(){
    this['@graph'][0]['@graph'] = []
    this['@graph'][1]['@graph'] = []
    this.nodes.forEach((n) => {
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
      this['@graph'][0]['@graph'].push(n_clone)
    });

    this.edges.forEach((e) => {
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
      this['@graph'][1]['@graph'].push(e_clone)
    });

    console.log("SAVE",this['@id'], this)
    await fc.createFile(this['@id'], JSON.stringify(this), 'application/json').then(
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
