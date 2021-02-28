<template  >
  <b-button-toolbar  key-nav justify aria-label="Network Tool Bar" >
    <!-- <b-button-group class="mx-1" size="sm" >
    <b-button @click="addNode" variant="outline-info">Add a node</b-button>
    <b-button @click="addEdge" variant="info">Add an Edge</b-button>
  </b-button-group> -->
  <b-dropdown class="mx-1" right text="graph" variant="info">
    <b-dropdown-item>export</b-dropdown-item>
    <b-dropdown-item>save to pod</b-dropdown-item>
    <b-dropdown-item>share</b-dropdown-item>
  </b-dropdown>
  <!-- <b-button-group class="mx-1">
  <b-button>Edit</b-button>
  <b-button>Undo</b-button>
  <b-button>Redo</b-button>
</b-button-group>
<b-button-group class="mx-1">
<b-button>&rsaquo;</b-button>
<b-button>&raquo;</b-button>
</b-button-group> -->
</b-button-toolbar>

</template>

<script>
export default {
  name: 'NetworkToolBar',
  methods: {
    // addNode() {
    //   this.$bvModal.show("node-popup")
    // },
    // addEdge(){
    //   this.$bvModal.show("edge-popup")
    // }
  }

}
</script>

<style>
/* .network-tool-bar {
background-color: white;
color: red;
position: relative;
top: 200px;
left: 0px;
width: 50%;
} */

</style>
