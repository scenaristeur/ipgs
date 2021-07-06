<template>
  <div>
    <b-button v-b-modal.filter size="sm" :variant="'outline-'+variant" >
      <b-icon-filter-circle  :variant="variant" ></b-icon-filter-circle>
    </b-button>

    <b-modal id="filter" title="Filter" no-cancel no-close-on-backdrop hide-backdrop content-class="shadow" >
      <p class="my-4">Select the properties you want to see!</p>
      <div v-for="(value, name) in filtre" :key="name">

        <b-form-checkbox
        v-model="value.display"
        @change="update"
        >{{ name }} ({{ value.nb }}) {{ value.display}}
      </b-form-checkbox>
    </div>

  </b-modal>
</div>
</template>

<script>
export default {
  name: 'EdgeFilterModal',
  props: {
    variant: {
      type: String,
      default: "danger"
    },
  },
  data(){
    return{
      filtre: {}
    }
  },
  methods:{
    update(){
      console.log(this.filtre)
      this.edgeFilter = this.filtre
    //  this.$store.commit('ipgs/setEdgeFilter', this.edgeFilter)
    }
  },
  watch:{
    edgeFilter(){
      console.log(this.edgeFilter)
      this.filtre = this.edgeFilter
    }
  },
  computed: {
    edgeFilter: {
      get () { return this.$store.state.ipgs.edgeFilter},
      set (value) { this.$store.commit('ipgs/setEdgeFilter', value) }
    },
  },
}
</script>

<style>

</style>
