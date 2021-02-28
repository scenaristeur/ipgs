<template>
  <div>
    NetworkPopups : {{ JSON.stringify(action)}}
    <NodeModal v-model="node" @ok="saveNode"/>
  </div>
</template>

<script>
export default {
  name: "NetworkPopups",
  props: ['network'],
  components: {
    //    'Network': () => import ("vue-vis-network"),
    'NodeModal': () => import('@/components/network/NodeModal'),
    //  'EdgeModal': () => import('@/components/network/EdgeModal'),
  },
  data() {
    return {
      node: {}
    }
  },
  computed: {
    action: {
      get () { return this.$store.state.ipgs.action},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  methods: {
    saveNode(n) {
      console.log(n)
      var index = this.network.nodes.findIndex(x => x.id==n.id);
      index === -1 ? this.network.nodes.push(n) : Object.assign(this.network.nodes[index], n)
      console.log(this.network)
    }
  },
  watch:{
    action(){
      console.log(this.action)
      switch (this.action.action) {
        case 'newNode':
        this.node = this.action.node
        this.$bvModal.show("node-popup")
        break;
        case 'editNode':
        this.node = this.network.nodes.find(x => x.id==this.action.node.id);
        this.$bvModal.show("node-popup")
        break;
        default:

      }

    },
  }
}
</script>

<style>

</style>
