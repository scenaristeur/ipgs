<template>
  <div>
    <NodeModal :node="node" @ok="saveNode"/>
    <EdgeModal :edge="edge" @ok="saveEdge"/>
    <ImportModal />
    <ExportModal />
  </div>
</template>

<script>
export default {
  name: "NetworkPopups",
  props: ['network'],
  components: {
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),
    'ImportModal': () => import('@/components/network/ImportModal'),
    'ExportModal': () => import('@/components/network/ExportModal'),
  },
  data() {
    return {
      node: {label: "", color: {  background: '#D2E5FF', border: '#2B7CE9'}, shape: 'ellipse', props: []},
      edge: {},
      n: null
    }
  },
  created(){
    this.n = this.network
  },
  computed: {
    action: {
      get () { return this.$store.state.ipgs.action},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  methods: {
    saveNode(n) {
      var index = this.network.nodes.findIndex(x => x.id==n.id);
      index === -1 ? this.n.nodes.push(n) : Object.assign(this.network.nodes[index], n)
    },
    saveEdge(e){
      var index = this.network.edges.findIndex(x => x.id==e.id);
      index === -1 ? this.n.edges.push(e) : Object.assign(this.network.edges[index], e)
    },
  },
  watch:{
    action(){
      switch (this.action.action) {
        case 'editNode':
        this.node = this.network.nodes.find(x => x.id==this.action.node.id) || this.action.node
        this.$bvModal.show("node-popup")
        break;
        case 'editEdge':
        this.edge = this.network.nodes.find(x => x.id==this.action.edge.id) || this.action.edge
        this.$bvModal.show("edge-popup")
        break;
        case 'import':
        this.$bvModal.show("import-popup")
        break;
        case 'export':
        this.$store.commit('ipgs/setEditorContent', {content: {nodes: this.network.nodes, edges: this.network.edges}, format: 'json'})
        this.$bvModal.show("export-popup")
        break;
        default:
      }
    },
  }
}
</script>
