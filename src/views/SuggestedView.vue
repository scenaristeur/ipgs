<template>
  <b-container>
    <h4>Suggested</h4>


    <!-- <b-button >All</b-button> -->
    <b-table
    striped
    hover
    responsive
    :items="items">
    <!-- :fields="fields"> -->
    <template #cell(url)="data">
      <router-link :to="{ path: '/', query: { url: data.item.url }}">Link</router-link><br>
      <small>{{ data.item.url}}</small>
    </template>

  </b-table>




</b-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {name: 'Semapps Skills', url: 'https://data.virtual-assembly.org/skills/'},
        {name: 'Semapps Orga', url: 'https://data.virtual-assembly.org/organizations/'},
        {name: 'Semapps Users', url: 'https://data.virtual-assembly.org/users/'},
        {name: 'Semapps Projects', url: 'https://data.virtual-assembly.org/projects/'},
        {name: 'Semapps Themes', url: 'https://data.virtual-assembly.org/themes/'},
        {name: 'Semapps All in one', url: 'https://data.virtual-assembly.org/'},
        {name: "Angelo's public folder", url: 'https://angelo.veltens.org/public/'},
        {name: 'multiple ttl folder', url: 'https://spoggy.solidcommunity.net/public/Notes/'},
        {name: 'Spoggy solid profile', url: 'https://spoggy.solidcommunity.net/profile/card#me'},
        

        {name: 'Lyon on dbPedia', "url": 'http://fr.dbpedia.org/data/Lyon.jsonld'},
        {name: 'Bonnie & Clyde, jsonld on Solid Pod', url: 'https://spoggy-test9.solidcommunity.net/public/network/GangBarrowTest.jsonld'},
        {name: 'Simple Vis Network on Solid Pod', url: 'https://spoggy-test9.solidcommunity.net/public/network/davman.json'},
        {name: 'Basic Ttl file on Pod', url:'https://spoggy-test9.solidcommunity.net/public/table/workspaces/560f57a6-d26d-4e20-85f1-f794c3ebafb6.ttl'},
        {name: 'Spoggy-Test9 pod storage', url: 'https://spoggy-test9.solidcommunity.net', status: 'pending'},
        {name: 'Simple Log turtle file', url: 'https://ipgs.solidcommunity.net/public/activity/log.ttl', status:""},
        {name: 'public folder without trailing slash', url: 'https://angelo.veltens.org/public'},
        {name: 'ttl without extension', url: 'https://angelo.veltens.org/public/tweets/2020/05/1260959812579405826'},

        // -
        //
        //  semaps containers

        // {name: 'simple json', url: ''},
        // {name: 'jsonld file with @id', url: ''},
        // {name: 'jsonld file without @id', url: ''},
        // {name: 'jsonld file with @id with @context', url: ''},
        // {name: 'jsonld file without @id without @context', url: ''},
        // {name: 'jsonld file with @id replaced by id in @context', url: ''},
        // {name: 'visjs file with nodes & edges arrays', url: ''},
        // {name: 'folder/container with many different files', url: ''},

      ]
    }
  }
}
</script>

<style>

</style>
