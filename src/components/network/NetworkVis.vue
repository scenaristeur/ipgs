<template>
  <div>

    <div ref="container"  class="vis-container">
      <div ref="vis" class="vis-root" />
    </div>
    <NetworkPopups :nodes="nodes" :edges="edges" />
  </div>
</template>

<script>
import { DataSet } from 'vis-data/peer'
import { Network } from 'vis-network/peer'
import 'vis-network/styles/vis-network.css'
import NetMixin from '@/mixins/NetMixin'
import NetworkEvent from '@/mixins/NetworkEventMixin'

let cid_config = {
  // Standard
  1: { id: "help", label: "Help / Aide"},
  2: { id: "examples", label: "Examples", shape: 'star', color: '#7FD1B9'},
  //Vis
  5: { id: "networks", label: "Networks"},
  6: { id: "history", label: "Navigation History"},
  //Solid
  20: { id: "storage", label: "Storage"},
  21: { id: "profile", label: "User Profile"},
  22: { id: "friends", label: "Solid Friends"},
  //Data
  30: { id: "sources", label: "Data Sources"},
  // Types
  40: { id: "type", label: "Types"},
  41: { id: "literal", label: "Literals"},
  42: { id: "resource", label: "Resources"},
  43: { id: "actors", label: "Persons or Actors / Agents"},
  // Forms
  50: { id: "input", label: "Inputs"},
  51: { id: "checkbox", label: "Checkboxes"},
}



export default {
  name: 'NetworkVis',
  mixins: [NetworkEvent, NetMixin],
  components: {
    //  Network,
    'NetworkPopups': () => import('@/components/network/NetworkPopups'),
    // 'network': () => import('vue-vis-network')
  },
  data(){
    return {
      nodes: [],
      edges: [],
      options: {
        locale: navigator.language,
        manipulation: true,
        nodes: {
          //  shape: "dot",
          scaling: {
            min: 10,
            max: 30,
          },
          font: {
            size: 12,
            face: "Tahoma",
          },
        },
        edges: {
          arrows: 'to',
          width: 0.15,
          color: { inherit: "from" },
          font: {
            align: 'top'
          },
          smooth: {
            type: "continuous",
          },
        },
        physics: {
        //  stabilization: false,
          stabilization : {onlyDynamicEdges: true},
          barnesHut: {
            gravitationalConstant: -8000, //-8000
            springConstant: 0.03, //0.001 //0.01
            springLength: 100, //200
          },
        },
        interaction: {
          navigationButtons: true,
          //  tooltipDelay: 200,
          hideEdgesOnDrag: true,
        },
      },
    }
  },
  mounted(){
    const container = this.$refs.container
    const options = this.options
    // Create and fill datasets

    let app = this
    console.log(this.network)
    this.options.manipulation = {
      initiallyActive: true,
      addNode: async (node, callback) => { node.label = "" ; app.editNode(node, callback) },
      editNode: async (node, callback) => { app.editNode(node, callback) },
      addEdge: async (edge, callback) => { app.addEdge(edge, callback) },
      editEdge: { editWithoutDrag: async (edge, callback) => {app.editWithoutDrag(edge, callback)} }

      //  editEdge: async (edge, callback) => { app.editWithoutDrag(edge, callback) },
      //  editEdge: {}
    }

    const nodes = this.nodes = new DataSet([
      { id: 'n1', label: "Ipgs", color: {background: 'red'}, shape: 'circle' },
      { id: 'n2', label: "WebApp", color: {background: 'green'}, shape: 'star', cid: 40 },
      { id: 'n3', label: "InterPlanetary Graph System", shape: 'box'},
      { id: 'n4', label: "Mindmap App", cid: 40 },
      { id: 'n5', label: "To know how to use Ipgs,\n type /h in the top input box and hit Enter", shape: 'box', color: "#ECC046", cid: 1},
      { id: 'n6', label: "Pour savoir comment utiliser Ipgs,\n tapez /h dans le champ de saisie tout en haut", shape: 'box', color: "#ECC046", cid: 1 },
      { id: "https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld", label: "-> Archipel Semapps", shape: 'box', color: '#7FD1B9', cid: 2},
      { id: "https://spoggy-test9.solidcommunity.net/public/", label: "-> Spoggy-test9 Public Folder", shape: 'box', color: '#7FD1B9', cid: 2},

    ])

    const edges = this.edges = new DataSet([
      { id: 'e1', from: 'n1', to: 'n2', label: 'type' },
      { id: 'e2', from: 'n1', to: 'n3', label: 'name' },
      { id: 'e3', from: 'n1', to: 'n4', label: 'type' },
      { id: 'e4', from: 'n1', to: 'n5', label: 'help' },
      { id: 'e5', from: 'n1', to: 'n6', label: 'help' },
      { id: 'e6', from: 'n1', to: "https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld", label: "example"},
      { id: 'e7', from: 'n1', to: "https://spoggy-test9.solidcommunity.net/public/", label: "example"}
    ])
    // It's necessary to load the items now, otherwise the network would be labeld as ready before the items are visible.
    // this.replaceItems()
    // Create the network
    const net = new Network(this.$refs.vis, { nodes, edges }, options)
    this.net = net
    //      this.cleanUpCallbacks.push(() => {
    //   net.destroy()
    // })
    // Some labels contain placeholders for info from connected nodes.
    // Therefore this can't be done before the topology is built.
    // this.updateLabels()
    // this.cleanUpCallbacks.push(this.$store.subscribe(({ type, payload }, { data }) => {
    //   ;(this.storeActions[type] || (() => {}))(payload, data)
    // }))
    this.$emit('ready', { container, net, nodes, edges })

    var cids = [...new Set(this.nodes.map(item => item.cid))].filter(Boolean);
    console.log("cids",cids)
    //  var clusterOptionsByData = function(cid) ;
    // this.$refs.network is necessary to use network function
    cids.forEach((cid) => {
      this.net.cluster({
        joinCondition: function (childOptions) {
          return childOptions.cid == cid;
        },
        clusterNodeProperties: {
          id: cid_config[cid] && cid_config[cid].id ? cid_config[cid].id : cid,
          borderWidth: 3,
          shape: cid_config[cid] && cid_config[cid].shape ? cid_config[cid].shape : "box",
          color: cid_config[cid] && cid_config[cid].color ? cid_config[cid].color : "#ECC046",
          label: cid_config[cid] &&cid_config[cid].label ? cid_config[cid].label : "no name group"
        },
      });
    });

    this.net.on('selectNode', evt => {
      let nodeId = evt.nodes[0]

      let n = nodes.get(nodeId);
    this.$store.commit('ipgs/setCurrentItem', n)

    if ( this.net.isCluster(nodeId)){
      console.log("is cluster")
      this.net.openCluster(nodeId)
      return
    }

    if (nodeId.startsWith('http')){
      if (this.$route.query.url != nodeId){
        this.$router.push({ path: '/', query: { url: nodeId } })
      }else{
        alert ("you are already watching this resource !")
      }
    }else{
      this.$store.commit('ipgs/setCommandInput', n.label+' ')
    }




    })

    this.net.on('selectEdge', evt => {
      let e_id = evt.edges[0]

      let e = edges.get(e_id);
    this.$store.commit('ipgs/setCurrentItem', e)
    })

  },
  options (v) {
    this.net.setOptions(v)
  }
}
</script>

<style>
.vis-root{
  min-height: 95vh;
  border: 1px solid black;
  background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
  padding: 10px;
  height: 95vh;
  width: 100%;
}
.vis-label{
  color: black;

}
</style>
