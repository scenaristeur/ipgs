<template>
  <div class="wrapper">
    <network
    class="network"
    ref="network"
    :nodes="network.nodes"
    :edges="network.edges"
    :options="network.options"
    @click="networkEvent('click')"

    ></network>
    <!--       @before-drawing="drawBg"
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
  <div class="events">
    <p>
      Network events:
      <br />
      {{networkEvents}}
    </p>
  </div>
  <NetworkPopups :network="network" />
</div>
</template>

<script>
import { Network } from "vue-vis-network";
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import NetMixin from '@/mixins/NetMixin'


let defNodes = [
  { id: 1, label: "Node 1" },
  { id: 2, label: "Node 2" },
  { id: 3, label: "Node 3. Picture clipped" },
  { id: 4, label: "Node 4 with PNG picture" },
  { id: 5, label: "Node 5 with SVG picture" }
]

let defEdges = [
  { id: 1, from: 1, to: 3 },
  { id: 2, from: 1, to: 2 },
  { id: 3, from: 2, to: 4 },
  { id: 4, from: 2, to: 5 },
  { id: 5, from: 3, to: 3 }
]

export default {
  name: 'NetView',
  mixins: [NetMixin],
  components: {
    Network,
    'NetworkPopups': () => import('@/components/network/NetworkPopups')
  },
  data: () => ({
    networkEvents: "",
    network: {
      nodes: defNodes.slice(0),
      edges: defEdges.slice(0),
      options: {
        interaction: {
          navigationButtons: true,
        },
        manipulation: true,
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
          shapeProperties: {
            useBorderWithImage:true
          }
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
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
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
  color: black
}
</style>
