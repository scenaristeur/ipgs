<template>
  <b-container>
    Reunion

    <b-row>

      <b-col>
        <div class="add-item">
          <b-form-input v-model="name" placeholder="Create a reunion"></b-form-input>
        </div>

        <b-form-group label="Participants" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="visibility" :aria-describedby="ariaDescribedby" name="some-radios" value="public">Public</b-form-radio>
          <b-form-radio v-model="visibility" :aria-describedby="ariaDescribedby" name="some-radios" value="invitation">Invitation</b-form-radio>
        </b-form-group>


        <b-button @click="createShareAndOpen" variant="warning">Create, share & open</b-button>

      </b-col>

      <b-col>

        <canvas id="canvas"></canvas>

      </b-col>


    </b-row>


    <b-table striped hover :items="reunions" :fields="fields" >

      <template #cell(creator)="data">
        <a :href="data.item.creator" target="_blank">{{data.item.creator.split('/')[2]}}</a>
      </template>

      <template #cell(join)="row">
        <b-button size="sm" @click="join(row.item)" class="mr-2" variant="light">
          Join
        </b-button>
      </template>


    </b-table>

  </b-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode'

export default {
  name: "Reunion",
  data() {
    return {
      name: '',
      visibility: 'public',
      reunions: [],
      fields: ["name", "visibility", "creator", "join"]
    };
  },
  methods: {
    createShareAndOpen(){


      let path = this.visibility == "public" ? "public/" : "private/"
      path+='ipgsReunion/'+uuidv4()+'.jsonld'
      let url = this.storage+path
      let r = {
        name: this.name,
        visibility: this.visibility,
        creator: this.webId,
        url: url,
        fullUrl: 'https://scenaristeur.github.io/ipgs?url='+url,
        created: new Date()
      }
      console.log(r)
      this.name = '';
      this.reunions.push(r)

      var canvas = document.getElementById('canvas')

      QRCode.toCanvas(canvas, r.fullUrl, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })


    },
    join(item){
      console.log(this.storage)
      console.log(item)
    }
  },
  computed:{
    storage: {
      get () { return this.$store.state.solid.storage},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    webId: {
      get () { return this.$store.state.solid.webId},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>
.add-item input {
  outline: none;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  transition: all 0.25s;
  background: inherit;
  color: white;
}
.add-item input:focus {
  border-bottom-color: rgba(255, 255, 255, 1);
}
</style>
