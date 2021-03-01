<template>
  <b-modal id="help-modal" size="lg" title="Help">
    <p>
      In the input field you can type <b>Commands</b> & <b>Triple</b>.<br>
      <ul>
        <li><b>Commands</b> starts with a slash  :<code> / </code></li>
        <li><b>Triples</b> ends with a special character : <code><b>	. ; , </b></code> or <code><b> - </b></code></li>
      </ul>
    </p>

    <h3>Commands</h3>
    <ul>
      <li><code>  /h </code>: show this help</li>
      <li><code>  /n </code>: create a new graph</li>
      <!-- <li><code>  /s </code>: save the graph as jsonld on your Solid Pod</li> -->
      <li><code>  /e </code>: export or save the current graph</li>
      <li><code>  /i </code>: import an existing graph or load an url</li>
      <li><code>  /c </code>: capture a picture of the graph</li>
    </ul>

    <h3>Triples</h3>
    <p>Triples are groups of three words separated by a space, to easily create nodes and links, like: <br>
      <code>
        Spoggy a developer.
      </code><br>
      <code>
        Ipgs "is a" "nice project",
      </code> or <br>
      <code>
        "Fun triples" "ends with" "a special character"-
      </code>
    </p>
    <p>
      The first group is the subject, the second is the predicate and the third is the object.<br>
      Triples can use double quotes when there is a space in the node or edge.<br>
      Triples ends with a special "End Character" that could be :
      <ul>
        <li>a coma <code><b> , </b></code> if you want to keep the subject and property and clear the object of triplet for the next triple;</li>
        <li>a hyphen <code><strong> - </strong></code> if you want to keep the object as the subject for the next triple;</li>
        <li>a semicolon <code><b> ; </b></code>	if you want to keep the subject and clear property and object for the next triple;</li>
        <li>a dot <b><code>	. </code></b>	if you want to clear all the input.</li>
      </ul>

    </p>
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
    action: {
      get () { return this.$store.state.ipgs.action},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  watch:{
    action(){
      console.log(this.action)
      switch (this.action.action) {
        case 'help':
        this.$bvModal.show("help-modal")
        break;

      }
    },
  }
}
</script>

<style>
code {
  background-color: white;
  padding: 2px;
  margin: 2px;
}
</style>
