<template>
  <div>
    <NetworkPopups :network="network" />
    <network
    id="network"
    class="wrapper"
    ref="network"
    :nodes="network.nodes"
    :edges="network.edges"
    :options="network.options"
    @select-node="onNodeSelect"
    ></network>
  </div>
</template>

<script>
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import networkEventsMixin from '@/mixins/networkEventsMixin'
import networkCommandMixin from '@/mixins/networkCommandMixin'


export default {
  name:"NetworkView",
  mixins: [networkEventsMixin, networkCommandMixin],
  components: {
    'NetworkPopups': () => import('@/components/network/NetworkPopups')
  },
  async created(){

    this.network = this.$store.state.ipgs.network
    Object.keys(this.network).length == 0 ? this.network = this.networkDef : ""
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log(this.url)
      this.createGraph({url: this.url, name: 'urlGraph'})
    }
    this.storage = this.$store.state.solid.storage
    console.log("storage",this.storage)
    if(this.storage != null){
      this.createGraph({url: this.storage, name: 'storageGraph'})
    }

    console.log("collection",this.graphcollection)
  },
  data() {
    return {
      networkDef: {
        nodes: [],
        edges: [],
        options: {
          locale: navigator.language,
          nodes: {
            color: {
              //  border: 'grey',
              background: '#D2E5FF',
              border: '#2B7CE9',

              highlight: {
                border: 'black',
                background: 'white'
              },
              hover: {
                border: 'orange',
                background: 'grey'
              }
            },
            font:{color:'black'},
            shapeProperties: {
              useBorderWithImage:true
            }
          },
          edges: {
            arrows: 'to',
            //  color: 'lightgray'
          },
          interaction: {
            navigationButtons: true,
          }
        },
      },
    }
  },
  computed: {
    network:{
      get () { return this.$store.state.ipgs.network},
      set (value) { this.$store.commit('ipgs/setNetwork', value) }
    }
  }
}
</script>

<style>
.wrapper{
  min-height: 95vh;
  border: 1px solid black;
  background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
  padding: 10px;
  height: 95vh;
}
.vis-label{
  color: black
}
</style>
