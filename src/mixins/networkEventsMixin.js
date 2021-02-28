// import Network from '@/models/Network.js'
// import Loader from '@/util/Loader.js'
import networkUtilMixin from '@/mixins/networkUtilMixin'

export default {
  mixins: [networkUtilMixin],
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
    inputObject: {
      get () { return this.$store.state.ipgs.inputObject},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  watch:{
    inputObject(){
      this.onInputObjectChange(this.inputObject)
    },
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
    onInputObjectChange(data){
      console.log("onCommand",data)
      let nodeSubject, nodeObject, edge
      switch (data.type) {
        case 'triplet':
        nodeSubject = this.nodeFromLabel(data.value.subject)
        this.saveNode(nodeSubject)
        nodeObject = this.nodeFromLabel(data.value.object)
        this.saveNode(nodeObject)
        console.log(nodeSubject.id, nodeObject.id)
        edge = this.edgeFromLabel({from: nodeSubject.id, to: nodeObject.id, label: data.value.predicate})
        console.log(edge)
        this.saveEdge(edge)
        break;
        case 'commande':
        this.catchCommand(data)
        break;
        default:
        console.log("TODO",data)
      }
    },
    saveNode(n){
      var index = this.network.nodes.findIndex(x => x.id==n.id);
      index === -1 ? this.network.nodes.push(n) : Object.assign(this.network.nodes[index], n)
    },
    saveEdge(e){
      console.log(e)
      var index = this.network.edges.findIndex(x => x.id==e.id);
      index === -1 ? this.network.edges.push(e) : Object.assign(this.network.edges[index], e)
    },
    onNodeSelect(p){
      console.log(p)
      console.log(p.nodes[0])
      //console.log(this.nodes)
      let node = this.network.nodes.find(x => x.id==p.nodes[0]);
      console.log(node)
      this.$store.commit('ipgs/addToHistory', node)
      //  if(node.type == 'folder' || node.type == 'file'){
      try{
        if(node.id.startsWith('http')){
          //  this.load(node.id)
        }else{
          this.$store.commit('ipgs/setCommandInput', node.label+' ')
        }
      }catch(e){
        alert(e)
      }

      //}

    },
    // onNodeSelect(e){
    // //  this.somethingSelected = true
    //   console.log(e)
    //   this.$store.commit('ipgs/setAction', {action: 'editNode', node: { id: e.nodes[0],modified: new Date()}})
    //
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
}
