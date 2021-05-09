import Source from '@/models/Source'
import { v4 as uuidv4 } from 'uuid';

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


        if (url.startsWith('ipfs://') ){
          const CID = url.replace('ipfs://', '')
          console.log(CID)
          this.loadIpfs(CID)
        }

        else{
          await this.load({name:"Query_url", url:url})
        }
      }else{
        this.storage = this.$store.state.solid.storage
        //console.log(this.storage)
        if (this.storage != null){
          console.log("load storage",this.storage)
          await this.load({name:"Storage", url:this.storage})
        }
      }
    },
    async loadIpfs(cid){

      try {
        // Await for ipfs node instance.
        this.ipfs = await this.$ipfs;
        console.log(this.ipfs)
        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        const { agentVersion, id } = await this.ipfs.id();
        console.log(agentVersion);
        console.log(id);
        // Set successful status text.
        console.log("Connected to IPFS =)")
        console.log(cid)
        const stream =  await this.ipfs.cat(cid)
        let data = ''
        console.log("st",stream)
        for await (const chunk of stream) {
          console.log(chunk)
          // chunks of data are returned as a Buffer, convert it back to a string
          data += chunk.toString()
        }
        //  this.restit = data
        console.log(data)
        console.info("must take a look at this solution if always preload error: https://github.com/ipfs/js-ipfs/issues/1481")

        try{
          let d = JSON.parse(data)
          console.log(d)
          d.id = uuidv4()
          d.name = "an ipfs network"
          if (Array.isArray(d.nodes) && Array.isArray(d.edges) && d.nodes.length > 0){
            this.$store.commit('ipgs/addGraphs', [d])

          }

        }catch(e){
          console.log("i can't parse", data)
        }



      } catch (err) {
        // Set error status text.
        console.log(`Error: ${err}`);
      }


    },
    async load(s){

      console.log("TODO, find another way to not clear the graph when navig with Solid folder, and allow expanding when clicking on a node for ldp semapps container")
      let g = {network: {nodes:[], edges: []}}
      g.id = uuidv4()
      g.name = "find another way to not clear the graph when navig with Solid folder"

      this.$store.commit('ipgs/addGraphs', [g])

      this.$store.commit('ipgs/spinnerAdd')

      let sources = []
      sources.push(s)
      let source = new Source(sources)
      let graphs = await source.load()
      console.log(graphs)
      this.$store.commit('ipgs/addGraphs', graphs)
      //       this.$router.push(({ name: 'Network', query: { url: this.$route.query.url } }))

      this.$store.commit('ipgs/spinnerRemove')
    }
  }

}
