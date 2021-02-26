<template>
  <b-container>


  </b-container>
</template>

<script>
import ldflex from '@solid/query-ldflex/lib/exports/rdflib'
let agoraPath= "https://ipgs.solidweb.org/public/test/"

export default {
  name: 'AgoraView',
  data() {
    return {
      log: agoraPath+'log.ttl'
    }
  },
  async created(){
    console.log(this.log)
    let agoraData = await ldflex[this.log]['https://www.dublincore.org/specifications/dublin-core/dcmi-terms/hasPart']
    console.log(agoraData)
  }
}
</script>

<style>

</style>
