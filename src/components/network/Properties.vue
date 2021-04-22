<template>
  <div>
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

    <b-card v-if="props!=undefined" >
      Props : {{ props.length }}
      <div style="height=40px;overflow-y: scroll;">
        <b-list-group >
          <b-list-group-item v-for="(p,k) in props" :key="k" variant="light">
            {{p.prop}} :
            {{p.val}}

          </b-list-group-item>
        </b-list-group>
      </div>

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'Properties',
  props: ['properties'],
  data(){
    return {
      props: [],
      newProp: {prop:"", val:""},
    }
  },
  created(){
    this.props = this.properties
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
        this.props.push(p)
        console.log(this.props)
        this.$emit('propsUpdated', this.props)
        this.newProp.prop = ""
        this.newProp.val = ""
        this.$refs.inputProp.focus();
      }else{
        alert("Property and Value can't be null")
      }
    },
  },
  watch:{
    properties(){
      this.props = this.properties
      console.log(this.props)
    }
  }
}
</script>

<style>

</style>
