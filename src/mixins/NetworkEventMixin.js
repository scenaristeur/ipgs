//import { v4 as uuidv4 } from 'uuid';
export default {

  methods: {
    addNodeEvent(ev){
      //console.log(ev)
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
      let network = this.network
      let omitted = ["id", "label", "pair:label", "name", "shape", "title", "color"]
      for (const [k, v] of Object.entries(n)) {

        if (typeof v == "string"){

          if(!omitted.includes(k) && v.trim().length > 0){
            var indexO = network.nodes.findIndex(x => x.id==v);
            if(indexO === -1){
              let ob = k == "type" ?  {id: v, shape: "star", color: "red"} : {id: v, shape: "box", color: "yellow"}
              if (v.length > 50 ){
                ob.label = v.substring(0,50)+".."
                ob.title = v
              }
              else{
                ob.label = v
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
          }
        }else{
          console.log("TODO",typeof v,k,v)
        }
      }

      n.built = true
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
