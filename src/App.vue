<template>
  <b-container fluid id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <SolidLoginButton />
    </div>
    <router-view/>
    <SolidTrackSession />
  </b-container>
</template>
<script>

export default {
  name: 'App',
  components: {
    //  'Contacts': () => import('@/views/Contacts'),
    'SolidTrackSession': () => import('@/components/solid/SolidTrackSession'),
    'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),

    //  'Fab': () => import('@/components/basic/Fab.vue')
}
}
</script>

<style>
#app {
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
}
</style>
