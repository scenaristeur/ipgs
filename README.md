# IPGS

InterPlanetary Graph System based on Solid & Ipfs

- https://github.com/scenaristeur/ipgs
- https://ipfs.io
- https://js.ipfs.io/
- https://docs.ipfs.io/
- https://github.com/ipfs-shipyard/ipfs-desktop

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
