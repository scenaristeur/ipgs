<template>
  <div v-if="webId != null">
    <i><small>Logged as : <a v-bind:href="webId" target="_blank">{{ user }}</a></small></i>
  </div>
</template>

<script>
import auth from 'solid-auth-client';

export default {
  name: 'SolidTrackSession',
  data: function () {
    return {
      webId: null,
      user: null
    }
  },
  created(){
    auth.trackSession(async session => {
      if (!session){
        this.webId = null
        this.user = null
      } else{
        this.webId = session.webId
        this.user = session.webId.split('/').slice(2,3)[0]
      }
      this.$store.dispatch('solid/setWebId', this.webId)
    })
  },
}
</script>
