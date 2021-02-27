<template>
  <div>
    <router-link :to="{ path: '/agora'}">{{ nb }}</router-link>

  </div>
</template>

<script>
// https://github.com/solid/solid-spec/blob/master/api-websockets.md
let agoraPath= "https://ipgs.solidcommunity.net/public/activity/"
import ldflex from '@solid/query-ldflex/lib/exports/rdflib'

export default {
  name: 'Notification',
  data() {
    return {
      log: agoraPath+'log.ttl',
      nb:0
    }
  },
  async created(){
    this.updateNb()
    let app = this
    var socket = new WebSocket('wss://ipgs.solidcommunity.net/', ['solid-0.1']);
    //  var socket = new WebSocket('wss://solidweb.org');

    console.log(socket)
    socket.onopen = function() {
      console.log("socket open")
      this.send('sub '+app.log);
      console.log("socket sub to "+app.log)
    };
    socket.onmessage = function(msg) {
      console.log("message",msg)
      if (msg.data && msg.data.slice(0, 3) === 'pub') {
        console.log(msg)
        console.log(msg.data)
        app.updateNb()
        // resource updated, refetch resource
      }
    };
  },
  methods: {
    async updateNb() {
      let nb = 0
      await ldflex.clearCache()
      for await (const agoraEvent of ldflex[this.log]['https://www.dublincore.org/specifications/dublin-core/dcmi-terms/hasPart']){
        console.log(`${agoraEvent}`)
        nb++
      }
      this.nb = nb

    }
  }
}
</script>

<style>

</style>
