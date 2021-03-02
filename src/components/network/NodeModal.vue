<template>
  <b-modal id="node-popup" title="Node"
  no-close-on-backdrop  content-class="shadow"
  @ok="addNodeModal">
  <b-input-group size="sm" prepend="Label">
    <b-form-input v-model="value.label" autofocus v-on:keyup.enter="addNodeModal"></b-form-input>
  </b-input-group>


  <!-- <b-input-group size="sm" prepend="Id" v-if="value.id != calculatedId && calculatedId != '#'">
    <b-form-input v-model="value.id"></b-form-input>
    <br>
    <b-button @click="updateId">Update id to:  {{ calculatedId }}</b-button>
  </b-input-group> -->
  <!-- <b-form-select v-model="value.node_type" :options="node_types" size="sm" class="mt-3"></b-form-select> -->

  <!-- Using value -->
  <!-- <b-button v-b-toggle="'collapse-node-id'" class="m-1" variant="primary" size ="sm">Id</b-button>
  <b-button v-b-toggle="'collapse-node-shape'" class="m-1" variant="dark" size="sm">Shape</b-button>
  <b-button v-b-toggle="'collapse-node-expert'" class="m-1" variant="light" size="sm">Expert</b-button> -->
  <b-button v-b-toggle="'collapse-node-color'" class="m-1" variant="dark" size="sm">Color</b-button>
  <b-button v-b-toggle="'collapse-node-shape'" class="m-1" variant="dark" size="sm">Shape</b-button>
  <!-- <b-button v-b-toggle="'collapse-node-icon'" class="m-1" variant="dark" size="sm">Icon</b-button> -->




  <!-- Element to collapse -->
  <b-collapse id="collapse-node-id">
    <b-card>
      <b-input-group size="sm" prepend="Id">
        <b-form-input v-model="value.id"></b-form-input>
      </b-input-group>
    </b-card>
  </b-collapse>

  <b-collapse id="collapse-node-color">
    <b-card>

          <label for="backgroundcolorpicker">Background : </label>
          <!-- <input type="color" v-model="value.color.background" value="#D2E5FF"><br> -->
            <v-swatches v-model="value.color.background" value="#D2E5FF"></v-swatches>
          <label for="bordercolorpicker">Border : </label>
           <!-- <input type="color" v-model="value.color.border" value="#2B7CE9"> -->
           <v-swatches  v-model="value.color.border" value="#2B7CE9"></v-swatches>

          <b-button @click="defaultColor" size="sm" variant="light">reset colors</b-button>

    </b-card>
  </b-collapse>

  <b-collapse id="collapse-node-shape">
    <b-card>
      <b-input-group size="sm" prepend="shape">
        <b-form-select v-model="value.shape" :options="shapes" size="sm" class="mt-3"></b-form-select>
        <!-- <b-form-input v-if="value.shape=='icon'" v-model="icon.code"></b-form-input> -->
        <div v-if="value.shape=='icon'">
          Icon must be selected in shape <a href="https://fontawesome.com/cheatsheet" target="_blank">icon list</a>
          <vfa-picker  v-model="icon_code" is-unicode="true">
            <template v-slot:activator="{ on }">
              <input v-model="icon_code" @click="on" placeholder="Icon Unicode" type="text" />

            </template>
          </vfa-picker>
          <input v-model="icon_color" label="icon color" type="color" />
        </div>
      </b-input-group>
    </b-card>
  </b-collapse>

  <b-collapse id="collapse-node-expert">

    <b-input-group size="sm" prepend="expert">
      <b-form-input v-model="value.id"></b-form-input>
    </b-input-group>

  </b-collapse>

</b-modal>
</template>
<script>
import 'vue-swatches/dist/vue-swatches.css'

export default {
  name: 'NodeModal',
  props: ['value'],
  components: {
  //  Network,
    'VSwatches': () => import('vue-swatches'),
  //  'network': () => import('vue-vis-network')
  },
  created(){
    console.log(this.value)
    //  this.value.color == undefined ? this.value.color = {background: "#D2E5FF", border: "#2B7CE9"} : ""
    this.value.node_type == undefined ? this.value.node_type = 'default' : ""
  },
  data() {
    return {
      node_type: "default",
      node_background_color:"#D2E5FF",
      node_border_color:"#2B7CE9",
      icon_face: "'Font Awesome 5 Free'",
      icon_code:"",
      icon_color: "#2B7CE9",
      node_types: [
        { value: null, text: 'Please select some item' },
        {value: "default", text: "Default"},
        {value: "folder", text: "Folder"},
        {value: "file", text: "File"},
        {value: "actor", text: "Actor"},
        {value: "remote", text: "Remote"}
      ],
      shapes: [
        {value: "ellipse", text: "ellipse" },
        {value: "circle", text: "circle" },
        //    {value: "icon", text: "icon -->" },
        {value: "database", text: "database" },
        {value: "box", text: "box" },
        {value: "diamond", text: "diamond" },
        {value: "dot", text: "dot" },
        {value: "square", text: "square" },
        {value: "triangle", text: "triangle" },
        {value: "triangleDown", text: "triangleDown" },
        {value: "text", text: "text" },
        {value: "star", text: "star" },
        {value: "hexagon", text: "hexagon" },
      ]
    }
  },
  watch:{
    icon_code(){
      console.log(this.icon_code)
      this.value.icon = {}
      this.value.icon.face = this.icon_face
      // eslint-disable-next-line
      this.value.icon.code = String.fromCodePoint('0x'+this.icon_code)
    },
    icon_color(){
      this.value.icon.color = this.icon_color
    },
  },
  methods: {
    addNodeModal(){

      if (this.value.shape == 'icon'){


        // !this.icon.code.startsWith("\u") ? this.icon.code = '\\u'+this.icon.code : ""
        //  this.icon.code = "\uf007"

      }
      console.log(this.value)
      this.$emit('ok', this.value)
      this.$bvModal.hide("node-popup")
    },
    defaultColor(){
      this.value.color.background="#D2E5FF"
      this.value.color.border="#2B7CE9"
    },
    // updateId(){
    //   this.value.id = this.calculatedId
    // }
  },
  computed:{
    // calculatedId(){
    //   return "#"+this.value.label.trim().split(' ').join('_') || this.value.id
    // }
  }
}
</script>
