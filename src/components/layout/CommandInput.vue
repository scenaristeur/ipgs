<template>
  <div>
    <b-form-input
    id="input"
    v-model="main_input"
    v-on:keyup.enter="onEnter"
    title="type three words followed by a comma"
    placeholder="Subject link Object,"></b-form-input>

    <b-tooltip target="input" size="lg" fallback-placement='flip' variant="info">
      Type here three groups of words followed by a comma, like: <br>
      <div variant="danger">Bob knows Alice,</div>
        <p text-variant="light">"my car" is "light blue",</p>
      <!-- or a command starting with / like
      <p>
      <ul variant="light">
        <li>/new</li>
        <li>/export</li>
        <li>/browser or /b</li>
      </ul>
    </p> -->
    </b-tooltip>
  </div>

</template>

<script>
//https://github.com/scenaristeur/spoggy-simple/blob/cc3738baecea9ee6b3f87f81a70f69e0090cf658/js/spoggy.js#L38
export default {
  name: 'CommandInput',
  data() {
    return {
      main_input: "",
      commandHistory: []
    }
  },
  methods: {
    onEnter(){
      console.log(this.main_input)
      let inputValue = this.main_input.trim()
      if (inputValue.length > 0){
        var inputObject = this.getInputType(inputValue)
        console.log("inputObject",inputObject);
        //  this.traiteInput(inputObject);
        //  this.updateInput(inputObject.inputNew);
        // this.$emit('onCommand', inputObject)
        this.$store.commit('ipgs/setInputObject', inputObject)
        this.main_input = inputObject.inputNew
      }

    },
    getInputType(iv){
      var inputObject = {};

      // si commence par http --> type = url
      if (this.isValidUrl(iv)){
        inputObject.type = "url";
        inputObject.value = iv;
        inputObject.isFile = this.isFile(iv)
      }else{
        // selon le premier charactère, on detecte une commande
        let firstChar = iv.charAt(0);
        let last =""
        switch(firstChar){
          case '/':
          //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(message))
          //  this.catchCommande(message,this.network,this);

          inputObject.type = "commande";
          inputObject.value = iv;
          inputObject.inputNew = "";
          this.catchCommande(inputObject)
          break;

          case '.':
          last = this.commandHistory[this.commandHistory.length-1];
          inputObject.inputNew = last.s+" "+last.p+" "+last.o;
          break;

          case ';':
          last = this.commandHistory[this.commandHistory.length-1];
          inputObject.inputNew = last.s+" "+last.p+" ";
          break;

          case ',':
          last = this.commandHistory[this.commandHistory.length-1];
          inputObject.inputNew = last.s+" ";
          break;


          default:
          // si le premier charactère n'indique pas une commande, on traite comme un triplet
          inputObject = this.traiteTriplet(iv);
          this.catchTriplet(inputObject)
        }
      }

      //si termine par virgule, point, point-virgule, tiret --> triplet

      return inputObject;
    },
    traiteTriplet(message){
      var result = {}
      var inputNew = "";
      let lastChar = message.slice(-1);
      let messageCut = message.slice(0,-1).split(" ");
      let isTriplet = true;
      //  console.log(messageCut);

      let detectLiteral = "";
      let messageCutTemp = [];
      messageCut.forEach(function(part){
        part = part.trim();
        //  console.log(part);
        if (part.startsWith('"')){
          detectLiteral ="debut";
          //  console.log(detectLiteral);
          messageCutTemp.push(part.substr(1));
        }else if (part.endsWith('"')){
          detectLiteral = "fin";
          //console.log(detectLiteral);
          messageCutTemp.push(messageCutTemp.pop()+" "+part.slice(0,-1));
        }else if (detectLiteral == "debut"){
          //  console.log("recupere le dernier et lui ajoute part" )
          messageCutTemp.push(messageCutTemp.pop()+" "+part)
        }else {
          messageCutTemp.push(part);
        }
      });
      if (messageCutTemp.length > 0){
        messageCut = messageCutTemp;
      }
      switch(lastChar){
        case '.':
        inputNew = "";
        break;
        case ';':
        if (messageCut[0].indexOf(" ") > -1){
          inputNew = '"'+messageCut[0]+'"'+' ';
        }else{
          inputNew = messageCut[0]+' ';
        }
        break;
        case ',':
        if (messageCut[0].indexOf(" ") > -1){
          inputNew = '"'+messageCut[0]+'" ';
        }else{
          inputNew = messageCut[0]+' ';
        }
        if (messageCut[1].indexOf(" ") > -1){
          inputNew += '"'+messageCut[1]+'" ';
        }else{
          inputNew += messageCut[1]+' ';
        }
        break;
        case '-':
        if (messageCut[2].indexOf(" ") > -1){
          inputNew = '"'+messageCut[2]+'"'+' ';
        }else{
          inputNew = messageCut[2]+' ';
        }
        break;
        default:
        console.log("message to chat "+message)
        //this.sendMessage(message);
        //  this.agentInput.send('agentSocket', {type: "sendMessage", message:message});
        //  this.catchTriplet(message.slice(0,-1), this.network); // A REMPLACER PAR CATCHTRIPLETS V2
        inputNew = "";
        isTriplet = false;
      }
      if (isTriplet){
        //  console.log("est Triplet",messageCut)
        result.type = "triplet";
        var tripletvalue = {};
        tripletvalue.subject = messageCut[0];
        tripletvalue.predicate = messageCut[1];
        tripletvalue.object = messageCut[2];
        result.value = tripletvalue;
        result.inputNew = inputNew;
      }else {
        //  console.log("n'est pas triplet")
        result.type = "message";
        result.value = message;
        result.inputNew = inputNew;
      }

      return result;
    },
    catchTriplet(triplet){
      console.log(triplet)
      // var subject = triplet.value.subject;
      // var predicate = triplet.value.predicate;
      // var object = triplet.value.object;

      // console.log(message.length);
      //message=message.trim();
      //var tripletString = message.substring(2).trim().split(" ");
      // les noeuds existent-ils ?
      // var sujetNode = this.network.body.data.nodes.get({
      //   filter: function(node){
      //     //    console.log(node);
      //     return (node.label == subject );
      //   }
      // });
      // var objetNode = this.network.body.data.nodes.get({
      //   filter: function(node){
      //     //    console.log(node);
      //     return (node.label == object);
      //   }
      // });
      //  console.log(sujetNode);
      //  console.log(objetNode);
      // sinon, on les créé
      // if (sujetNode.length == 0){
      //   var sub_n = {label: subject, color:{
      //     border : document.getElementById("bordercolorpicker").value ,
      //     background : document.getElementById("bodycolorpicker").value }
      //   };
      //   this.network.body.data.nodes.add(sub_n);
      // }
      // if (objetNode.length == 0){
      //   var obj_n = {label: object, color:{
      //     border : document.getElementById("bordercolorpicker").value ,
      //     background : document.getElementById("bodycolorpicker").value }
      //   };
      //   this.network.body.data.nodes.add(obj_n);
      // }
      // // maintenant ils doivent exister, pas très po=ropre comme méthode , à revoir
      // sujetNode = this.network.body.data.nodes.get({
      //   filter: function(node){
      //     return (node.label == subject );
      //   }
      // });
      // objetNode = this.network.body.data.nodes.get({
      //   filter: function(node){
      //     //  console.log(node);
      //     return (node.label == object);
      //   }
      // });
      // this.network.body.data.edges.add({
      //   label: predicate,
      //   from : sujetNode[0].id,
      //   to : objetNode[0].id,
      //   color: {inherit:'both'}
      //
      // });
      // //on récupère ce edge pour l'envoyer au serveur
      // var edge = this.network.body.data.edges.get({
      //   filter: function(edge) {
      //     return (edge.from == sujetNode[0].id && edge.to == objetNode[0].id && edge.label == predicate);
      //   }
      // });
      // console.log("EDGE",edge)
      //  console.log("OK",autofit,autofocus)
      //this.network.fit();
      //  fitAndFocus(sujetNode[0].id);

    },
    catchCommande(commande){
      console.log(commande)
      switch(commande.value) {
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
        //  this.exportJson(this.network)
        //this.exportJson();
        //  this.agentInput.send('agentGraph', {type: 'exportJson'})
        //this.agentInput.send("agentVis", {type: 'exportJson'});
        break;
        case "/t":
        console.log("exportTtl")
        //  this.exportTtl(this.network)
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
        console.log("new graph");
        this.newGraph();
        //level < 6? increaseLevel() : "";
        break;
        case "/l":
        console.log("connection a la base levelgraph");
        break;
        case "/c":
        //  console.log("capture_graphe");
        this.downloadCanvas()
        break;
        default:
        console.log("non traite"+ commande);
        //  return afficheCommandes();
      }
    },
    updateInput(inputNew){
      document.getElementById('input').value = inputNew || "";
    },
    isFile(pathname) {
      return pathname.split('/').pop().indexOf('.') > -1;
    },
    isValidUrl(string){
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    }
  }

}
</script>

<style>

</style>
