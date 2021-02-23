<template>
  <b-modal id="help-modal" size="lg" title="Help">
    <p>
      In the input filed you can type triples or commands.<br>
      Commands starts with a slash <code>/</code>.<br>
      Triples ends with a special character : <code>	. ; , - </code>
    </p>

    <h3>Triples</h3>
    <p>Triples are groups of three words separated by a space.<br>
      The first is the subject, the second is the predicate and the third is the object.<br>
      -> with double quotes when there is a space in the node or edge<br>
      -> that ends with an "End Character" that could be :
      <ul>
        <li>a dot 	<b><code>	. </code></b>	if you want to clear all the input</li>
        <li>a semicolon 	<code><b>;</b></code>	if you want to keep the subject and property and clear the object of triplet</li>
        <li>a coma		<code><b>,</b></code>	if you want to keep the subject and clear property and object</li>
        <li>a hyphen      <code>-</code>   if you want to to the object as the subject for the next triple</li>
      </ul>
      <b>some examples :</b><br>
      <code>
        Spoggy a developer.
      </code><br>
      <code>
        Ipgs "is a" "nice project",
      </code><br>
      <code>
        "Fun triples" "ends with" "SpecialCharachter"-
      </code>

    </p>

    <h3>Commands</h3>
    <ul>
      <li>
        /h : show this help
      </li>
      <li>
        /n : new graph
      </li>
      <li>
        /e : export json
      </li>
      <li>
        /t : export ttl
      </li>
      <li>
        /c : capture
      </li>
    </ul>


    <iframe width="100%" height="400px" src="https://www.youtube.com/embed/f4uKb6EnDKs?start=2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



  </b-modal>
</template>

<script>
export default {
  name: "HelpView",
  methods: {
    onInputObjectChange(data){
      //console.log(data)
      if (data.type == "commande" && data.value== "/h"){
        this.$bvModal.show("help-modal")
      }
    }
  },
  computed: {
    inputObject: {
      get () { return this.$store.state.ipgs.inputObject},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  watch:{
    inputObject(){
      console.log(this.inputObject)
      this.onInputObjectChange(this.inputObject)
    },
  }
}
</script>

<style>

</style>
