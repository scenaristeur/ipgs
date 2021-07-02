<template>
  <b-modal id="import-popup" v-model="showimport">
    <b-form-file
    v-model="files"
    multiple
    placeholder="Choose a file or drop it here..."
    drop-placeholder="Drop file here..."
    ></b-form-file>

    <b-input-group size="sm" prepend="Url">
      <b-form-input v-model="url" autofocus v-on:keyup.enter="load"></b-form-input>
      <b-button variant="secondary">From POD</b-button>
    </b-input-group>



    <template #modal-footer>
      <div class="w-100">
        <b-button
        variant="primary"
        size="sm"
        class="float-right"
        @click="importToGraph(true)"
        >
        New
      </b-button>
      <b-button
      variant="primary"
      size="sm"
      class="float-right"
      @click="importToGraph"
      >
      Add to current graph
    </b-button>
    <b-button
    variant="primary"
    size="sm"
    class="float-right"
    @click="showimport=false"
    >
    Close
  </b-button>
</div>
</template>

</b-modal>

</template>

<script>
export default {
  name: 'ImportModal',
  data() {
    return {
      files: [],
      showimport: false,
      url: ''
      //network: {}
    }
  },
  methods: {
    load(){
      console.log(this.url)
    },
    importToGraph(clear = false){
      if(clear == true ){
        this.network.nodes = []
        this.network.edges = []
      }
      let app = this
      // var data = {};
      for (var i = 0; i < this.files.length; i++) {
        var fichier = this.files[i];
        var extension = fichier.name.split('.').pop();
        var reader = new FileReader(); //https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-api-file
        reader.addEventListener('load', function () {
          var result = reader.result;
          console.log(typeof result, result);
          switch (extension) {
            case 'json':
            var data = JSON.parse(result)
            console.log(data)
            if(data.nodes != undefined){
              app.network.nodes = data.nodes
              app.network.edges = data.edges
            }
            /*  var nodes = res.nodes;
            var edges = res.edges;
            data ={nodes: nodes, edges: edges}*/
            //   callback({data:data,params:params})
            //editor.insert("testJK")
            // var text = JSON.stringify(data, null, 2)
            //   editor.session.setValue(text)
            //  editor.insert(JSON.stringify(data, null, 2))
            break;
            case 'rdf':
            case 'ttl':
            case 'n3':
            case 'n3t':
            case 'owl':
            console.lolg("todo")
            /*  let base = 'https://www.wikidata.org/wiki/Special:EntityData/Q2005.ttl'
            let mimeType = 'text/turtle'*/
            // let doc = $rdf.sym("http://smag0.blogspot.fr/spoggy");
            // let store = $rdf.graph()
            // console.log(store)
            // try {
            //   $rdf.parse(result, store, doc.uri, 'text/turtle');
            // }
            // catch(error) {
            //   alert(error);
            // }
            //
            // /*  $rdf.parse(result, store,base, mimeType)
            // console.log("STORE",store)*/
            // data = statements2vis(store.statements);
            // callback({data:data,params:params})
            // console.log("OK")
            break;
            default:
            alert('Sorry, je ne peux pas traiter ',fichier);
          }
        });
        reader.readAsText(fichier);
      }
      // this.files.forEach((f) => {
      //
      // });
      this.showimport=false
    }
  },
  computed: {
    network:{
      get () { return this.$store.state.ipgs.network},
      set (/*value*/) {  }
    }
  }
}
</script>

<style>

</style>
