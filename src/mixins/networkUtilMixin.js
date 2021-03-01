import * as jsonld from 'jsonld';
import jsonldcontext from '@/util/ldp.json' // https://gist.github.com/nandana/661d5961b91b78ff50b6
console.log(jsonldcontext)


// const context = {
//   "name": "http://schema.org/name",
//   "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
//   "image": {"@id": "http://schema.org/image", "@type": "@id"}
// };
const context ={
  // ALIAS IN JSLONLD https://github.com/schemaorg/schemaorg/issues/854
  // "owl":"http://www.w3.org/2002/07/owl#",
  // "as":"https://www.w3.org/ns/activitystreams",
  // "schema":"http://schema.org/",
  // "life": "http://purl.org/vocab/lifecycle/schema#",
  terms: "http://purl.org/dc/terms/",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  label: "rdfs:label",
  // dcm: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/",
  // ldp: "http://www.w3.org/ns/ldp#",
  // json: "http://www.w3.org/ns/iana/media-types/application/json#",
  motifs: "http://purl.org/net/wf-motifs#",
  ipgs: "https://scenaristeur.github.io/ipgs#",
  "id": "@id",
  from: "ipgs:from",
  to: "ipgs:to",
  '@base': ''
};


export default {
  methods: {
    nodeFromLabel(label) {
      return {id: "#"+label.trim().split(' ').join('_'),
      label: label,
      color: {  background: '#D2E5FF', border: '#2B7CE9'},
      shape: 'ellipse'}
    },
    edgeFromLabel(data){
      return { from: data.from, to: data.to, label: data.label}
    },


    async jsonToJsonLd(json){
      let compacted = await jsonld.compact(json, context);
      compacted['@id'] = ''
      compacted['@graph'] = []
      json.nodes.forEach(async function(n) {
        let n_clone = {}
        Object.assign(n_clone, n)
        n_clone['@type'] = 'ipgs:Node'
        compacted['@graph'].push(n_clone)
      });

      json.edges.forEach(async function(e) {
        let e_clone = {}
        Object.assign(e_clone, e)
        e_clone['@type'] = 'ipgs:Edge',
        e_clone['from'] = {'@id': e.from}
        e_clone['to'] = {'@id': e.to}
        // delete e_clone.from
        // delete e_clone.to
        compacted['@graph'].push(e_clone)
      });

      return compacted
    },


    jsonToTtl(json) {
      var output = "@prefix : <http://smag0.blogspot.fr/spoggy#> . \n";
      output += "@prefix owl: <http://www.w3.org/2002/07/owl#> . \n";
      output += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> . \n";
      output += "@prefix xml: <http://www.w3.org/XML/1998/namespace> . \n";
      output += "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> . \n";
      output += "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . \n";
      output += "@prefix smag: <http://smag0.blogspot.fr/spoggy#> . \n";
      output += "@base <http://smag0.blogspot.fr/spoggy> . \n";
      //output += "<http://smag0.blogspot.fr/spoggy> rdf:type owl:Ontology ;  \n";
      //output += "                    owl:versionIRI <http://smag0.blogspot.fr/spoggy/1.0.0> . \n";
      output += " \n";
      //output += "owl:Class rdfs:subClassOf owl:Thing .  \n";

      var listeInfos = new Array();
      var listeComplementaire = new Array();

      for (var i = 0; i < json.edges.length; i++) {
        var edge = json.edges[i];
        var sujet = edge.from;
        var propriete = edge.label.replace(/\s/g, "_");
        var objet = edge.to;

        //  console.log(objet);
        let nodeSubj = json.nodes.find(x => x.id==sujet);
        let nodeObj = json.nodes.find(x => x.id==objet);
        // AJOUTER EVENTUELLEMENT LA RECUPERATION DE SHAPE, COLOR, pour l'export RDF
        var sujetLabel = nodeSubj.label.replace(/\n/g, "");
        try{
          var objetLabel = nodeObj.label.replace(/\n/g, "");
        }catch(error)
        {
          //  console.error("ERREUR NON TRAITEE")
          //  console.error(error)

        }
        var sujetWithPrefix = this.validRdf(sujet);
        var proprieteWithPrefix = this.validRdf(propriete);
        var objetWithPrefix = this.validRdf(objet);

        if (sujetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
          sujetWithPrefix = '_:' + sujetWithPrefix; // blanknode
        }

        if (proprieteWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
          proprieteWithPrefix = ':' + proprieteWithPrefix; // propriete utilisant "@base <http://smag0.blogspot.fr/spoggy>"
        }

        if (objetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
          objetWithPrefix = '_:' + objetWithPrefix;  // blanknode
        }

        var typedeProp = ["owl:AnnotationProperty", "owl:ObjectProperty", "owl:DatatypeProperty"];
        var indiceTypeDeProp = 1; // -1 pour ne pas ajouter la prop, sinon par defaut en annotationProperty, 1 pour Object, 2 pour Datatype --> revoir pour les datatypes

        if (
          (proprieteWithPrefix == "type") ||
          (proprieteWithPrefix == ":type") ||
          (proprieteWithPrefix == "rdf:type") ||
          (proprieteWithPrefix == ":a") ||
          (proprieteWithPrefix == ":est_un") ||
          (proprieteWithPrefix == ":est_une") ||
          (proprieteWithPrefix == ":is_a")
        ) {
          proprieteWithPrefix = "rdf:type";
          listeComplementaire.push(objetWithPrefix + " rdf:type owl:Class . \n");
          indiceTypeDeProp = 1;
        } else if ((proprieteWithPrefix == "subClassOf") || (proprieteWithPrefix == ":subClassOf") || (proprieteWithPrefix == "rdfs:subClassOf")) {
          proprieteWithPrefix = "rdfs:subClassOf";
        }
        else if ((proprieteWithPrefix == "sameAs") || (proprieteWithPrefix == ":sameAs")) {
          proprieteWithPrefix = "owl:sameAs";
          indiceTypeDeProp = -1;
        }
        else if (
          (proprieteWithPrefix.toLowerCase() == "ispartof") ||
          (proprieteWithPrefix.toLowerCase() == "partof") ||
          (proprieteWithPrefix.toLowerCase() == ":partof") ||
          (proprieteWithPrefix.toLowerCase() == ":ispartof")) {
            proprieteWithPrefix = "smag:partOf";
            indiceTypeDeProp = 1;
          } else if (
            (proprieteWithPrefix.toLowerCase() == "comment") ||
            (proprieteWithPrefix.toLowerCase() == "commentaire") ||
            (proprieteWithPrefix.toLowerCase() == "//") ||
            (proprieteWithPrefix.toLowerCase() == "#")
          ) {
            proprieteWithPrefix = "rdfs:comment";
            indiceTypeDeProp = -1;
          }
          if (indiceTypeDeProp >= 0) {
            listeComplementaire.push(proprieteWithPrefix + " rdf:type " + typedeProp[indiceTypeDeProp] + " . \n");
          }
          var data = sujetWithPrefix + " " + proprieteWithPrefix + " " + objetWithPrefix + " . \n";
          data += sujetWithPrefix + " " + "rdfs:label \"" + sujetLabel + "\" . \n";
          data += objetWithPrefix + " " + "rdfs:label \"" + objetLabel + "\" . \n";
          listeInfos[i] = data;
          //  console.log(data);
        }
        //suppression des doublons
        listeInfos = this.uniq_fast(listeInfos.sort());
        listeComplementaire = this.uniq_fast(listeComplementaire.sort());
        // console.log (listeInfos);
        for (var k = 0; k < listeInfos.length; k++) {
          output = output + listeInfos[k];
        }
        for (var l = 0; l < listeComplementaire.length; l++) {
          output = output + listeComplementaire[l];
        }
        return output
      },
      uniq_fast(a) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for(var i = 0; i < len; i++) {
          var item = a[i];
          if(seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
          }
        }
        return out;
      },

      validRdf(string){
        // A REVOIR
        //  console.log(string)
        //  console.log(network.body.data.nodes.get(string));
        //  console.log("nettoyage "+ string);
        // transformer le noeud en noeud rdf (resource ou literal)
        // ajouter la construction du noeud, son uri, prefix, localname, type...
        var valid = {};
        valid.type = "uri";
        if (string.indexOf(" ") !== -1){
          valid.type = "literal";
        }else{
          /*
          replaceAll(string, " ","_");
          replaceAll(string, "","_");
          replaceAll(string, ",","_");
          replaceAll(string, ";","_");
          replaceAll(string, " ","_");*/
        }

        return string;
      },



      downloadFile(){
        var contenu = this.content
        var format = this.format;
      //  console.log(contenu, format)
        var contentType = "";
        var fileNameToSaveAs = ""
        var filename = prompt("Choose a name for the exported file :", "Spoggy");
        if (filename == null || filename == "") {
          return;
        }

        switch (format) {
          case 'json':
          contentType = 'application/json';
          fileNameToSaveAs = filename + ".json"; //Date.now() +
          break;
          case 'ttl':
          contentType = 'text/turtle';
          fileNameToSaveAs = filename + ".ttl"; //Date.now() +
          break;
          case 'jsonld':
          contentType = 'application/ld+json';
          fileNameToSaveAs = filename + ".jsonld"; //Date.now() +
          break;
          default:
          alert('Format de fichier non reconnu', format);
        }
        var textFileAsBlob = new Blob([contenu], { type: contentType }
        );
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if(navigator.userAgent.indexOf("Chrome") != -1) {
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        } else {
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.target="_blank";
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
        }
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click", true, false, window, 0, 0, 0, 0, 0
          , false, false, false, false, 0, null
        );
        downloadLink.dispatchEvent(event);
        setTimeout(function(){
          document.body.removeChild(downloadLink);
          window.URL.revokeObjectURL(downloadLink);
        }, 1000);
      },
    },

  }
