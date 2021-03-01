
export default {

  methods: {
    catchCommand(data){
      this.$store.commit('ipgs/setNetwork', this.network)
      console.log(data)
      switch(data.value) {
        case "/h":
        case "/help":
        case "/aide":
        //console.log(this.$.dialogs)
        console.log("help")
        //  this.$bvModal.show("help-modal")
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
        this.$bvModal.show("import-popup")
        //  document.getElementById('import-popUp').style.display = 'block';
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
        case "/s":
        console.log("save_graphe");
        this.save()
        break;
        default:
        console.log("non traite"+ data);
        //  return afficheCommandes();
      }
    },

    save(){

      // console.log(this.path)
      // console.log(this.nodes, this.edges)
      //  this.network.visRepresentation.nodes = this.nodes
      //  this.network.visRepresentation.edges = this.edges
      console.log(this.network)
      // this.network.save()
      //this.$bvModal.show("storage-modal")
      var text = JSON.stringify(this.network, null, 2)
      this.$store.commit('ipgs/setEditorContent', {content: text, format: "json"})
      this.$router.push({ path: 'editor' })
      this.$store.commit('ipgs/setInputObject', { type: "commande", value: '/s' })
    },

    newGraph(){
      //this.$router.push({ path: 'network' })
      console.log("new graph");
      this.network.nodes = []
      this.network.edges = []
      //  console.log(this.history)
      let path = "todo"

      if (this.history.length > 0){
        var last = this.history.slice(-1)[0]
        console.log(last)
        let path = last.id
        console.log(path)
      }



      var filename = prompt("What is the name of the resource ?", "Spoggy");
      //  app.$.inputMessage.value = '';
      if (filename == null || filename == "") {
        //let txt = "User cancelled the prompt.";
        return;
      }else{
        path = path+filename+'.json'
        console.log(path)
        // this.network = new Network()
        // this.network.setId(path)
        // this.nodes = this.network.visRepresentation.nodes
        // this.edges = this.network.visRepresentation.edges
        // console.warn(this.nodes, this.edges)
      }
      //  console.log(this.history)
    },
    exportJson() {

      //  var nodes_edges = { nodes: this.nodes, edges: this.edges};
      //  console.log(nodes_edges);
      //  var nodes_edgesJSON = JSON.stringify(nodes_edges);
      this.updateEditorFromNetwork(JSON.stringify(this.network))

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
        // let nodes = this.nodes
        // let edges = this.edges
        console.log("exportation");

        console.log(this.network);
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

      for (var i = 0; i < this.network.edges.length; i++) {
        var edge = this.network.edges[i];

        var sujet = edge.from;
        var propriete = edge.label.replace(/\s/g, "_");
        var objet = edge.to;


        //string.ithis.$refs.ndexOf(substring) > -1
        //console.log(sujet);
        //console.log(propriete);
        console.log(objet);
        let nodeSubj = this.network.nodes.find(x => x.id==sujet);
        let nodeObj = this.network.nodes.find(x => x.id==objet);
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
        //  this.$bvModal.show('editor-modal')
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
        //  let data = {nodes: this.nodes, edges: this.edges}
        var text = JSON.stringify(this.network, null, 2)
        //  this.$refs.editor.session.setValue(text)
        // this.format  = "json";
        // this.content = text

        this.$store.commit('ipgs/setEditorContent', {content: text, format: "json"})
        this.$router.push({ path: 'editor' })
        //  document.getElementById('editeur-popUp').style.display = 'block';
      },
      updateEditorFromNetworkTtl(text){
        //  this.$bvModal.show('editor-modal')
        //  console.log(event, properties, senderId)
        //var text = JSON.stringify(network.body.data, null, 2)
        //  this.$refs.editor.session.setValue(text)
        // this.format = "ttl"
        // this.content = text
        this.$store.commit('ipgs/setEditorContent', {content: text, format: "ttl"})
        this.$router.push({ path: 'editor' })
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
        var contenu = this.content
        var format = this.format;
        console.log(contenu, format)
        var contentType = "";
        var fileNameToSaveAs = ""

        var filename = prompt("Choose a name for the exported file :", "Spoggy");
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

},
computed: {
  // inputObject: {
  //   get () { return this.$store.state.ipgs.inputObject},
  //   set (/*value*/) { /*this.updateTodo(value)*/ }
  // },
  // storage: {
  //   get () { return this.$store.state.solid.storage},
  //   set (/*value*/) { /*this.updateTodo(value)*/ }
  // },
  // command: {
  //   get () { return this.$store.state.ipgs.command},
  //   set (/*value*/) { /*this.updateTodo(value)*/ }
  // },
  history: {
    get () { return this.$store.state.ipgs.history},
    set (/*value*/) { /*this.updateTodo(value)*/ }
  }
},


}
