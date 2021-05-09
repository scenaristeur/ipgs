//import Source from '@/models/Source'

import Graph from '@/Entity/Graph'
import { v4 as uuidv4 } from 'uuid';

export default {
  // async  created(){
  //     console.log("ipgsMixin created")
  //
  //   },
  methods: {
    async loadStorage(){
      this.storage = this.$store.state.solid.storage
      //console.log(this.storage)
      if (this.storage != null){
        let worker = {id: uuidv4(), action: "Loading Pod Storage"}
        this.$store.commit('ipgs/workersAdd', worker)
        console.log("load storage",this.storage)
        let g = new Graph({id: uuidv4(), name:"init Graph from storage",  url: this.storage,  status: "start", store: this.$store})
        this.$store.commit('ipgs/addGraphs', [g])
        this.$store.commit('ipgs/workersRemove', worker)
      }
    },
    async  checkQueryUrl() {
      this.$store.commit('ipgs/workersInit')


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
        let worker = {id: uuidv4(), action: "Loading "+url}
        this.$store.commit('ipgs/workersAdd', worker)
        let g = new Graph({id: uuidv4(), name:"init Graph from url",  url: url,  status: "start", store: this.$store})
        this.$store.commit('ipgs/addGraphs', [g])
        this.$store.commit('ipgs/workersRemove', worker)
      }




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
