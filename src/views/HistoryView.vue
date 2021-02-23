<template>
  <b-container>
    History

    <!-- {{ history}} -->

    <b-list-group>
      <b-list-group-item button v-for="h in history" :key="h.id" @click="see(h)" >
        <img v-if="h.shape == 'image'" :src="h.image" width="20rem"/>


        {{ h.label }}</b-list-group-item>

      </b-list-group>

    </b-container>
  </template>

  <script>
  export default {
    name: 'HistoryView',
    computed: {
      history: {
        get () { return this.$store.state.ipgs.history},
        set (/*value*/) { /*this.updateTodo(value)*/ }
      },
    },
    methods:{
      async see(item)
      {
        this.$router.push({ path: 'network', query: { url: item.id } })
      },
    }
  }
  </script>

  <style>

  </style>
