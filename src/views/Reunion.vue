<template>
  <b-container>
    Reunion

    <b-container>
      <b-row>

        <b-col>
          <div class="add-item">
            <b-form-input v-model="name" placeholder="Create a reunion"></b-form-input>
          </div>

          <b-form-group label="Participants" v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="visibility" :aria-describedby="ariaDescribedby" name="some-radios" value="public">Public</b-form-radio>
            <b-form-radio v-model="visibility" :aria-describedby="ariaDescribedby" name="some-radios" value="private">Private</b-form-radio>
          </b-form-group>


          <b-button @click="createShareAndOpen" variant="warning">Create, share & open</b-button>

        </b-col>

        <b-col>

          <canvas id="canvasCode"></canvas>
          <b-button v-if="createdUrl.length > 0" :to="'network?url='+createdUrl" variant="warning">Open</b-button>
          <b-button @click="openScanner">Scan QR code</b-button>

        </b-col>


      </b-row>
      <b-row>



        {{createdUrl}}
      </b-row>
    </b-container>


    <b-table striped hover :items="reunions" :fields="fields"  responsive> <!--  -->

      <template #cell(creator)="data">
        <a :href="data.item.creator" target="_blank">{{data.item.creator != undefined ? data.item.creator.split('/')[2] : data.item.creator}}</a>
      </template>

      <template #cell(join)="row">
        <!-- <b-button size="sm" @click="join(row.item)" class="mr-2" variant="light">
        Join
      </b-button> -->

      <b-button size="sm" @click="qrcode(row.item)" class="mr-2" variant="light">
        Join
      </b-button>
    </template>


  </b-table>




  <b-modal id="scanner" ref="scanner" title="Scan QR code" @shown="initScanner">
    <p class="my-4">Scan a QRcode to join a reunion</p>
    <div id="loadingMessage">🎥 Unable to access video stream (please make sure you have a webcam enabled)</div>
    <canvas ref="canvasScan" id="canvasScan"></canvas>
    <div id="output" hidden>
      <div id="outputMessage">No QR code detected.</div>
      <div hidden><b>Data:</b> <span id="outputData"></span></div>
    </div>
  </b-modal>


</b-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode'
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
import jsQR from "jsqr";

export default {
  name: "Reunion",
  data() {
    return {
      name: '',
      visibility: 'public',
      reunions: [],
      fields: ["name", "visibility", "creator", "join"],
      createdUrl: ""
    };
  },
  created(){
    this.initReunions()
  },
  mounted(){


  },
  methods: {
    openScanner(){
      console.log("openscanner")
      this.$bvModal.show('scanner')

    },

    initScanner(){
      console.log("initscanner")

      this.video = document.createElement("video");
      this.canvasElement = this.$refs.canvasScan
      this.canvas = this.canvasElement.getContext("2d");
      console.log("canvas",this.canvas)
      let app = this
      // Use facingMode: environment to attemt to get the front camera on phones
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
        app.video.srcObject = stream;
        app.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        app.video.play();
        requestAnimationFrame(app.tick);
      });



    },
    drawLine(begin, end, color) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = 4;
      this.canvas.strokeStyle = color;
      this.canvas.stroke();
    },
    tick() {
      this.loadingMessage = document.getElementById("loadingMessage");
      this.outputContainer = document.getElementById("output");
      this.outputMessage = document.getElementById("outputMessage");
      this.outputData = document.getElementById("outputData");

      this.loadingMessage.innerText = "⌛ Loading video..."
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.loadingMessage.hidden = true;
        this.canvasElement.hidden = false;
        this.outputContainer.hidden = false;

        this.canvasElement.height = this.video.videoHeight;
        this.canvasElement.width = this.video.videoWidth;
        this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
        var imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          this.outputMessage.hidden = true;
          this.outputData.parentElement.hidden = false;
          this.outputData.innerText = code.data;
        }
        //  else {
        //   this.outputMessage.hidden = false;
        //   this.outputData.parentElement.hidden = true;
        // }
      }
      requestAnimationFrame(this.tick);
    },
    async initReunions(){
      this.reunions = []
      if (this.storage != null){
        let publicUrl = this.storage+'public/ipgsReunion/'
        let privateUrl = this.storage+'private/ipgsReunion/'
        let publicFolder = await fc.readFolder(publicUrl)
        let privateFolder = await fc.readFolder(privateUrl)
        //  console.log(publicFolder, privateFolder)

        let files = publicFolder.files.concat(privateFolder.files)
        let app = this
        for await (const f of files) {
          let json = await  app.getFile(f.url)
          app.reunions.push(json)
        }
        console.log(this.reunions)
        //        for (const file of files) {
        //   const contents = await fs.readFile(file, 'utf8');
        //   console.log(contents);
        // }
        // let app = this
        // let privateFiles = await privateFolder.files.map(async function(x){return await app.getFile(x.url)})
        // let publicFiles = await publicFolder.files.map(async function(x){return await app.getFile(x.url)})
        // console.log(privateFiles)
        // let reunions = `${publicFiles}`.concat(`${privateFiles}`)
        // console.log(`${reunions}`)
        // this.reunions = reunions
        //  this.reunions = files
      }

    },

    async getFile(url){
      let f = await fc.readFile(url)
      let j = JSON.parse(`${f}`)
      //  console.log(j)
      return j
    },
    async createShareAndOpen(){

      //  let path = this.visibility == "public" ? "public/" : "private/"
      //  path+='ipgsReunion/'+uuidv4()+'.jsonld'
      let url = this.storage+this.visibility+'/ipgsReunion/'+uuidv4()+'.jsonld'
      let r = {
        name: this.name,
        visibility: this.visibility,
        creator: this.webId,
        url: url,
        fullUrl: 'https://scenaristeur.github.io/ipgs?url='+url,
        created: new Date(),
        nodes: [],
        edges: []
      }
      console.log(r)
      this.name = '';
      this.reunions.push(r)

      r.nodes = [
        { id: 'n1', label: r.name, color: {background: 'blue'}, shape: 'star' },
        { id: 'n2', label: "Reunion", color: {background: 'green'}, shape: 'star' },
        { id: 'n3', label: "InterPlanetary Graph System" },
        { id: 'n4', label: "Mindmap App" },
        { id: 'n5', label: r.creator, shape: 'box'},
        { id: 'n6', label: r.url, shape: 'box' },
        { id: 'n7', label: r.created, shape: 'box' }
      ]

      r.edges = [
        { id: 'e1', from: 'n1', to: 'n2', label: 'type' },
        { id: 'e2', from: 'n1', to: 'n3', label: 'category' },
        { id: 'e3', from: 'n1', to: 'n4', label: 'category' },
        { id: 'e4', from: 'n1', to: 'n5', label: 'creator' },
        { id: 'e5', from: 'n1', to: 'n6', label: 'url' },
        { id: 'e6', from: 'n1', to: 'n7', label: 'created' }
      ]



      await fc.createFile(url, JSON.stringify(r), 'application/ld+json').then(
        f => {
          console.log(f)
          //console.log(f.headers.get('location'))
          //  let res_url = f.headers.get('location').startsWith('/') ? this.storage + f.headers.get('location').substring(1) : f.headers.get('location')
          //  console.log(res_url)
          //  this.getData({url: res_url, group: ""})
        }
      )
      this.qrcode(r)
    },
    join(item){
      console.log(this.storage)
      console.log(item)
    },
    qrcode(item){
      var canvasCode = document.getElementById('canvasCode')

      QRCode.toCanvas(canvasCode, item.fullUrl, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })
      this.createdUrl = item.url
    }
  },
  watch:{
    storage(){
      this.initReunions()
    }
  },
  computed:{
    storage: {
      get () { return this.$store.state.solid.storage},
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
.add-item input {
  outline: none;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  transition: all 0.25s;
  background: inherit;
  color: white;
}
.add-item input:focus {
  border-bottom-color: rgba(255, 255, 255, 1);
}

/* qr code */
/* body {
font-family: 'Ropa Sans', sans-serif;
color: #333;
max-width: 640px;
margin: 0 auto;
position: relative;
} */

#loadingMessage {
  text-align: center;
  padding: 40px;
  /* background-color: #eee; */
}

#canvasScan {
  width: 100%;
}

#output {
  margin-top: 20px;
  /* background: #eee; */
  padding: 10px;
  padding-bottom: 0;
}

#output div {
  padding-bottom: 10px;
  word-wrap: break-word;
}

#noQRFound {
  text-align: center;
}
</style>
