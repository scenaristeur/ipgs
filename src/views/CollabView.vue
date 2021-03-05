<template>
  <div>
    Collab view  <SolidLoginButton />
    <hr>
    <b-input v-model="folder" placehoder="folder"/>
    <b-input v-model="file" placeholder="file"/>

    <b-button @click="createSocket">Create New Graph</b-button>


    Status : {{ status }}<br>


    <div v-if="webId!=null">
      <b-textarea v-model="dataToSend">

      </b-textarea>
      <b-button @click="send">Send</b-button>
    </div>

    messages : {{ socketMessages}}

  </div>
</template>

<script>
//import { v4 as uuidv4 } from 'uuid';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

import SocketFactory from '@/util/SocketFactory.js'


export default {
  name: 'CollabView',
  components: {
    //  Network,
    'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),
    // 'network': () => import('vue-vis-network')
  },
  data() {
    return {
      folder: 'https://ipgs.solidcommunity.net/public/collab/',
      file: 'test.txt', // uuidv4()+".txt",
      status: 'none',
      dataToSend: ''
    }
  },
  created(){
    this.socketFactory = new SocketFactory()
  },
  methods: {
    async send(){
      console.log(this.dataToSend)
      //JSON.stringify(this.jsonldRepresentation), 'application/json'
      await fc.createFile(this.path, this.dataToSend, 'text/plain' ).then(
        f => {
          console.log(f)
          //    console.log(f.headers.get('location'))
          // this.createSocket(this.path)
          //  return f.headers.get('location')
          //  this.getData({url: res_url, group: ""})
        }
      )

    },
    async createFile(){
      await fc.postFile(this.path, this.dataToSend, 'text/plain' ).then(
        f => {
          console.log(f)
          //    console.log(f.headers.get('location'))
          this.createSocket(this.path)
          //  return f.headers.get('location')
          //  this.getData({url: res_url, group: ""})
        }
      )
    },
    async createSocket() {
      let sockets = this.socketFactory.add(this.path)
      console.log(sockets)
    }
  },
  computed:{
    path(){
      return this.folder+this.file
    },
    socketMessages: {
      get () { return this.$store.state.ipgs.socketMessages},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    webId: {
      get () { return this.$store.state.solid.webId},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }

}
</script>

<style>

</style>
