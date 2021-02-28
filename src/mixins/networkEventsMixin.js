// import Network from '@/models/Network.js'
// import Loader from '@/util/Loader.js'

export default {
  data() {
    return {
      // loader: new Loader(),
      networkEvents: "",
      somethingSelected: false
    }
  },
  async created(){

    let app = this
    this.network.options.manipulation = {
      initiallyActive: true,
      addNode: async (node, callback) => { node.label = "" ; app.editNode(node, callback) },
      editNode: async (node, callback) => { app.editNode(node, callback) },
      addEdge: async (edge, callback) => { app.addEdge(edge, callback) },
      editEdge: { editWithoutDrag: async (edge, callback) => {app.editEdgeWithoutDrag(edge, callback)} }
    }

  },
  computed: {

  },
  methods: {
    editNode(node, callback){
      //    this.node = node
      node.color == undefined ? node.color =  {  background: '#D2E5FF', border: '#2B7CE9'} : ""
      node.shape == undefined ? node.shape = 'ellipse': ""
      //  this.$bvModal.show("node-popup")
      this.$store.commit('ipgs/setAction', {action: 'editNode', node: node})
      callback()
    },
    addEdge(edge, callback){
      //  this.edge = edge
      if (edge.from == edge.to) {
        var r = confirm("Do you want to connect the node to itself?");
        if (r != true) { callback(null); return; }
      }
      this.editEdgeWithoutDrag(edge, callback);
    },
    editEdge(edge, callback){ this.editEdgeWithoutDrag(edge, callback); },
    editEdgeWithoutDrag(edge, callback){
      //  this.edge = edge
      //  console.log(this.edge)
      this.$store.commit('ipgs/setAction', {action: 'editEdge', edge: edge})
      //  this.$bvModal.show("edge-popup")
      callback()
    },
    // saveNode(n){
    //   var index = this.nodes.findIndex(x => x.id==n.id);
    //   index === -1 ? this.nodes.push(n) : Object.assign(this.nodes[index], n)
    // },
    // saveEdge(e){
    //   console.log(e)
    //   var index = this.edges.findIndex(x => x.id==e.id);
    //   index === -1 ? this.edges.push(e) : Object.assign(this.edges[index], e)
    // },
    // onDragStart(e){
    //   console.log(e)
    // },
    // onDragEnd(e){
    //   console.log(e)
    // },
    // onNetworkClick(e){
    //   console.log(e)
    //   if (this.somethingSelected == false){
    //     switch (e) {
    //       case undefined:
    //       this.$store.commit('ipgs/setAction', {action: 'newNode', node: { shape: 'ellipse', created: new Date()}})
    //       break;
    //       default:
    //       console.log("TODO",e)
    //     }
    //   }
    //   this.somethingSelected = false
    // },
    // onNetworkSelect(e){
    //   this.somethingSelected = true
    //   console.log(e)
    // },
    // onNodeSelect(e){
    //   this.somethingSelected = true
    //   console.log(e)
    //   this.$store.commit('ipgs/setAction', {action: 'editNode', node: { id: e.nodes[0],modified: new Date()}})
    //
    // },
    // onEdgeSelect(e){
    //   this.somethingSelected = true
    //   console.log(e)
    // },

    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
      console.log(this.networkEvents)
    },

  },
  watch:{

  }


}
