<template>
  <div id="app">

    <!-- <Navbar size="sm" /> -->
    <!-- <b-button variant="outline-success">Button</b-button>
    <b-button variant="info">Button</b-button> -->


    <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |

  </div> -->

  <transition name="slide">
    <router-view/>
  </transition>

  <SolidTrackSession />
  <!--<HelpView /> -->
</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    // 'Navbar': () => import('@/components/layout/Navbar'),
     'SolidTrackSession': () => import('@/components/solid/SolidTrackSession'),
    // 'HelpView': () => import('@/views/HelpView'),
    //  'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),
    //  'Fab': () => import('@/components/basic/Fab.vue')
  },
  created(){
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log(this.url)
      //  this.$router.push(({ name: 'Network', query: { url: this.url } }))
    }
  },
  methods: {
    onCommand(data) {
      console.log(data)
    }
  },
  computed: mapState({
    webId: s => s.solid.webId
  }),

}
</script>

<style>
/* #app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}

#nav {
padding: 30px;
}

#nav a {
font-weight: bold;
color: #2c3e50;
}

#nav a.router-link-exact-active {
color: #42b983;
} */
</style>
