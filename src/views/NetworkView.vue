<template>
  <div>
    <b-button @click="getStorage" size="sm">{{ storage}}</b-button>
    <network ref="network"
    class="wrapper"
    :nodes="nodes"
    :edges="edges"
    @select-node="onSelectNode"
    @double-click="onDoubleClick"
    :options="options">
  </network>

  Storage : {{ storage}}
  <br>https://spoggy-test9.solidcommunity.net/public/table/workspaces/4e5f404a-a61a-4432-b4c7-36c79c6e10f2.ttl
  <br>https://spoggy-test9.solidcommunity.net/contacts/5d5889f7-d439-448a-bfa7-709249f0576c.jsonld

</div>
</template>

<script>
//https://github.com/r3code/vue-vis-network
// modele https://github.com/scenaristeur/solid-vue-panes/blob/master/src/components/semapps/SemappsNetwork.vue
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import { mapState } from 'vuex';
//import { v4 as uuidv4 } from 'uuid';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
const myWorker = new Worker("workers/worker.js");
import { /*handleIncomingRedirect, login,*/ fetch/*, getDefaultSession */} from '@inrupt/solid-client-authn-browser'
import { getSolidDataset/*, saveSolidDatasetAt*/ } from "@inrupt/solid-client";

export default {
  name: 'NetworkView',
  data() {
    return {
      nodes: [
        {id: 1,  label: 'circle',  shape: 'circle' },
        {id: 2,  label: 'ellipse', shape: 'ellipse'},
        {id: 3,  label: 'database',shape: 'database'},
        {id: 4,  label: 'box',     shape: 'box'    },
        {id: 5,  label: 'diamond', shape: 'diamond'},
        {id: 6,  label: 'dot',     shape: 'dot'},
        {id: 7,  label: 'square',  shape: 'square'},
        {id: 8,  label: 'triangle',shape: 'triangle'},
      ],
      edges: [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 5, to: 6},
        {from: 5, to: 7},
        {from: 6, to: 8}
      ],
      options: {
        nodes: {

          //  borderWidth: 4
        },
        edges: {
          arrows: 'to',
          color: 'lightgray'
        },
        interaction: {
          navigationButtons: true,
        },
      }
    }
  },
  created(){
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.info("URL1",this.url)
      this.getData({url:this.url})
    }
  },
  methods: {
    onDoubleClick(e){
      console.log(e)
      this.clear()
      this.getData({ url: e.nodes[0], group: ""})
    },
    onSelectNode(e){
      console.log(e)
      this.getData({ url: e.nodes[0], group: ""})
    },
    async getData(source){

      if(source.url.endsWith('/')){
        let folder = await fc.readFolder(source.url)

        folder.id = folder.url
        folder.label = folder.name
        folder.shape = "image"
        folder.image = "./assets/parentfolder.png"
        folder.size = 20
        delete folder.url
        delete folder.name

        var index = this.nodes.findIndex(x => x.id==folder.id);
        index === -1 ? this.nodes.push(folder) : console.log("object already exists")

        let parent = {
          id: folder.parent,
          label: folder.parent,
          shape: "image",
          image: "./assets/parentfolder.png",
          size: 20,
        }
        var indexP = this.nodes.findIndex(x => x.id==parent.id);
        indexP === -1 ? this.nodes.push(parent) : console.log("object already exists")

        let edgeP = {from: folder.id, to: parent.id, label: "parent"}
        var indexPE = this.edges.findIndex(x => x.from==edgeP.from && x.to == edgeP.to && x.label == edgeP.label);
        indexPE === -1 ? this.edges.push(edgeP) : console.log("object already exists")




        console.log(source.group, folder)
        folder.folders.forEach((fo) => {
          fo.id = fo.url
          fo.label = fo.name
          fo.shape = "image"
          fo.image = "./assets/folder.png"
          fo.size = 20
          delete fo.url
          delete fo.name
          var index = this.nodes.findIndex(x => x.id==fo.id);
          index === -1 ? this.nodes.push(fo) : console.log("object already exists")
          let edge = {from: folder.id, to: fo.id, label: "contains"}
          var indexE = this.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
          indexE === -1 ? this.edges.push(edge) : console.log("object already exists")

        });
        folder.files.forEach((fi) => {
          fi.id = fi.url
          fi.label = fi.name
          fi.shape = "image"
          fi.image = "./assets/document.png"
          fi.size = 20
          delete fi.url
          delete fi.name
          var index = this.nodes.findIndex(x => x.id==fi.id);
          index === -1 ? this.nodes.push(fi) : console.log("object already exists")
          let edge = {from: folder.id, to: fi.id, label: "contains"}
          var indexE = this.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
          indexE === -1 ? this.edges.push(edge) : console.log("object already exists")
        });
        console.log(this.nodes)
      }else{
        var extension = source.url.split('.').pop();
        let app = this
        let file = {}
        let json = {}
        let dataset = {}
        console.log(extension)
        switch (extension) {
          case 'rdf':
          case 'ttl':
          case 'n3':
          case 'n3t':
          case 'owl':
          console.log(extension)
          dataset = await getSolidDataset(source.url, { fetch: fetch });
          console.log(dataset)

          dataset.quads.forEach(async function (q)  {
            let [s,p,o] = [
              {id:q.subject.id, label: await app.lastPart(q.subject.id)},
              q.predicate.id,
              {id:q.object.id, label: await app.lastPart(q.object.id)}
            ]
            console.log(s,p,o)

            var indexS = app.nodes.findIndex(x => x.id==s.id);
            indexS === -1 ? app.nodes.push(s) : console.log("object already exists")
            var indexO = app.nodes.findIndex(x => x.id==o.id);
            indexO === -1 ? app.nodes.push(o) : console.log("object already exists")
            let edge = {from: s.id, to: o.id, label: await app.lastPart(p)}
            var indexP = app.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
            indexP === -1 ? app.edges.push(edge) : console.log("object already exists")



          });


          break;
          case 'json':
          case 'jsonld':
          console.log(extension)
          file = await fc.readFile(source.url)
          json = JSON.parse(file)
          console.log(source.group,file, json)
          json.id == null ? json.id = json['@id'] : ''
          var indexS = app.nodes.findIndex(x => x.id==json.id);
          indexS === -1 ? app.nodes.push(json) : console.log("object already exists")

          for (const [key, value] of Object.entries(json)) {
            if (key != 'id' && key != '@id' && key != '@context'){
              console.log(key,value)
              var indexO = app.nodes.findIndex(x => x.id==value);
              indexO === -1 ? app.nodes.push({id: value, label: await app.lastPart(value)}) : console.log("object already exists")
              let edge = {from: json.id, to: value, label: await app.lastPart(key)}
              var indexE = app.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
              indexE === -1 ? app.edges.push(edge) : console.log("object already exists")
            }
          }





          break;
          default :

        }

      }
    },
    async lastPart(text){
      if (text.startsWith('http')){
        var n = text.lastIndexOf('/');
        return text.substring(n + 1);
      }
      else{
        return text
      }


    },
    async getData1(source) {
      if (window.Worker) {
        if(source.url.endsWith('/')){
          let folder = await fc.readFolder(source.url)
          console.log(source.group, folder)
          folder.folders.forEach((fo) => {
            myWorker.postMessage({nodes: this.nodes, nouveau: fo});
            console.log(fo)
          });
          folder.files.forEach((fi) => {
            myWorker.postMessage({nodes: this.nodes, nouveau: fi});
            console.log(fi)
          });
          console.log('Message posted to worker');
        }else{
          let file = await fc.readFile(source.url)
          console.log(source.group,file)
        }
        myWorker.onmessage = function(e) {
          console.log('result',e)
          this.nodes = e.data.nodes
          console.log('Message received from worker');
        }
      } else {
        alert('Your browser doesn\'t support web workers.')
      }
    },
    clear(){
      this.nodes = []
      this.edges = []
    },
    getStorage(){
      this.clear()
      this.getData({url: this.storage, group:"storage"})
    }
  },
  watch:{
    async storage(){
      this.getStorage()
    }
  },
  computed: mapState({
    storage: s => s.solid.storage
  }),
}
</script>

<style>
.wrapper{
  min-height: 100vh;
  border: 1px solid black;
  background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
  padding: 10px;
  height: 100vh;
}
</style>
