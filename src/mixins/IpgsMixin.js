//import Source from '@/models/Source'
import Graph from '@/Entity/Graph'
import { v4 as uuidv4 } from 'uuid';

export default {
  // async  created(){
  //     console.log("ipgsMixin created")
  //
  //   },
  methods: {
    async  checkQueryUrl() {
      this.$store.commit('ipgs/workersInit')
      let worker = {id: uuidv4(), action: "init"}
      this.$store.commit('ipgs/workersAdd', worker)
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

        let g = new Graph({url: url, store: this.$store})
        this.$store.commit('ipgs/addGraphs', [g])

      }else{
        this.storage = this.$store.state.solid.storage
        //console.log(this.storage)
        if (this.storage != null){
          console.log("TODO TODO TODO load storage",this.storage)
        //  await this.load({name:"Storage", url:this.storage})
        }
      }

      this.$store.commit('ipgs/workersRemove', worker)
    },

    // async load(s){
    //
    //   console.log("TODO, find another way to not clear the graph when navig with Solid folder, and allow expanding when clicking on a node for ldp semapps container")
    //   // let g = {network: {nodes:[], edges: []}}
    //   // g.id = uuidv4()
    //   // g.name = "find another way to not clear the graph when navig with Solid folder"
    //   //
    //   // this.$store.commit('ipgs/addGraphs', [g])
    //
    //
    //   let sources = []
    //   sources.push(s)
    //   let source = new Source(sources)
    //   let graphs = await source.load()
    //   console.log(graphs)
    //   this.$store.commit('ipgs/addGraphs', graphs)
    //   //       this.$router.push(({ name: 'Network', query: { url: this.$route.query.url } }))
    //
    // }
  }

}
