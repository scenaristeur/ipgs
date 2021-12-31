<template>
  <b-modal id="ipfs-modal" title="Storage" size="lg">
    A copy has been saved on IPFS with cid:<b>{{ cid }}</b>.<br>
    Don't forget to pin it with a service like
    <a href="https://app.pinata.cloud/pinmanager" target="_blank">pinata</a>
    if you want to keep it.
    <br>
    <b>Note that it can take a little moment for the IPFS
      network to process that data,</b> <br>
      but you should be able to quickly : <br>
      -  see it at <br>
      <a :href="'https://ipfs.io/ipfs/'+cid" target="_blank">
        https://ipfs.io/ipfs/{{cid}}</a> <br>
        or
        <a :href="'https://gateway.pinata.cloud/ipfs/'+cid" target="_blank">pinate gateway</a><br>
        - and share it  at <br>
        <Share :item="{url: 'https://scenaristeur.github.io/ipgs/?url=ipfs://'+cid }" style="float:left"/>

        <a :href="'https://scenaristeur.github.io/ipgs/?url=ipfs://'+cid" target="_blank">https://scenaristeur.github.io/ipgs/?url=ipfs://{{cid}}</a>
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
        'Share': () => import('@/components/layout/Share'),
        //  'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),
      },
      props: ['cid'],
      data() {
        return {
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

      },
      watch:{

      },
      computed: {

      },
    }
    </script>

    <style>

    </style>
