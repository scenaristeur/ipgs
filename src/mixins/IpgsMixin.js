import GraphMixin from '@/mixins/GraphMixin'
import WorkerMixin from '@/mixins/WorkerMixin'

export default {
  mixins: [WorkerMixin, GraphMixin],
  mounted(){
    this.storage = this.$store.state.solid.storage
  },
  methods: {
    async loadStorage(){
      if (this.storage != null){
        let w_storage = this.w_start("Loading Pod Storage")
        this.createGraph({name:"init Graph from storage",  url: this.storage})

        this.w_kill(w_storage)
      }
    },
    async  checkQueryUrl() {
      this.w_init()
      if (this.$route.query.url != undefined && this.$route.query.url.length > 0){
        let url = this.$route.query.url
        let worker_url = this.w_start("Loading "+url)
        this.createGraph({name:"init Graph from url",  url: url})

        this.w_kill(worker_url)
      }
    },
  },
  watch:{
    storage(n, o){
      console.log("new,old",n,o)
      this.loadStorage()
    }
  },
  computed: {
    storage: {
      get () { return this.$store.state.solid.storage},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
