<template>
  <b-modal id="node-popup" title="Node"
  no-close-on-backdrop  content-class="shadow"
  @ok="addNodeModal"
  size="lg">
  <b-input-group size="sm" prepend="Label">
    <b-form-input v-model="v.label" autofocus v-on:keyup.enter="addNodeModal"></b-form-input>
  </b-input-group>
  <!-- <b-input-group size="sm" prepend="Id" v-if="v.id != calculatedId && calculatedId != '#'">
  <b-form-input v-model="v.id"></b-form-input>
  <br>
  <b-button @click="updateId">Update id to:  {{ calculatedId }}</b-button>
</b-input-group> -->
<!-- <b-form-select v-model="v.node_type" :options="node_types" size="sm" class="mt-3"></b-form-select> -->

<!-- Using v -->
<!-- <b-button v-b-toggle="'collapse-node-id'" class="m-1" variant="primary" size ="sm">Id</b-button>
<b-button v-b-toggle="'collapse-node-shape'" class="m-1" variant="dark" size="sm">Shape</b-button>
<b-button v-b-toggle="'collapse-node-expert'" class="m-1" variant="light" size="sm">Expert</b-button> -->
<!-- <b-button v-b-toggle="'collapse-node-icon'" class="m-1" variant="dark" size="sm">Icon</b-button> -->

<div class="input-group" style="display:table; width:100%;">
  <b-button v-b-toggle="'collapse-node-vis'" class="m-1" variant="dark" size="sm">Vis</b-button>
  <b-button v-b-toggle="'collapse-node-props'" class="m-1" variant="dark" size="sm">Props</b-button>

  <span style="display: table-cell; width: 190px;">
    <b-button @click="newGraphFromNode" class="m-1" variant="light" size="sm">New Graph from this node</b-button>
  </span>
</div>


<!-- Element to collapse -->
<b-collapse id="collapse-node-vis">
  <b-card>
      <b-input-group>
    <label for="backgroundcolorpicker" class="mt-3">Background: </label>
    <v-swatches id="backgroundcolorpicker" v-model="v.color.background" value="#D2E5FF"  show-fallback
    fallback-input-type="color" popover-x="left" class="m-2">
  </v-swatches>
    <label for="bordercolorpicker" class="mt-3">Border: </label>
    <v-swatches id="bordercolorpicker" v-model="v.color.border" value="#2B7CE9"  show-fallback
    fallback-input-type="color" popover-x="left" class="m-2">
  </v-swatches>
    <b-button @click="defaultColor" size="sm" variant="warning" class="ml-auto" >reset colors</b-button>
  </b-input-group>
  </b-card>

  <b-card>
    <b-input-group size="sm" prepend="shape">
      <b-form-select v-model="v.shape" :options="shapes" size="sm" class="mt-3"></b-form-select>
        <a href="https://visjs.github.io/vis-network/docs/network/nodes.html" target="_blank"><b-icon icon="question" aria-hidden="true" ></b-icon></a>
      <!-- <b-form-input v-if="v.shape=='icon'" v-model="icon_code"></b-form-input>
      <div v-if="v.shape=='icon'">
        Icon must be selected in shape <a href="https://fontawesome.com/cheatsheet" target="_blank">icon list</a>
        <vfa-picker  v-model="icon_code" is-unicode="true">
          <template v-slot:activator="{ on }">
            <input v-model="icon_code" @click="on" placeholder="Icon Unicode" type="text" />
          </template>
        </vfa-picker>
        <input v-model="icon_color" label="icon color" type="color" />
      </div> -->
    </b-input-group>
  </b-card>


  <b-card>
    <b-input-group size="sm" prepend="Id ( ??? Are you sure ???  !!! changing id will break links !!! )">
      <b-form-input v-model="v.id"></b-form-input>
    </b-input-group>
  </b-card>

  <b-card>
    <b-input-group size="sm" prepend="Cluster id">
      <b-form-input type="number" min="1" v-model="v.cid"></b-form-input>
      <a href="https://visjs.github.io/vis-network/docs/network/#methodClustering" target="_blank"><b-icon icon="question" aria-hidden="true" ></b-icon></a>
    </b-input-group>

  </b-card>




</b-collapse>


<b-collapse id="collapse-node-props">
  <b-card>
    <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Property" label-for="input-prop">
      <b-form-input id="input-prop" ref="inputProp" v-model="newProp.prop" size="sm" placeholder="Property"></b-form-input>
    </b-form-group>
    <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Value" label-for="input-val">
      <b-form-input id="input-val" size="sm" v-model="newProp.val" placeholder="Value" v-on:keyup.enter="addProp"></b-form-input>
    </b-form-group>
    <b-button size="sm" class="mb-2" variant="success" @click="addProp">
      <b-icon icon="plus" aria-hidden="true"></b-icon> Add a property
    </b-button>
  </b-card>

  <b-card v-if="v.props!=undefined" >
    Props : {{ v.props.length }}
    <div style="height=40px;overflow-y: scroll;">
      <b-list-group >
        <b-list-group-item v-for="(p,k) in v.props" :key="k" variant="light">
          {{p.prop}} :
          {{p.val}}

        </b-list-group-item>
      </b-list-group>
    </div>

  </b-card>



</b-collapse>

</b-modal>
</template>
<script>
import 'vue-swatches/dist/vue-swatches.css'

export default {
  name: 'NodeModal',
  props: ['node'],
  components: {
    //  Network,
    'VSwatches': () => import('vue-swatches'),
    //  'network': () => import('vue-vis-network')
  },
  mounted(){

  },
  data() {
    return {
      v: {label: "", color: "", shape: ""},
      node_type: "default",
      node_background_color:"#D2E5FF",
      node_border_color:"#2B7CE9",
      // icon_face: "'Font Awesome 5 Free'",
      // icon_code:"",
      // icon_color: "#2B7CE9",
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
        //   {value: "icon", text: "icon -->" },
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
      ],
      newProp: {prop:"", val:""}
    }
  },
  watch:{
    // icon_code(){
    //   console.log(this.icon_code)
    //   this.v.icon = {}
    //   this.v.icon.face = this.icon_face
    //   // eslint-disable-next-line
    //   this.v.icon.code = String.fromCodePoint('0x'+this.icon_code)
    // },
    // icon_color(){
    //   this.v.icon.color = this.icon_color
    // },
    node(){
      this.v = this.node
      this.v.props == undefined ? this.v.props = [] : ""
      console.info("Node",this.v)
      //  this.v.color == undefined ? this.v.color = {background: "#D2E5FF", border: "#2B7CE9"} : ""
      //  this.v.node_type == undefined ? this.v.node_type = 'default' : ""
    }
  },
  methods: {
    addProp(){
      console.log(this.newProp)

      // this.v.props[this.newProp.prop] == undefined ? this.v.props[this.newProp.prop] = [] : ""
      // !this.v.props[this.newProp.prop].includes(this.newProp.val) ? this.v.props[this.newProp.prop].push(this.newProp.val) : alert ("Already in Node props :"+ this.newProp.prop+ " / "+this.newProp.val)
      // console.log(this.v)
      if(this.newProp.prop.length > 0 && this.newProp.val.length > 0){
        let p = {
          prop : this.newProp.prop,
          val: this.newProp.val
        }
        this.v.props.push(p)
        console.log(this.v.props)

        this.newProp.prop = ""
        this.newProp.val = ""
         this.$refs.inputProp.focus();
      }else{
        alert("Property and Value can't be null")
      }
    },
    addNodeModal(){
      // if (this.v.shape == 'icon'){
      //   // !this.icon.code.startsWith("\u") ? this.icon.code = '\\u'+this.icon.code : ""
      //   //  this.icon.code = "\uf007"
      // }
      //
      console.log("VVVVVVV",this.v)
      let isUUID = this.v.id.split`-`.map(x=>x.length+`0x${x}0`*0)=="8,4,4,4,12"
      if(isUUID){
        this.v.id= "#"+this.v.label.trim().split(' ').join('_')
      }

      console.log(this.v)
      this.$emit('ok', this.v)
      this.$bvModal.hide("node-popup")
    },
    defaultColor(){
      this.v.color.background="#D2E5FF"
      this.v.color.border="#2B7CE9"
    },
    newGraphFromNode(){
      console.log(this.v.id)
      if (this.$route.query.url != undefined ){
        this.url = this.$route.query.url
        console.log("url", this.url)
        let nodeFullUri = this.url.substr(0,this.url.lastIndexOf('/'))+this.v.id
        console.log(nodeFullUri, this.v)
        let g = {url: nodeFullUri, node: this.v}
        this.$store.commit('ipgs/setNewGraph', g)



      }else{
        console.log("url undefined", this.url)
      }


    }
    // updateId(){
    //   this.v.id = this.calculatedId
    // }
  },
  // computed:{
  //   // calculatedId(){
  //   //   return "#"+this.v.label.trim().split(' ').join('_') || this.v.id
  //   // }
  // }
}
</script>
