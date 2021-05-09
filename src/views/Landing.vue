<template>
  <b-container>
    <div v-if="hide == false">
      <b-jumbotron header="IPGS" lead="InterPlanetary Graph System">
        <p>Store a part of your mind in a decentralized system ? <br>
          Collaborate with superheroes on awesome projects? <br>
          Browse amazing ressources like <router-link to="/?url=https%3A%2F%2Fdata.virtual-assembly.org%2Forganizations%2Fassemblee_virtuelle" @click="hide=true">l'Assemblée Virtuelle</router-link></p>
          <b-button variant="primary" href="#">New Graph</b-button>
          <b-button variant="primary" href="#">Browse my POD</b-button>
          <b-button variant="primary" href="#">Load a graph from a file on my computer or a url</b-button>
          <b-button variant="primary" href="#">Load last graphes</b-button>
          <b-button variant="primary" href="#">New collaborative real time Graph</b-button>
          <b-button variant="primary" href="#">New collaborative real time Graph + Reunion</b-button>

          <b-button variant="primary" href="#">Connect to my POD</b-button>

          <br><br>
          <b-button variant="warning" @click="hide=true">Hide</b-button>
        </b-jumbotron>
      </div>
    </b-container>
  </template>

  <script>
  export default {
    name: 'Landing',
    data() {
      return{
        hide: true
      }
    }

  }
  </script>

  <style>

  </style>
