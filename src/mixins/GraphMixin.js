import Graph from '@/Entity/Graph'

export default {
  methods:{
    createGraph(options){
      // options.onUpdate = this.onUpdate
      let graph = new Graph(options)

      console.log(graph)
      this.$store.commit('ipgs/addGraphs', [this])
    },
    //onUpdate(g){
    //   console.log("ONUPDATE",g)
    // //  this.$store.commit('ipgs/updateGraph', g)
    // }

  }
}
