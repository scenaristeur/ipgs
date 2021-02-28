// import Network from '@/models/Network.js'
// import Loader from '@/util/Loader.js'

export default {
  data() {
    return {
      // loader: new Loader(),
      networkEvents: "",
      somethingSelected: false
    }
  },
  async created(){
    //this.network = new Network()
  },
  computed: {

  },
  methods: {
    onNetworkClick(e){
      console.log(e)
      if (this.somethingSelected == false){
        switch (e) {
          case undefined:
          this.$store.commit('ipgs/setAction', {action: 'newNode', node: { shape: 'ellipse', created: new Date()}})
          break;
          default:
          console.log("TODO",e)
        }
      }
      this.somethingSelected = false
    },
    onNetworkSelect(e){
      this.somethingSelected = true
      console.log(e)
    },
    onNodeSelect(e){
      this.somethingSelected = true
      console.log(e)
      this.$store.commit('ipgs/setAction', {action: 'editNode', node: { id: e.nodes[0],modified: new Date()}})

    },
    onEdgeSelect(e){
      this.somethingSelected = true
      console.log(e)
    },

    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
      console.log(this.networkEvents)
    },

  },
  watch:{

  }


}
