import GraphMixin from '@/mixins/GraphMixin'
import networkUtilMixin from '@/mixins/networkUtilMixin'
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

// 1 to 99 reserved for technical configs, other cid can start at 100
// cid are used to cluster/group nodes in a network
let cid_config = {
  // Standard
  1: { id: "help", label: "Help / Aide"},
  2: { id: "examples", label: "Examples", shape: 'star', color: '#7FD1B9'},
  //Vis
  5: { id: "networks", label: "Networks"},
  6: { id: "history", label: "Navigation History"},
  //Solid
  20: { id: "storage", label: "Storage"},
  21: { id: "profile", label: "User Profile"},
  22: { id: "friends", label: "Solid Friends"},
  //Data
  30: { id: "sources", label: "Data Sources"},
  // Types
  40: { id: "type", label: "Types"},
  41: { id: "literal", label: "Literals"},
  42: { id: "resource", label: "Resources"},
  43: { id: "actors", label: "Persons or Actors / Agents"},
  // Forms
  50: { id: "input", label: "Inputs"},
  51: { id: "checkbox", label: "Checkboxes"},
}

let defNodes = [
  { id: 'n1', label: "Ipgs", color: {background: 'red'}, shape: 'circle' },
  { id: 'n2', label: "WebApp", color: {background: 'green'}, shape: 'star', cid: 40 },
  { id: 'n3', label: "InterPlanetary Graph System", shape: 'box'},
  { id: 'n4', label: "Mindmap App", cid: 40 },
  { id: 'n5', label: "To know how to use Ipgs,\n type /h in the top input box and hit Enter", shape: 'box', color: "#ECC046", cid: 1},
  { id: 'n6', label: "Pour savoir comment utiliser Ipgs,\n tapez /h dans le champ de saisie tout en haut", shape: 'box', color: "#ECC046", cid: 1 },
  { id: "https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld", label: "-> Archipel Semapps", shape: 'box', color: '#7FD1B9', cid: 2},
  { id: "https://spoggy-test9.solidcommunity.net/public/", label: "-> Spoggy-test9 Public Folder", shape: 'box', color: '#7FD1B9', cid: 2},

]

let defEdges = [
  { id: 'e1', from: 'n1', to: 'n2', label: 'type' },
  { id: 'e2', from: 'n1', to: 'n3', label: 'name' },
  { id: 'e3', from: 'n1', to: 'n4', label: 'type' },
  { id: 'e4', from: 'n1', to: 'n5', label: 'help' },
  { id: 'e5', from: 'n1', to: 'n6', label: 'help' },
  { id: 'e6', from: 'n1', to: "https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld", label: "example"},
  { id: 'e7', from: 'n1', to: "https://spoggy-test9.solidcommunity.net/public/", label: "example"}
]



export default {
  mixins: [networkUtilMixin, GraphMixin],
  async created(){
    let app = this
    this.network.options.manipulation = {
      initiallyActive: true,
      addNode: async (node, callback) => { node.label = "" ; app.editNode(node, callback) },
      editNode: async (node, callback) => { app.editNode(node, callback) },
      addEdge: async (edge, callback) => { app.addEdge(edge, callback) },
      editEdge: { editWithoutDrag: async (edge, callback) => {app.editWithoutDrag(edge, callback)} }
    }

     let graph = await this.createGraph({name:"Help",  type: "default",status: "ready"})
     graph.nodes = defNodes
     graph.edges = defEdges
    // this.updateGraph(graph)

  },

  mounted() {
    var cids = [...new Set(this.network.nodes.map(item => item.cid))].filter(Boolean);
    console.log("cids",cids)
    //  var clusterOptionsByData = function(cid) ;
    // this.$refs.network is necessary to use network function
    cids.forEach((cid) => {
      this.$refs.network.cluster({
        joinCondition: function (childOptions) {
          return childOptions.cid == cid;
        },
        clusterNodeProperties: {
          id: cid_config[cid] && cid_config[cid].id ? cid_config[cid].id : cid,
          borderWidth: 3,
          shape: cid_config[cid] && cid_config[cid].shape ? cid_config[cid].shape : "box",
          color: cid_config[cid] && cid_config[cid].color ? cid_config[cid].color : "#ECC046",
          label: cid_config[cid] &&cid_config[cid].label ? cid_config[cid].label : "no name group"
        },
      });
    });


  },


  methods: {
    /**
    * Catch @nodes-remove event of vue-vis-network and update network.nodes
    * @param {object} e - parameters of the nodes-remove event.
    */
    onRemoveNodes(e){
      this.network.nodes = this.network.nodes.filter(x => !e.properties.items.includes(x.id))
      this.sendUpdate(e)
    },
    /**
    * Catch @edges-remove event of vue-vis-network and update network.edges
    * @param {object} e - parameters of the edges-remove event.
    */
    onRemoveEdges(p){
      this.network.edges = this.network.edges.filter(x => !p.properties.items.includes(x.id))
      this.sendUpdate(p)
    },
    async sendUpdate(p){
      console.log(p)
      console.log(this.url)
      console.log(this.network)
      console.log("le json", this.json)


      if(this.json != undefined && this.json["@context"] != "https://data.virtual-assembly.org/context.json"){
        console.log("TODO must send only if different ")
        let identiques = this.arraysEqual(this.json.nodes, this.network.nodes) && this.arraysEqual(this.json.edges, this.network.edges)
        console.log("identiques",identiques)
        if (identiques == false && this.url != undefined){
          this.json.nodes = this.network.nodes
          this.json.edges = this.network.edges
          this.json.modified = new Date()
          console.log(this.json)

          await fc.createFile( this.json.url, JSON.stringify(this.json), "application/ld+json" ).then(
            f => {
              console.log(f)
            });
          }
        }

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
        this.editWithoutDrag(edge, callback);
      },
      //  editEdge(edge, callback){ this.editWithoutDrag(edge, callback); },
      editWithoutDrag(edge, callback){
        //  this.edge = edge
        console.log(edge)
        let bugEdge = edge
        bugEdge.from = edge.from.id != undefined ? edge.from.id : edge.from
        bugEdge.to  = edge.to.id != undefined ? edge.to.id : edge.to
        this.$store.commit('ipgs/setAction', {action: 'editEdge', edge: bugEdge})
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
        this.sendUpdate(n)
      },
      saveEdge(e){
        console.log(e)
        var index = this.network.edges.findIndex(x => x.id==e.id);
        index === -1 ? this.network.edges.push(e) : Object.assign(this.network.edges[index], e)
        console.log(this.network)
        this.sendUpdate(e)
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
      newGraph: {
        get () { return this.$store.state.ipgs.newGraph},
        set (/*value*/) { /*this.updateTodo(value)*/ }
      }
      // socketMessageUrl: {
      //   get () { return this.$store.state.ipgs.socketMessageUrl},
      //   set (/*value*/) { /*this.updateTodo(value)*/ }
      // }
    },
    watch:{
      newGraph(){
        console.log('New Graph',this.newGraph)

        this.network.nodes = []
        this.network.edges = []
        let n = this.newGraph.node
        n.id = this.newGraph.url
        this.network.nodes.push (n)
        //  alert ("todo: you must create a new file")
        let inputObject = {}
        inputObject.type = "commande";
        inputObject.value = '/e';
        inputObject.inputNew = "";
        this.$store.commit('ipgs/setInputObject', inputObject)

      },
      // socketMessageUrl(){
      //   this.load(this.socketMessageUrl)
      // //  console.log("MUST UPDATEEEEEEEEEEEEEEEEEEEEEEE",this.socketMessageUrl)
      // //  this.$store.commit('ipgs/setWebsocketMesssage', "")
      // },
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
