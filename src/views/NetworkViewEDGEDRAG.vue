<template>
  <div id="app">
    <Network ref="network"
    class="network"
    :nodes="nodes"
    :edges="edges"
    @select-edge="onEdgeSelected"
    :options="options">
  </Network>
</div>
</template>

<script>
import { Network } from "vue-vis-network";
//import "vue-vis-network/node_modules/vis-network/dist/dist/vis-network.css";

export default {
  components: {
    Network
  },
  data() {
    return {
      nodes: [
        {id: 1,  label: 'circle',  shape: 'circle' },
        {id: 2,  label: 'ellipse', shape: 'ellipse'},
        {id: 3,  label: 'database',shape: 'database'},
        {id: 4,  label: 'box',     shape: 'box'    },
        {id: 5,  label: 'diamond', shape: 'diamond'},
        {id: 6,  label: 'dot',     shape: 'dot'},
        {id: 7,  label: 'square',  shape: 'square'},
        {id: 8,  label: 'triangle',shape: 'triangle'},
      ],
      edges: [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 5, to: 6},
        {from: 5, to: 7},
        {from: 6, to: 8}
      ],
      options: {
        nodes: {
          borderWidth: 4
        },
        edges: {
          color: 'lightgray'
        },
      }
    }
  },
  async created(){
    let app = this
    this.options.manipulation = {
      initiallyActive: true,
      //   addNode: async (node, callback) => { node.label = "" ; app.editNode(node, callback) },
      //   editNode: async (node, callback) => { app.editNode(node, callback) },
      //   addEdge: async (edge, callback) => { app.addEdge(edge, callback) },
      //  editEdge: async (edge, callback) => { console.log(edge, callback) },
      editEdge: { editWithoutDrag: async (edge, callback) => {app.editWithoutDrag(edge, callback)} }
    }
  },
  methods: {
    onEdgeSelected(p){
      console.log(p)
    },
    editWithoutDrag(edge, cb){
      console.log(typeof this.options.manipulation.editEdge)
      console.log(typeof this.options.manipulation.editEdge.editWithoutDrag)
      console.log(edge,cb)
    }
    // addNode(node, callback){
    //   //  callback() // Node will be added via reactivity from Vuex
    //   if (this.tmp_file != null ){
    //     this.file = this.tmp_file
    //   }
    //   node.id = this.file.url+"#"+node.id
    //   node.label = ""
    //   //console.log(node)
    //   this.editNode(node, callback)
    // },
    // editNode(n/*,cb*/){
    //   //console.log("EDIT NODE",n,cb)
    //   this.node = n
    //   this.$bvModal.show("node-popup")
    // },
    // addEdge(e,cb){
    //   //console.log("add edge",e,cb)
    //   this.edge = e
    //   if (e.from == e.to) {
    //     var r = confirm("Do you want to connect the node to itself?");
    //     if (r != true) {
    //       cb(null);
    //       return;
    //     }
    //   }
    //   this.editEdgeWithoutDrag(e, cb);
    // },
    // editEdge(e,cb){
    //   console.log("EDIT edge",e,cb)
    //   this.editEdgeWithoutDrag(e, cb);
    // },
    // editEdgeWithoutDrag(edge, callback){
    //   //
    //   console.log("edit editWithoutDrag",edge)
    //   /*      // filling in the popup DOM elements
    //   document.getElementById('edge-label').value = data.label;
    //   document.getElementById('edge-saveButton').onclick = this.saveEdgeData.bind(this, data, callback);
    //   document.getElementById('edge-cancelButton').onclick = this.cancelEdgeEdit.bind(this,callback);
    //   document.getElementById('edge-popUp').style.display = 'block';
    //   */
    //   this.edge = edge
    //   this.$bvModal.show("edge-popup")
    //   //console.log(edge, callback)
    //   callback()
    // },
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
  min-height: 95vh;
  border: 1px solid black;
  background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
  padding: 10px;
  height: 95vh;
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
