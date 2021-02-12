<template>
  <div>

    <network ref="network"
    class="wrapper"
    :nodes="nodes"
    :edges="edges"
    @click="onClick"
    @select-node="onSelectNode"
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
  <fab-item @clickItem="clickItem" :idx="2" title="share" icon="share" />
</vue-fab>
<!-- <fab-item @clickItem="clickItem" :idx="1" title="https" icon="https" />-->

<NodeModal v-model="nodeData" @ok="saveNode"/>
<EdgeModal v-model="edgeData" @ok="saveEdge"/>
</div>
</template>

<script>
// https://github.com/r3code/vue-vis-network
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import Network from '@/models/Network.js'
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex';

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
    onSelectNode(p){
      console.log(p.nodes[0])
      this.$store.commit('ipgs/setCommandInput', p.nodes[0]+' ')
    },
    onInputObjectChange(data){
      console.log("onCommand",data)
      switch (data.type) {
        case 'triplet':
        this.saveNode({id: data.value.subject, label: data.value.subject})
        this.saveNode({id: data.value.object, label: data.value.object})
        this.saveEdge({id: uuidv4(), from: data.value.subject, to: data.value.object, label: data.value.predicate})
        break;
        default:
        console.log("TODO",data)
      }
    },
    onClick(){
      //this.inputVisible = true
    },
    async read(url){
      console.log('url',url)
      this.network = new Network()
      if( await fc.itemExists( url )) {
        let  load = true
        let data = {}
        let file = await fc.readFile(url)
        try{
          data = JSON.parse(file)
          console.log("JSONLD",data)
          if(data['@'] != undefined){
            load = window.confirm('Be careful this file does not seem to be a compatible JSONLD GRAPH file. Are you sure you want to replace it ???'+data);
          }
        }catch(e){
          load = window.confirm('Be careful this file does not seem to be a compatible JSONLD GRAPH file. Are you sure you want to replace it ???'+file);

        }
        console.log(load)
        if(load == true){
          this.network.init( data )
          console.log("network", this.network)
          this.nodes = this.network.visRepresentation.nodes
          this.edges = this.network.visRepresentation.edges
        }
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
      var index = this.nodes.findIndex(x => x.id==nodeData.id);
      index === -1 ? this.nodes.push(nodeData) : Object.assign(this.nodes[index], nodeData)
      this.network.visRepresentation.nodes = this.nodes
      this.network.save()
    },
    saveEdge(e){
      var index = this.edges.map(x => { return x.id; }).indexOf(e.id);
      if(index > -1){ this.edges[index].label = e.label }else{ this.edges.push(e) }
      this.network.visRepresentation.edges = this.edges
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
        case 2:
        if (navigator.share) {
          navigator.share({
            title: 'IPGS',
            text: 'Check out this IPGS graph.',
            url: 'https://scenaristeur.github.io/ipgs/?url='+this.url,
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
        }else{
          console.log("no share")
        }
        break;
        default:

      }
    }
  },
  watch:{
    inputObject(){
      this.onInputObjectChange(this.inputObject)
    }
  },
  computed: mapState({
    inputObject: s => s.ipgs.inputObject
  }),
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
