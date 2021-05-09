<template>
  <div>

    <b-list-group class="graphlist">
      <b-list-group-item variant="info" v-for="g in graphs" :key="g.id">{{ g.id}}: {{g.name}}</b-list-group-item>
    </b-list-group>
      <!-- {{ graphs}} -->
  </div>
</template>

<script>
export default {
  name:'GraphsList',
  computed: {
    graphsPanelShow: {
      get () { return this.$store.state.ipgs.graphsPanelShow},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    graphs: {
      get () { return this.$store.state.ipgs.graphs},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>
.graphlist{
  width:600px;
  overflow-y:scroll;
  position:relative;
  height: 300px;
}
</style>
