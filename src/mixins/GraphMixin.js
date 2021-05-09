import Graph from '@/Entity/Graph'

export default {
  methods:{
    async createGraph(options){
      // options.onUpdate = this.onUpdate
      let graph = await new Graph(options, this.onProgress)

      console.log(graph)
      // await this.$store.commit('ipgs/updateGraph', graph)
      //  this.$store.commit('ipgs/addGraphs', [graph])
      return graph
    },
    async updateGraph(g){
      await this.onProgres(g)
    },
    async onProgress(g){

      console.log("ONUPDATE",g)
      // let graph = {
      //   id: g.options.id,
      //   name: g.options.name,
      //   nodes: g.loaded.nodes,
      //   edges: g.loaded.edges
      //
      // }
      //
      // console.log("graph",graph)
      g.nodes == undefined ? g.nodes = g.loaded.nodes : ""
      g.edges == undefined ? g.edges = g.loaded.edges: ""
      await this.$store.commit('ipgs/updateGraph', g)
    }

  }
}
