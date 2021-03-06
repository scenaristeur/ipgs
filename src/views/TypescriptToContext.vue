<template>
  <div>
    <h3>Get jsonld context from typescript definition</h3>

    <b-input v-model="tsDef"></b-input>
    <b-button @click="generateContext">Generate Context</b-button>

    <ul>
      <li>https://www.npmjs.com/package/@types/vis</li>
      <li>vis typescript : https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/vis/index.d.ts</li>
      <li> could be used for other typscripts definitions :  6,547 entries https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types</li>
    </ul>
    !! dependencies @types/moment
  </div>
</template>

<script>
// import { Network, DataSet, Node, Edge, IdType } from 'vis-network/standalone'; // visualisation des types  : https://github.com/visjs/vis-network/issues/930
// console.log(Network,DataSet, Node, Edge, IdType)

import * as vis from '@types/vis'
console.log(vis)

import { Network, DataSet, Node, Edge, IdType } from '@types/vis'
console.log(Network,DataSet, Node, Edge, IdType)

export default {
  name: "TypescriptToContext",
  data() {
    return {
      tsDef: 'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/vis/index.d.ts'
    }
  },
  methods: {
    generateContext() {
      console.log("todo load ",this.tsDef)
    }
  }

}
</script>

<style>

</style>
