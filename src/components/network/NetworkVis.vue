<template>

  <div class="wrapper">

    <network
    id="network"
    class="network"
    ref="network"
    :nodes="network.nodes"
    :edges="network.edges"
    :options="network.options"

    @select-node="selectNodeEvent"

    @nodes-add="addNodeEvent"

    @click="networkClickEvent"

    ></network>
    <!--

    @select-edge="networkEvent"
    @nodes-remove="networkEvent"
    @edges-remove="networkEvent"
    @nodes-update="networkEvent"
    @edges-mounted="networkEvent"
    @edges-add="networkEvent"
    @edges-update="networkEvent"
    @edges-remove="networkEvent('edges-remove')"
    @nodes-remove="networkEvent('nodes-remove')"



    @before-drawing="drawBg"
    @double-click="networkEvent('doubleClick')"
    @oncontext="networkEvent('oncontext')"
    @hold="networkEvent('hold')"
    @release="networkEvent('release')"
    @select="networkEvent('select')"
    @select-node="networkEvent('selectNode')"
    @select-edge="networkEvent('selectEdge')"
    @deselect-node="networkEvent('deselectNode')"
    @deselect-edge="networkEvent('deselectEdge')"
    @drag-start="networkEvent('dragStart')"
    @dragging="networkEvent('dragging')"
    @drag-end="networkEvent('dragEnd')"
    @hover-node="networkEvent('hoverNode')"
    @blur-node="networkEvent('blurNode')"
    @hover-edge="networkEvent('hoverEdge')"
    @blur-edge="networkEvent('blurEdge')"
    @zoom="networkEvent('zoom')"
    @show-popup="networkEvent('showPopup')"
    @hide-popup="networkEvent('hidePopup')"
    @start-stabilizing="networkEvent('startStabilizing')"
    @stabilization-progress="networkEvent('stabilizationProgress')"
    @stabilization-iterations-done="networkEvent('stabilizationIterationsDone')"
    @stabilized="networkEvent('stabilized')"
    @resize="networkEvent('resize')"
    @init-redraw="networkEvent('initRedraw')"

    @after-drawing="networkEvent('afterDrawing')"
    @animation-finished="networkEvent('animationFinished')"
    @config-change="networkEvent('configChange')"
    @nodes-mounted="networkEvent('nodes-mounted')"
    @nodes-add="networkEvent('nodes-add')"
    @nodes-update="networkEvent('nodes-update')"
    @nodes-remove="networkEvent('nodes-remove')"
    @edges-mounted="networkEvent('edges-mounted')"
    @edges-add="networkEvent('edges-add')"
    @edges-update="networkEvent('edges-update')"
    @edges-remove="networkEvent('edges-remove')"
  -->
  <!-- <img
  id="scream"
  src="north_pole.png"
  style="display: none;"
  alt="Noth Pole"
  />

  <button @click="addNode">Add node</button>
  <button @click="addEdge">Add edge</button>
  <button @click="resetNetwork">Reset Network</button>
  <button @click="removeNode">Remove Node</button>
  <button @click="removeEdge">Remove Edge</button> -->
  <!-- <div class="events">
  <p>
  Network events:
  <br />
  {{networkEvents}}
</p>
</div> -->
<NetworkPopups :network="network" />
</div>
</template>

<script>
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";

import NetMixin from '@/mixins/NetMixin'
import NetworkEvent from '@/mixins/NetworkEventMixin'

// see mixins/ NetMixin.js for cid cid_config
let defNodes = [
  { id: 'n1', label: "Ipgs", color: {background: 'red'}, shape: 'circle' },
  { id: 'n2', label: "WebApp", color: {background: 'green'}, shape: 'star', cid: 40 },
  { id: 'n3', label: "InterPlanetary Graph System", shape: 'box'},
  { id: 'n4', label: "Mindmap App", cid: 40 },
  { id: 'n5', label: "To know how to use Ipgs,\n type /h in the top input box and hit Enter", shape: 'box', color: "#ECC046", cid: 1},
  { id: 'n6', label: "Pour savoir comment utiliser Ipgs,\n tapez /h dans le champ de saisie tout en haut", shape: 'box', color: "#ECC046", cid: 1 },
  { id: "https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld", label: "-> Archipel Semapps", shape: 'box', color: '#7FD1B9', cid: 2},
  { id: "https://spoggy-test9.solidcommunity.net/public/", label: "-> Spoggy-test9 Public Folder", shape: 'box', color: '#7FD1B9', cid: 2},

]

let defEdges = [
  { id: 'e1', from: 'n1', to: 'n2', label: 'type' },
  { id: 'e2', from: 'n1', to: 'n3', label: 'name' },
  { id: 'e3', from: 'n1', to: 'n4', label: 'type' },
  { id: 'e4', from: 'n1', to: 'n5', label: 'help' },
  { id: 'e5', from: 'n1', to: 'n6', label: 'help' },
  { id: 'e6', from: 'n1', to: "https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld", label: "example"},
  { id: 'e7', from: 'n1', to: "https://spoggy-test9.solidcommunity.net/public/", label: "example"}
]


export default {
  name: "NetworkVis",
  mixins: [NetworkEvent, NetMixin],
  components: {
    //  Network,
    'NetworkPopups': () => import('@/components/network/NetworkPopups'),
    // 'network': () => import('vue-vis-network')
  },
  data(){
    return{
      network: {
        nodes: defNodes.slice(0),
        edges: defEdges.slice(0),
        options: {
          nodes: {
            shape: "dot",
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
            tooltipDelay: 200,
            hideEdgesOnDrag: true,
          },
        },
        options1: {
          interaction: {
            navigationButtons: true,
          },
          //  manipulation: true,
          nodes: {
            // shape: "circle",
            // size:24,
            // color: {
            //   background: '#D2E5FF',
            //   border: '#2B7CE9',
            //   highlight: {
            //     border: 'black',
            //     background: 'white'
            //   },
            // hover: {
            //   border: 'orange',
            //   background: 'grey'
            // }
            //  },
            font:{color:'black'},
            // shapeProperties: {
            //   useBorderWithImage:true
            // }
          },
          edges: {
            arrows: 'to',
            //  color: 'lightgray'
          },
        }
      }
    }
  },




}
</script>

<style>
/* * {
font-family: sans-serif;
} */

/* .wrapper {
padding: 20px 50px;
text-align: center;
} */
/* .events {
text-align: left;
height: 70px;
} */

.network{
  min-height: 95vh;
  border: 1px solid black;
  background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
  padding: 10px;
  height: 95vh;
}
.vis-label{
  color: black;

}

/* @media only screen and (max-width: 600px) {
.vis-label {
display: none;
}
.vis-button:after {
content:"°°"
}
} */
</style>
