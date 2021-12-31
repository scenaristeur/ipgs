<template>
  <b-modal id="node-menu" title="Node Menu">
    id : {{ value.id }}<br>
    label: {{ value.label }}<br>
    <b-button @click="follow">FOLLOW</b-button>
    <b-button @click="edit">Edit</b-button>
    <!-- {{ JSON.stringify(value) }} -->
  </b-modal>

</template>

<script>
export default {
  name: "NodeMenu",
  props: ['value'],
  created(){
    console.log(this.value)
    // this.value.color == undefined ? this.value.color = {background: "#D2E5FF", border: "#2B7CE9"} : ""
    // this.value.node_type == undefined ? this.value.node_type = 'default' : ""
  },
  methods: {
    follow() {
      console.log("follow",this.value)
      this.$emit('follow', this.value)
      this.$bvModal.hide("node-menu")
    },
    edit(){
      this.$bvModal.hide("node-menu")
      this.$bvModal.show("node-modal")
      //    this.$bvModal.hide("node-menu")
    }
  }
}
</script>

<style>

</style>
