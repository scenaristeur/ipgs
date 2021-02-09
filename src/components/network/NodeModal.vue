<template>
  <b-modal id="node-popup" title="Node"
  no-close-on-backdrop  content-class="shadow"
  @ok="addNodeModal">
  <b-input-group size="sm" prepend="Label">
    <b-form-input v-model="value.label" autofocus v-on:keyup.enter="addNodeModal"></b-form-input>
  </b-input-group>
</b-modal>
</template>
<script>

export default {
  name: 'NodeModal',
  props: ['value'],
  methods: {
    addNodeModal(){
      this.$emit('ok', this.value)
      this.$bvModal.hide("node-popup")
    }
  },
}
</script>
