<template>
  <b-container>
    <b-jumbotron>
      <template #header>Inter Planetary Graph System</template>
      <template #lead>
        Store and share your ideas as mindmaps  on your <a href="https://forum.solidproject.org/" target="_blank">Solid Pod</a>.
      </template>

      <hr class="my-4">


      <b-button @click="showHelp" variant="primary">Help / How to use</b-button>

      <ul>
        <li><a href="https://forum.solidproject.org/t/ipgs-interplanetary-graph-system/3950" target="_blank">Discussion, suggestions</a></li>
        <li>  <a href="https://github.com/scenaristeur/ipgs/" target="_blank">Source Code</a></li>
      </ul>

      <b-button to="/">Graph</b-button> <b-button to="/browser">Browser</b-button>
      <iframe width="100%" height="400px" src="https://www.youtube.com/embed/f4uKb6EnDKs?start=2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    </b-jumbotron>


  </b-container>
</template>

<script>
export default {
  name: "HelpView",
  methods: {
    showHelp(){
      this.$store.commit('ipgs/setInputObject', {type:'commande', value: '/h'})
    }
  }
}
</script>
