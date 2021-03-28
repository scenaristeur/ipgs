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
      //  console.log(this.$route)
        let url = this.$route.query.url
        // if (url.includes('=')){
        //   url = this.$route.fullPath.replace('/?url=','');
        //   // // Pour gerer les &key=value dans les requetes sparql Persee, semantic-forms
        //   // delete this.$route.query.url
        //   // console.log(Object.entries(this.$route.query))
        //   //
        //   // for (const [k, v] of Object.entries(this.$route.query)) {
        //   //   url+= "&"+k+"="+v
        //
        // }
        //
        // console.log("URL", url)


        await this.load({name:"Query_url", url:url})
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

      console.log("TODO, find another way to not clear the graph when navig with Solid folder, and allow expanding when clicking on a node for ldp semapps container")
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
