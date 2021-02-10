<template>
  <div>
    <network ref="network"
    class="wrapper"
    :nodes="nodes"
    :edges="edges"
    @click="onClick"
    :options="options">
  </network>
  <!--
  @click="onClick"
  @nodes-add="nodeAdd"
  @nodes-update="nodeUpdate"
  @nodes-remove="nodeRemove"
  @edges-add="edgeAdd"
  @edges-update="edgeUpdate"
  @edges-remove="edgeRemove"
-->

<!-- <b-button class=" bottom-menu" variant="info" @click="inputVisible = !inputVisible"><b-icon icon="pen"></b-icon></b-button>
<b-input-group class="mt-3 bottom-menu" style="align:center">
<template #prepend>

</template>
<b-form-input v-if="inputVisible"></b-form-input>
</b-input-group> -->

<!-- https://github.com/a62527776a/vue-floating-action-button/blob/master/readme.en.md -->
<vue-fab mainBtnColor="#3599DB">
  <fab-item @clickItem="clickItem" :idx="0" title="browser" icon="folder" />
  <fab-item @clickItem="clickItem" :idx="1" title="about" icon="question" />
</vue-fab>
<!-- <fab-item @clickItem="clickItem" :idx="1" title="https" icon="https" />-->

<NodeModal v-model="nodeData" @ok="saveNode"/>
<EdgeModal v-model="edgeData" @ok="saveEdge"/>
</div>
</template>

<script>
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import Network from '@/models/Network.js'
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

export default {
  name:"NetworkView",
  components: {
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),
  },
  data() {
    return {
      nodes: [],
      edges: [],
      nodeData: {},
      edgeData: {},
      options: {
        edges: {
          arrows: 'to',
          color: 'lightgray'
        },
        manipulation: true,
        interaction: {
          navigationButtons: true,
        },
      },
      inputVisible: false
    }
  },
  created(){
    console.log(this.$route)
    this.initManipulationOptions()
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log(this.url)

      this.read(this.url)
    }else{

      this.network = new Network()
      this.network.setId( 'https://spoggy-test9.solidcommunity.net/public/network/test.json')
      console.log("network", this.network)
    }

  },
  methods: {
    onClick(){
      this.inputVisible = true
    },
    async read(url){
      console.log('url',url)
      this.network = new Network()
      if( await fc.itemExists( url )) {
        let file = await fc.readFile(url)
        let data = JSON.parse(file)
        console.log("JSONLD",data)

        this.network.init( data )
        console.log("network", this.network)
        this.nodes = this.network.nodes
        this.edges = this.network.edges
      }else{
        this.network.setId( url)

      }

    },
    initManipulationOptions() {
      let app = this
      this.options.manipulation = {
        initiallyActive: true,
        addNode: async (nodeData, callback) => { nodeData.label = "" ; app.editNode(nodeData, callback) },
        editNode: async (nodeData, callback) => { app.editNode(nodeData, callback) },
        addEdge: async (edgeData, callback) => { app.addEdge(edgeData, callback) },
        editEdge: { editWithoutDrag: async (edgeData, callback) => {app.editEdgeWithoutDrag(edgeData, callback)} }
      }
    },
    editNode(nodeData, callback){
      this.nodeData = nodeData
      this.$bvModal.show("node-popup")
      callback()
    },
    addEdge(edgeData, callback){
      this.edgeData = edgeData
      if (edgeData.from == edgeData.to) {
        var r = confirm("Do you want to connect the node to itself?");
        if (r != true) { callback(null); return; }
      }
      this.editEdgeWithoutDrag(edgeData, callback);
    },
    editEdge(edgeData, callback){ this.editEdgeWithoutDrag(edgeData, callback); },
    editEdgeWithoutDrag(edgeData, callback){
      this.edgeData = edgeData
      this.$bvModal.show("edge-popup")
      callback()
    },
    saveNode(nodeData){
      var index = this.nodes.findIndex(x => x.id==this.nodeData.id);
      index === -1 ? this.nodes.push(nodeData) : Object.assign(this.nodes[index], nodeData)
      this.network.nodes = this.nodes
      this.network.save()
    },
    saveEdge(e){
      var index = this.edges.map(x => { return x.id; }).indexOf(e.id);
      if(index > -1){ this.edges[index].label = e.label }else{ this.edges.push(e) }
      this.network.edges = this.edges
      this.network.save()
    },
    clickItem(item){
      console.log('item',item)
      switch (item.idx) {
        case 0:
        this.$router.push({ path: 'browser' })
        break;
        case 1:
        this.$router.push({ path: 'about' })
        break;
        default:

      }
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
.bottom-menu{
  position: fixed;
  bottom : 10px;
  /*  left: 50%;*/
  z-index: 2;
}
vue-fab .fab-main-container{
  right:50%
}
</style>
