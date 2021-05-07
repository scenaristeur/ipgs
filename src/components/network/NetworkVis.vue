<template>
  <div>

    <div ref="container"  class="vis-container">
      <div ref="vis" class="vis-root" />
    </div>

  </div>
</template>

<script>
import { DataSet } from 'vis-data/peer'
import { Network } from 'vis-network/peer'
import 'vis-network/styles/vis-network.css'

export default {
  name: 'NetworkVis',
  data(){
    return {
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
          stabilization: false,
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
