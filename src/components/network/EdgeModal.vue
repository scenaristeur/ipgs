<template>
  <b-modal id="edge-popup"
  title="Edge"
  hide-backdrop content-class="shadow"
  @ok="addEdgeModal" >
  <b-input-group size="sm" prepend="Label">
    <b-form-input v-model="v.label" autofocus v-on:keyup.enter="addEdgeModal"></b-form-input>
  </b-input-group>
</b-modal>
</template>
<script>

export default {
  name: 'EdgeModal',
  props: ['edge'],
data(){
  return {
    v: null
  }
},
  created(){
    this.v = this.edge
  },
  methods: {
    addEdgeModal(){
      this.$emit('ok', this.v)
      this.$bvModal.hide("edge-popup")
    }
  },
  watch:{
    edge(){
        this.v = this.edge
    }
  },
}
</script>
