<template  >
  <b-dropdown class="mx-1" right text="graph" variant="info">
    <b-dropdown-item variant="info" v-for="c in commands" :key="c.value" @click="sendCommand(c.value)">{{c.text}}</b-dropdown-item>

  </b-dropdown>
</template>

<script>
export default {
  name: 'NetworkToolBar',
  data() {
    return {
      commands: [
        {value: '/n', text: "New Graph"},
        {value: '/s', text: "save to pod"},
        {value: '/t', text: "export ttl"},
        {value: '/e', text: "export json"},
        {value: '/c', text: "capture a picture"},
        //  {value: '/p', text: "share"},
        {value: '/h', text: "help"},
      ]
    }
  },
  methods: {
    sendCommand(c){
      let command = { type: "commande", value: c }
      this.$store.commit('ipgs/setInputObject', command)
    }
    // addNode() {
    //   this.$bvModal.show("node-popup")
    // },
    // addEdge(){
    //   this.$bvModal.show("edge-popup")
    // }
  }

}
</script>

<style>
/* .network-tool-bar {
background-color: white;
color: red;
position: relative;
top: 200px;
left: 0px;
width: 50%;
} */

</style>
