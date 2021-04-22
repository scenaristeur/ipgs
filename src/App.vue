<template>
  <div id="app">
    <Navbar size="sm" />
    <b-spinner variant="primary" style="z-index:6" class="ml-auto" v-if="spinner>0"></b-spinner>
    <transition name="slide">
      <router-view/>
    </transition>

    <SolidTrackSession />
    <HelpView />
    <small>0.0.4 - show props</small>
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
    spinner: {
      get () { return this.$store.state.ipgs.spinner},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>
