<template>
  <b-modal id="storage-modal" title="Storage">
    <SolidLoginButton v-if="webId == null" />
    <div v-else>

      <b-container>
        <b-input-group class="mt-3">
          <b-form-input  v-model="new_graph_name" placeholder="New Graph Name" v-on:keyup.enter="save"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="save">create</b-button>
          </b-input-group-append>
        </b-input-group>

        <b-form-checkbox
        v-model="publish">
        publish To Agora
      </b-form-checkbox>


      <b-list-group v-if="storage != null"   class="item list-group-item d-flex justify-content-between p-1">
        <b-list-group-item v-if="folder.parent != 'https://'" variant="dark" @click="readParent(folder.parent)" button>{{ folder.parent }}</b-list-group-item>
        <b-list-group-item v-for="fo in folder.folders" :key="fo.url" @click="read(fo)" button >
          <!-- class="p-0 m-0 flex-grow-1" -->
          <!-- <b-button   variant="outline-warning"><b-icon-folder-fill></b-icon-folder-fill></b-button>
          {{ fo.name }}

          <b-button size="sm" variant="outline-info" class="unstyled-button">
          <b-icon-eye @click.stop="see(fo)" variant="info" ></b-icon-eye>
        </b-button> -->

        <div class="input-group" style="display:table; width:100%;">

          <b-button class="unstyled-button" variant="outline-warning"><b-icon-folder-fill></b-icon-folder-fill></b-button>
          {{ fo.name }}
          <!-- <span style="display: table-cell; border:1px solid #ccc; padding: 0 8px; vertical-align: middle;">Cras justo odio</span> -->

          <!-- <span style="display: table-cell; width: 40px;">
          <button class="btn btn-default" type="button"><span>ᐅ</span> Go!</button>
        </span> -->

        <span style="display: table-cell; width: 40px;">
          <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
          <!-- class="unstyled-button" -->
          <b-button size="sm" variant="outline-info"  @click.stop="see(fo)">
            <b-icon-eye @click.stop="see(fo)" variant="info" ></b-icon-eye>
          </b-button>
        </span>

      </div>

    </b-list-group-item>


    <b-list-group-item variant="light"
    class="item list-group-item d-flex justify-content-between"
    v-for="fi in folder.files" :key="fi.url"  button> <!-- @click="save(fi)" -->
    <p class="p-0 m-0 flex-grow-1"><b-icon-file-text></b-icon-file-text> {{ fi.name }}</p>
  </b-list-group-item>
</b-list-group>
</b-container>

</div>

</b-modal>
</template>

<script>
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
import Activity from '@/models/Activity.js'
import Network from '@/models/Network.js'

let mimetypes = { json: 'application/json', jsonld: "application/ld+json", ttl: "text/turtle"}

export default {
  name: "StorageModal",
  components: {
    'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),
  },
  props: ['network'],
  data() {
    return {
      folder: {folders:[], files: []},
      url: "",
      new_graph_name : "",
      publish: true
    }
  },
  created(){
    this.dataToSave = this.$store.state.ipgs.dataToSave
    if (this.storage != null){
      this.read({url: this.storage, name: this.storage, type: 'folder'})
    }
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
    async save(){
      if(this.new_graph_name.length>0){
        console.log('dataToSave', this.dataToSave)
        let new_file_url = this.url+this.new_graph_name+'.'+this.dataToSave.format
        let content = this.dataToSave.content
        if (this.dataToSave.format ==  'jsonld'){
          let jsonld_data = JSON.parse(this.dataToSave.content)
          console.log(jsonld_data)
          jsonld_data['@context']['@base'] = new_file_url
          jsonld_data['@id'] = new_file_url
          jsonld_data.label = this.new_graph_name
          jsonld_data['as:actor'] = {'@id': this.webId}

          content = JSON.stringify(jsonld_data, undefined, 2)
          console.log('new content',content)
        }
        // if (this.dataToSave.format ==  'json'){
        //   content = JSON.stringify(this.dataToSave.content)
        //
        // }


        let contentType = mimetypes[this.dataToSave.format]
        console.log(contentType, content)

        if( await fc.itemExists( new_file_url )) {
          var r = confirm(new_file_url +' already exists, do you want to replace it ?')
          if (r == true) {

            await fc.createFile( new_file_url, content, contentType ).then(
              f => {
                console.log(f)
                //    console.log(f.headers.get('location'))

                let loc =  f.headers.get('location')
                console.log(loc)

                if (this.publish == true){
                  let activity = new Activity()
                  activity.jsonld.actor = this.webId
                  activity.jsonld.object = content

                  console.log(activity)
                  activity.publish()
                }

                this.$bvModal.hide("storage-modal")

                this.$router.push({ path: 'network', query: { url: new_file_url } })
                //  this.getData({url: res_url, group: ""})
              }
            ) .catch(err => alert(`Error: ${err}`))
          }
        }else{
          await fc.createFile( new_file_url, content, contentType ).then(
            f => {
              console.log(f)
              //    console.log(f.headers.get('location'))

              let loc =  f.headers.get('location')
              console.log(loc)

              if (this.publish == true){
                let activity = new Activity()
                activity.jsonld.actor = this.webId
                activity.jsonld.object = content

                console.log(activity)
                activity.publish()
              }

              this.$bvModal.hide("storage-modal")
          
              this.$router.push({ path: 'network', query: { url: new_file_url } })
              //  this.getData({url: res_url, group: ""})
            }
          ) .catch(err => alert(`Error: ${err}`))
        }

        // let loc_url = loc.startsWith('/') ? this.storage + loc.substring(1) : loc
        //
        // if (this.publish == true){
        //   let activity = new Activity()
        //   activity.jsonld.creator = this.webId
        //   activity.jsonld.object = this.content
        //
        //   console.log(activity)
        //   activity.publish()
        // }

        // this.$bvModal.hide("storage-modal")
        // this.$router.push({ path: 'network', query: { url: loc_url } })


      }else{
        alert("If you want to create a Graph, you must provide a name !")
      }
    },
    async createNew1(){

      if(this.new_graph_name.length>0){
        let new_file_url = this.url+this.new_graph_name+'.json'

        this.net = new Network()

        let loc = await this.net.create(new_file_url)
        //  console.log(loc)
        let loc_url = loc.startsWith('/') ? this.storage + loc.substring(1) : loc

        this.net.setId(loc_url)
        await this.net.save()

        if (this.publish == true){
          let activity = new Activity()
          activity.jsonld.creator = this.webId
          activity.jsonld.object = this.network.jsonldRepresentation

          console.log(activity)
          activity.publish()
        }
        //         console.log(loc_url)
        //         this.network.setId(loc_url)
        //         //console.log('url', res_url)
        // console.log("new network",this.network)
        this.$bvModal.hide("storage-modal")
        this.$router.push({ path: 'network', query: { url: loc_url } })
      }else{
        alert("If you want to create a Graph, you must provide a name !")
      }
    },
    async see(item)
    {
      this.$router.push({ path: 'network', query: { url: item.url } })
    },
    async read(item) {
      if( item.type == 'folder' ){
        this.url = item.url
        this.folder = await fc.readFolder(item.url)
      } else{

        // let context = {
        //   // "owl":"http://www.w3.org/2002/07/owl#",
        //   // "as":"https://www.w3.org/ns/activitystreams",
        //   // "schema":"http://schema.org/",
        //   // "life": "http://purl.org/vocab/lifecycle/schema#",
        //   terms: "http://purl.org/dc/terms/",
        //   rdfs: "http://www.w3.org/2000/01/rdf-schema#",
        //   // dcm: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/",
        //   // ldp: "http://www.w3.org/ns/ldp#",
        //   // json: "http://www.w3.org/ns/iana/media-types/application/json#",
        //   motifs: "http://purl.org/net/wf-motifs#",
        //   ipgs: "https://scenaristeur.github.io/ipgs#"
        // }
        // const compacted = await jsonld.compact(item.url, context);
        // console.log(JSON.stringify(compacted, null, 2));
        // console.log("compacted",compacted)

        this.$router.push({ path: 'network', query: { url: item.url } })
        //  this.$router.push('etwork', {url: item.url})
      }
    },
    readParent(p){
      this.read({url: p, name: p, type: 'folder'  })
    }
  },
  watch:{
    storage(){
      if (this.storage != null){
        this.read({url: this.storage, name: this.storage, type: 'folder'})
      }
    },
  },
  computed: {
    webId: {
      get () { return this.$store.state.solid.webId},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    storage: {
      get () { return this.$store.state.solid.storage},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    dataToSave: {
      get () { return this.$store.state.ipgs.dataToSave},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },

  },
}
</script>

<style>
.item {
  text-align: left;
}
.scroll{
  max-height: 80vh;
  margin-bottom: 10px;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
}
.unstyled-button {
  border: none;
  padding: 0;
  background: none;
}
li.group-btn {
  padding: 0;
  border-radius: 0;
}
.form-control,
.btn {
  border-radius: 0 !important;
}
</style>
