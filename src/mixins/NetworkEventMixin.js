//import { v4 as uuidv4 } from 'uuid';
let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", "type", "title", "color", "image"]

export default {

  methods: {
    addNodeEvent(ev){
      // console.log(ev)
      const app = this
      let nodes = this.network.nodes.filter(n => ev.properties.items.includes(n.id))
      console.log(nodes)

      nodes.forEach(async function (n) {
        if(n.built == undefined){
          await app.buildEdges(n)
        }
      });
    },
    async buildEdges(n){
      for (const [k, v] of Object.entries(n)) {
        await this.parse(n,k,v)
      }
      n.built = true
    },

    async parse(n, k, v){
      if (typeof v == "string"){
        v = v.trim()
        let network = this.network
        if(!omitted.includes(k) && v.length > 0){
          var indexO = network.nodes.findIndex(x => x.id==v);
          if(indexO === -1){
            let ob =   {id: v, shape: "box"}
            if (v.length > 50 ){
              ob.label = v.substring(0,50)+".."
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
                ob.title = v
              }else{
                ob.label = v
              }
            }else{
              ob.color = "#ECC046"
            }
            if( k == "type"){
              ob.shape = "star"
              ob.color= "#DE6E4B"
            }


            ob.built = true
            network.nodes.push(ob)
          }
          let o = network.nodes.find(n => n.id == v)
          let edge = {from: n.id, to: o.id, label: k}
          network.edges.push(edge)

        }else{
          k == "pair:label" ? n.label = v : ""
          k == "label" ? n.label = v : ""
          k == "name" ? n.label = v : ""
          if(k ==  "image"){
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
        if(!omitted.includes(k)){
          console.log("TODO",typeof v,k, v)
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
      let nodeId = ev.nodes[0]
      console.log(nodeId)
      if (nodeId.startsWith('http')){
        if (this.$route.query.url != nodeId){
          this.$router.push({ path: '/', query: { url: nodeId } })
        }else{
          alert ("you are already watching this resource !")
        }
      }else{
        let node = this.network.nodes.find(x => x.id==nodeId);
          this.$store.commit('ipgs/setCommandInput', node.label+' ')
      }
    },
    networkClickEvent(ev){
      console.log(ev)
    },
    networkEvent(ev) {
      console.log(ev)


      // if (this.networkEvents.length > 500) this.networkEvents = "";
      // this.networkEvents += `${eventName}, `;
    },


    graphsChanged(){
      console.log("GRAPHS CHANGED", this.graphs)
    }
  },
  watch:{
    graphs(){
      console.log(this.graphs)
      this.graphsChanged()
      console.info("TEST WITH ONE GRAPH")
      this.network = this.graphs[0]
    }
  },
  computed: {
    graphs: {
      get () { return this.$store.state.ipgs.graphs},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
