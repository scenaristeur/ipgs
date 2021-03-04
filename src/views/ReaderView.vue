<template>
  <div>

    Reader

    <div>
      <b-table striped hover :items="networks" >

        <!-- :fields="fields"
        <template #cell(compacted)="data">
              {{data.item}}
             </template> -->

      </b-table>
    </div>
  </div>
</template>

<script>
import DataLoader from '@/util/DataLoader.js'
let loader = new DataLoader()


export default {
  name: 'Reader',
  data() {
    return {
      sources: [
        {name: 'Spoggy-Test9 pod storage', url: 'https://spoggy-test9.solidcommunity.net', status: 'pending'},
        {name: 'Simple Log turtle file', url: 'https://ipgs.solidcommunity.net/public/activity/log.ttl', status:""},
        {name: 'Spoggy solid profile', url: 'https://spoggy.solidcommunity.net/profile/card#me'},
         {name: "Angelo's public folder", url: 'https://angelo.veltens.org/public/'},
        // {name: 'public folder without trailing slash', url: 'https://angelo.veltens.org/public'},
        // {name: 'ttl without extension', url: 'https://angelo.veltens.org/public/tweets/2020/05/1260959812579405826'},
        // {name: 'multiple ttl folder', url: 'https://spoggy.solidcommunity.net/public/Notes/'},

        // -
        //
        //  semaps containers
        {name: 'Semapps Skills', url: 'https://data.virtual-assembly.org/skills'},
        // {name: 'Semapps Orga', url: 'https://data.virtual-assembly.org/organizations'},
        // {name: 'Semapps Users', url: 'https://data.virtual-assembly.org/users'},
        // {name: 'Semapps Projects', url: 'https://data.virtual-assembly.org/projects'},
        // {name: 'Semapps Themes', url: 'https://data.virtual-assembly.org/themes'},

        //  {name: 'Semapps All in one', url: 'https://data.virtual-assembly.org/'},
        // {name: 'simple json', url: ''},
        // {name: 'jsonld file with @id', url: ''},
        // {name: 'jsonld file without @id', url: ''},
        // {name: 'jsonld file with @id with @context', url: ''},
        // {name: 'jsonld file without @id without @context', url: ''},
        // {name: 'jsonld file with @id replaced by id in @context', url: ''},
        // {name: 'visjs file with nodes & edges arrays', url: ''},
        // {name: 'folder/container with many different files', url: ''},
      ],
      networks: [],
    //  fields: ['@id', 'id','compacted', 'network', 'documentUrl']
    }
  },
  async created(){
    if (this.$route.query.url != undefined ){
      this.url = this.$route.query.url
      console.log(this.url)
      this.sources.push({name: 'Url Query', url: this.url})
      //  this.$router.push(({ name: 'Network', query: { url: this.url } }))
    }

    await this.init()

  },
  methods: {
    async init() {
      this.networks = await loader.load(this.sources)
      console.log(this.networks)

    }
  }
}
</script>

<style>

</style>
