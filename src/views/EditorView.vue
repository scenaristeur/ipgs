<template>
  <!-- <b-modal id="editor-modal" size="lg"> -->
  <editor
  height="300px"
  ref="editor"
  :content="editorContent.content"
  :options="{
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    tabSize:2
  }"
  :fontSize='14'
  :lang="'python'"
  :theme="'eclipse'"
  @onChange="editorChange"
  @init="editorInit">
  <div>
    <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
      <!-- <b-button-group class="mx-1">
      <b-button>New</b-button>
      <b-button>Edit</b-button>
      <b-button>Undo</b-button>
    </b-button-group> -->
    <b-dropdown class="mx-1" >
      <template #button-content>
        {{editorContent.format}}
      </template>
      <b-dropdown-item>json</b-dropdown-item>
      <b-dropdown-item>ttl</b-dropdown-item>
      <b-dropdown-item>jsonld</b-dropdown-item>
    </b-dropdown>
    <b-button-group class="mx-1">
        <b-button @click="download">Download</b-button>
      <b-button>Save</b-button>
      <b-button to="/">Cancel</b-button>
    </b-button-group>
  </b-button-toolbar>
</div>
</editor>
<!-- </b-modal> -->
</template>

<script>
// https://github.com/zjfcool/vue2x-ace-editor

import ace from 'brace'
import 'brace/ext/language_tools';
import 'brace/mode/python.js'
import 'brace/snippets/python.js';
import 'brace/theme/eclipse.js';


// ace/mode/turtle
console.log(ace)

export default {
  name: 'EditorVue',
  components: {
    'Editor': () => import('vue2x-ace-editor'),
  },
  methods: {
    editorChange(){
      console.log(this.editorContent)
    },
    editorInit(){
      console.log(this.editorContent)
    },
  },
  computed: {
    editorContent: {
      get () { return this.$store.state.ipgs.editorContent},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    network:{
      get () { return this.$store.state.ipgs.network},
      set (value) { this.$store.commit('ipgs/setNetwork', value) }
    }
  }
}
</script>

<style>

</style>
