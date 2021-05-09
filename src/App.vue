<template>
  <div id="app">
    <Navbar size="sm" />
    <p v-for="w in workers" :key="w.id">{{w.action}}</p>
    <b-spinner variant="primary" style="z-index:6" class="ml-auto" :title="w.action" v-for="w in workers" :key="w.id"></b-spinner>

    <Graphs />
    <transition name="slide">
      <router-view/>
    </transition>

    <SolidTrackSession />
    <HelpView />
    <small>0.0.5c1 - replace file</small>
  </div>
</template>
<script>
import IpgsMixin from '@/mixins/IpgsMixin'

export default {
  name: 'App',
  mixins: [IpgsMixin],
  components: {
    'Navbar': () => import('@/components/layout/Navbar'),
    'SolidTrackSession': () => import('@/components/solid/SolidTrackSession'),
    'HelpView': () => import('@/views/HelpView'),
    'Graphs': () => import('@/components/graphs/Graphs'),
    //  'Fab': () => import('@/components/basic/Fab.vue')
  },
  async created(){
    this.checkQueryUrl()
  },
  watch:{
    $route (){
      this.checkQueryUrl()
    },
  },
  computed: {
    workers: {
      get () { return this.$store.state.ipgs.workers},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>
