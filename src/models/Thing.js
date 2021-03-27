export default class Thing {
  constructor() {
    //  this.jsonld = {
    this.jsonldRepresentation = {}
    this.jsonldRepresentation['@context'] =  {
      owl: "http://www.w3.org/2002/07/owl#",
      terms: "http://purl.org/dc/terms/",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      // dcm: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/",
      // ldp: "http://www.w3.org/ns/ldp#",
      // json: "http://www.w3.org/ns/iana/media-types/application/json#",
      // schema: "http://schema.org/",
      // as: "https://www.w3.org/ns/activitystreams",
      // life: "http://purl.org/vocab/lifecycle/schema#",
    },
    this.jsonldRepresentation['@id'] = null,
    this.jsonldRepresentation['@type'] = "owl:Thing"
    this.jsonldRepresentation['rdfs:label'] = ""
    this.jsonldRepresentation['terms:created'] = new Date().toISOString()+"^^XML:dateTime" // must be'"2021-01-29T01:02:40Z"^^XML:dateTime'
    this.jsonldRepresentation['terms:modified'] = new Date().toISOString()+"^^XML:dateTime"
    //  this['schema:name'] = "__NEW__THING__"
    //}
  }
}
