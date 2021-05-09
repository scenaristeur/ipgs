<template>
  <div>

    <b-list-group class="graphlist">
      <b-list-group-item>Default list group item</b-list-group-item>
      <b-list-group-item variant="primary">Primary list group item</b-list-group-item>
      <b-list-group-item variant="secondary">Secondary list group item</b-list-group-item>
      <b-list-group-item variant="success">Success list group item</b-list-group-item>
      <b-list-group-item variant="danger">Danger list group item</b-list-group-item>
      <b-list-group-item variant="warning">Warning list group item</b-list-group-item>
      <b-list-group-item variant="info">Info list group item</b-list-group-item>
      <b-list-group-item variant="light" v-for="g in graphs" :key="g.id">{{g.name}}</b-list-group-item>
      <b-list-group-item variant="dark">Dark list group item</b-list-group-item>
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
