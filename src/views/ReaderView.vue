<template>
  <div>

    Reader
    <div class="wrapper">
      <network
      id="network"
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @click="networkEvent('click')"
      @select-node="onSelectNode"
      @select-edge="networkEvent('selectEdge')"

      ></network>

    </div>
    <div>
      <b-table striped hover :items="loadedSources" >

        <!-- :fields="fields"
        <template #cell(compacted)="data">
        {{data.item}}
      </template> -->

    </b-table>
  </div>
</div>
</template>

<script>
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import DataLoader from '@/util/DataLoader.js'
import Network from '@/util/Network.js'
let loader = new DataLoader()
let net = new Network()


export default {
  name: 'Reader',
  data() {
    return {
      network: {
        nodes: [],
        edges: [],
        options: {
          // "physics": {
          //   "barnesHut": {
          //     "springConstant": 0.1,
          //     "avoidOverlap": 0.5
          //   }
          // },
          interaction: {
            navigationButtons: true,
          },
          manipulation: true,
          nodes: {
            // shape: "circle",
            // size:24,
            color: {
              background: '#D2E5FF',
              border: '#2B7CE9',
              highlight: {
                border: 'black',
                background: 'white'
              },
              // hover: {
              //   border: 'orange',
              //   background: 'grey'
              // }
            },
            font:{color:'black'},
            // shapeProperties: {
            //   useBorderWithImage:true
            // }
          },
          edges: {
            arrows: 'to',
            //  color: 'lightgray'
          },
        }
      },
      sources: [
        {name: 'One graph', url: 'https://spoggy-test9.solidcommunity.net/public/network/chop/ypoup.json'},
        {name: 'One activity', url: 'https://ipgs.solidcommunity.net/public/activity/data/fe0919de-eabf-4f79-9196-1128cab202c2.json'},
        {name: 'Spoggy-Test9 pod storage', url: 'https://spoggy-test9.solidcommunity.net', status: 'pending'},
        {name: 'Spoggy-Test9 pod storage public folder', url: 'https://spoggy-test9.solidcommunity.net/public/', status: 'pending'},
        {name: 'Simple Log turtle file', url: 'https://ipgs.solidcommunity.net/public/activity/log.ttl', status:""},
        {name: 'Spoggy solid profile', url: 'https://spoggy.solidcommunity.net/profile/card#me'},
        {name: "Angelo's public folder", url: 'https://angelo.veltens.org/public/'},
        {name: 'public folder without trailing slash', url: 'https://angelo.veltens.org/public'},
        {name: 'ttl without extension', url: 'https://angelo.veltens.org/public/tweets/2020/05/1260959812579405826'},
        {name: 'multiple ttl folder', url: 'https://spoggy.solidcommunity.net/public/Notes/'},

        // -
        //
        //  semaps containers
        {name: 'Semapps Skills', url: 'https://data.virtual-assembly.org/skills'},
        // {name: 'Semapps Orga', url: 'https://data.virtual-assembly.org/organizations'},
        // {name: 'Semapps Users', url: 'https://data.virtual-assembly.org/users'},
        // {name: 'Semapps Projects', url: 'https://data.virtual-assembly.org/projects'},
        // {name: 'Semapps Themes', url: 'https://data.virtual-assembly.org/themes'},

        //  {name: 'Semapps All in one', url: 'https://data.virtual-assembly.org/'},
        // {name: 'simple json', url: ''},
        // {name: 'jsonld file with @id', url: ''},
        // {name: 'jsonld file without @id', url: ''},
        // {name: 'jsonld file with @id with @context', url: ''},
        // {name: 'jsonld file without @id without @context', url: ''},
        // {name: 'jsonld file with @id replaced by id in @context', url: ''},
        // {name: 'visjs file with nodes & edges arrays', url: ''},
        // {name: 'folder/container with many different files', url: ''},
      ],
      loadedSources: [],
      //  fields: ['@id', 'id','compacted', 'network', 'documentUrl']
    }
  },
  async created(){
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log(this.url)
      this.sources.push({name: 'Url Query', url: this.url})
      //  this.$router.push(({ name: 'Network', query: { url: this.url } }))
    }
    this.loadedSources = this.sources
    await this.init()

  },
  methods: {
    async init() {
      this.loadedSources = await loader.load(this.sources)
      console.log(this.loadedSources)

      let netVis = await net.buildVis(this.loadedSources)
      console.log(netVis)
      this.network.nodes = netVis.nodes
      this.network.edges = netVis.edges

    },
    networkEvent(eventName) {
      console.log(eventName)
      // if (this.networkEvents.length > 500) this.networkEvents = "";
      // this.networkEvents += `${eventName}, `;
    },
    onSelectNode(p){
      console.log(p)
      let n = this.network.nodes.find(x => x.id == p.nodes[0])
      console.log(n)
      this.sources.push({name: n.label, url: n.id})
      this.init()
    }
  }
}
</script>

<style>
* {
  font-family: sans-serif;
}

/* .wrapper {
padding: 20px 50px;
text-align: center;
} */
.events {
  text-align: left;
  height: 70px;
}

.network{
  min-height: 80vh; /* 95vh;*/
  border: 1px solid black;
  background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
  padding: 10px;
  height: 80vh; /* 95vh;*/
}
.vis-label{
  color: black;

}

/* @media only screen and (max-width: 600px) {
.vis-label {
display: none;
}
.vis-button:after {
content:"°°"
}
} */

</style>
