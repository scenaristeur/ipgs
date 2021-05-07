//import { v4 as uuidv4 } from 'uuid';
let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", /*"type",*/ "title", "color", "image"]

export default {

  methods: {
    // addNodeEvent(ev){
    //   // console.log(ev)
    //   const app = this
    //   let nodes = this.nodes.filter(n => ev.properties.items.includes(n.id))
    //   console.log(nodes)
    //
    //   nodes.forEach( function (n) {
    //     if(n.built == undefined){
    //       app.buildEdges(n)
    //     }
    //   });
    // },
    buildEdges(n, net){
      for (const [k, v] of Object.entries(n)) {
        this.parse(n,k,v, net)
      }
      n.built = true
    },

    parse(n, k, v, net){

      console.log(n, k, v)
      switch (typeof v) {
        case "string":
        v = v.trim()
        this.parseString(n,k,v, net)
        break;
        case "object":
        this.parseObject(n,k,v, net)
        break;
        case "array":
        this.parseArray(n,k,v, net)
        break;
        default:

      }

    },

    parseString(n,k,v, net){
      if(!omitted.includes(k) && v.length > 0){
        let ob = this.nodes.get(v)
        if(ob == null){
          ob = {id: v, shape: "box", mass: 1}
          ob = this.shortLabel(ob)

        }else{
          ob.mass++

        }
  net.nodes.update(ob)
        console.log("OBOB",ob)

        let edge = {from: n.id, to: ob.id, label: k }
        net.edges.add(edge)
      }
      this.debug('string',n,k,v)
    },
    parseObject(n,k,v, net){
      this.debug('object',n,k,v, net)
    },
    parseArray(n,k,v, net){
      this.debug('array',n,k,v, net)
    },



    shortLabel(n){
      if (n.id.length > 50 ){
        console.warn("todo text must not be a id")
      }
      if (n.id.length > 20 ){
        n.label = n.id.substring(0,20)+".."
        n.title = n.id
      }
      else{
        n.label = n.id
      }
      return n
    },

    debug(p,n,k,v){
      console.warn(p,n,k,v)
    },

    parse1(n, k, v){

      if (typeof v == "string"){
        v = v.trim()
        let edgeLength = undefined
        if(!omitted.includes(k) && v.length > 0){
          var indexO = this.nodes.findIndex(x => x.id==v);
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
            this.nodes.push(ob)
          }else{
            this.nodes[indexO].mass == undefined ? this.nodes[indexO].mass=1 : this.nodes[indexO].mass++
          }
          let o = this.nodes.find(n => n.id == v)
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
          this.edges.push(edge)

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
          v['@id'] != undefined ? v.id = v['@id'] : ''
          var indexOBJ = this.nodes.findIndex(x => x.id==v.id);
          if(indexOBJ === -1){
            console.log("ADDING",n.id, typeof v,k, v)
            this.nodes.push(v)


          }
          this.edges.push({from: n.id, to: v.id, label: k})
          console.log("ADDING edge",n.id, k, v.id, v)
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
    // selectNodeEvent(ev){
    //   console.log(ev)
    //
    //
    //
    //   let nodeId = ev.nodes[0]
    //   console.log(nodeId)
    //   console.log(this.$refs.network)
    //
    //   if ( this.$refs.network.isCluster(nodeId)){
    //     console.log("is cluster")
    //     this.$refs.network.openCluster(nodeId)
    //     return
    //   }
    //
    //   let node = this.nodes.find(x => x.id==nodeId);
    //   console.log(node)
    //
    //
    //   if (nodeId.startsWith('http')){
    //     if (this.$route.query.url != nodeId){
    //       this.$router.push({ path: '/', query: { url: nodeId } })
    //     }else{
    //       alert ("you are already watching this resource !")
    //     }
    //   }else{
    //     this.$store.commit('ipgs/setCommandInput', node.label+' ')
    //   }
    // },
    // networkClickEvent(ev){
    //   console.log(ev)
    //   let item = {}
    //   if (ev.nodes.length > 0 ){
    //     item = this.nodes.find(x => x.id==ev.nodes[0]);
    //   }else if (ev.edges.length >0){
    //     item = this.edges.find(x => x.id==ev.edges[0]);
    //   }
    //   this.$store.commit('ipgs/setCurrentItem', item)
    // },

    // networkEvent(ev) {
    //   console.log(ev)
    //
    //
    //   // if (this.networkEvents.length > 500) this.networkEvents = "";
    //   // this.networkEvents += `${eventName}, `;
    // },


    graphsChanged(){
      console.log("GRAPHS CHANGED", this.graphs)
    }
  },
  watch:{
    graphs(){
      this.$store.commit('ipgs/spinnerAdd')
      console.log(this.graphs)
      this.graphsChanged()
      console.info("TEST WITH ONE GRAPH")
    //  let app = this
      let net = this.graphs[0]
      // net.nodes.forEach( function (n) {
      //   if(n.built == undefined){
      //     app.buildEdges(n, net)
      //   }
      // });
      this.net.setData(net)
      this.$store.commit('ipgs/spinnerRemove')
      console.log("Now we can explode", net.nodes)





    }
  },
  computed: {
    graphs: {
      get () { return this.$store.state.ipgs.graphs},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
