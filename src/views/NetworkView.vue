<template>
  <div>
    <network ref="network"
    id="network"
    class="wrapper"
    :nodes="nodes"
    :edges="edges"
    @select-node="onSelectNode"
    :options="options">
  </network>
  <NodeModal v-model="nodeData" @ok="saveNode"/>
  <EdgeModal v-model="edgeData" @ok="saveEdge"/>
  <b-modal id="editor-modal" size="lg" @ok="downloadFile">
    <editor
    height="300px"
    ref="editor"
    :content="content"
    :options="{
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      tabSize:2
    }"
    :fontSize='14'
    :lang="'python'"
    :theme="'eclipse'"
    @onChange="editorChange"
    @init="editorInit">
    <!-- <div>toolbar or something</div> -->
  </editor>
</b-modal>

<b-modal id="import-popup" v-model="showimport">
  <b-form-file
  v-model="files"
  multiple
  placeholder="Choose a file or drop it here..."
  drop-placeholder="Drop file here..."
  ></b-form-file>
  <template #modal-footer>
    <div class="w-100">
      <b-button
      variant="primary"
      size="sm"
      class="float-right"
      @click="importToGraph(true)"
      >
      New
    </b-button>
    <b-button
    variant="primary"
    size="sm"
    class="float-right"
    @click="importToGraph"
    >
    Add to current graph
  </b-button>
  <b-button
  variant="primary"
  size="sm"
  class="float-right"
  @click="showimport=false"
  >
  Close
</b-button>
</div>
</template>

</b-modal>
<StorageModal :network="network" />
</div>
</template>

<script>
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import networkMixin from '@/mixins/networkMixin'

// https://github.com/zjfcool/vue2x-ace-editor
import ace from 'brace'
import 'brace/ext/language_tools';
import 'brace/mode/python.js'
import 'brace/snippets/python.js';
import 'brace/theme/eclipse.js';


// ace/mode/turtle
console.log(ace)

export default {
  name:"NetworkView",
  mixins: [networkMixin],
  components: {
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),
    'StorageModal': () => import('@/components/solid/StorageModal'),
    'Editor': () => import('vue2x-ace-editor'),
  },
  async created(){
    this.options.locale = navigator.language
    this.initManipulationOptions()
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      //  console.log(this.url)
      await this.load(this.url)
    }else{
      this.storage = this.$store.state.solid.storage
      //console.log(this.storage)
      if (this.storage != null){
        await this.load(this.storage)
      }

      //this.network = new Network()
      //  this.network.setId( 'https://spoggy-test9.solidcommunity.net/public/network/test.json')
      //console.log("network", this.network)
    }
  },
  data() {
    return {
      nodes: [],
      edges: [],
      files: [],
      showimport: false,
      nodeData: {},
      edgeData: {},
      options: {
        // nodes:{
        //   color: {
        //     border: '#00FF00',
        //     background: '#FF0000',
        //     highlight: {
        //       border: '#2B7CE9',
        //       background: '#D2E5FF'
        //     }
        //   }
        // },
        edges: {
          arrows: 'to',
          color: 'lightgray'
        },
        manipulation: true,
        interaction: {
          navigationButtons: true,
        },
      },
      content: ""
    }
  },
  methods: {
    onInputObjectChange(data){
      console.log("onCommand",data)
      switch (data.type) {
        case 'triplet':
        this.saveNode({id: "#"+data.value.subject.trim().split(' ').join('_'), label: data.value.subject})
        this.saveNode({id: "#"+data.value.object.trim().split(' ').join('_'), label: data.value.object})
        this.saveEdge({from: "#"+data.value.subject.trim().split(' ').join('_'), to: "#"+data.value.object.trim().split(' ').join('_'), label: data.value.predicate})
        //  this.saveEdge({id: uuidv4(), from: "#"+data.value.subject.trim().split(' ').join('_'), to: "#"+data.value.object.trim().split(' ').join('_'), label: data.value.predicate})
        break;
        case 'commande':
        this.catchCommand(data)
        break;
        default:
        console.log("TODO",data)
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
    saveNode(n){
      var index = this.nodes.findIndex(x => x.id==n.id);
      index === -1 ? this.nodes.push(n) : Object.assign(this.nodes[index], n)
    },
    saveEdge(e){
      console.log(e)
      var index = this.edges.findIndex(x => x.id==e.id);
      index === -1 ? this.edges.push(e) : Object.assign(this.edges[index], e)
    },
    // onSelectNode(p){
    //   let node = this.nodes.find(x => x.id==p.nodes[0]);
    //   console.log(JSON.stringify(node))
    // }
  },
  computed: {
    inputObject: {
      get () { return this.$store.state.ipgs.inputObject},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  watch:{
    inputObject(){
      this.onInputObjectChange(this.inputObject)
    },
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
