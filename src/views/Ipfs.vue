<template>
  <b-container>
    <div class="ipfs-info">
      <img class="ipfs-logo" alt="IPFS logo" src="../assets/ipfs-logo.svg" />
      <h5>{{ status }}</h5>
      <h6>ID: {{ id }}</h6>
      <h6>Agent version: {{ agentVersion }}</h6>

      <b-input v-model="text" placeholder="text"/>
      <b-button @click="sendToIpfs">Send</b-button>

      Cid : {{ cid }}


      <b-button @click="readFromIpfs">Read</b-button>

      <b-textarea v-model="restit" cols="10" rows="10" />
      <hr>
      example of cid json.string : QmZPhUqJQJ1UbnyPqXTENxMjPWjfgJ5ULyfKSgFS5AzuQ3
      <hr>
      new vis js graph : QmVCeXk6HKeSzvbyYTYARWqVm4x1DYHUDgLdSKTd4ajEA4
      <hr>
      basic vis graph : Qmb69aSsNwiboGpoY2gbndaSGd64UGwUvsEkz5MbfKyoEv
      <hr>
      see it on https://ipfs.io/ipfs/QmZPhUqJQJ1UbnyPqXTENxMjPWjfgJ5ULyfKSgFS5AzuQ3
    </div>

    <hr>
    File
    <b-button @click="addToFile">Add to file</b-button>
  </b-container>
</template>

<script>

// https://js.ipfs.io/
// duplex stream to add files https://github.com/ipfs/js-ipfs/tree/c47a6335b77d5284711f13a83349000820f85775/examples/browser-add-readable-stream
// put https://github.com/ipfs/js-ipfs/blob/c47a6335b77d5284711f13a83349000820f85775/examples/traverse-ipld-graphs/put.js
// IPLD graph  https://github.com/ipfs/js-ipfs/tree/c47a6335b77d5284711f13a83349000820f85775/examples/traverse-ipld-graphs
// git object https://github.com/ipld/js-ipld-git
// service worker https://github.com/ipfs/js-ipfs/tree/c47a6335b77d5284711f13a83349000820f85775/examples/browser-service-worker

// files add https://github.com/ipfs/js-ipfs/blob/master/examples/ipfs-client-add-files/index.js
// video stream https://github.com/ipfs/js-ipfs/blob/c47a6335b77d5284711f13a83349000820f85775/examples/browser-readablestream/index.js

//     https://discuss.ipfs.io/t/storing-data-through-ipfs-forever/3456

// https://gist.github.com/MaiaVictor/b8a4a44005c7a5243ce0150585a4d48b
// https://www.npmjs.com/package/nano-ipfs-store
// https://github.com/SilentCicero/ipfs-mini
//
//
// const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
//
// (async () => {
//
//   const doc = JSON.stringify({
//     foo: "bar",
//     tic: "tac"
//   });
//
//   const cid = await ipfs.add(doc);
//
//   console.log("IPFS cid:", cid);
//
//   console.log(await ipfs.cat(cid));
//
// })();


const uint8ArrayConcat = require('uint8arrays/concat')

export default {
  name: "Ipfs",
  data: function() {
    return {
      status: "Connecting to IPFS...",
      id: "",
      agentVersion: "",
      text: "",
      cid: "QmZPhUqJQJ1UbnyPqXTENxMjPWjfgJ5ULyfKSgFS5AzuQ3",
      restit: ""
    };
  },
  mounted: function() {
    this.getIpfsNodeInfo();
  },
  methods: {
    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        this.ipfs = await this.$ipfs;
        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        const { agentVersion, id } = await this.ipfs.id();
        this.agentVersion = agentVersion;
        this.id = id;
        // Set successful status text.
        this.status = "Connected to IPFS =)";
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`;
      }
    },

    async sendToIpfs(){
      //  let app = this
      // add your data to to IPFS - this can be a string, a Buffer,
      // a stream of Buffers, etc
      console.log(this.ipfs)
      const data = this.text
      const results = await this.ipfs.add(data)
      console.log("res", results)
      console.log(await results.cid)
      this.cid = results.cid
      // we loop over the results because 'add' supports multiple
      // additions, but we only added one entry here so we only see
      // one log line in the output
      // for await (const { cid } of results) {
      //   // CID (Content IDentifier) uniquely addresses the data
      //   // and can be used to get it again.
      //   console.log(cid.toString())
      //   //  app.cids.push(cid.toString())
      // }
    },

    async readFromIpfs(){
      const stream =  await this.ipfs.cat(this.cid)
      let data = ''
      for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
      }
      this.restit = data
      console.log(data)
    },
    async addToFile(){
      // https://github.com/ipfs/js-ipfs/tree/master/examples/ipfs-101
      // npm i uint8arrays



      const doc = JSON.stringify({
          foo: "bar",
          tic: "tac"
        });

        const cid = await this.ipfs.add(doc);

        console.log("IPFS cid:", cid);

        console.log(await this.ipfs.cat(cid));





      const fileAdded = await this.ipfs.add({
        path: 'vis_default.json',
        content: JSON.stringify({nodes:[{id:"1",label:"One"},{id:"2",label:"Two"} ], edges: [{from:"1", to:"2", label: "A link"}]})
        //  context: this.text
      })
      console.log(fileAdded)
      console.log('Added file:', fileAdded.path, fileAdded.cid)

      const chunks = []
      for await (const chunk of this.ipfs.cat(fileAdded.cid)) {
        chunks.push(chunk)
      }
console.log(chunks)
      console.log('Added file contents:', uint8ArrayConcat(chunks).toString())

      let read = await this.ipfs.cat(fileAdded.cid)
      // let get = await this.ipfs.get(fileAdded.cid)
      console.log(read)
      // console.log(get)

      // ou https://discuss.ipfs.io/t/how-to-fetch-content-from-ipfs-with-jsipfs/9912
      //     const validCID = '<CID>'
      //
      // this.ipfs.files.read(fileAdded.cid, function(err, files) {
      //   console.log(files)
      //     // files.forEach((file) => {
      //     //     console.log(file.path)
      //     //     console.log("File content >> ", file.content.toString('utf8'))
      //     // })
      // })
      //
      // this.ipfs.get(fileAdded.cid, function(err, files) {
      //   console.log(files)
      //     // files.forEach((file) => {
      //     //     console.log(file.path)
      //     //     console.log("File content >> ", file.content.toString('utf8'))
      //     // })
      // })


    }





  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ipfs-logo {
  height: 10rem;
}
</style>
