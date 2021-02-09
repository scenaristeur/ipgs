<template>
  <b-container>
    <b-list-group v-if="storage != null">
      <b-list-group-item v-if="folder.parent != 'https://'" variant="dark" @click="readParent(folder.parent)" button>{{ folder.parent }}</b-list-group-item>
      <b-list-group-item v-for="fo in folder.folders" :key="fo.url" @click="read(fo)" button>{{ fo.name }}</b-list-group-item>
      <b-list-group-item variant="light" v-for="fi in folder.files" :key="fi.url" @click="read(fi)" button>{{ fi.name }}</b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )

export default {
  name:"Browser",
  data() {
    return {
      folder: {folders:[], files: []}
    }
  },
  created(){
    this.read({url: this.storage, name: this.storage, type: 'folder'})
  },
  methods: {
    async read(item) {
      if( item.type == 'folder' ){
        this.folder = await fc.readFolder(item.url)
      } else{
        this.file = await fc.readFile(item.url)
      }
    },
    readParent(p){
      this.read({url: p, name: p, type: 'folder'  })
    }
  },
  watch: {
    storage(){
      this.read({url: this.storage, name: this.storage, type: 'folder'})
    }
  },
  computed: mapState({
    storage: s => s.solid.storage
  }),
}
</script>
