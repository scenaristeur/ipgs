# IPGS

InterPlanetary Graph System based on Solid & Ipfs

# generate-docs in /out folder
```
npm run generate-docs
```

# new load test
* solid
- turtle file http://127.0.0.1:8080/network?url=https%3A%2F%2Fipgs.solidcommunity.net%2Fpublic%2Factivity%2Flog.ttl
- solid profile http://127.0.0.1:8080/network?url=https://spoggy.solidcommunity.net/profile/card#me
- pod storage http://127.0.0.1:8080/network?url=https://spoggy-test9.solidcommunity.net
- public folder http://127.0.0.1:8080/network?url=https://angelo.veltens.org/public/
- public folder without trailing slash http://127.0.0.1:8080/network?url=https://angelo.veltens.org/public
- ttl without extension http://127.0.0.1:8080/network?url=https://angelo.veltens.org/public/tweets/2020/05/1260959812579405826
- multiple ttl folder http://127.0.0.1:8080/network?url=https://spoggy.solidcommunity.net/public/Notes/
- simple json
- jsonld file with @id
- jsonld file without @id
- jsonld file with @id with @context
- jsonld file without @id without @context
- jsonld file with @id replaced by id in @context
- visjs file with nodes & edges arrays
- folder/container with many different files
-

- semaps containers
- http://127.0.0.1:8080/network?url=https://data.virtual-assembly.org/skills
- http://127.0.0.1:8080/network?url=https://data.virtual-assembly.org/organizations
- http://127.0.0.1:8080/network?url=https://data.virtual-assembly.org/users
- http://127.0.0.1:8080/network?url=https://data.virtual-assembly.org/projects
- http://127.0.0.1:8080/network?url=https://data.virtual-assembly.org/themes

# inspiration

- https://github.com/scenaristeur/ipgs
- https://ipfs.io
- https://js.ipfs.io/
- https://docs.ipfs.io/
- https://github.com/ipfs-shipyard/ipfs-desktop
- https://github.com/ipfs/js-ipfs/tree/c47a6335b77d5284711f13a83349000820f85775/examples/browser-vue

- examples https://github.com/ipfs/js-ipfs/blob/c47a6335b77d5284711f13a83349000820f85775/examples/protoschool.md
- host git repo on ipfs https://docs.ipfs.io/how-to/host-git-style-repo/

-patch json on ipfs with version control for collaborative https://medium.com/textileio/building-a-simple-decentralized-version-control-system-with-ipfs-textile-8135e9557f78
- MFS mutable File system https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#the-mutable-files-api
- ipfs cluster https://collab.ipfscluster.io/#instructions or https://cluster.ipfs.io/documentation/collaborative/
- MFS https://docs.ipfs.io/concepts/file-systems/#mutable-file-system-mfs
- mfs unix js https://github.com/ipfs/js-ipfs-unixfs
- MFS tuto https://proto.school/mutable-file-system/01


# json-ld processor js
- https://github.com/digitalbazaar/jsonld.js/

# json class-transformer
- https://github.com/typestack/class-transformer

# jsonld fragments identifiers
https://tools.ietf.org/html/rfc3987#section-2
```
IRI : The absolute form of an IRI containing a scheme along with a path and optional query and fragment segments.
```
- https://github.com/json-ld/json-ld.org/issues/107
- https://www.w3.org/TR/rdf11-concepts/#section-fragID
- https://sitebulb.com/resources/guides/node-identifiers-from-structured-data-to-linked-data/

# jsonld @graphs ? @includes ?
@ graph -> reference to the top level object / @includes = includes Blocks https://w3c.github.io/json-ld-syntax/#included-blocks no reference to the top level object
- named_graph https://w3c.github.io/json-ld-syntax/#example-115-identifying-and-making-statements-about-a-graph

```
{
  "@context": {
    "generatedAt": {
      "@id": "http://www.w3.org/ns/prov#generatedAtTime",
      "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
      },
      "Person": "http://xmlns.com/foaf/0.1/Person",
      "name": "http://xmlns.com/foaf/0.1/name",
      "knows": {"@id": "http://xmlns.com/foaf/0.1/knows", "@type": "@id"}
      },
      "@id": "https://spoggy-test9.solidcommunity.net/MustChange/named_graph.json",
      "generatedAt": "2012-04-09T00:00:00",
      "@graph": [
      {
        "@id": "http://manu.sporny.org/about#manu",
        "@type": "Person",
        "name": "Manu Sporny",
        "knows": "https://greggkellogg.net/foaf#me"
        }, {
          "@id": "https://greggkellogg.net/foaf#me",
          "@type": "Person",
          "name": "Gregg Kellogg",
          "knows": "http://manu.sporny.org/about#manu"
        }
        ]
      }
      ```




      # ldp servers
      - https://www.w3.org/wiki/LDP_Implementations
      - query https://github.com/library-data-platform/ldp/blob/main/doc/User_Guide.md




      # font icons
      - https://visjs.github.io/vis-network/examples/network/nodeStyles/icons.html
      ------------------------------------
      # Porfolio WebApp
      - all data are stored on solid user's POD : https://github.com/solid/solid-spec/
      - Portfolio webapp hosted on github gh-pages : https://scenaristeur.github.io/portfolio/
      - source code : https://github.com/scenaristeur/portfolio
      - Tuto EN : https://spoggy-test6.solidcommunity.net/public/blog/portfolio.html
      - Tuto FR : La première partie de la création de l'application basée sur Solid à base de vue.js https://dfaveris.medium.com/portfolio-comment-cr%C3%A9er-une-application-web-portfolio-bas%C3%A9e-sur-solid-avec-vue-js-c57b50502d21
      - Tuto FR : Publier une webapp sur les gh-pages github https://dfaveris.medium.com/publier-une-application-vuejs-sur-github-ee7662c94667
      - Tuto FR : La page de visualisation du portfolio :
      https://dfaveris.medium.com/portfolio-2-cr%C3%A9er-la-page-de-pr%C3%A9sentation-du-portfolio-2aad0304d6ad
      - Tuto FR : Et le filigrane, dans tout ça ? https://dfaveris.medium.com/et-le-filigrane-sur-mes-photos-b90a6c1e5e40


      # portfolio

      ## Project setup /Cloner le projet Portfolio
      ```
      git clone https://github.com/scenaristeur/portfolio.git
      cd portfolio
      npm install
      ```

      ### Compiles and hot-reloads for development
      ```
      npm run serve
      ```

      ### Compiles and minifies for production
      ```
      npm run build
      ```

      ### Build and publish on gh-pages
      ```
      npm run git -- "modif"
      ```

      ### Lints and fixes files
      ```
      npm run lint
      ```

      ### Customize configuration
      See [Configuration Reference](https://cli.vuejs.org/config/).

      ### portfolio
      https://zurb.com/playground/css3-polaroids


      ## nlp
      - nlp libs https://www.kommunicate.io/blog/nlp-libraries-node-javascript/
      - openai https://beta.openai.com/
      - spaCy (python) https://github.com/explosion/spaCy / https://explosion.ai/software /  https://spacy.io/models/fr / https://spacy.io/ / https://www.datacorner.fr/spacy/
      - nltk https://www.datacorner.fr/nltk/ / https://www.npmjs.com/package/nltk
      - natural http://naturalnode.github.io/natural/  / https://medium.com/code-brew-com/natural-language-processing-using-python-or-nodejs-a76c91dcd68c / https://github.com/NaturalNode/natural / https://www.w3.org/2015/09/bpmlod-reports/nif-based-nlp-webservices/
      - https://nlp-lab.org/  & https://github.com/dcavar/nlp-lab.github.io & json-nlp : https://mailman.uib.no/public/corpora/2019-May/030191.html & json-nlp https://github.com/SemiringInc/JSON-NLP & https://demo.semiring.com/
      - nlp 2 semantic http://wit.istc.cnr.it/stlab-tools/fred/demo/
      - https://mailman.uib.no/public/corpora/2019-May/030191.html
      - http://teanga.io/ hs
      - https://machinelearningmastery.com/natural-language-processing/
      - https://www.npmjs.com/package/node-nlp / https://github.com/axa-group/nlp.js/blob/master/docs/v4/neural.md
      - https://medium.com/voice-tech-podcast/natural-language-processing-nlp-javascript-npm-packages-and-a-chatbot-2f5050253852
      - https://www.analyticsvidhya.com/blog/2017/10/essential-nlp-guide-data-scientists-top-10-nlp-tasks/ - #2 lemmatisation, #3 word embending (gensim package) , corporas https://catalog.ldc.upenn.edu/ ,
      - word embending https://ronxin.github.io/wevi/ , facebook fasttext https://github.com/facebookresearch/fastText/ Library for fast text representation and classification.
      - semantic reactor tensorflow https://blog.tensorflow.org/2020/08/introducing-semantic-reactor-explore-nlp-sheets.html , https://research.google.com/semantris/
      - https://www.codeproject.com/Articles/1278022/A-Natural-Language-Processing-Engine-NLP-for-Chatb
      - https://winkjs.org/wink-nlp-utils/
      - https://dev.to/charlesdlandau/natural-language-processing-in-the-browser-52hj in browser
      - https://www.npmjs.com/package/nlp-js-tools-french
      - https://www.npmjs.com/package/noam-lemma-javascript
      - https://www.npmjs.com/package/natural / https://www.npmjs.com/package/naturali
      - https://medium.com/better-programming/natural-language-processing-with-node-js-afb62729c1a2
      - compromise https://dev.to/charlesdlandau/natural-language-processing-in-the-browser-52hj  / https://observablehq.com/@spencermountain/compromise-tags , ++ https://github.com/spencermountain/compromise , http://compromise.cool/

      # synchro
      - https://braid.news/
      - https://m-ld.org/
      - lists https://m-ld.org/news/#truth-and-just-lists
      - json-rql query jsonld https://json-rql.org/

      # touch
      https://codeburst.io/the-only-way-to-detect-touch-with-javascript-7791a3346685

      # contextmenu on visjs
      - https://github.com/almende/vis/issues/743

      # jsonld
      - https://medium.com/@kidehen/simple-linked-data-deployment-tutorial-using-json-ld-notation-3e753a5d44a3
      _ https://stackoverflow.com/questions/33925116/how-to-refer-to-rdf-statements-in-json-ld-how-to-statement-about-statements

      # todo : visjs dataset in jsonld format
      - https://visjs.org/
      - https://visjs.github.io/vis-network/docs/network/
      - https://github.com/visjs/vis-network
      - https://visjs.github.io/vis-data/data/index.html
      - https://visjs.github.io/vis-data/data/dataset.html
      - https://visjs.github.io/vis-data/data/dataview.html
      - https://visjs.github.io/vis-data/data/datapipe.html
      - https://github.com/visjs/vis-data


      # presentation
      - https://github.com/deckgo/starter-kit
      # share fallback
      - https://dev.to/daviddalbusco/how-to-implement-the-web-share-api-with-a-fallback-b3
      - https://www.npmjs.com/package/web-social-share
      - or
      - https://madewithvuejs.com/vue-social-sharing
      - https://vuejsexamples.com/one-easy-to-use-button-component-for-vue-js/
      - https://vuejsexamples.com/a-highly-customizable-vue-js-component-for-sharing-links-on-social-networks/
      - https://vuejsexamples.com/yandex-vue-component-for-the-share-block/
      - take a look at social app https://vuejsexamples.com/a-social-application-built-with-vue-and-vuex/

      # google api
      - https://github.com/tralves/vue-gdrive
      - https://github.com/lucascaires/vue-google-picker
      - https://github.com/googleworkspace/browser-samples/blob/master/drive/quickstart/index.html
      -

      # cartosemapps
      - https://pad.lescommuns.org/D6vKppj_SvqaYBjDOsgp-Q#
      - https://data.fabmob.io/middleware/resources sameas http://51.210.159.54:3000/resources/
      -> http://51.210.159.54:3000/resources/utilisateur_nicolas_roesch
      - https://grappe.io/data/api/5c98eeee4a490f002e459cbe-fabric-mob-Flodjson

      SParql Semapps : POST to https://data.virtual-assembly.org/sparql/
      ```
      CONSTRUCT {
        ?s0 ?p0 ?o0
      }
      WHERE
      {
        ?s0 ?p0 ?o0 .
      }
      ```

      - https://data.virtual-assembly.org/skills
      - https://data.virtual-assembly.org/organizations
      users, projects, themes,
      - https://gitlab.com/fluidlog/cartosemapps/-/blob/master/assets/fluidgraph/app/convert.js
      - https://pad.lescommuns.org/lUf72zpWQz2bP2TsFI2X7Q?view
      - https://fluidlog.gitlab.io/cartosemapps/



##
transformation visjs en jsonld ->ajout d'un context
-> https://tinyurl.com/y97mls4p ou examples dans /doc ou https://json-ld.org/playground/#startTab=tab-expanded&json-ld=%7B%22%40context%22%3A%7B%22as%22%3A%22https%3A%2F%2Fwww.w3.org%2Fns%2Factivitystreams%22%2C%22terms%22%3A%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%22%2C%22rdfs%22%3A%22http%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%22%2C%22label%22%3A%22rdfs%3Alabel%22%2C%22motifs%22%3A%22http%3A%2F%2Fpurl.org%2Fnet%2Fwf-motifs%23%22%2C%22ipgs%22%3A%22https%3A%2F%2Fscenaristeur.github.io%2Fipgs%23%22%2C%22id%22%3A%22%40id%22%2C%22from%22%3A%22ipgs%3Afrom%22%2C%22to%22%3A%22ipgs%3Ato%22%2C%22%40base%22%3A%22https%3A%2F%2Fspoggy-test9.solidcommunity.net%2Fpublic%2Fnetwork%2Fipgs%2520webapp.json%22%2C%22vis%22%3A%22https%3A%2F%2Fvisjs.github.io%2Fvis-network%2Fdocs%2Fnetwork%2F%22%2C%22nodes%22%3A%22https%3A%2F%2Fvisjs.github.io%2Fvis-network%2Fdocs%2Fnetwork%2Fnodes%22%2C%22edges%22%3A%22vis%3Aedges%22%2C%22color%22%3A%22vis%3Acolor%22%2C%22background%22%3A%22vis%3Anodes%2Fcolor%2Fbackground%22%2C%22border%22%3A%22vis%3Anodes%2Fcolor%2Fborder%22%2C%22shape%22%3A%22vis%3Anodes%2Fshape%22%7D%2C%22_comment%22%3A%22should%20we%20use%20'nodes'%3A%20'https%3A%2F%2Fvisjs.github.io%2Fvis-network%2Fdocs%2Fnetwork%2Fnodes.html'%20or%20'edges'%3A%20'ipgs%3Aedges'%22%2C%22nodes%22%3A%5B%7B%22id%22%3A%22%23dav%22%2C%22label%22%3A%22dav%22%2C%22color%22%3A%7B%22background%22%3A%22%23D2E5FF%22%2C%22border%22%3A%22%232B7CE9%22%7D%2C%22shape%22%3A%22ellipse%22%7D%2C%7B%22id%22%3A%22%23man%22%2C%22label%22%3A%22man%22%2C%22color%22%3A%7B%22background%22%3A%22%23D2E5FF%22%2C%22border%22%3A%22%232B7CE9%22%7D%2C%22shape%22%3A%22ellipse%22%7D%5D%2C%22edges%22%3A%5B%7B%22from%22%3A%22%23dav%22%2C%22to%22%3A%22%23man%22%2C%22label%22%3A%22a%22%2C%22id%22%3A%2255bdf57d-9a5d-4199-b24b-cdbab7936b07%22%7D%5D%7D
- utiliser typescript definitions plutôt que url de la doc https://github.com/visjs/vis-network/issues/135, https://www.npmjs.com/package/@types/vis
- https://github.com/digitalbazaar/jsonld.js/issues/157
- https://stackoverflow.com/questions/56096357/json-ld-typescript-classes
- >> https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/vis/index.d.ts
- > https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html


## wikipedia api
- https://gist.github.com/maxim75/1037392
- https://fr.wikipedia.org/w/api.php


# semantic-forms :
- http://semantic-forms.cc:1952
- http://semantic-forms.cc:1952/display?displayuri=http%3A%2F%2Fdeductions.github.io%2Fnature_observation.owl.ttl%23Observation
- http://semantic-forms.cc:1952/sparql2&url=http://dbpedia.orgresource/Artichoke
- ok http://semantic-forms.cc:9112/ldp/semantic_forms ! ok http://127.0.0.1:8080/?url=http://semantic-forms.cc:9112/ldp/semantic_forms
- ok http://semantic-forms.cc:9112/ldp/1564309844694-9410388604994699
- https://data.grottocenter.org/display?displayuri=https%3A%2F%2Fdata.grottocenter.org%2Fldp%2Fthai%2F3428
- https://data.grottocenter.org/ldp/thai/3428
- http://deductions.github.io/nature_observation.owl.ttl#Observation
- http://semantic-forms.cc:9112/display?displayuri=http%3A%2F%2Fsemantic-forms.cc%3A9112%2Fldp%2F1492512243396-8193190185404223 ->
ok http://semantic-forms.cc:9112/ldp/1492512243396-8193190185404223
- ok http%3A%2F%2Fsemantic-forms.cc%3A9112%2Fldp%2F1614267136387-17128267665725272
- ok http://127.0.0.1:8080/?url=http%3A%2F%2Fsemantic-forms.cc%3A9112%2Fldp%2F1614257587387-17118718665949146
- ok http://127.0.0.1:8080/?url=http%3A%2F%2Fsemantic-forms.cc%3A9112%2Fldp%2Flotico
- https://beta.grottocenter.org/api/v1/entrances/4
- http://semantic-forms.cc:1952/assets/geo-map/geo-map.html?view=points&enrich=yes&link-prefix=semantic-forms.cc:1952/display?displayuri=&lang=fr&label=Jardins%20du%20Lyonnais&url=http://semantic-forms.cc:1952/sparql2?query=PREFIX%20spatial%3A%20%3Chttp%3A%2F%2Fjena.apache.org%2Fspatial%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20geo%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0APREFIX%20dbo%3A%20%20%20%20%20%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0APREFIX%20dbp%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%0ACONSTRUCT%20%7B%20%0A%20%20%20%20%3Fplace%20rdfs%3Alabel%20%3FplaceName%20.%0A%20%20%20%20%20%3Fplace%20geo%3Along%20%3FLONG.%0A%20%20%20%20%3Fplace%20geo%3Alat%20%3FLAT.%0A%7D%20WHERE%20%7B%0A%20%20%7B%20%3Fplace%20spatial%3Anearby%20(%2045.750000%204.85%20200%20%27km%27)%20.%20%20%23%20Lyon%0A%20%20%20%20%3Fplace%20rdfs%3Alabel%20%3FplaceName%20.%20%7D%20%0A%0A%20%20%20%20%7B%20%3Fplace%20geo%3Along%20%3FLONG%20%20%20%3B%20geo%3Alat%20%3FLAT.%20%20%7D%20UNION%0A%20%20%20%20%7B%20%3Fplace%20dbp%3AlongD%20%3FLONG%20%3B%20dbp%3AlatD%20%3FLAT.%20%20%7D%20UNION%0A%20%20%20%20%7B%20%3Fplace%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2Fbased_near%3E%20%3FPLACE%20.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3FPLACE%20geo%3Along%20%3FLONG.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3FPLACE%20geo%3Alat%20%3FLAT.%20%7D%0A%0A%20%20%20%20%7B%20%3Fplace%20a%20dbo%3AGarden%20.%20%7D%20UNION%0A%20%20%20%20%7B%20%3Fplace%20a%20%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2FGarden103417345%3E%20.%20%7D%20UNION%0A%20%20%20%20%7B%20%3Fplace%20a%20%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2FArboretum102733075%3E%20.%20%7D%20UNION%0A%20%20%20%20%7B%20%3Fplace%20a%20%3Chttp%3A%2F%2Fschema.org%2FPark%3E%20.%20%7D%20%20UNION%0A%20%20%20%20%7B%20%3Fplace%20a%20%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2FPark108615149%3E%20.%20%7D%0A%20%20%20FILTER(%20LANG(%20%3FplaceName)%20%3D%20%27fr%27%20)%0A%7D%0A
