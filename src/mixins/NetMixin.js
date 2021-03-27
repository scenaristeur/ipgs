import networkUtilMixin from '@/mixins/networkUtilMixin'
//import Network from '@/models/Network.js'
//import Loader from '@/util/Loader.js'

import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

export default {
  mixins: [networkUtilMixin],
  data() {
    return {



      // A VIRER
    //  loader: new Loader(),
    }
  },
  async created(){
    let app = this
    this.network.options.manipulation = {
      initiallyActive: true,
      addNode: async (node, callback) => { node.label = "" ; app.editNode(node, callback) },
      editNode: async (node, callback) => { app.editNode(node, callback) },
      addEdge: async (edge, callback) => { app.addEdge(edge, callback) },
      editEdge: { editWithoutDrag: async (edge, callback) => {app.editWithoutDrag(edge, callback)} }

      //  editEdge: async (edge, callback) => { app.editWithoutDrag(edge, callback) },
      //  editEdge: {}
    }

    //  this.network.options.manipulation.editEdge.editWithoutDrag = async (edge, callback) => {app.editWithoutDrag(edge, callback)}



    // if (this.$route.query.url != undefined ){
    //   this.url = this.$route.query.url
    //   console.log('url',this.url)
    //
    // }
    // this.storage = this.$store.state.solid.storage
    //
    // if(this.storage != null){
    //   console.log("storage",this.storage)
    // }

    // if (this.$route.query.url != undefined ){
    //   this.url = this.$route.query.url
    //   console.log("OLD LOAD load url",this.url)
    // //  await this.load(this.url)
    // }else{
    //   this.storage = this.$store.state.solid.storage
    //   //console.log(this.storage)
    //   if (this.storage != null){
    //     console.log("load storage",this.storage)
    //     await this.load(this.storage)
    //   }
    // }




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

      // async load1(url){
      //   console.log("load",url)
      //   let d = new Date()
      //   this.net = new Network()
      //   let dat = await this.loader.load(url)
      //   //  console.log("DAT",dat)
      //   await this.net.hydrate(dat)
      //   this.network.nodes = this.net.visRepresentation.nodes
      //   this.network.edges = this.net.visRepresentation.edges
      //   console.warn(d, this.network)
      //
      //   //console.warn(this.network)
      // },
      // onSelectNode(p){
      //   console.log(p)
      //   console.log(p.nodes[0])
      //   //console.log(this.nodes)
      //   let node = this.network.nodes.find(x => x.id==p.nodes[0]);
      //   console.log(node)
      //   this.$store.commit('ipgs/addToHistory', node)
      //   //  if(node.type == 'folder' || node.type == 'file'){
      //   try{
      //     if(node.id.startsWith('http')){
      //       this.load(node.id)
      //     }else{
      //       this.$store.commit('ipgs/setCommandInput', node.label+' ')
      //     }
      //   }catch(e){
      //     alert(e)
      //   }
      //   // console.log(this.nodeData)
      //   //
      //   // this.$bvModal.show("node-menu")
      //
      //   //}
      //
      // },
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
