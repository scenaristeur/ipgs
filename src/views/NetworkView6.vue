<template>
  <div class="wrapper">

    <network
    id="network"
    class="network"
    ref="network"
    :nodes="network.nodes"
    :edges="network.edges"
    :options="network.options"
    @click="networkEvent('click')"
    @select-node="onSelectNode"
    @select-edge="networkEvent('selectEdge')"
    @nodes-remove="onRemoveNodes"
    @edges-remove="onRemoveEdges"
    @nodes-add="sendUpdate"
    @nodes-update="sendUpdate"
    @edges-mounted="sendUpdate"
    @edges-add="sendUpdate"
    @edges-update="sendUpdate"


    ></network>
    <!--
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
// import { Network } from "vue-vis-network";
// import "vis-network/dist/dist/vis-network.min.css";

import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";

import NetMixin from '@/mixins1/NetMixin'

let defNodes = [
  { id: 'n1', label: "Ipgs", color: {background: 'red'}, shape: 'circle' },
  { id: 'n2', label: "WebApp", color: {background: 'green'}, shape: 'star' },
  { id: 'n3', label: "InterPlanetary Graph System" },
  { id: 'n4', label: "Mindmap App" },
  { id: 'n5', label: "To know how to use Ipgs, type /h in the top input box and hit Enter", shape: 'box'},
  { id: 'n6', label: "Pour savoir comment utiliser Ipgs, tapez /h dans le champ de saisie tout en haut", shape: 'box' }
]

let defEdges = [
  { id: 'e1', from: 'n1', to: 'n2', label: 'type' },
  { id: 'e2', from: 'n1', to: 'n3', label: 'long name' },
  { id: 'e3', from: 'n1', to: 'n4', label: 'category' },
  { id: 'e4', from: 'n1', to: 'n5', label: 'help EN' },
  { id: 'e5', from: 'n1', to: 'n6', label: 'help FR' }
]

export default {
  name: 'NetworkView',
  mixins: [NetMixin],
  components: {
    //  Network,
    'NetworkPopups': () => import('@/components/network/NetworkPopups'),
    // 'network': () => import('vue-vis-network')
  },
  data: () => ({
    sockets: [],
    networkEvents: "",
    network: {
      nodes: defNodes.slice(0),
      edges: defEdges.slice(0),
      options: {
        interaction: {
          navigationButtons: true,
        },
        //  manipulation: true,
        nodes: {
          // shape: "circle",
          // size:24,
          color: {
            background: '#D2E5FF',
            border: '#2B7CE9',
            highlight: {
              border: 'black',
              background: 'white'
            },
            // hover: {
            //   border: 'orange',
            //   background: 'grey'
            // }
          },
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
  }),
  methods: {

    // drawBg(ctx) {
    //   let mapBgWidth = document.getElementById("scream").width;
    //   let mapBgHeight = document.getElementById("scream").height;
    //
    //   ctx.drawImage(
    //     document.getElementById("scream"),
    //     -mapBgWidth / 2,
    //     -mapBgHeight / 2
    //   );
    // },
    networkEvent(eventName) {
      console.log(eventName, this.network)

      // if (this.networkEvents.length > 500) this.networkEvents = "";
      // this.networkEvents += `${eventName}, `;
    },
    // addNode() {
    //   const id = new Date().getTime();
    //   this.network.nodes.push({ id, label: "New node" });
    // },
    // addEdge() {
    //   const n1 = Math.floor(Math.random() * this.network.nodes.length);
    //   const n2 = Math.floor(Math.random() * this.network.nodes.length);
    //   this.network.edges.push({
    //     id: `${this.network.nodes[n1].id}-${this.network.nodes[n2].id}`,
    //     from: this.network.nodes[n1].id,
    //     to: this.network.nodes[n2].id
    //   });
    // },
    // resetNetwork() {
    //   this.network = {
    //     nodes: defNodes.slice(0),
    //     edges: defEdges.slice(0),
    //     options: {}
    //   };
    // },
    // removeNode() {
    //   this.network.nodes.splice(0, 1);
    // },
    // removeEdge() {
    //   this.network.edges.splice(0, 1);
    // }
  }
};
</script>

<style>
* {
  font-family: sans-serif;
}

/* .wrapper {
padding: 20px 50px;
text-align: center;
} */
.events {
  text-align: left;
  height: 70px;
}

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
