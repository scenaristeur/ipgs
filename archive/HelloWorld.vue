<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <p>
      <a href="https://github.com/scenaristeur/portfolio/blob/main/README.md" target="_blank"> Source code, tuto, issues for Portfolio app</a>
    </p>


    <h3>Porfolio WebApp</h3>
    <ul>
      <li> All data are stored on Solid user's POD : <a href="https://github.com/solid/solid-spec/" target="_blank">Solid Specifications</a></li><br>
      <li> Voir un <a href="https://spoggy-test6.solidcommunity.net/public/portfolio/" target="_blank">exemple de Portfolio </a></li>
      <li> <a href="https://scenaristeur.github.io/portfolio/" target="_blank">Portfolio App hosted on github gh-pages</a></li>
      <li> <a href="https://spoggy-test6.solidcommunity.net/public/blog/portfolio.html" target="_blank">Tuto EN : How to create a Vuejs Portfolio App on Solid</a></li>
      <li>
        <a href="https://dfaveris.medium.com/portfolio-comment-cr%C3%A9er-une-application-web-portfolio-bas%C3%A9e-sur-solid-avec-vue-js-c57b50502d21"
        target="_blank">
        Tuto FR : La première partie de la création de l'application basée sur Solid à base de vue.js</a>
      </li>
      <li>  <a href="https://dfaveris.medium.com/publier-une-application-vuejs-sur-github-ee7662c94667" target="_blank">
        Tuto FR : La mise en ligne de l'application sur les gh-pages de github</a>
      </li>
      <li>
        <a href="https://dfaveris.medium.com/portfolio-2-cr%C3%A9er-la-page-de-pr%C3%A9sentation-du-portfolio-2aad0304d6ad" target="_blank">
          Tuto FR : La page de visualisation du portfolio</a>
        </li>
      </ul>

    </div>
  </template>

  <script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
