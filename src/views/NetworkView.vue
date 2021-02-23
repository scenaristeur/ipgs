<template>
  <div>

    <network ref="network"
    id="network"
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

<b-modal id="editor-modal" size="lg">
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
    <div>toolbar or something</div>
  </editor>
</b-modal>



<web-social-share show="false">
  <ion-icon name="logo-twitter" ariaLabel="Twitter" slot="twitter"
            style="color: #00aced;">
  </ion-icon>
  <ion-icon name="mail" slot="email" ariaLabel="Email"
            style="color: #ff8ea3;">
  </ion-icon>
  <ion-icon name="logo-whatsapp" ariaLabel="WhatsApp"
            slot="whatsapp"
            style="color: #25D366;">
   </ion-icon>
</web-social-share>


</div>
</template>

<script>
// https://github.com/r3code/vue-vis-network
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import Network from '@/models/Network.js'
import Loader from '@/util/Loader.js'

// https://github.com/zjfcool/vue2x-ace-editor
import ace from 'brace'
import 'brace/ext/language_tools';
import 'brace/mode/python.js'
import 'brace/snippets/python.js';
import 'brace/theme/eclipse.js';
// ace/mode/turtle
console.log(ace)

// import auth from 'solid-auth-client';
// import FC from 'solid-file-client'
// const fc = new FC( auth )
//import { v4 as uuidv4 } from 'uuid';
//import { mapState } from 'vuex';

export default {
  name:"NetworkView",
  components: {
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),
    'Editor': () => import('vue2x-ace-editor'),
    'web-social-share': () => import('web-social-share'),
  },
  data() {
    return {
      nodes: [],
      edges: [],
      nodeData: {},
      edgeData: {},
      loader: new Loader(),
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
      inputVisible: false,
      content: ""
    }
  },
  async created(){
    this.options.locale = navigator.language
  //  console.log(this.$route)
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
  methods: {
    newGraph(){
      console.log("new graph");
      // this.nodes = []
      // this.edges = []
      //  console.log(this.history)
      var last = this.history.slice(-1)[0]
      console.log(last)
      let path = last.id
      console.log(path)


      var filename = prompt("What is the name of the resource ?", "Spoggy");
      //  app.$.inputMessage.value = '';
      if (filename == null || filename == "") {
        //let txt = "User cancelled the prompt.";
        return;
      }else{
        path = path+filename+'.json'
        this.network = new Network()
        this.network.setId(path)
        this.nodes = this.network.visRepresentation.nodes
        this.edges = this.network.visRepresentation.edges
        console.warn(this.nodes, this.edges)
      }
      //  console.log(this.history)
    },
    editorChange(){
      console.log(this.content)
    },
    editorInit(){
      console.log(this.content)
    },
    async load(url){
      let d = new Date()
      this.network = new Network()
      let dat = await this.loader.load(url)
      //  console.log("DAT",dat)
      await this.network.hydrate(dat)
      this.nodes = this.network.visRepresentation.nodes
      this.edges = this.network.visRepresentation.edges
      console.warn(d, this.nodes, this.edges)
      //console.warn(this.network)
    },

    onSelectNode(p){
      console.log(p)
      console.log(p.nodes[0])
      //console.log(this.nodes)
      let node = this.nodes.find(x => x.id==p.nodes[0]);
      console.log(node)
      this.$store.commit('ipgs/addToHistory', node)
      //  if(node.type == 'folder' || node.type == 'file'){
      try{
        if(node.id.startsWith('http')){
          this.load(node.id)
        }else{
          this.$store.commit('ipgs/setCommandInput', node.label+' ')
        }
      }catch(e){
        alert(e)
      }

      //}

    },
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
        switch(data.value) {
          case "/h":
          case "/help":
          case "/aide":
          //console.log(this.$.dialogs)
          console.log("help")
          //  this.$.dialogs.$.helpPopUp.toggle();
          //  this.agentInput.send('agentDialogs', {type:'toggle', popup: 'helpPopUp'})
          break;
          case "/e":
          case "/export":
          case "/exportJson":
          console.log("exportjson")
          //this.exportJson(this.network)
          this.exportJson();
          //  this.agentInput.send('agentGraph', {type: 'exportJson'})
          //this.agentInput.send("agentVis", {type: 'exportJson'});
          break;
          case "/t":
          console.log("exportTtl")
          this.exportTtl()
          //  this.exportTtl(this.network,this);
          //  this.agentInput.send('agentGraph', {type:'exportTtl'}); // , what: 'network', to: 'agentDialogs', where: 'inputTextToSave'
          //    this.agentInput.send('agentDialogs', {type:'toggle', popup: 'popupTtl'})
          //  this.agentInput.send("agentVis", {type: 'exportTtl'});
          break;
          case "/i":
          case "/import":
          case "/importJson":
          console.log("import");
          document.getElementById('import-popUp').style.display = 'block';
          break;
          case "/p":
          console.log("save_to_pod");
          document.getElementById('select-pod-popUp').style.display = 'block';
          break;
          case "/a":
          console.log("open editor");
          document.getElementById('editeur-popUp').style.display = 'block';
          /*  const editorDialog = new mdc.dialog.MDCDialog(document.getElementById('editor_dialog'));
          editorDialog.open();*/
          //  document.getElementById('select-pod-popUp').style.display = 'block';
          break;
          case "/r":
          console.log("reglages editor");
          //  const reglagesDialog = new mdc.dialog.MDCDialog(document.getElementById('reglages_dialog'));
          //  reglagesDialog.open();
          //  document.getElementById('select-pod-popUp').style.display = 'block';
          break;
          case "/n":

          this.newGraph();
          //  this.$store.commit('ipgs/setCommand', "newGraph")

          //level < 6? increaseLevel() : "";
          break;
          case "/l":
          console.log("connection a la base levelgraph");
          break;
          case "/c":
          console.log("capture_graphe");
          this.downloadCanvas()
          break;
          default:
          console.log("non traite"+ data);
          //  return afficheCommandes();
        }

        break;
        default:
        console.log("TODO",data)
      }
    },
    onClick(){
      //this.inputVisible = true
    },
    exportJson() {

      var nodes_edges = { nodes: this.nodes, edges: this.edges};
      //  console.log(nodes_edges);
      var nodes_edgesJSON = JSON.stringify(nodes_edges);
      this.updateEditorFromNetwork(nodes_edgesJSON)

    },

    exportTtl() {
      /* source https://github.com/scenaristeur/dreamcatcherAutonome/blob/master/autonome/public/agents/ExportAgent.js */
      //  let network = this.network;
      //  var nodes = network.body.data.nodes.get();
      //var edges = network.body.data.edges.get();
      // on ne prend pas le cluster cid=1 correspondant à la navigation pour l'export
      // var nodes = network.body.data.nodes.get({
      //   filter: function (n) {
      //     return (n.cid != 1);
      //   }
      // });
      // var edges = network.body.data.edges.get({
      //   filter: function (e) {
      //     return (e.cid != 1);
      //   }
      // });
      let nodes = this.nodes
      let edges = this.edges
      console.log("exportation");
      console.log(nodes);
      console.log(edges);
      //creation des statements (triplets)
      /*var statements = [];
      for (var j = 0; j < edges.length; j++){
      var edge = edges[j];
      console.log(edge);
      statements.push({sujet: node.id, propriete: "rdfs:label", objet: node.label});
    }
    console.log(statements);*/

    var output = "@prefix : <http://smag0.blogspot.fr/spoggy#> . \n";
    output += "@prefix owl: <http://www.w3.org/2002/07/owl#> . \n";
    output += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> . \n";
    output += "@prefix xml: <http://www.w3.org/XML/1998/namespace> . \n";
    output += "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> . \n";
    output += "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . \n";
    output += "@prefix smag: <http://smag0.blogspot.fr/spoggy#> . \n";
    output += "@base <http://smag0.blogspot.fr/spoggy> . \n";
    //output += "<http://smag0.blogspot.fr/spoggy> rdf:type owl:Ontology ;  \n";
    //output += "                    owl:versionIRI <http://smag0.blogspot.fr/spoggy/1.0.0> . \n";
    output += " \n";
    //output += "owl:Class rdfs:subClassOf owl:Thing .  \n";

    var listeInfos = new Array();
    var listeComplementaire = new Array();

    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i];

      var sujet = edge.from;
      var propriete = edge.label.replace(/\s/g, "_");
      var objet = edge.to;


      //string.ithis.$refs.ndexOf(substring) > -1
      //console.log(sujet);
      //console.log(propriete);
      console.log(objet);
      let nodeSubj = this.nodes.find(x => x.id==sujet);
      let nodeObj = this.nodes.find(x => x.id==objet);
      // AJOUTER EVENTUELLEMENT LA RECUPERATION DE SHAPE, COLOR, pour l'export RDF
      var sujetLabel = nodeSubj.label.replace(/\n/g, "");
      try{
        var objetLabel = nodeObj.label.replace(/\n/g, "");
      }catch(error)
      {
        console.error("ERREUR NONTRAITEE")
        console.error(error)

      }

      //console.log("#########################");
      //console.log(sujetLabel);
      //console.log(objetLabel)
      //console.log("#########################");

      var sujetWithPrefix = this.validRdf(sujet);
      var proprieteWithPrefix = this.validRdf(propriete);
      var objetWithPrefix = this.validRdf(objet);

      if (sujetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
        sujetWithPrefix = '_:' + sujetWithPrefix; // blanknode
      }

      if (proprieteWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
        proprieteWithPrefix = ':' + proprieteWithPrefix; // propriete utilisant "@base <http://smag0.blogspot.fr/spoggy>"

      }

      if (objetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
        objetWithPrefix = '_:' + objetWithPrefix;  // blanknode
      }


      var typedeProp = ["owl:AnnotationProperty", "owl:ObjectProperty", "owl:DatatypeProperty"];
      var indiceTypeDeProp = 1; // -1 pour ne pas ajouter la prop, sinon par defaut en annotationProperty, 1 pour Object, 2 pour Datatype --> revoir pour les datatypes

      if (
        (proprieteWithPrefix == "type") ||
        (proprieteWithPrefix == ":type") ||
        (proprieteWithPrefix == "rdf:type") ||
        (proprieteWithPrefix == ":a") ||
        (proprieteWithPrefix == ":est_un") ||
        (proprieteWithPrefix == ":est_une") ||
        (proprieteWithPrefix == ":is_a")
      ) {
        proprieteWithPrefix = "rdf:type";
        listeComplementaire.push(objetWithPrefix + " rdf:type owl:Class . \n");
        indiceTypeDeProp = 1;
      } else if ((proprieteWithPrefix == "subClassOf") || (proprieteWithPrefix == ":subClassOf") || (proprieteWithPrefix == "rdfs:subClassOf")) {
        proprieteWithPrefix = "rdfs:subClassOf";
      }
      else if ((proprieteWithPrefix == "sameAs") || (proprieteWithPrefix == ":sameAs")) {
        proprieteWithPrefix = "owl:sameAs";
        indiceTypeDeProp = -1;
      }
      else if (
        (proprieteWithPrefix.toLowerCase() == "ispartof") ||
        (proprieteWithPrefix.toLowerCase() == "partof") ||
        (proprieteWithPrefix.toLowerCase() == ":partof") ||
        (proprieteWithPrefix.toLowerCase() == ":ispartof")) {
          proprieteWithPrefix = "smag:partOf";
          indiceTypeDeProp = 1;
        } else if (
          (proprieteWithPrefix.toLowerCase() == "comment") ||
          (proprieteWithPrefix.toLowerCase() == "commentaire") ||
          (proprieteWithPrefix.toLowerCase() == "//") ||
          (proprieteWithPrefix.toLowerCase() == "#")
        ) {
          proprieteWithPrefix = "rdfs:comment";
          indiceTypeDeProp = -1;
        }
        if (indiceTypeDeProp >= 0) {
          listeComplementaire.push(proprieteWithPrefix + " rdf:type " + typedeProp[indiceTypeDeProp] + " . \n");
        }
        var data = sujetWithPrefix + " " + proprieteWithPrefix + " " + objetWithPrefix + " . \n";
        data += sujetWithPrefix + " " + "rdfs:label \"" + sujetLabel + "\" . \n";
        data += objetWithPrefix + " " + "rdfs:label \"" + objetLabel + "\" . \n";
        listeInfos[i] = data;
        console.log(data);
        //  console.log("||||||||||||||||||||||--");
      }
      //console.log(listeInfos);
      //console.log(listeComplementaire);
      //suppression des doublons
      listeInfos = this.uniq_fast(listeInfos.sort());
      listeComplementaire = this.uniq_fast(listeComplementaire.sort());
      // console.log (listeInfos);
      for (var k = 0; k < listeInfos.length; k++) {
        output = output + listeInfos[k];
        //  console.log(output);
      }

      for (var l = 0; l < listeComplementaire.length; l++) {
        output = output + listeComplementaire[l];
        //  console.log(output);
      }

      //this.$.dialogs.$.inputTextToSave.value = output; //     document.getElementById("inputTextToSave").value =output;
      /*this.$.dialogs.$.popupTtl.fitInto = this.$.dialogs.$.menu;*/
      //this.$.dialogs.$.popupTtl.toggle();
      //console.log(output)
      this.updateEditorFromNetworkTtl(output)
      //this.agentGraph.send('agentDialogs', {type:'exportTtl', ttlData : output});
    },

    updateEditorFromNetwork(){
      this.$bvModal.show('editor-modal')
      // var data = {
      //   nodes: network.body.data.nodes.get({
      //     filter: function (n) {
      //       return (n.cid != 1);
      //     }
      //   }),
      //   edges: network.body.data.edges.get({
      //     filter: function (e) {
      //       return (e.cid != 1);
      //     }
      //   }) };
      let data = {nodes: this.nodes, edges: this.edges}
      var text = JSON.stringify(data, null, 2)
      //  this.$refs.editor.session.setValue(text)
      //  this.$refs.editor.format  = "json";
      this.content = text
      //  document.getElementById('editeur-popUp').style.display = 'block';
    },
    updateEditorFromNetworkTtl(text){
      this.$bvModal.show('editor-modal')
      //  console.log(event, properties, senderId)
      //var text = JSON.stringify(network.body.data, null, 2)
      //  this.$refs.editor.session.setValue(text)
      //  this.$refs.editor.format = "ttl"
      this.content = text
      //  document.getElementById('editeur-popUp').style.display = 'block';
    },
    uniq_fast(a) {
      var seen = {};
      var out = [];
      var len = a.length;
      var j = 0;
      for(var i = 0; i < len; i++) {
        var item = a[i];
        if(seen[item] !== 1) {
          seen[item] = 1;
          out[j++] = item;
        }
      }
      return out;
    },

    validRdf(string){
      // A REVOIR
      console.log(string)
      //  console.log(network.body.data.nodes.get(string));
      console.log("nettoyage "+ string);
      // transformer le noeud en noeud rdf (resource ou literal)
      // ajouter la construction du noeud, son uri, prefix, localname, type...
      var valid = {};
      valid.type = "uri";
      if (string.indexOf(" ") !== -1){
        valid.type = "literal";
      }else{
        /*
        replaceAll(string, " ","_");
        replaceAll(string, "","_");
        replaceAll(string, ",","_");
        replaceAll(string, ";","_");
        replaceAll(string, " ","_");*/
      }

      return string;
    },

    downloadFile(){
      var contenu = this.$refs.editor.session.getValue()
      var format = this.$refs.editor.format;
      console.log(contenu, format)
      var contentType = "";
      var fileNameToSaveAs = ""

      var filename = prompt("Sous quel nom sauvegarder ce graphe ?", "Spoggy");
      //  app.$.inputMessage.value = '';
      if (filename == null || filename == "") {
        //let txt = "User cancelled the prompt.";
        return;
      }

      switch (format) {
        case 'json':
        contentType = 'application/json';
        fileNameToSaveAs = filename + ".json"; //Date.now() +
        break;
        case 'ttl':
        contentType = 'text/turtle';
        fileNameToSaveAs = filename + ".ttl"; //Date.now() +
        break;
        default:
        alert('Format de fichier non reconnu', format);
      }


      var textFileAsBlob = new Blob([contenu], {
        type: contentType
      }
    );
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if(navigator.userAgent.indexOf("Chrome") != -1)
    {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      //  console.log("CHROME");
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else
    {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      //  console.log("FF");
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.target="_blank";
      //downloadLink.onclick = destroyClickedElement;
      //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      //  console.log(app.$.popupTtl);
    }
    console.log(downloadLink);
    /*downloadLink.click();*/
    /* creation d'un event car download.click() ne fonctionne pas sous Firefox */
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click", true, false, window, 0, 0, 0, 0, 0
      , false, false, false, false, 0, null
    );
    downloadLink.dispatchEvent(event);
    //  var app = this;
    setTimeout(function(){
      //  console.log(downloadLink.parentNode);
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadLink);
    }, 1000);
    /*if (window.URL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  } else {
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
}
downloadLink.click();*/
},
// async read(url){
//   console.log('url',url)
//
//   this.network = new Network()
//   if( await fc.itemExists( url )) {
//     let  load = true
//     let data = {}
//     let file = await fc.readFile(url)
//     try{
//       data = JSON.parse(file)
//       console.log("JSONLD",data)
//       if(data['@'] != undefined){
//         load = window.confirm('Be careful this file does not seem to be a compatible JSONLD GRAPH file. Are you sure you want to replace it ???'+data);
//         // ne pas remplacer
//         load = false
//       }
//     }catch(e){
//       load = window.confirm('Be careful this file does not seem to be a compatible JSONLD GRAPH file. Are you sure you want to replace it ???'+file);
//       // ne pas remplacer
//       load = false
//     }
//     console.log(load)
//     if(load == true){
//       console.log("data",data)
//       this.network.init( data )
//       console.log("network", this.network)
//       this.nodes = this.network.visRepresentation.nodes
//       this.edges = this.network.visRepresentation.edges
//     }
//   }else{
//     this.network.setId( url)
//   }
// },
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
  console.log(nodeData)
  this.network.addNodeToVis(nodeData)
  console.log(this.network)
  // var index = this.nodes.findIndex(x => x.id==nodeData.id);
  // index === -1 ? this.nodes.push(nodeData) : Object.assign(this.nodes[index], nodeData)
  // this.network.visRepresentation.nodes = this.nodes
  // this.network.save()
},
saveEdge(e){
  console.log(e)
  var index = this.edges.map(x => { return x.id; }).indexOf(e.id);
  if(index > -1){ this.edges[index].label = e.label }else{ this.edges.push(e) }
  this.network.visRepresentation.edges = this.edges
  console.log(this.network)
  this.network.save()
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
async clickItem(item){
  console.log('item',item)
  switch (item.idx) {
    case 0:
    this.$router.push({ path: 'browser' })
    break;
    case 1:
    this.$router.push({ path: 'about' })
    break;
    case 2:
    // if (navigator.share) {
    //   navigator.share({
    //     title: 'IPGS',
    //     text: 'Check out this IPGS graph.',
    //     url: 'https://scenaristeur.github.io/ipgs/?url='+this.url,
    //   })
    //   .then(() => console.log('Successful share'))
    //   .catch((error) => console.log('Error sharing', error));
    // }else{
    //   console.log("no share")
    // }
    if (navigator && navigator.share) {
    await this.shareNative();
  } else {
    await this.shareFallback();
  }
    break;
    default:

  }
},
  async shareNative() {
  //return new Promise(function(resolve)  {
  //  const shareUrl =   `${window.location.protocol}//${window.location.host}`;
            navigator.share({
              title: 'IPGS',
              text: 'Check out this IPGS graph.',
              url: 'https://scenaristeur.github.io/ipgs/?url='+this.url,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    // await navigator.share({
    //   text: 'How to implement the Web Share API and a fallback',
    //   url: shareUrl,
    // });

    //resolve();
  //});

},
shareFallback() {
  return new Promise( (resolve) => {
    const webSocialShare =
          document.querySelector('web-social-share');

    if (!webSocialShare || !window) {
      return;
    }

    const shareUrl = 'https://scenaristeur.github.io/ipgs/?url='+this.url
        //  `${window.location.protocol}//${window.location.host}`;

    const share = {
      displayNames: true,
      config: [{
        twitter: {
          socialShareUrl: shareUrl,
          socialSharePopupWidth: 300,
          socialSharePopupHeight: 400
        }
      },{
        email: {
          socialShareBody: shareUrl
        }
      }, {
        whatsapp: {
          socialShareUrl: shareUrl
        }
      }]
    };
    // The configuration, set the share options
    webSocialShare.share = share;
    // Show/open the share actions
    webSocialShare.show = true;

    resolve();
  });
}
},
watch:{
  inputObject(){
    this.onInputObjectChange(this.inputObject)
  },
  storage(){
    console.log("WATCH",this.storage, this.url)
    if(this.storage != null && this.url == undefined){
      this.load(this.storage)
    }
  },
  command(){
    switch (this.command) {
      case 'newGraph':
      this.newGraph()
      break;
      case 'downloadCanvas':
      console.log("downloadCanvas")
      this.downloadCanvas()
      break;
      default:

    }
  }
  // url(){
  //   console.log("URL CHANGED")
  //   this.read(this.url)
  // }
},
computed: {
  inputObject: {
    get () { return this.$store.state.ipgs.inputObject},
    set (/*value*/) { /*this.updateTodo(value)*/ }
  },
  storage: {
    get () { return this.$store.state.solid.storage},
    set (/*value*/) { /*this.updateTodo(value)*/ }
  },
  command: {
    get () { return this.$store.state.ipgs.command},
    set (/*value*/) { /*this.updateTodo(value)*/ }
  },
  history: {
    get () { return this.$store.state.ipgs.history},
    set (/*value*/) { /*this.updateTodo(value)*/ }
  }
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
