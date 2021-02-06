<template>
  <div>

    <network ref="network"
    class="wrapper"
    :nodes="nodes"
    :edges="edges"
    @select-node="onSelectNode"
    @double-click="onDoubleClick"
    @oncontext="onContext"
    @click="onClick"
    :options="options">
  </network>



  <b-modal id="contextual-menu" no-close-on-backdrop size="xl" cancel-disabled>

    <template #modal-header="{ close }" class="row">

      <h5>{{modalTitle}}</h5>
      <!-- Emulate built in modal header close button action -->
      <b-button size="sm" variant="outline-danger" @click="close()">
        X
      </b-button>

    </template>
    <SolidLoginButton />     <b-form-checkbox
    id="checkbox-expandOnClick"
    v-model="expandOnClick"
    name="checkbox-1">
    Expand on click
  </b-form-checkbox>

  <!-- <p class="my-4">
  <b-button @click="getStorage" size="sm" variant="primary" v-if="storage != null"><small>{{ storage}}</small></b-button>
  <b-button @click="getPath" size="sm" variant="outline-primary" v-if="path != null"><small>{{ path}}</small></b-button>
  <b-button @click="getUrl" size="sm" variant="outline-primary" v-if="url != null"><small>{{ url}}</small></b-button>
</p> -->
<div>
  <b-button-group size="sm" variant="primary" >

    <b-dropdown text="Navigation" size="sm" block variant="primary">
      <b-button @click="getStorage" v-if="storage != null"><i>Storage:</i>{{ storage}}</b-button>
      <b-dropdown-item @click="getPath" v-if="path != null">Last folder: {{path}}</b-dropdown-item>
      <b-dropdown-item @click="getUrl" v-if="url != null">last url: {{ url}}</b-dropdown-item>
      <!-- <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>Item 3</b-dropdown-item> -->
    </b-dropdown>
    <b-dropdown text="Edition" size="sm" block variant="primary">
      <b-container fluid >

        <label for="input-temp_name" ><small>Name of folder or resource:</small></label>
        <b-input id="input-temp_name" v-model="temp_name" placeholder="name"></b-input>


        <b-dropdown-item @click="createFolder" variant="primary">Create Folder</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-form-group label="or create resource" v-slot="{ ariaDescribedby }">
          <b-form-radio v-for="ct in contentTypeOptions" :key="ct.value.ct"
          v-model="contentTypeCreate"
          :aria-describedby="ariaDescribedby" name="ct-radios" :value="ct.value">{{ct.text}}</b-form-radio>
        </b-form-group>
        <b-dropdown-item @click="createResource" variant="primary">Create Resource</b-dropdown-item>
      </b-container>
      <!--  <b-dropdown-item>Item 3</b-dropdown-item> -->
    </b-dropdown>
  </b-button-group>
</div>




<!-- <p class="my-4">
<b-input v-model="temp_name"></b-input>
<b-form-group label="Resource Content Type" v-slot="{ ariaDescribedby }">
<b-form-radio v-for="ct in contentTypeOptions" :key="ct.value.ct"
v-model="contentTypeCreate"
:aria-describedby="ariaDescribedby" name="ct-radios" :value="ct.value">{{ct.text}}</b-form-radio>
</b-form-group>


<b-button @click="createResource">Create</b-button><b-button @click="createFolder">Create Folder</b-button>

</p> -->



<!-- <br>https://spoggy-test9.solidcommunity.net/public/table/workspaces/4e5f404a-a61a-4432-b4c7-36c79c6e10f2.ttl
<br>https://spoggy-test9.solidcommunity.net/contacts/5d5889f7-d439-448a-bfa7-709249f0576c.jsonld -->

</b-modal>

</div>
</template>

<script>
//https://github.com/r3code/vue-vis-network
// modele https://github.com/scenaristeur/solid-vue-panes/blob/master/src/components/semapps/SemappsNetwork.vue
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import { mapState } from 'vuex';
//import { v4 as uuidv4 } from 'uuid';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
const myWorker = new Worker("workers/worker.js");
import { /*handleIncomingRedirect, login,*/ fetch/*, getDefaultSession */} from '@inrupt/solid-client-authn-browser'
import { getSolidDataset/*, saveSolidDatasetAt*/ } from "@inrupt/solid-client";

export default {
  name: 'NetworkView',
  components: {
    //  'Contacts': () => import('@/views/Contacts'),
    'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),

    //  'Fab': () => import('@/components/basic/Fab.vue')
  },
  data() {
    return {
      path: null,
      url: null,
      temp_name: '',
      contentTypeCreate: {ct: 'application/json', ext: 'json'},
      contentTypeOptions: [
        {value: {ct: 'application/json', ext: 'json'}, text:'json'},
        {value: {ct: 'application/ld+json', ext:'jsonld'}, text: 'jsonld'},

        //    {value: {ct: 'text/turtle', ext: 'ttl'}, text: 'ttl'}
      ],
      expandOnClick: true,
      modalTitle: "InterPlanetary Graph System IPGS",
      nodes: [
        {id: 1,  label: 'circle',  shape: 'circle' },
        {id: 2,  label: 'ellipse', shape: 'ellipse'},
        {id: 3,  label: 'database',shape: 'database'},
        {id: 4,  label: 'box',     shape: 'box'    },
        {id: 5,  label: 'diamond', shape: 'diamond'},
        {id: 6,  label: 'dot',     shape: 'dot'},
        {id: 7,  label: 'square',  shape: 'square'},
        {id: 8,  label: 'triangle',shape: 'triangle'},
      ],
      edges: [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 5, to: 6},
        {from: 5, to: 7},
        {from: 6, to: 8}
      ],
      options: {
        nodes: {

          //  borderWidth: 4
        },
        edges: {
          arrows: 'to',
          color: 'lightgray'
        },
        interaction: {
          navigationButtons: true,
        },
      }
    }
  },
  created(){
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.info("URL1",this.url)
      this.clear()
      this.getData({url:this.url})
    }else{
      this.path = this.storage
    }
  },
  methods: {
    async createResource(){
      if (this.temp_name.length == 0){
        alert('the resource name must be at least one character long')
        return
      }
      let resource = this.path+this.temp_name
      console.log(resource)
      try{
        let content = {
          "@context":{
            "owl":"http://www.w3.org/2002/07/owl#",
            "as":"https://www.w3.org/ns/activitystreams",
            "schema":"http://schema.org/",
            "life": "http://purl.org/vocab/lifecycle/schema#",
            terms: "http://purl.org/dc/terms/",
            rdfs: "http://www.w3.org/2000/01/rdf-schema#",
            dcm: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/",
            ldp: "http://www.w3.org/ns/ldp#",
            json: "http://www.w3.org/ns/iana/media-types/application/json#"
          },
          '@id' : resource+'.'+this.contentTypeCreate.ext,
          '@type': ['json:Resource', 'ldp:Resource'],
          'rdfs:label': this.temp_name,
          'terms:created': '"2021-01-29T01:02:40Z"^^XML:dateTime'}
          await fc.postFile(resource, JSON.stringify(content), this.contentTypeCreate.ct).then(
            f => {
              console.log(f)
              console.log(f.headers.get('location'))
              let res_url = f.headers.get('location').startsWith('/') ? this.storage + f.headers.get('location').substring(1) : f.headers.get('location')
              console.log(res_url)
              this.getData({url: res_url, group: ""})
            }
          )

        }catch(e){
          alert(e)
        }
        this.temp_name = ""
      },
      async createFolder(){
        if (this.temp_name.length == 0){
          alert('the floder name must be at least one character long')
          return
        }
        let resource = this.path+this.temp_name+'/'
        console.log(resource)
        try{
          await fc.createFolder(resource)
          this.getData({url: resource, group: ""})
        }catch(e){
          alert(e)
        }
        this.temp_name = ""
      },
      onContext(params){

        console.log(params)
        params.event.preventDefault();
        // $(".custom-menu").finish().toggle(100);
        // $(".custom-menu").css({
        //     top: params.event.pageY + "px",
        //     left: params.event.pageX + "px"
        // });
        this.$bvModal.show('contextual-menu')
      },
      onClick(params){
        console.log(params)
        console.log("expandOnClick",this.expandOnClick, params.nodes.length)
        params.event.preventDefault();

        if(!(params.nodes.length == 1 && this.expandOnClick == true) ){
          this.$bvModal.show('contextual-menu')
        }



      },
      onDoubleClick(e){
        console.log(e)
        this.clear()
        this.getData({ url: e.nodes[0], group: ""})
      },
      onSelectNode(e){
        console.log(e)
        if(this.expandOnClick == true){
          this.getData({ url: e.nodes[0], group: ""})
        }else{
          this.$bvModal.show('contextual-menu')
        }


      },
      async getData(source){

        try{
          if(source.url.endsWith('/')){
            this.path = source.url
            let folder = await fc.readFolder(source.url)

            folder.id = folder.url
            folder.label = folder.name
            folder.shape = "image"
            folder.image = "./assets/parentfolder.png"
            folder.size = 20
            delete folder.url
            delete folder.name

            var index = this.nodes.findIndex(x => x.id==folder.id);
            index === -1 ? this.nodes.push(folder) : console.log("object already exists")

            let parent = {
              id: folder.parent,
              label: folder.parent,
              shape: "image",
              image: "./assets/parentfolder.png",
              size: 20,
            }
            var indexP = this.nodes.findIndex(x => x.id==parent.id);
            indexP === -1 ? this.nodes.push(parent) : console.log("object already exists")

            let edgeP = {from: folder.id, to: parent.id, label: "parent"}
            var indexPE = this.edges.findIndex(x => x.from==edgeP.from && x.to == edgeP.to && x.label == edgeP.label);
            indexPE === -1 ? this.edges.push(edgeP) : console.log("object already exists")




            console.log(source.group, folder)
            folder.folders.forEach((fo) => {
              fo.id = fo.url
              fo.label = fo.name
              fo.shape = "image"
              fo.image = "./assets/folder.png"
              fo.size = 20
              delete fo.url
              delete fo.name
              var index = this.nodes.findIndex(x => x.id==fo.id);
              index === -1 ? this.nodes.push(fo) : console.log("object already exists")
              let edge = {from: folder.id, to: fo.id, label: "contains"}
              var indexE = this.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
              indexE === -1 ? this.edges.push(edge) : console.log("object already exists")

            });
            folder.files.forEach((fi) => {
              fi.id = fi.url
              fi.label = fi.name
              fi.shape = "image"
              fi.image = "./assets/document.png"
              fi.size = 20
              delete fi.url
              delete fi.name
              var index = this.nodes.findIndex(x => x.id==fi.id);
              index === -1 ? this.nodes.push(fi) : console.log("object already exists")
              let edge = {from: folder.id, to: fi.id, label: "contains"}
              var indexE = this.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
              indexE === -1 ? this.edges.push(edge) : console.log("object already exists")
            });
            console.log(this.nodes)
          }else{
            this.url = source.url
            var extension = source.url.split('.').pop();
            let app = this
            let file = {}
            let json = {}
            let dataset = {}
            console.log(extension)
            switch (extension) {
              case 'rdf':
              case 'ttl':
              case 'n3':
              case 'n3t':
              case 'owl':
              console.log(extension)
              dataset = await getSolidDataset(source.url, { fetch: fetch });
              console.log(dataset)

              dataset.quads.forEach(async function (q)  {
                let [s,p,o] = [
                  {id:q.subject.id, label: await app.lastPart(q.subject.id)},
                  q.predicate.id,
                  {id:q.object.id, label: await app.lastPart(q.object.id)}
                ]
                console.log(s,p,o)

                var indexS = app.nodes.findIndex(x => x.id==s.id);
                indexS === -1 ? app.nodes.push(s) : console.log("object already exists")
                var indexO = app.nodes.findIndex(x => x.id==o.id);
                indexO === -1 ? app.nodes.push(o) : console.log("object already exists")
                let edge = {from: s.id, to: o.id, label: await app.lastPart(p)}
                var indexP = app.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
                indexP === -1 ? app.edges.push(edge) : console.log("object already exists")



              });


              break;
              case 'json':
              case 'jsonld':
              case 'default':
              console.log(extension)
              file = await fc.readFile(source.url)
              json = JSON.parse(file)
              console.log(source.group,file, json)
              json.id == null ? json.id = json['@id'] : ''
              var indexS = app.nodes.findIndex(x => x.id==json.id);
              indexS === -1 ? app.nodes.push(json) : console.log("object already exists")

              for (const [key, value] of Object.entries(json)) {
                if (key != 'id' && key != '@id' && key != '@context'){
                  console.log(key,value)
                  if(Array.isArray(value)){
                    value.forEach(async function(v) {
                      var indexO = app.nodes.findIndex(x => x.id==v);
                      indexO === -1 ? app.nodes.push({id: v, label: await app.lastPart(v)}) : console.log("object already exists")
                      let edge = {from: json.id, to: v, label: await app.lastPart(key)}
                      var indexE = app.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
                      indexE === -1 ? app.edges.push(edge) : console.log("object already exists")

                    });

                  }else{
                    var indexO = app.nodes.findIndex(x => x.id==value);
                    indexO === -1 ? app.nodes.push({id: value, label: await app.lastPart(value)}) : console.log("object already exists")
                    let edge = {from: json.id, to: value, label: await app.lastPart(key)}
                    var indexE = app.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
                    indexE === -1 ? app.edges.push(edge) : console.log("object already exists")
                  }
                }
              }

              break;


            }

          }
        }catch(e){
          alert(e)
        }

      },
      async lastPart(text){
        console.log(text)
        if (text.startsWith('http')){
          var n = text.lastIndexOf('/');
          return text.substring(n + 1);
        }
        else{
          return text
        }


      },
      async getData1(source) {
        if (window.Worker) {
          if(source.url.endsWith('/')){
            let folder = await fc.readFolder(source.url)
            console.log(source.group, folder)
            folder.folders.forEach((fo) => {
              myWorker.postMessage({nodes: this.nodes, nouveau: fo});
              console.log(fo)
            });
            folder.files.forEach((fi) => {
              myWorker.postMessage({nodes: this.nodes, nouveau: fi});
              console.log(fi)
            });
            console.log('Message posted to worker');
          }else{
            let file = await fc.readFile(source.url)
            console.log(source.group,file)
          }
          myWorker.onmessage = function(e) {
            console.log('result',e)
            this.nodes = e.data.nodes
            console.log('Message received from worker');
          }
        } else {
          alert('Your browser doesn\'t support web workers.')
        }
      },
      clear(){
        this.nodes = []
        this.edges = []
      },
      getStorage(){
        this.clear()
        this.getData({url: this.storage, group:"storage"})
      },
      getPath(){
        this.clear()
        this.getData({url: this.path, group:""})
      },
      getUrl(){
        this.clear()
        this.getData({url: this.url, group:""})
      }
    },
    watch:{
      async storage(){
        this.getStorage()
        this.path = this.storage
      }
    },
    computed: mapState({
      storage: s => s.solid.storage
    }),
  }
  </script>

  <style>
  .wrapper{
    min-height: 100vh;
    border: 1px solid black;
    background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
    padding: 10px;
    height: 100vh;
  }
  </style>
