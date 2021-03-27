import Source from '@/models/Source'

export default {
  // async  created(){
  //     console.log("ipgsMixin created")
  //
  //   },
  methods: {
    async  checkQueryUrl() {
      this.$store.commit('ipgs/spinnerInit')
      if (this.$route.query.url != undefined && this.$route.query.url.length > 0){
      await this.load({name:"Query_url", url:this.$route.query.url})
      }else{
        this.storage = this.$store.state.solid.storage
        //console.log(this.storage)
        if (this.storage != null){
          console.log("load storage",this.storage)
          await this.load({name:"Storage", url:this.storage})
        }
      }
    },
  async load(s){
      this.$store.commit('ipgs/setGraphs', [{nodes:[], edges: []}])

      this.$store.commit('ipgs/spinnerAdd')

      let sources = []
      sources.push(s)
      let source = new Source(sources)
      let graphs = await source.load()
      console.log(graphs)
      this.$store.commit('ipgs/setGraphs', graphs)
      //       this.$router.push(({ name: 'Network', query: { url: this.$route.query.url } }))

      this.$store.commit('ipgs/spinnerRemove')
    }
  }

}
