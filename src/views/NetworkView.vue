<template>
  <NetworkVis />
</template>

<script>
import IpgsMixin from '@/mixins/IpgsMixin'

export default {
  name: 'NetworkView',
  mixins: [IpgsMixin],
  components: {
    //  Network,
    'NetworkVis': () => import('@/components/network/NetworkVis'),
    // 'network': () => import('vue-vis-network')
  },
  data: () => ({
    sockets: [],
    networkEvents: "",

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


</style>
