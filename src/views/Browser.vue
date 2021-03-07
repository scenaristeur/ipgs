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

        <b-button class="unstyled-button" variant="outline-warning"><b-icon-folder-fill></b-icon-folder-fill></b-button>
        {{ fo.name }}
        <!-- <span style="display: table-cell; border:1px solid #ccc; padding: 0 8px; vertical-align: middle;">Cras justo odio</span> -->

        <!-- <span style="display: table-cell; width: 40px;">
        <button class="btn btn-default" type="button"><span>ᐅ</span> Go!</button>
      </span> -->

      <span style="display: table-cell; width: 40px;">
        <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
        <!-- class="unstyled-button" -->
        <b-button size="sm" variant="outline-info"  @click.stop="see(fo)">
          <b-icon-eye @click.stop="see(fo)" variant="info" ></b-icon-eye>
        </b-button>
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
      <b-button size="sm" variant="outline-info"  @click.stop="share(fi)">
        <b-icon-share @click.stop="share(fi)" variant="info" ></b-icon-share>
      </b-button>
    </span>
  </div>

</b-list-group-item>
</b-list-group>




<b-modal id="share-modal" title="Share">
  <!-- https://nicolasbeauvais.github.io/vue-social-sharing/?path=/story/vuesocialsharing--dynamic-data -->
  <ShareNetwork
  v-for="network in networks"
  :network="network.network"
  :key="network.network"
  :style="{backgroundColor: network.color}"
  :url="sharing.url"
  :title="sharing.title"
  :description="sharing.description"
  :quote="sharing.quote"
  :hashtags="sharing.hashtags"
  :twitterUser="sharing.twitterUser"
  >
  <b-button :style="{backgroundColor: network.color}" class="p-2">
    <i :class="network.icon"></i>
    <span>{{ network.name }}</span>
  </b-button>
</ShareNetwork>
</b-modal>


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
  data() {
    return {
      folder: {folders:[], files: []},
      url: "",
      new_graph_name : "",
      sharing: {
        url: 'https://news.vuejs.org/issues/180',
        title: 'InterPlanetary Graph System.',
        description: 'Check out this IPGS graph.',
        quote: 'Best way to easily share your thought',
        hashtags: 'InterPlanetaryGraphSystem,ipgs,decentralized,Solid,nodejs,vuejs',
        twitterUser: 'dfaveris'
      },
      networks: [
            { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
        { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
        { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
        { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
        { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
        { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
        { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
        { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
        { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
        { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
        { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
        { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
        { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
        { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
        { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
        { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
        { network: 'quora', name: 'Quora', icon: 'fab fah fa-lg fa-quora', color: '#a82400' },
        { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
        { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
        { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
        { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
        { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
        { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
        { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' },
        { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
        { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
        //  { network: 'ipgs', name: 'IPGS', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
        //  { network: 'fakeblock', name: 'Custom Network', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
      ]
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
    share(item){
      console.log(item)
      this.sharing.url = 'https://scenaristeur.github.io/ipgs/?url='+item.url
      this.sharing.description = 'Check out this IPGS graph :'+item.name
      //  this.sharing.title = 'IPGS',
      //  text: 'Check out this IPGS graph.',
      //  url: 'https://scenaristeur.github.io/ipgs/?url='+this.url,
      this.$bvModal.show("share-modal")
    },
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
