<template>
  <div>
    <b-form-select v-model="level" :options="options"></b-form-select>
    <Network :source="source" />
    storage : {{ storage}}<br>
    source: {{ source}}
  </div>
</template>

<script>
export default {
  name:"Net",
  components: {
    'Network': () => import('@/components/levels/Network'),
  },
  data() {
    return {
      level: null,
      source : null,
      options: [
        { value: null, text: 'Please select an option', disabled: true },
        { value: 'world', text: 'world' },
        { value: 'pod', text: 'pod' },
        { value: 'resource', text: 'resource' },
        { value: 'node', text: 'node' },
        { value: 'edge', text: 'edge' }
      ]
    }
  },
  watch:{
    level(){
      console.log(this.level)
      switch (this.level) {
        case 'pod':
        if (this.storage ==  null){
          alert("You must login or provide the url to explore")
          return
        }

        this.source = this.storage
        console.log(this.source)
        break;
        default:
        this.source = null
      }
    }
  },
  computed: {
    storage: {
      get () { return this.$store.state.solid.storage},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
