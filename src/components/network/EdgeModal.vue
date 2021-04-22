<template>
  <b-modal id="edge-popup"
  title="Edge"
  hide-backdrop content-class="shadow"
  @ok="addEdgeModal" >
  <b-input-group size="sm" prepend="Label">
    <b-form-input v-model="v.label" autofocus v-on:keyup.enter="addEdgeModal"></b-form-input>
  </b-input-group>


  <div class="input-group" style="display:table; width:100%;">
    <!-- <b-button v-b-toggle="'collapse-node-vis'" class="m-1" variant="dark" size="sm">Vis</b-button> -->
    <b-button v-b-toggle="'collapse-node-props'" class="m-1" variant="dark" size="sm">Props</b-button>
  <!--
    <span style="display: table-cell; width: 190px;">
      <b-button @click="newGraphFromNode" class="m-1" variant="light" size="sm">New Graph from this node</b-button>
    </span> -->
  </div>



  <b-collapse id="collapse-node-props">
    <Properties :properties="v.props" @propsUpdated="onPropsUpdate"/>
  </b-collapse>

</b-modal>
</template>
<script>

export default {
  name: 'EdgeModal',
  props: ['edge'],
  components: {
    'Properties': () => import('@/components/network/Properties'),
  },
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
      console.log(this.v)
      this.$emit('ok', this.v)
      this.$bvModal.hide("edge-popup")
    },
    onPropsUpdate(props){
      this.v.props = props
    },
  },
  watch:{
    edge(){
        this.v = this.edge
    }
  },
}
</script>
