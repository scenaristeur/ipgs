<template>
  <b-container>
    <b-table
    striped
    hover
    responsive
    :items="items"
    :fields="fields"
    >
    <template #cell(name)="data">
      <router-link :to="{ path: '/', query: { url: data.item.url }}">{{ data.item.name}}</router-link>
    </template>
    <template #cell(creator)="data">
      <a :href="data.item.creator" target="_blank">{{data.item.creator.split('/')[2]}}</a>
    </template>
    <template #cell(agora)="data">
      <a :href="data.item.agora">Link</a>
    </template>
    <template #cell(nodes)="data">
      {{ data.item.nodes.length}}
    </template>
    <template #cell(edges)="data">
      {{ data.item.edges.length}}
    </template>
  </b-table>
</b-container>
</template>

<script>
import ldflex from '@solid/query-ldflex/lib/exports/rdflib'
let agoraPath= "https://ipgs.solidcommunity.net/public/activity/"
import * as jsonld from 'jsonld';

export default {
  name: 'AgoraView',
  data() {
    return {
      log: agoraPath+'log.ttl',
      items: [],
      fields: [
        { key: 'name', sortable: true },
        { key: 'nodes', label: 'nodes / edges ', sortable: true },
        { key: 'edges', label: 'edges', sortable: true },
        { key: 'creator', label:"creator", sortable: true },
        { key: 'published', sortable: true },
        { key: 'agora', label:'link', sortable: true },
        //  { key: 'url', sortable: false },
        { key: 'type', sortable: true },
      ],
    }
  },
  async created(){
    console.log(this.log)
    for await (const agoraEvent of ldflex[this.log]['https://www.dublincore.org/specifications/dublin-core/dcmi-terms/hasPart']){
      let ae = `${agoraEvent}`
      let documentLoaderType = 'xhr'
      jsonld.useDocumentLoader(documentLoaderType/*, options*/);

      let doc = await jsonld.documentLoader(ae, function(err) {
        if(err) {
          console.log(err)
        }
      })
      let docu = JSON.parse(doc.document)
      let item = {}
      console.log("docu", docu)
      item.name=  docu.object.label || docu.object['rdfs:label'] || docu.object.nodes[0].label
      item.url=  docu.object['@id'] || docu.object.id || docu.object.url || docu['@id']
      item.nodes = docu.object.nodes || [] // != undefined ? docu.object.nodes.length : 0
      item.edges = docu.object.edges || [] //nodes != undefined ? docu.object.nodes.length : 0 //docu.object['@graph'] != undefined ? docu.object['@graph'].length : 0
      item.type = docu.object.type ||  docu.object['@type']
      item.creator = docu.creator
      item.published = new Date(docu.published).toLocaleString() || ""
      item.agora = docu['@id']
      this.items.push(item)
    }

  }
}
</script>
