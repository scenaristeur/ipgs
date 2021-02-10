<template>
  <b-container>
    <b-input-group class="mt-3" v-if="new_graph_name != null">
      <b-form-input  v-model="new_graph_name" placeholder="New Graph Name"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="createNew">create</b-button>
      </b-input-group-append>
    </b-input-group>
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
      folder: {folders:[], files: []},
      url: "",
      new_graph_name : null
    }
  },
  created(){
    this.read({url: this.storage, name: this.storage, type: 'folder'})
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log(this.url)
      if(this.url != 'new'){
        this.read(this.url)
      }else{
        this.new_graph_name = "new_graph_name"
      }
    }
  },
  methods: {
    createNew(){
      let new_file_url = this.url+this.new_graph_name+'.json'
      this.$router.push({ path: 'network', query: { url: new_file_url } })
    },
    async read(item) {
      if( item.type == 'folder' ){
        this.url = item.url
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
