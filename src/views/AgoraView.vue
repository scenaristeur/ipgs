<template>
  <b-container>
    <b-table
    striped
    hover
    responsive
    :items="items"
    :fields="fields"

    >


    <!--  !!!!!!!! JSONLD PLAYGROUND LINK !!!!!!!!!
    https://json-ld.org/playground/#startTab=tab-nquads&json-ld=https%253A%252F%252Fspoggy-test9.solidcommunity.net%252Fpublic%252Fnetwork%252Fboom%252Fbimbn%252Fsuper.jsonld&context=%7B%7D
  -->


  <!--
  small
  responsive="sm"
  sort-by.sync="length" -->
  <template #cell(url)="data">
    <router-link :to="{ path: '/', query: { url: data.item.url }}">Link</router-link>
  </template>
  <template #cell(actor)="data">
    <a :href="data.item.actor" target="_blank">{{data.item.actor.split('/')[2]}}</a>
  </template>
  <template #cell(agora)="data">
    <a :href="data.item.agora">Link</a>
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
        { key: 'length', label: 'size', sortable: true },
        { key: 'published', sortable: true },
        { key: 'url', sortable: false },
        { key: 'actor', label:"creator", sortable: true },
        { key: 'type', sortable: true },
        { key: 'agora', sortable: true },
      ],

    }
  },
  async created(){
    console.log(this.log)
    for await (const agoraEvent of ldflex[this.log]['https://www.dublincore.org/specifications/dublin-core/dcmi-terms/hasPart']){
      let ae = `${agoraEvent}`
      console.log(ae)

      let documentLoaderType = 'xhr'
      jsonld.useDocumentLoader(documentLoaderType/*, options*/);

      let doc = await jsonld.documentLoader(ae, function(err) {
        if(err) {
          console.log(err)
        }
      })
      console.log(doc)
      let docu = JSON.parse(doc.document)
      console.log("THE DOC", docu)




      let item = {}

      item.name=  docu.object.label || docu.object['rdfs:label']
      item.url=  docu.object['@id'] || docu.object.id
      item.length= docu.object['@graph'] != undefined ? docu.object['@graph'].length : 0
      item.type = docu.object.type ||  docu.object['@type']
      item.actor =  docu.actor || docu.creator
      item.published = new Date(docu.published).toLocaleString() || ""
      item.agora = docu['@id']

      this.items.push(item)
    }

  }
}
</script>

<style>

</style>
