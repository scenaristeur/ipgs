<template>
  <b-container>

    <b-input-group class="mt-3">
      <b-form-input  v-model="new_graph_name" placeholder="New Graph Name" v-on:keyup.enter="createNew"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="createNew">create</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-list-group v-if="storage != null"   class="item list-group-item d-flex justify-content-between p-1">
      <b-list-group-item v-if="folder.parent != 'https://'" variant="dark" @click="readParent(folder.parent)" button>{{ folder.parent }}</b-list-group-item>
      <b-list-group-item v-for="fo in folder.folders" :key="fo.url" @click="read(fo)" button >
        <!-- class="p-0 m-0 flex-grow-1" -->
        <!-- <b-button   variant="outline-warning"><b-icon-folder-fill></b-icon-folder-fill></b-button>
        {{ fo.name }}

        <b-button size="sm" variant="outline-info" class="unstyled-button">
        <b-icon-eye @click.stop="see(fo)" variant="info" ></b-icon-eye>
      </b-button> -->

      <div class="input-group" style="display:table; width:100%;">

        <b-button class="unstyled-button" variant="outline-warning">
          <b-icon-folder-fill></b-icon-folder-fill>
        </b-button>
        {{ fo.name }}
        <!-- <span style="display: table-cell; border:1px solid #ccc; padding: 0 8px; vertical-align: middle;">Cras justo odio</span> -->

        <!-- <span style="display: table-cell; width: 40px;">
        <button class="btn btn-default" type="button"><span>ᐅ</span> Go!</button>
      </span> -->

      <span style="display: table-cell; width: 75px;">
        <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
        <!-- class="unstyled-button" -->

        <b-button size="sm" variant="outline-info"  @click.stop="see(fo)" style="float:left">
          <b-icon-eye @click.stop="see(fo)" variant="info" >
          </b-icon-eye>
        </b-button>
        <Share :item="fo" style="float:left"/>
      </span>

    </div>

  </b-list-group-item>


  <b-list-group-item variant="light"
  class="item list-group-item d-flex justify-content-between"
  v-for="fi in folder.files" :key="fi.url" @click="read(fi)" button>
  <div class="input-group" style="display:table; width:100%;">
    <p class="p-0 m-0 flex-grow-1"><b-icon-file-text></b-icon-file-text> {{ fi.name }}</p>
    <!-- <b-button v-b-modal.share-modal>share</b-button> -->

    <span style="display: table-cell; width: 40px;">
      <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
      <!-- class="unstyled-button" -->
      <Share :item="fi" />

    </span>
  </div>

</b-list-group-item>
</b-list-group>







</b-container>
</template>

<script>
import { mapState } from 'vuex';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
import Network from '@/models/Network.js'

//import * as jsonld from 'jsonld';

export default {
  name:"Browser",
  components: {
    'Share': () => import('@/components/layout/Share'),
  },
  data() {
    return {
      folder: {folders:[], files: []},
      url: "",
      new_graph_name : "",

    }
  },
  created(){
    this.read({url: this.storage, name: this.storage, type: 'folder'})
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log(this.url)
      //  if(this.url != 'new'){
      this.read(this.url)
      // }else{
      //   this.new_graph_name = "new_graph_name"
      // }
    }
  },
  methods: {

    async createNew(){
      if(this.new_graph_name.length>0){
        let new_file_url = this.url+this.new_graph_name+'.json'

        this.network = new Network()

        let loc = await this.network.create(new_file_url)
        //  console.log(loc)
        let loc_url = loc.startsWith('/') ? this.storage + loc.substring(1) : loc
        //         console.log(loc_url)
        //         this.network.setId(loc_url)
        //         //console.log('url', res_url)
        // console.log("new network",this.network)
        this.$router.push({ path: 'network', query: { url: loc_url } })
      }else{
        alert("If you want to create a Graph, you must provide a name !")
      }
    },
    async see(item)
    {
      this.$router.push({ path: 'network', query: { url: item.url } })
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
<style>
.item {
  text-align: left;
}
.scroll{
  max-height: 80vh;
  margin-bottom: 10px;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
}
.unstyled-button {
  border: none;
  padding: 0;
  background: none;
}
li.group-btn {
  padding: 0;
  border-radius: 0;
}
.form-control,
.btn {
  border-radius: 0 !important;
}
</style>
