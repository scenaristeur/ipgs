<template>

    <div id="trans" v-if="currentItem.props != undefined && currentItem.props.length > 0" >
      <!-- {{ JSON.stringify(currentItem.props) }} -->

        <div v-for="(p, k) in currentItem.props" :key="k"> <small>{{ p.prop}}: {{p.val}}</small></div>

    </div>

</template>

<script>
export default {
  name: "PropertiesPopup",
  computed: {
    currentItem: {
      get () { return this.$store.state.ipgs.currentItem},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}

</script>

<style>

/* body
{
background-color: #E0E0E0;
} */

#bloc
{
  font-weight : bold;
  font-family : verdana;
  font-size : 12px;

  /* background-color: transparent; /*pour avoir la transparence avec le body */
  /* background-color: #B0B0B0; */
  background-color:  rgba(255, 255, 0, 0.1);
  /* width: 300px; */
  height: 300px;
  padding: 5px;
  margin: 0;
  position: absolute;
  top: 120px;
  left: 20px;
}

#trans
{
  color: black;
  /* width: 50px; */
   height: 50px;
  position: absolute;
  background-color: transparent; /* pour avoir la transparence avec la div "bloc" */
  z-index: 2;
  top: 120px;
  left: 20px;
}


</style>
