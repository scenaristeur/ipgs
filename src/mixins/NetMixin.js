import networkUtilMixin from '@/mixins/networkUtilMixin'
export default {
  mixins: [networkUtilMixin],
  async created(){
    let app = this
    this.network.options.manipulation = {
      initiallyActive: true,
      addNode: async (node, callback) => { node.label = "" ; app.editNode(node, callback) },
      editNode: async (node, callback) => { app.editNode(node, callback) },
      addEdge: async (edge, callback) => { app.addEdge(edge, callback) },
      editEdge: { editWithoutDrag: async (edge, callback) => {app.editEdgeWithoutDrag(edge, callback)} }
    }


    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log('url',this.url)

    }
    this.storage = this.$store.state.solid.storage

    if(this.storage != null){
      console.log("storage",this.storage)
    }




  },
  methods: {
    onSelectNode(p){
      console.log(p)
      console.log(p.nodes[0])
      //console.log(this.nodes)
      this.nodeData = this.network.nodes.find(x => x.id==p.nodes[0]);
      console.log(this.nodeData)

      this.$bvModal.show("node-menu")

      //}

    },
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
    downloadCanvas(){
      // get canvas data
      var srcCanvas = document.getElementById( 'network' ).childNodes[0].canvas;
      console.log(srcCanvas)
      let destinationCanvas = document.createElement("canvas");
      destinationCanvas.width = srcCanvas.width;
      destinationCanvas.height = srcCanvas.height;

      let destCtx = destinationCanvas.getContext('2d');

      //create a rectangle with the desired color
      destCtx.fillStyle = "#FFFFFF";
      destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);

      //draw the original canvas onto the destination canvas
      destCtx.drawImage(srcCanvas, 0, 0);

      //finally use the destinationCanvas.toDataURL() method to get the desired output;

      var image =   destinationCanvas.toDataURL(); //canvas.toDataURL("image/png");

      // create temporary link
      var tmpLink = document.createElement( 'a' );
      tmpLink.download = 'image.png'; // set the name of the download file
      tmpLink.href = image;

      // temporarily add link to body and initiate the download
      document.body.appendChild( tmpLink );
      tmpLink.click();
      document.body.removeChild( tmpLink );
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
        case 'url':
        console.log(data)
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
  },
  computed: {
    action: {
      get () { return this.$store.state.ipgs.action},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    inputObject: {
      get () { return this.$store.state.ipgs.inputObject},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  watch:{
    action(){
      console.log(this.action)
      switch (this.action.action) {
        case 'newGraph':
        this.network.nodes = []
        this.network.edges = []
        break;
        case 'capture':
        this.downloadCanvas()
        break;

        default:

      }

    },
    inputObject(){
      this.onInputObjectChange(this.inputObject)
    },
  }

}
