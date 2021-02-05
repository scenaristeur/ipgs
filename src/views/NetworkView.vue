<template>
  <b-container fluid>

    <network ref="network"
    class="wrapper"
    :nodes="nodes"
    :edges="edges"
    @select-node="onSelectNode"
    :options="options">
  </network>

  Storage : {{ storage}}
  <br>https://spoggy-test9.solidcommunity.net/public/table/workspaces/4e5f404a-a61a-4432-b4c7-36c79c6e10f2.ttl
  <br>https://spoggy-test9.solidcommunity.net/contacts/5d5889f7-d439-448a-bfa7-709249f0576c.jsonld

</b-container>
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
        let file = await fc.readFile(source.url)
        console.log(source.group,file)
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
    }
  },
  watch:{
    async storage(){
      //  if (this.url != undefined){
      this.clear()
      this.getData({url: this.storage, group:"storage"})
      //}
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
