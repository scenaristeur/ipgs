export default {

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
  }

}
