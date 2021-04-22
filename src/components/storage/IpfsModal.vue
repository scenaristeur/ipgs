<template>
  <b-modal id="ipfs-modal" title="IPFS" size="lg">
    A copy has been saved on IPFS with cid:<br><br> {{ cid }}

    <br>
    You can see it at <br>
    <a :href="'https://ipfs.io/ipfs/'+cid" target="_blank">https://ipfs.io/ipfs/{{cid}}</a>

<br>
and keep IPNS reference for future updates : <br>
<a :href="ipns" target="_blank">{{ipns}}</a>

  </b-modal>
</template>

<script>
// import auth from 'solid-auth-client';
// import FC from 'solid-file-client'
// const fc = new FC( auth )
// import Activity from '@/models/Activity.js'
// import Network from '@/models/Network.js'
//
// let mimetypes = { json: 'application/json', jsonld: "application/ld+json", ttl: "text/turtle"}

export default {
  name: "StorageModal",
  components: {
    //  'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),
  },
  props: ['cid', 'ipfs'],
  data() {
    return {
      ipns: ""
      // folder: {folders:[], files: []},
      // url: "",
      // new_graph_name : "",
      // publish: true
    }
  },
  created(){
    //  alert ("A copy has been saved on IPFS with cid '"+results.cid+"'. You can see it at https://ipfs.io/ipfs/"+results.cid)
    // this.dataToSave = this.$store.state.ipgs.dataToSave
    // if (this.storage != null){
    //   this.read({url: this.storage, name: this.storage, type: 'folder'})
    // }
    // if (this.$route.query.url != undefined ){
    //   this.url = this.$route.query.url
    //   console.log(this.url)
    //   //  if(this.url != 'new'){
    //   this.read(this.url)
    //   // }else{
    //   //   this.new_graph_name = "new_graph_name"
    //   // }
    // }
  },
  methods: {
    async makeIpns(){
      let app = this
      // The address of your files.
      const addr = '/ipfs/'+this.cid

      await this.ipfs.name.publish(addr).then(function (res) {
        // You now receive a res which contains two fields:
        //   - name: the name under which the content was published.
        //   - value: the "real" address to which Name points.
        console.log(res)
        app.ipns = `https://gateway.ipfs.io/ipns/${res.name}`
        console.log(app.ipns)
      })
    }
  },
  watch:{
    cid(){
      console.log(this.cid)
      this.makeIpns()
    }
  },
  computed: {

  },
}
</script>

<style>

</style>
