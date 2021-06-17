<template>
  <div>
    <div id="mynetwork" class="network">N/A</div>

    <b-button @click="clusterByGroup">Cluster By group</b-button>

    source : {{ src}}
    <div v-if="data != null">
      nodes : {{ data.nodes.length}}, edges : {{ data.edges.length}}
    </div>

  </div>
</template>

<script>
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import Source from '@/models/Source'

export default {
  name: 'Network',
  props: ['source', 'level'],
  data(){
    return{
      pathsep:'/',
      src: null,
      maxiFriends : 5000,
      useSource: false, // test avec l'ancien Source ou avec getSolidDataset
      center : {x:500,y:500},
      data: null
    }
  },
  created(){
    this.src = this.source
    this.lvl = this.level
    // this.localResources = this.$store.state.localResources
    // console.log(this.localResources)
  },
  mounted(){

    // create an array with nodes
    const nodes = new DataSet([
      { id: 1, label: "Node 1", group: "impaire" },
      { id: 2, label: "Node 2", group: "paire" },
      { id: 3, label: "Node 3",  group: "impaire" },
      { id: 4, label: "Node 4", group: "paire" },
      { id: 5, label: "Node 5",  group: "impaire" },
      { id: 6, label: "Node 6",  group: "paire" },
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }
    ]);

    // create a network
    const container = document.getElementById("mynetwork");
    this.data = {
      nodes: nodes,
      edges: edges
    };
    const options = {
      manipulation: true,
      interaction: {
        navigationButtons: true,
        //  keyboard: true,
      },
      edges : {arrows: 'to'}};
      this.network = new Network(container, this.data, options);

      this.network.on('selectNode', evt => {
        console.log(evt)
        this.center = evt.event.center
        if (evt.nodes.length == 1) {
          if (this.network.isCluster(evt.nodes[0]) == true) {
            this.network.openCluster(evt.nodes[0]);
          }else{
            let n_id = evt.nodes[0]
            //  input.value = n_id
            //  this.$store.commit('vatch/setInput', n_id)
            console.log("input.value", n_id)
            let n = this.data.nodes.get(n_id);
            console.log("selected",n)
            switch (this.lvl) {
              case "pod":
              this.src = n.id
              break;
              case "friends":
              this.exploreFriends(n.id)
              break;
              default:

            }

            // this.currentRemoteUrl = n.id
            // this.$setCurrentThingUrl(n.id)

            if (n.type == 'file'){

              //  this.$socket.emit('read file', {path: n.id});
              n.shape = "ellipse"
              this.data.nodes.update(n)
            }else if (n.type == "folder"){
              n.shape = "box"
              this.data.nodes.update(n)
            }
          }
        }
      })

      // this.localResources = this.$store.state.vatch.localResources
      // console.log(this.localResources)

    },
    methods:{
      clusterByGroup(){
        console.log("clu")
        this.$clusterByGroup(this.network)
      },
      async explorePod(){
        if (this.useSource == true ){
          // test avec l'acien Source ou avec getSolidDataset
          let s = {
            url : this.src
          }
          this.$store.commit('ipgs/spinnerAdd')

          let sources = []
          sources.push(s)
          let source = new Source(sources)
          let graphs = await source.load()
          console.log(graphs)
          this.data.nodes.update(graphs[0].nodes)
          this.data.edges.update(graphs[0].edges)
          this.$store.commit('ipgs/spinnerRemove')
        }
        else{
          // let dataset =   await this.$exploreStorage(this.source)
          // let dataset =   await this.$exploreUrl(this.source)
          // console.log(dataset)
          this.$setCurrentThingUrl(this.src)
        }

      },
      async exploreFriends(webId){
        if (this.data.nodes.length > this.maxiFriends){
          return
        }

        //  console.log(this.data.nodes.length, webId)
        let p = {webId: webId}
        let pod = await this.$getPodInfos(p)
        //  console.log(pod)
        let nodes = []
        let n = {
          id: pod.webId,
          label: pod.name || pod.webId,
        }
        if (pod.photo != null && pod.photo.length > 0){
          n.shape= "image"
          n.image= pod.photo
        }
        nodes.push(n)


        for await (const f of pod.friends) {
          f.webId = f.webId.replace('.solid.community', '.solidcommunity.net')


          let nf = { id: f.webId, label: f.webId}
          nodes.push(nf)
          let edge = {from: webId, to: f.webId, label: "knows"}
          let exist_edge =  this.data.edges.get({
            filter: function (e) {
              return e.from == edge.from && e.to == edge.to && e.label == edge.label;
            }
          });
          if(exist_edge.length == 0){
            this.data.edges.add([edge])
          }

          ( this.data.nodes.get(f.webId) == null && !f.webId.includes('verborgh')) ?  this.exploreFriends(f.webId) : ""
        }


        //  console.log(nodes, edges)
        this.data.nodes.update(nodes)


        // pod.friends.forEach((f, i) => {
        //   console.log(i, f.webId)
        //   let wi = f.webId
        //   console.log(wi)
        //   app.exploreFriends(wi)
        // });




      },

      // process(msg){
      //   console.log("PROCESS",msg)
      //   msg.forEach((item) => {
      //     switch (item.event) {
      //       case "add":
      //       this.add(item)
      //       break;
      //       case "addDir":
      //       this.addDir(item)
      //       //  linkContainer(item)
      //       break;
      //       case "unlink":
      //       this.unlink(item)
      //       this.unlinkContainer(item)
      //       break;
      //       case "unlinkDir":
      //       this.unlinkDir(item)
      //       this.unlinkContainer(item)
      //       break;
      //       case "change":
      //       this.change(item)
      //       break;
      //       default:
      //
      //     }
      //   });
      //   //  console.log(network)
      // },

      //https://visjs.github.io/vis-data/data/dataset.html
      // https://visjs.github.io/vis-network/docs/network/manipulation.html
      // https://visjs.github.io/vis-network/docs/network/#methodManipulation

      add(item){
        let color = '#55D5E0'

        let label = item.path.split(this.pathsep).pop()
        let node= { id: item.path, label:label, color:color, type: 'file', group: "file", x: this.center.x, y:this.center.y}
        console.log(node)
        this.data.nodes.update([node])
        this.linkContainer(item)
        // if (label.startsWith('_')){
        //   this.$socket.emit('read file', {path: item.path, callback: 'vatch/processMetaFile'});
        // }

      },
      addDir(item){
        let p = item.path.split(this.pathsep)
        let color = p.length == 1 ? '#F26619' : '#F6B12D'
        let label = p.pop()
        if (label.length == 0){
          label = p.pop()
        }
        let node = {id: item.path, label:label,shape: 'box', color: color, type: 'folder', group: "folder", x: this.center.x, y:this.center.y}
        //  console.log(node)
        this.data.nodes.update([node])
        if(item.path != this.currentRemoteUrl){
          this.linkContainer(item)
        }

      },
      unlink(item){
        this.data.nodes.remove(item.path);
      },
      unlinkDir(item){
        this.data.nodes.remove(item.path);
      },
      linkContainer(item){
        //  let splitted = item.path.split(this.pathsep)
        //  if (splitted.length > 1){
        let to = item.path
        //  splitted.pop()
        let from = this.currentRemoteUrl //splitted.join(this.pathsep)
        let exist_edge =  this.data.edges.get({
          filter: function (e) {
            return e.from == from && e.to == to && e.label == "contains";
          }
        });
        //  console.log(exist_edge)
        if(exist_edge.length == 0){
          let edge = {from: from, to: to, label: "contains"}
          //  console.log(edge)
          this.data.edges.add([edge])
        }
        //  }

      },
      unlinkContainer(item){
        let splitted = item.path.split(this.pathsep)
        if (splitted.length > 1){
          let to = item.path
          splitted.pop()
          let from = splitted.join(this.pathsep)
          let edges_to_remove =  this.data.edges.get({
            filter: function (e) {
              return e.from == from && e.to == to && e.label == "contains";
            }
          });
          this.data.edges.remove(edges_to_remove)
        }
      },
      change(item){
        let n = this.data.nodes.get(item.path)
        n.shape = "star"
        this.data.nodes.update(n)
      }

    },
    watch:{
      source(){
        this.src = this.source
      },
      level(){
        this.lvl = this.level
        console.log("level",this.level)
      },
      async src(){
        console.log(this.src)
        switch (this.lvl) {
          case "pod":
          this.explorePod()
          break;
          case "friends":

          this.exploreFriends(this.src)
          break;
          default:
          alert ("only pod or friends are available")

        }

      },

      currentRemoteUrl(){
        console.log(this.currentRemoteUrl)
      },
      remoteResources(){
        let root_node = {path: this.src}
        this.addDir(root_node)
        console.log(this.remoteResources)
        this.remoteResources.forEach((r) => {
          let item = {path: r}
          r.endsWith('/') ? this.addDir(item) : this.add(item)

          //  recursive
          if (r.endsWith('/') || r.endsWith('#me')){
            this.$setCurrentThingUrl(r)
          }
        });
        console.log(this.data)
      },
      things(){
        console.log(this.things)
        let subjects = this.things.map(x => x.s)
        let objects = this.things.map(x => x.o)
        this.data.nodes.update(subjects)
        this.data.nodes.update(objects)
        let predicates = this.things.map(x => {return {from: x.s.id, to: x.o.id, label: x.p}})
        console.log(predicates)
        this.data.edges.update(predicates)

      },
      file(){
        console.log(this.file, this.file.content)
      }
      // localResources(){
      //   this.process(this.localResources)
      // },
      // networkAdds(){
      //   this.networkAdds.nodes != undefined ? this.data.nodes.update(this.networkAdds.nodes) : ""
      //   this.networkAdds.edges != undefined ? this.data.edges.update(this.networkAdds.edges) : ""
      // }
    },
    computed:{
      currentRemoteUrl:{
        get () { return this.$store.state.solid.currentRemoteUrl},
        set (/*value*/) { /*this.updateTodo(value)*/ }
      },
      remoteResources:{
        get () { return this.$store.state.solid.remoteResources},
        set (/*value*/) { /*this.updateTodo(value)*/ }
      },
      things :{
        get () { return this.$store.state.solid.things},
        set (/*value*/) { /*this.updateTodo(value)*/ }
      },
      file :{
        get () { return this.$store.state.solid.file},
        set (/*value*/) { /*this.updateTodo(value)*/ }
      },
      // pathsep:{
      //   get () { return this.$store.state.vatch.pathsep},
      //   set (/*value*/) { /*this.updateTodo(value)*/ }
      // },
      // localResources:{
      //   get () { return this.$store.state.vatch.localResources},
      //   set (/*value*/) { /*this.updateTodo(value)*/ }
      // },
      // networkAdds:{
      //   get () { return this.$store.state.vatch.networkAdds},
      //   set (/*value*/) { /*this.updateTodo(value)*/ }
      // }
    }
  }
  </script>

  <style>
  #mynetwork {
    /* width: 100%;
    height: 400px;
    border: 1px solid lightgray; */
    min-height: 75vh;
    /* border: 1px solid black; */
    background: linear-gradient(to bottom,  rgba(250, 250, 170),rgba(215, 215, 255));
    padding: 10px;
    height: 75vh;
  }
  </style>
