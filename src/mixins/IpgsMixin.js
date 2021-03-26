import Source from '@/models/Source'

export default {
  // async  created(){
  //     console.log("ipgsMixin created")
  //
  //   },
  methods: {
    async  checkQueryUrl() {
      if (this.$route.query.url != undefined && this.$route.query.url.length > 0){
        this.$store.commit('ipgs/spinnerAdd')

        let sources = []
        sources.push({name:"Query_url", url:this.$route.query.url})
        let source = new Source(sources)
        let graphs = await source.load()
        console.log(graphs)
        this.$store.commit('ipgs/setGraphs', graphs)
        //       this.$router.push(({ name: 'Network', query: { url: this.$route.query.url } }))

        this.$store.commit('ipgs/spinnerRemove')
      }
    }
  }

}
