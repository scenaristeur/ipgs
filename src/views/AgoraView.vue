<template>
  <b-container>
    <b-table striped hover :items="events">

      <template #cell(url)="data">
        <router-link :to="{ path: '/', query: { url: data.item.url }}">Link</router-link>
      </template>

    </b-table>

  </b-container>
</template>

<script>
import ldflex from '@solid/query-ldflex/lib/exports/rdflib'
let agoraPath= "https://ipgs.solidweb.org/public/test/"

import * as jsonld from 'jsonld';

export default {
  name: 'AgoraView',
  data() {
    return {
      log: agoraPath+'log.ttl',
      events: []
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



      this.events.push({
        name: docu.object['rdfs:label'],
        actor: docu.creator,
        type: docu.object['@type'],
        length: docu.object['@graph'].length,
        url: docu.object['@id'],
        published: new Date(docu.published).toLocaleString()
      })
    }

  }
}
</script>

<style>

</style>
