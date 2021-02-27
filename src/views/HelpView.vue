<template>
  <b-modal id="help-modal" size="lg" title="Help">
    <p>
      In the input filed you can type triples or commands.<br>
      Commands starts with a slash  :<code> / </code><br>
      Triples ends with a special character : <code><b>	. ; , - </b></code>
    </p>

    <h3>Triples</h3>
    <p>Triples are groups of three words separated by a space.<br>
      The first group is the subject, the second is the predicate and the third is the object.<br>
      Triples can use double quotes when there is a space in the node or edge.<br>
      Triples ends with a special "End Character" that could be :
      <ul>
        <li>a dot <b><code>	. </code></b>	if you want to clear all the input</li>
        <li>a semicolon <code><b> ; </b></code>	if you want to keep the subject and clear property and object</li>
        <li>a coma <code><b> , </b></code> if you want to keep the subject and property and clear the object of triplet</li>
        <li>a hyphen <code><strong> - </strong></code> if you want to to the object as the subject for the next triple</li>
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
        <code>  /h </code>: show this help
      </li>
      <li>
        <code>  /n </code>: new graph
      </li>
      <li>
        <code>  /s </code>: save the graph as jsonld on your Solid Pod
      </li>
      <li>
        <code>  /e </code>: export json
      </li>
      <li>
        <code>  /t </code>: export ttl
      </li>
      <li>
        <code>  /c </code>: capture
      </li>
    </ul>

    <h3> Watch this video for a better idea on how to use</h3>
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
code {
  background-color: "#ffffff";
  padding: 3px;
}
</style>
