import { v4 as uuidv4 } from 'uuid';

export default {
  methods:{
    w_init(){
      this.$store.commit('ipgs/workersInit')
    },
    w_start(action) {
      let w = {id: uuidv4(), action: action}
      this.$store.commit('ipgs/workersAdd', w)
      return w.id
    },
    w_kill(w){
      this.$store.commit('ipgs/workersRemove', w.id)
    }
  }
}
