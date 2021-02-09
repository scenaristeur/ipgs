<template>
  <b-modal id="edge-popup"
  title="Edge"
  hide-backdrop content-class="shadow"
  @ok="addEdgeModal" >
  <b-input-group size="sm" prepend="Label">
    <b-form-input v-model="value.label" autofocus v-on:keyup.enter="addEdgeModal"></b-form-input>
  </b-input-group>
</b-modal>
</template>
<script>

export default {
  name: 'EdgeModal',
  props: ['value'],
  methods: {
    addEdgeModal(){
      console.log(this.value)
      this.$emit('ok', this.value)
      this.$bvModal.hide("edge-popup")
    }
  },
}
</script>
