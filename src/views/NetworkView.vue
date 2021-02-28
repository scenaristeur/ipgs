<template>
  <div>
    <NetworkToolBar />
    <NetworkPopups :network="network" />
    <network
    class="wrapper"
    ref="network"
    :nodes="network.nodes"
    :edges="network.edges"
    :options="network.options"
      @select-node="onNodeSelect"

    ></network>
    <!--
    @click="onNetworkClick()"
    @select-node="onNodeSelect"
    @select-edge="onEdgeSelect"
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
    @select="onNetworkSelect"
    @start-stabilizing="networkEvent('startStabilizing')"
    @stabilization-progress="networkEvent('stabilizationProgress')"
    @stabilization-iterations-done="networkEvent('stabilizationIterationsDone')"
    @stabilized="networkEvent('stabilized')"
    @resize="networkEvent('resize')"
    @init-redraw="networkEvent('initRedraw')"
    @before-drawing="networkEvent('before-drawing')"
    @after-drawing="networkEvent('afterDrawing')"
    @animation-finished="networkEvent('animationFinished')"
    @nodes-mounted="networkEvent('nodes-mounted')"
    @edges-mounted="networkEvent('edges-mounted')"
    @dragging="networkEvent('dragging')"
    @zoom="networkEvent('zoom')"

    @double-click="networkEvent('doubleClick')"
    @oncontext="networkEvent('oncontext')"
    @hold="networkEvent('hold')"
    @release="networkEvent('release')"
    @deselect-node="networkEvent('deselectNode')"
    @deselect-edge="networkEvent('deselectEdge')"
    @hover-node="networkEvent('hoverNode')"
    @blur-node="networkEvent('blurNode')"
    @hover-edge="networkEvent('hoverEdge')"
    @blur-edge="networkEvent('blurEdge')"

    @show-popup="networkEvent('showPopup')"
    @hide-popup="networkEvent('hidePopup')"

    @config-change="networkEvent('configChange')"

    @nodes-add="networkEvent('nodes-add')"
    @nodes-update="networkEvent('nodes-update')"
    @nodes-remove="networkEvent('nodes-remove')"

    @edges-add="networkEvent('edges-add')"
    @edges-update="networkEvent('edges-update')"
    @edges-remove="networkEvent('edges-remove')"
  -->



  <!--
  <NodeModal v-model="nodeData" @ok="saveNode"/>
  <EdgeModal v-model="edgeData" @ok="saveEdge"/>
  <NodeMenu v-model="nodeData" @follow="follow" />
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
@init="editorInit">-->
<!-- <div>toolbar or something</div> -->
<!--  </editor>
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
<StorageModal :network="network" />-->
</div>
</template>

<script>
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";

import networkEventsMixin from '@/mixins/networkEventsMixin'

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
  mixins: [networkEventsMixin],
  components: {
    //    'Network': () => import ("vue-vis-network"),
    // 'NodeModal': () => import('@/components/network/NodeModal'),
    // 'EdgeModal': () => import('@/components/network/EdgeModal'),
    // 'StorageModal': () => import('@/components/solid/StorageModal'),
    // 'Editor': () => import('vue2x-ace-editor'),
    // 'NodeMenu': () => import('@/components/network/NodeMenu'),
    'NetworkToolBar': () => import('@/components/network/NetworkToolBar'),
    'NetworkPopups': () => import('@/components/network/NetworkPopups')

  },
  async created(){
    // this.options.locale = navigator.language
    // this.initManipulationOptions()
    // if (this.$route.query.url != undefined ){
    //   this.url = this.$route.query.url
    //   //  console.log(this.url)
    //   await this.load(this.url)
    // }else{
    //   this.storage = this.$store.state.solid.storage
    //   //console.log(this.storage)
    //   if (this.storage != null){
    //     await this.load(this.storage)
    //   }
    //
    //   //this.network = new Network()
    //   //  this.network.setId( 'https://spoggy-test9.solidcommunity.net/public/network/test.json')
    //   //console.log("network", this.network)
    // }
  },
  data() {
    return {
      network: {
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
