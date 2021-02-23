<template>
  <b-modal id="node-popup" title="Node"
  no-close-on-backdrop  content-class="shadow"
  @ok="addNodeModal">
  <b-input-group size="sm" prepend="Label">
    <b-form-input v-model="value.label" autofocus v-on:keyup.enter="addNodeModal"></b-form-input>
  </b-input-group>

      <b-form-select v-model="value.node_type" :options="node_types" size="sm" class="mt-3"></b-form-select>

  <!-- Using value -->
  <!-- <b-button v-b-toggle="'collapse-node-id'" class="m-1" variant="primary" size ="sm">Id</b-button>
  <b-button v-b-toggle="'collapse-node-shape'" class="m-1" variant="dark" size="sm">Shape</b-button>
  <b-button v-b-toggle="'collapse-node-expert'" class="m-1" variant="light" size="sm">Expert</b-button> -->

  <!-- Element to collapse -->
  <b-collapse id="collapse-node-id">
    <b-card>
      <b-input-group size="sm" prepend="Id">
        <b-form-input v-model="value.id"></b-form-input>
      </b-input-group>
    </b-card>
  </b-collapse>

  <b-collapse id="collapse-node-shape">
    <b-card>
      <b-input-group size="sm" prepend="shape">
        <b-form-input v-model="value.id"></b-form-input>
      </b-input-group>
    </b-card>
  </b-collapse>

  <b-collapse id="collapse-node-expert">

    <b-input-group size="sm" prepend="expert">
      <b-form-input v-model="value.id"></b-form-input>
    </b-input-group>

  </b-collapse>

</b-modal>
</template>
<script>

export default {
  name: 'NodeModal',
  props: ['value'],
  mounted(){
    console.log(this.value)
     this.value.node_type == undefined ? this.value.node_type = 'default' : ""
  },
  data() {
    return {
      node_type: "default",
      node_types: [
        { value: null, text: 'Please select some item' },
        {value: "default", text: "Default"},
        {value: "folder", text: "Folder"},
        {value: "file", text: "File"},
        {value: "actor", text: "Actor"},
        {value: "remote", text: "Remote"}
      ]
    }
  },

  methods: {
    addNodeModal(){
      console.log(this.value)
      this.$emit('ok', this.value)
      this.$bvModal.hide("node-popup")
    }
  },
}
</script>
