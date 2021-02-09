<template>
  <b-container>
    <b-list-group v-if="storage != null">
      <b-list-group-item v-if="folder.parent != 'https://'" variant="dark" @click="readParent(folder.parent)" button>{{ folder.parent }}</b-list-group-item>
      <b-list-group-item v-for="fo in folder.folders" :key="fo.url" @click="read(fo)" button>{{ fo.name }}</b-list-group-item>
      <b-list-group-item variant="light" v-for="fi in folder.files" :key="fi.url" @click="read(fi)" button>{{ fi.name }}</b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
//import * as jsonld from 'jsonld';

export default {
  name:"Browser",
  data() {
    return {
      folder: {folders:[], files: []}
    }
  },
  created(){
    this.read({url: this.storage, name: this.storage, type: 'folder'})
  },
  methods: {
    async read(item) {
      if( item.type == 'folder' ){
        this.folder = await fc.readFolder(item.url)
      } else{

        // let context = {
        //   // "owl":"http://www.w3.org/2002/07/owl#",
        //   // "as":"https://www.w3.org/ns/activitystreams",
        //   // "schema":"http://schema.org/",
        //   // "life": "http://purl.org/vocab/lifecycle/schema#",
        //   terms: "http://purl.org/dc/terms/",
        //   rdfs: "http://www.w3.org/2000/01/rdf-schema#",
        //   // dcm: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/",
        //   // ldp: "http://www.w3.org/ns/ldp#",
        //   // json: "http://www.w3.org/ns/iana/media-types/application/json#",
        //   motifs: "http://purl.org/net/wf-motifs#",
        //   ipgs: "https://scenaristeur.github.io/ipgs#"
        // }
        // const compacted = await jsonld.compact(item.url, context);
        // console.log(JSON.stringify(compacted, null, 2));
        // console.log("compacted",compacted)

this.$router.push({ path: 'network', query: { url: item.url } })
      //  this.$router.push('etwork', {url: item.url})
      }
    },
    readParent(p){
      this.read({url: p, name: p, type: 'folder'  })
    }
  },
  watch: {
    storage(){
      this.read({url: this.storage, name: this.storage, type: 'folder'})
    }
  },
  computed: mapState({
    storage: s => s.solid.storage
  }),
}
</script>
