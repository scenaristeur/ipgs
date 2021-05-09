//import { v4 as uuidv4 } from 'uuid';
let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", /*"type",*/ "title", "color", "image"]


export default {

  methods: {
    addNodeEvent(ev){
      // console.log(ev)
      const app = this
      let nodes = this.network.nodes.filter(n => ev.properties.items.includes(n.id))
      console.log(nodes)

      nodes.forEach( function (n) {
        if(n.built == undefined){
          app.buildEdges(n)
        }
      });
    },
    buildEdges(n){
      for (const [k, v] of Object.entries(n)) {
        this.parse(n,k,v)
      }
      n.built = true
    },

    parse(n, k, v){
      let network = this.network
      if (typeof v == "string"){
        v = v.trim()
        let edgeLength = undefined
        if(!omitted.includes(k) && v.length > 0){
          var indexO = network.nodes.findIndex(x => x.id==v);
          if(indexO === -1){
            let ob =   {id: v, shape: "box", mass: 1}
            if (v.length > 20 ){
              ob.label = v.substring(0,20)+".."
              ob.title = v
            }
            else{
              ob.label = v
            }

            if (v.startsWith('http')){
              ob.color = "#7FD1B9"
              if (v.length > 50 ){
                let lab = v.endsWith('/') ? v.slice(0, -1) : v
                ob.label = lab.substr(lab.lastIndexOf('/') + 1);
                ob.label = ob.label.length > 20 ? ob.label.substring(0,20)+".." : ob.label
                ob.label = "->"+ob.label
                ob.title = v

              }else{
                ob.label = v
              }
            }else{
              ob.color = "#ECC046"
              edgeLength = 1
              ob.mass = 1
            }
            if( k == "type"){
              ob.shape = "star"
              ob.color= "#DE6E4B"
            }


            ob.built = true
            network.nodes.push(ob)
          }else{
            network.nodes[indexO].mass == undefined ? network.nodes[indexO].mass=1 : network.nodes[indexO].mass++
          }
          let o = network.nodes.find(n => n.id == v)
          o.mass++
          // if( k == "type"){
          //   // must do this test a second time after the node has been added to get network.nodes.length ????
          //   edgeLength = 1000
          // }
          let edge = {from: n.id, to: o.id, label: k }
          if (edgeLength != undefined){
            edge.length = edgeLength
            //edge.strength = 300
          }
          network.edges.push(edge)

        }else{
          k == "pair:label" ? n.label = v : ""
          k == "label" ? n.label = v : ""
          k == "name" ? n.label = v : ""
          if(k ==  "image"){
            n.shape = "circularImage"
            n.image = v
          }
          if(k ==  "depiction"){
            n.shape = "circularImage"
            n.image = v
          }

        }
      }else if (Array.isArray(v)){
        //console.log(v)
        v.forEach((_v) => {
          this.parse(n,k,_v)
        });


      } else{
        if(!omitted.includes(k) && typeof v == "object"){

          var indexOBJ = network.nodes.findIndex(x => x.id==v.id);
          if(indexOBJ === -1){
            console.log("ADDING",n.id, typeof v,k, v)
            network.nodes.push(v)


          }
          network.edges.push({from: n.id, to: v.id, label: k})
          console.log("ADDING edge",n.id, k, v.id)
        }
        else  if(!omitted.includes(k) && typeof v == "number"){
          console.log("TODO",n.id, typeof v,k, v)
          //  this.parse(n, k, v)
        }
        else
        {
          console.log("TODO",n.id, typeof v,k, v)
        }

      }
    },
    // updateNodeEvent(ev){
    //   //console.log(ev)
    //   const app = this
    //   let nodes = this.network.nodes.filter(n => ev.properties.items.includes(n.id))
    //   console.log(nodes)
    //
    //   nodes.forEach(async function (n) {
    //     if(n.built == undefined){
    //       await app.buildEdges(n)
    //     }
    //   });
    // },
    selectNodeEvent(ev){
      console.log(ev)



      let nodeId = ev.nodes[0]
      console.log(nodeId)
      console.log(this.$refs.network)

      if ( this.$refs.network.isCluster(nodeId)){
        console.log("is cluster")
        this.$refs.network.openCluster(nodeId)
        return
      }

      let node = this.network.nodes.find(x => x.id==nodeId);
      console.log(node)


      if (nodeId.startsWith('http')){
        if (this.$route.query.url != nodeId){
          this.$router.push({ path: '/', query: { url: nodeId } })
        }else{
          alert ("you are already watching this resource !")
        }
      }else{
        this.$store.commit('ipgs/setCommandInput', node.label+' ')
      }
    },
    networkClickEvent(ev){
      console.log(ev)
      let item = {}
      if (ev.nodes.length > 0 ){
        item = this.network.nodes.find(x => x.id==ev.nodes[0]);
      }else if (ev.edges.length >0){
        item = this.network.edges.find(x => x.id==ev.edges[0]);
      }
      this.$store.commit('ipgs/setCurrentItem', item)
    },
    networkEvent(ev) {
      console.log(ev)


      // if (this.networkEvents.length > 500) this.networkEvents = "";
      // this.networkEvents += `${eventName}, `;
    },


    async graphsChanged(){
      console.log("GRAPHS CHANGED", this.graphs)
      console.info("TEST WITH ONE GRAPH")
      //this.network = {nodes: [],edges: []}
      for await (let g of this.graphs) {
        console.log(g)

        for await (let n of g.nodes){
        //  n.cid = g.id
        let worker_n = this.w_start("Loading "+n.id)
          var indexN = this.network.nodes.findIndex(x => x.id==n.id);
          indexN === -1 ? this.network.nodes.push(n) : Object.assign(this.network.nodes[indexN], n)
          this.w_kill(worker_n)
        }

        for await (let e of g.edges){
          var indexE = this.network.edges.findIndex(x => x.id==e.id || (x.from == e.from && x.to == e.to && x.label == e.label));
          indexE === -1 ? this.network.edges.push(e) : Object.assign(this.network.edges[indexE], e)
        }


      }
      console.log("network",this.network)

    }

    // graphsChanged(){
    //   console.log("GRAPHS CHANGED", this.graphs)
    //   console.info("TEST WITH ONE GRAPH")
    //   //  this.network = {nodes: [],edges: []}
    //   for (let g of this.graphs) {
    //     console.log(g)
    //     // alternative temporaire pour prendre tout en compte tant que c'est pas nickel
    //     let nodes = g.network!= undefined && g.network.nodes.length>0 ? g.network.nodes : g.nodes
    //     let edges = g.network != undefined && g.network.edges.length > 0 ? g.network.edges : g.edges
    //     this.network.nodes.concat(nodes)
    //     this.network.edges.concat(edges)
    //     console.log(this.network)
    //   }
    //
    //   console.log(this.network)
    //   this.nodes = this.network.nodes
    //   this.edges = this.network.edges
    //
    // }
  },
  watch:{
    graphs(){
      console.log(this.graphs)
      this.graphsChanged()





    }
  },
  computed: {
    graphs: {
      get () { return this.$store.state.ipgs.graphs},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
