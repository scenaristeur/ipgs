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
import IpgsMixin from '@/mixins/IpgsMixin'

import NetMixin from '@/mixins/NetMixin'
import NetworkEvent from '@/mixins/NetworkEventMixin'

// see mixins/ NetMixin.js for cid cid_config


export default {
  name: "NetworkVis",
  mixins: [IpgsMixin, NetworkEvent, NetMixin],
  components: {
    'NetworkPopups': () => import('@/components/network/NetworkPopups'),
  },
  data(){
    return{
      network: {
        nodes: [],
        edges:[],
        options: {
          locale: navigator.language,
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
            stabilization: {onlyDynamicEdges: true},
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
       }
    },

  }
  </script>

  <style>
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
  </style>
