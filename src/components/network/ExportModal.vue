<template>
  <b-modal id="export-popup" size="lg">
    <editor
    height="300px"
    ref="editor"
    :content="content"
    :options="{
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      tabSize:2
    }"
    :fontSize='14'
    :lang="'python'"
    :theme="'eclipse'"
    >
    <!--    @onChange="editorChange"
    @init="editorInit"
  -->
  <div>
    <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
      <!-- <b-button-group class="mx-1">
      <b-button>New</b-button>
      <b-button>Edit</b-button>
      <b-button>Undo</b-button>
    </b-button-group> -->
    <b-dropdown class="mx-1" >
      <template #button-content>
        {{format}}
      </template>
      <b-dropdown-item @click="onFormatChange('json')">json</b-dropdown-item>
      <b-dropdown-item @click="onFormatChange('ttl')">ttl</b-dropdown-item>
      <b-dropdown-item @click="onFormatChange('jsonld')">jsonld</b-dropdown-item>
      <!-- <b-dropdown-item @click="onFormatChange('ipfs')">ipfs</b-dropdown-item> -->
    </b-dropdown>
    <b-button-group class="mx-1">
      <b-button @click="downloadFile">Download</b-button>
      <b-button @click="save">Save</b-button>
      <b-button @click="IpfsAdd">Save a copy on Ipfs</b-button>
    </b-button-group>
  </b-button-toolbar>
</div>
</editor>
<StorageModal />
<IpfsModal :cid="cid" />
</b-modal>
</template>

<script>
import networkUtilMixin from '@/mixins1/networkUtilMixin'
import ace from 'brace'
import 'brace/ext/language_tools';
import 'brace/mode/python.js'
import 'brace/snippets/python.js';
import 'brace/theme/eclipse.js';
// ace/mode/turtle


export default {
  name: 'ExportModal',
  mixins: [networkUtilMixin],
  components: {
    'Editor': () => import('vue2x-ace-editor'),
    'StorageModal': () => import('@/components/solid/StorageModal'),
    'IpfsModal': () => import('@/components/storage/IpfsModal'),

  },
  data() {
    return {
      content: "content",
      format: 'json',
      cid: ""
    }
  },
  created(){
    this.editorContent = this.$store.state.ipgs.editorContent
  },
  mounted() {
    this.getIpfsNodeInfo();
  },
  methods: {
    fakeFunctionToNOTBELINTED(){
      console.log(ace)
    },
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
    async onFormatChange(f){
      this.format = f
      console.log("FORMAT CHANGED",f)
      switch (this.format) {
        case 'json':
        this.content = JSON.stringify(this.editorContent.content, undefined, 2)
        break;
        case 'ttl':
        this.content = await this.jsonToTtl(this.editorContent.content)
        break;
        case 'jsonld':
        this.content = JSON.stringify(await this.jsonToJsonLd(this.editorContent.content), undefined, 2)
        break;
        // case 'ipfs':
        // this.IpfsAdd()
        // break;
        default:
        console.warn('UNKNOWN FORMAT', f)

      }

    },
    async IpfsAdd(){
      console.log(this.ipfs)
      console.log(this.editorContent.content)
      const results = await this.ipfs.add(JSON.stringify(this.editorContent.content))
      console.log("res", results)
      console.log(await results.cid)
      this.cid = results.cid
      this.$bvModal.show("ipfs-modal")
      // this.editorContent.content.ipfscid = results.cid
      // this.cid = results.cid
    },

    save() {
      console.log('save')
      this.$store.commit('ipgs/setDataToSave', {content: this.content, format: this.format})


      this.$bvModal.show("storage-modal")
      //  this.$bvModal.hide("export-popup")
    },
  },
  watch:{
    editorContent(){
      console.log(this.editorContent)
      this.content = JSON.stringify(this.editorContent.content, undefined, 2)
      this.format = this.editorContent.format
    },
  },
  computed:{
    editorContent: {
      get () { return this.$store.state.ipgs.editorContent},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
