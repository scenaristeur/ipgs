<template>
  <div>
    <NodeModal :node="node" @ok="saveNode"/>
    <EdgeModal :edge="edge" @ok="saveEdge"/>
    <ImportModal />
    <ExportModal />
    <PropertiesPopup />
  </div>
</template>

<script>
export default {
  name: "NetworkPopups",
  props: ['nodes', 'edges'],
  components: {
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),
    'ImportModal': () => import('@/components/network/ImportModal'),
    'ExportModal': () => import('@/components/network/ExportModal'),
    'PropertiesPopup': () => import('@/components/network/PropertiesPopup'),
  },
  data() {
    return {
      node: {label: "", color: {  background: '#D2E5FF', border: '#2B7CE9'}, shape: 'ellipse', props: []},
      edge: {},
      n: null
    }
  },
  created(){
    this.n_list = this.nodes
    this.e_list = this.edges
  },
  computed: {
    action: {
      get () { return this.$store.state.ipgs.action},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  methods: {
    saveNode(n) {
      this.nodes.update(n)
      // var index = this.nodes.findIndex(x => x.id==n.id);
      // index === -1 ? this.n_list.push(n) : Object.assign(this.nodes[index], n)
    },
    saveEdge(e){
      console.log(e)
      this.edges.update(e)
      // var index = this.edges.findIndex(x => x.id==e.id);
      // index === -1 ? this.e_list.push(e) : Object.assign(this.edges[index], e)
    },
  },
  watch:{
    action(){
      console.log(this.action)

      switch (this.action.action) {
        case 'editNode':
        this.node = this.nodes.get(this.action.node.id) || this.action.node
        console.log("props",this.node.props)
        this.$bvModal.show("node-popup")
        break;
        case 'editEdge':
        console.log(this.action.edge)
        this.edge = this.action.edge
        console.log("props",this.edge.props)
        this.$bvModal.show("edge-popup")
        break;
        case 'import':
        this.$bvModal.show("import-popup")
        break;
    
        default:
      }
    },
  }
}
</script>
