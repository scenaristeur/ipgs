<template>
  <div>
    <!-- NetworkPopups : {{ JSON.stringify(action)}} -->
    <NodeModal v-model="node" @ok="saveNode"/>
    <EdgeModal v-model="edge" @ok="saveEdge"/>
  </div>
</template>

<script>
export default {
  name: "NetworkPopups",
  props: ['network'],
  components: {
    //    'Network': () => import ("vue-vis-network"),
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),
  },
  data() {
    return {
      node: {label: "boo", color: {  background: '#D2E5FF', border: '#2B7CE9'}, shape: 'ellipse'},
      edge: {}
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
    },
    saveEdge(e){
      console.log(e)
      var index = this.network.edges.findIndex(x => x.id==e.id);
      index === -1 ? this.network.edges.push(e) : Object.assign(this.network.edges[index], e)
    },
  },
  watch:{
    action(){
      console.log(this.action)
      console.log(this.action)
      switch (this.action.action) {
        // case 'newNode':
        // this.node = this.action.node
        // this.$bvModal.show("node-popup")
        // break;
        case 'editNode':
        this.node = this.network.nodes.find(x => x.id==this.action.node.id) || this.action.node
        console.log(this.node)
        this.$bvModal.show("node-popup")
        break;
        case 'editEdge':
        this.edge = this.network.nodes.find(x => x.id==this.action.edge.id) || this.action.edge
        this.$bvModal.show("edge-popup")
        break;
        default:

      }

    },
  }
}
</script>

<style>

</style>
