<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">IPGS</b-navbar-brand>

        <b-form-checkbox v-model="navigation_mode" name="check-button" switch>
          {{ navigation_mode ? 'Navigation' : 'Edition'}}
        </b-form-checkbox>
        <b-navbar-nav>
          <b-nav-item @click="openconfig">Config</b-nav-item>
        </b-navbar-nav>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="openconfig">Config</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <network ref="network"
    class="wrapper"
    :nodes="nodes"
    :edges="edges"


    @select-node="onSelectNode"
    @double-click="onDoubleClick"
    @oncontext="onContext"

    :options="options">
  </network>
  <!--    @click="onClick"
  @nodes-add="nodeAdd"
  @nodes-update="nodeUpdate"
  @nodes-remove="nodeRemove"
  @edges-add="edgeAdd"
  @edges-update="edgeUpdate"
  @edges-remove="edgeRemove"
-->


<NodeModal v-model="node" @ok="saveNode"/>
<EdgeModal v-model="edge" @ok="saveEdge"/>


<b-modal id="contextual-menu" no-close-on-backdrop size="xl" cancel-disabled>

  <template #modal-header="{ close }" class="row">

    <h5>{{modalTitle}}</h5>
    <!-- Emulate built in modal header close button action -->
    <b-button size="sm" variant="outline-danger" @click="close()">
      X
    </b-button>

  </template>
  <SolidLoginButton />     <b-form-checkbox
  id="checkbox-navigation"
  v-model="navigation_mode"
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
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),

    //  'Fab': () => import('@/components/basic/Fab.vue')
  },
  data() {
    return {
      navigation_mode: true,
      node: {},
      edge:{},
      jsonContent: {},
      file: null,
      tmp_file: null,
      path: null,
      url: null,
      temp_name: '',
      networks:{navigation: {nodes:[], edges: []}, edition: {nodes: [], edges: []}},
      contentTypeCreate: {ct: 'application/json', ext: 'json'},
      contentTypeOptions: [
        {value: {ct: 'application/json', ext: 'json'}, text:'json'},
        {value: {ct: 'application/ld+json', ext:'jsonld'}, text: 'jsonld'},

        //    {value: {ct: 'text/turtle', ext: 'ttl'}, text: 'ttl'}
      ],

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
        manipulation: true,
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
    let app = this
    this.options.manipulation = {
      //https://github.com/scenaristeur/solid-vue-panes/blob/b6143c1c9e8b12548abb09303fe26917a32b5796/src/components/editor/EditorNetworkAVANCE.vue#L176
      // addNode: function(nodeData,callback) {
      //   nodeData.label = 'hello world';
      //   callback(nodeData);
      // }
      initiallyActive: true,
      addNode: async (node, callback) => {
        //  callback() // Node will be added via reactivity from Vuex
        // if (self.tmp_file != null ){
        //   self.file = self.tmp_file
        // }
        // node.id = self.file.url+"#"+node.id
        console.log(node)
        //  let id = uuidv4()
        //  node.id = this.url+"#"+id
        //  node.label = id
        app.editNode(node, callback)
      },
      editNode: async (node, callback) => {
        //  callback() // Node will be added via reactivity from Vuex
        //console.log(node)
        app.editNode(node, callback)
      },
      addEdge: async (edge, callback) => {
        callback() // Node will be added via reactivity from Vuex
        //console.log(edge)
        app.addEdge(edge, callback)
      },
      editEdge: {
        editWithoutDrag: async (edge, callback) => {app.editWithoutDrag(edge, callback)}
      },
    }
  },
  methods: {

    saveNode(n){
      console.log("saveNode",n)
      //  this.callback(n)
      var index = this.nodes.map(x => {
        return x.id;
      }).indexOf(n.id);
      //console.log(index)
      if(index > -1){
        this.nodes.splice(index, 1);
        //console.log(  this.nodes[index])
        this.nodes[index].id = this.url+"#"+n.label
        this.nodes[index].label = n.label
      }else{
        n.id = this.url+"#"+n.label
        this.nodes.push(n)
      }
      console.log(n)
    },
    async writeEdgeToFile(e){
      // @graph ? https://json-ld.org/spec/latest/json-ld/#example-62-implicitly-named-graph
      console.log( "todo writetofile",this.url, e)
      console.log(this.nodes,this.edges)

      //       this.jsonContent['@graph'] = []
      //       this.jsonContent['@graph'].push(this.nodes)
      //       this.jsonContent['@graph'].push(this.edges)
      // console.log(this.jsonContent)

      let content = {
        "@context": {
          "generatedAt": {
            "@id": "http://www.w3.org/ns/prov#generatedAtTime",
            "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "Person": "http://xmlns.com/foaf/0.1/Person",
          "name": "http://xmlns.com/foaf/0.1/name",
          "knows": {"@id": "http://xmlns.com/foaf/0.1/knows", "@type": "@id"}
        },
        "@id": this.url,
        "generatedAt": "2012-04-09T00:00:00",
        "@graph": [
          {
            "@id": "http://manu.sporny.org/about#manu",
            "@type": "Person",
            "name": "Manu Sporny",
            "knows": "https://greggkellogg.net/foaf#me"
          }, {
            "@id": "https://greggkellogg.net/foaf#me",
            "@type": "Person",
            "name": "Gregg Kellogg",
            "knows": "http://manu.sporny.org/about#manu"
          }
        ]
      }

      //let content = this.jsonContent
      content['@graph'] = []
      content['terms:created'] = new Date().toISOString() // '"2021-01-29T01:02:40Z"^^XML:dateTime'
      this.nodes.forEach((n) => {
        n['@id'] = n.id
        delete n.id
        content['@graph'].push(n)
      });
      this.edges.forEach((e) => {
        e['@id'] = e.id
        delete e.id
        content['@graph'].push(e)
      });

      console.log('writing',this.url,content)

      await fc.createFile(this.url, JSON.stringify(content), 'application/json').then(
        f => {
          console.log(f)
          // console.log(f.headers.get('location'))
          // let res_url = f.headers.get('location').startsWith('/') ? this.storage + f.headers.get('location').substring(1) : f.headers.get('location')
          // console.log(res_url)
          this.getData({url: this.url, group: ""})
        }
      )

    },
    // async  writeEdgeToFile1(e){
    //   if (this.tmp_file != null){
    //     this.file = this.tmp_file
    //   }
    //   let subject  = this.nodes.filter(function(el) {
    //     return el.id == e.from
    //   });
    //   let object  = this.nodes.filter(function(el) {
    //     return el.id == e.to
    //   });
    //   //console.log(subject[0], e, object[0])
    //   //let identifier = subject[0].id.indexOf(this.file) > 0 ? subject[0].id.split('#') : subject[0].id
    //   let subj_identifier = subject[0].id.split('#')[1]
    //   let obj_identifier = object[0].id.split('#')[1]
    //   var dateObj = new Date();
    //   var date = dateObj.toISOString()
    //   let doc =  await fetchDocument(this.file.url)
    //   //console.log(doc)
    //   let subj = doc.addSubject({identifier: subj_identifier})
    //   subj.addString(rdfs.label, subject[0].label)
    //   subj.addString(dct.modified, date)
    //   subj.addRef(foaf.maker, this.webId)
    //   subj.addRef(this.file.url+"#"+e.label, object[0].id)
    //   //subj.addRef(this.file.url+"#"+e.label, obj_identifier)
    //   let obj = doc.addSubject({identifier: obj_identifier})
    //   obj.addString(rdfs.label, object[0].label)
    //   doc.save()
    // },
    saveEdge(e){
      //console.log("saveEdge",e)
      //  this.callback(n)
      console.log('saveedge',e)
      var index = this.edges.map(x => {
        return x.id;
      }).indexOf(e.id);
      //console.log(index)
      if(index > -1){
        //console.log(  this.edges[index])
        this.edges[index].label = e.label
      }else{
        this.edges.push(e)
        this.writeEdgeToFile(e)
      }
      //
    },
    editNode(node/*, callback*/) {
      console.log("editNode",node)
      this.node = node
      this.$bvModal.show("node-popup")
      //  console.log(node, callback)
      //  callback(node)
      //  this.callback = callback
      //callback()
      /*  document.getElementById('node-label').value = data.label;
      document.getElementById('node-saveButton').onclick = this.saveNodeData.bind(this, data, callback);
      document.getElementById('node-cancelButton').onclick = cancelAction.bind(this, callback);
      document.getElementById('node-popUp').style.display = 'block';*/
    },
    addEdge(edge, callback){
      //console.log("addedge")
      this.edge = edge
      if (edge.from == edge.to) {
        var r = confirm("Do you want to connect the node to itself?");
        if (r != true) {
          callback(null);
          return;
        }
      }
      this.editWithoutDrag(edge, callback);
      //callback()
    },
    editEdge(edge, callback){
      //console.log("edit edge", edge, callback)
      this.editWithoutDrag(edge, callback);
      //  callback()
    },
    editWithoutDrag(edge, callback){
      //
      //console.log("edit editWithoutDrag",edge)
      /*      // filling in the popup DOM elements
      document.getElementById('edge-label').value = data.label;
      document.getElementById('edge-saveButton').onclick = this.saveEdgeData.bind(this, data, callback);
      document.getElementById('edge-cancelButton').onclick = this.cancelEdgeEdit.bind(this,callback);
      document.getElementById('edge-popUp').style.display = 'block';
      */
      this.edge = edge
      this.$bvModal.show("edge-popup")
      //console.log(edge, callback)
      callback()
    },
    // Callback passed as parameter is ignored
    clearNodePopUp() {
      document.getElementById('node-saveButton').onclick = null;
      document.getElementById('node-cancelButton').onclick = null;
      document.getElementById('node-popUp').style.display = 'none';
    },
    cancelNodeEdit(callback) {
      this.clearNodePopUp();
      callback(null);
    },
    saveNodeData(data, callback) {
      console.log(data)
      data.label = document.getElementById('node-label').value;
      this.clearNodePopUp();
      callback(data);
    },
    /*  editWithoutDrag(data, callback) {
    // filling in the popup DOM elements
    document.getElementById('edge-label').value = data.label;
    document.getElementById('edge-saveButton').onclick = this.saveEdgeData.bind(this, data, callback);
    document.getElementById('edge-cancelButton').onclick = this.cancelEdgeEdit.bind(this,callback);
    document.getElementById('edge-popUp').style.display = 'block';
  },*/
  clearEdgePopUp() {
    document.getElementById('edge-saveButton').onclick = null;
    document.getElementById('edge-cancelButton').onclick = null;
    document.getElementById('edge-popUp').style.display = 'none';
  },
  cancelEdgeEdit(callback) {
    this.clearEdgePopUp();
    callback(null);
  },
  saveEdgeData(data, callback) {
    if (typeof data.to === 'object')
    data.to = data.to.id
    if (typeof data.from === 'object')
    data.from = data.from.id
    data.label = document.getElementById('edge-label').value;
    this.clearEdgePopUp();
    callback(data);
  },
  /////////////////////////////
  // async nodeAdd(e){
  //   console.log(e)
  // },
  // async nodeUpdate(e){
  //   console.log(e)
  // },
  // async nodeRemove(e){
  //   console.log(e)
  // },
  // async edgeAdd(e){
  //   console.log(e)
  // },
  // async edgeUpdate(e){
  //   console.log(e)
  // },
  // async edgeRemove(e){
  //   console.log(e)
  // },


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
    openconfig(params){
      console.log(params)
      //console.log("expandOnClick",this.expandOnClick, params.nodes.length)
      //params.event.preventDefault();

      //  if(!(params.nodes.length == 1 && this.expandOnClick == true) ){
      this.$bvModal.show('contextual-menu')
      //}



    },
    onDoubleClick(e){
      console.log(e)
      this.clear()
      this.getData({ url: e.nodes[0], group: ""})
    },
    onSelectNode(e){
      console.log(e)
      if(this.navigation_mode == true){
        this.getData({ url: e.nodes[0], group: ""})
      }else{
        this.$bvModal.show('contextual-menu')
      }


    },
    async getData(source){

      try{
        if(source.url.endsWith('/')){
          this.navigation_mode = true
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
          this.navigation_mode = false
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
            this.jsonContent = json
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
      console.log(text, typeof text)
      if (typeof text == 'object' && text['rdfs:labale'] != undefined){
        return text['rdfs:label']
      }else if (typeof text == 'string' && text.startsWith('http')){
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
    navigation_mode(){
      if (this.navigation_mode == true){
        this.networks.edition.nodes = this.nodes
        this.networks.edition.edges = this.edges
        this.nodes = this.networks.navigation.nodes
        this.edges = this.networks.navigation.edges
      }else{
        this.networks.navigation.nodes = this.nodes
        this.networks.navigation.edges = this.edges
        this.nodes = this.networks.edition.nodes
        this.edges = this.networks.edition.edges

      }
    },
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
#operation {
  font-size:28px;
}
#node-popUp {
  display:none;
  position:absolute;
  top:350px;
  left:170px;
  z-index:299;
  width:250px;
  height:120px;
  background-color: #f9f9f9;
  border-style:solid;
  border-width:3px;
  border-color: #5394ed;
  padding:10px;
  text-align: center;
}
#edge-popUp {
  display:none;
  position:absolute;
  top:350px;
  left:170px;
  z-index:299;
  width:250px;
  height:90px;
  background-color: #f9f9f9;
  border-style:solid;
  border-width:3px;
  border-color: #5394ed;
  padding:10px;
  text-align: center;
}
</style>
