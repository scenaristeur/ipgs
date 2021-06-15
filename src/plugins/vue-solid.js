import {
  getSolidDataset,
  getThingAll,
  getFile,
  isRawData,
  getContentType,
  saveFileInContainer,
  getContainedResourceUrlAll,
  createContainerAt,
  getSourceUrl,
  deleteFile,
  deleteContainer,
  //  addStringNoLocale,
  setThing,
  saveSolidDatasetAt,
  createSolidDataset,
  createThing,
  addUrl,
  overwriteFile,
  getStringNoLocale,
  getThing,
  getUrlAll,
  getUrl
} from "@inrupt/solid-client";
import { FOAF, /*RDF, LDP,*/ VCARD } from "@inrupt/vocab-common-rdf";
import { WS, /*, VCARD */} from "@inrupt/vocab-solid-common";
import * as sc from '@inrupt/solid-client-authn-browser'
// import {
//   WebsocketNotification,
// } from "@inrupt/solid-client-notifications";
import * as jsonld from 'jsonld';
//import visContext from '@/util/lightContext.json'


const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store

    Vue.prototype.$login= async function(issuer) {

      try{
        await sc.login({
          oidcIssuer: issuer,
          redirectUrl: window.location.href,
          clientName: "Vatch",
        });
      } catch(e){
        alert(e)
      }
    },

    Vue.prototype.$logout = async function(params){
      try{
        let session = sc.getDefaultSession()
        console.log(params)
        await session.logout()
        store.commit('solid/setSession',session)
        store.commit('solid/setPod', {})
      } catch(e){
        alert(e)
      }
    },

    Vue.prototype.$checkSessions = async function( params){
      try{
        await sc.handleIncomingRedirect({restorePreviousSession : params.restore}).then((info) => {
          console.log(info)
        })
        let session = sc.getDefaultSession()
        sc.onSessionRestore((url) => {
          console.log("restore",url)
        });
        store.commit('solid/setSession',session)
        //  dispatch('getPodInfos', session)
        this.$getPodInfosFromSession(session)
      } catch(e){
        alert(e)
      }
    },

    Vue.prototype.$getPodInfosFromSession = async function(session){
      try{
        let pod = {}
        pod.logged = session.info.isLoggedIn
        if (pod.logged) {
          pod.webId = session.info.webId
          pod = await this.$getPodInfos(pod)
          store.commit('solid/setPod', pod)
          if (pod.storage != null){
            this.$setCurrentThingUrl(pod.storage)
            let publicTagFile = pod.storage+'public/tags.ttl'
            //let privateTagFile = podStorage+'private/tags.ttl'
            let tags = await this.$getTags(publicTagFile)
            console.log("############################tags",tags)
          }
        }else{
          store.commit('solid/setPod', null)
          store.commit('solid/setThings', [])
        }
      } catch(e){
        alert(e)
      }
    }

    Vue.prototype.$exploreStorage = async function(url){
      //  visContext['@base'] = url
      // let resources = []
      //  = {"@id": url}
      // st['ldp:contains'] =
      // console.log(st)
      return await exploreJsonld(url)
    }

    async function exploreJsonld(url){
      let documentLoaderType = 'xhr'
      await jsonld.useDocumentLoader(documentLoaderType/*, options*/);
      let doc = await jsonld.documentLoader(url, function(err) {
        if(err) {
          alert(err)
        }
      })
      doc.jsonld = JSON.parse(doc.document)

      // let compacted = {}
      // if (json['@context'] != undefined ){
      //   let cont = await json['@context']
      //   compacted = await jsonld.compact(url, cont);
      // }else{
      //   compacted = await jsonld.compact(url, visContext);
      // }
      //
      //
      // console.log("compacted loaded", compacted)
      //  delete doc.document
      //  console.log(doc)
      return await jsonldToVis(doc.jsonld)
    }

    async function jsonldToVis(resources){
      let nodes = resources.map(({ "@id": id, ...rest }) => ({ id, ...rest }))
      let edges = []
      console.log(nodes)
      nodes.forEach((n) => {
        if (n.id.endsWith('/')){
          n.label = n.id.slice(0, -1).split('/').pop()
          //let contenus = n['http://www.w3.org/ns/ldp#contains']

        }else{
          n.label = n.id.split('/').pop()
        }

      });

      return {nodes: nodes, edges: edges}
    }

    Vue.prototype.$exploreUrl = async function(url){
      const file = await getFile(url, {fetch: sc.fetch});
      console.log(file)
      if(isRawData(file)){
        console.log("todo raw data", file)
        var reader = new FileReader();
        reader.addEventListener("loadend", function() {
          console.log(reader)
          //  console.log(reader.result)
          store.commit('vatch/setFile', {
            path: getSourceUrl(file),
            content : reader.result,
            type:{mime: getContentType(file)}
          }, { root: true })
          // reader.result contient le contenu du
          // blob sous la forme d'un tableau typé
        });
        reader.readAsText(file);
      }else{
        const myDataset = await getSolidDataset( url, {fetch: sc.fetch});
        console.log(myDataset)
        const things = await getThingAll(
          myDataset,
          url
        );
        store.commit('solid/setThings',things)
        console.log(things)
      }
    }

    Vue.prototype.$setCurrentThingUrl = async function(url){
      try{
        const file = await getFile(url, {fetch: sc.fetch});
        // file is a Blob (see https://developer.mozilla.org/docs/Web/API/Blob)
        console.log(
          `Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`
        );
        console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

        store.commit('solid/setCurrentRemoteUrl',url)

        if(isRawData(file)){

          var reader = new FileReader();
          reader.addEventListener("loadend", function() {
            //  console.log(reader)
            //  console.log(reader.result)
            store.commit('solid/setFile', {
              path: getSourceUrl(file),
              content : reader.result,
              type:{mime: getContentType(file)}
            }, { root: true })
            //  console.log("todo raw data", file)
            // reader.result contient le contenu du
            // blob sous la forme d'un tableau typé
          });
          reader.readAsText(file);
        }else{
          const myDataset = await getSolidDataset( url, {fetch: sc.fetch});
          console.log(myDataset)

          let resources = await getContainedResourceUrlAll(myDataset,{fetch: sc.fetch} )
          console.log("Resources", resources)
          if(resources.length > 0){
            store.commit('solid/setRemoteResources',resources)
          }else{
            // const things = await getThingAll(
            //   myDataset,
            //   url,{fetch: sc.fetch}
            // );
            //  let t = `${things}`
            // console.log(things)
            let things = []
            await myDataset._quads.forEach(async function (q)  {
              console.log(q)
              let s = {id:q.subject.id, label: await lastPart(q.subject.id)}
              let p = q.predicate.id
              let o =  {id:q.object.id, label: await lastPart(q.object.id)}
              let spo = {s:s, p:p, o:o, g: url}
              things.push(spo)
              // var indexS = module.nodes.findIndex(x => x.id==s.id);
              // indexS === -1 ? module.nodes.push(s) : console.log("object already exists")
              // var indexO = module.nodes.findIndex(x => x.id==o.id);
              // indexO === -1 ? module.nodes.push(o) : console.log("object already exists")
              // let edge = {from: s.id, to: o.id, label: await module.lastPart(p)}
              // var indexP = module.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
              // indexP === -1 ? module.edges.push(edge) : console.log("object already exists")
            });
            // let t = things._quads.entries
            // console.log(t)
            store.commit('solid/setThings',things)
          }
        }
      }
      catch(e){
        console.log(e)
      }

    },


    Vue.prototype.$getPodInfos = async function(pod){
      try{
        const dataset = await getSolidDataset( pod.webId, { fetch: sc.fetch });
        console.log("DATASET", dataset)
        let profile = await getThing( dataset, pod.webId );
        pod.name = await getStringNoLocale(profile, FOAF.name);
        pod.friends = await getUrlAll(profile, FOAF.knows).map(webId => {return {webId: webId}})
        pod.storage = await getUrl(profile, WS.storage);
        pod.photo = await getUrl(profile, VCARD.hasPhoto);
        pod.publicTags = await this.$getTags(pod.storage+'public/tags.ttl')
        store.commit("vatch/addToNetwork", pod.publicTags)
        //this.$subscribe(pod.storage)
        console.log("getpodinfos",pod)
      }catch(e)
      {
        console.log("erreur",e, pod)
      }
      return await pod
    }

    Vue.prototype.$getTags = async function (tagFile){
      try{

        let tagsJ = await parseTagsJsonld(tagFile)
        console.log("tags JSONLD",tagsJ)

        let tagsR = await parseTagsRdf(tagFile)
        console.log("tags RDF",tagsR)

        const tagDataset = await getSolidDataset( tagFile, { fetch: sc.fetch });
        console.log("DATASET", tagDataset)
        let things =  await getThingAll(tagDataset, tagFile);
        console.log(things)

        return tagsR
      }catch(e){
        return []
      }
    }


    Vue.prototype.$addTags = async function(params){
      //console.log(params)

      let tagDataset
      try{
        tagDataset = await getSolidDataset(params.tagFile, {fetch: sc.fetch});
        console.log("DATASET", tagDataset)
      }catch(e){
        //  console.log(e)
      }

      //  console.log(tagDataset)
      tagDataset== undefined || tagDataset== null ? tagDataset = createSolidDataset() :""

      let thing, thingInDs;
      //thing = addUrl(thing, RDF.type, LDP.Resource);
      params.tags.forEach((t) => {
        console.log("add",t.subject, t.predicate.value, t.object.concepturi )
        //  console.log(thing == undefined || thing ==null, thing)
        //thing == undefined || thing ==null ?  thing = getThing(tagDataset, params.tagFile+"#"+t.subject) : ""
        thing == undefined || thing ==null ?  thing = getThing(tagDataset, t.subject) : ""
        //  console.log(thing)
        //  thing == null ? thing = createThing({name: t.subject}) : ""
        thing == null ? thing = createThing({url: t.subject}) : ""
        //  console.log(thing)
        thing = addUrl(thing, t.predicate.value, t.object.concepturi);

      });
      thingInDs = setThing(tagDataset, thing);


      let savedThing = await saveSolidDatasetAt(params.tagFile, thingInDs, { fetch: sc.fetch } );
      console.log("File saved",savedThing);
    },

    Vue.prototype.$uploadLocalToPod = async function(params){
      try{
        console.log(params)

        if(params.dest == undefined){
          alert ("Please select a destination")
          return
        }


        let type = params.type && params.type.mime || "plain/text"
        let distIsDirectory = params.dest.endsWith('/')
        let srcIsDirectory = params.event == "addDir"

        if (srcIsDirectory){
          console.info("todo src is directory")
        }else{

          if(distIsDirectory){
            params.parts == undefined ? params.parts = params.path.split(store.state.vatch.pathsep) : ""
            let slug = encodeURIComponent(params.parts.pop())
            const savedFile = await saveFileInContainer(
              params.dest,
              new Blob([params.content], { type: type }),
              { slug: slug, fetch: sc.fetch }
            );

            console.log(`File saved at ${getSourceUrl(savedFile)}`);
            this.$setCurrentThingUrl(params.dest)
          }else{

            let answer = confirm("Are you sure you want to replace "+params.dest);
            if (answer == true)
            {
              const savedFile = await overwriteFile(
                params.dest,
                new Blob([params.content], { type: type }),
                { fetch: sc.fetch }
                // Or in Node:
                // Buffer.from("This is a plain piece of text", "utf8"), { type: "plain/text" })
              );
              console.log("File saved!", savedFile);
            }
          }
        }
      } catch(e){
        alert(e)
      }
    },

    Vue.prototype.$createFile = async function(params){
      try{
        let type = params.type && params.type.mime || "plain/text"
        let slug = encodeURIComponent(params.filename)
        const savedFile = await saveFileInContainer(
          params.dest,
          new Blob([params.content || ""], { type: type }),
          { slug: slug, fetch: sc.fetch }
        );
        console.log(`File saved at ${getSourceUrl(savedFile)}`);
        this.$setCurrentThingUrl(params.dest)
      } catch(e){
        alert(e)
      }
    },

    Vue.prototype.$createFolder = async function(params){
      try{
        let url = params.dest+encodeURIComponent(params.foldername)
        const savedFolder = await createContainerAt(url, {fetch: sc.fetch});
        console.log(`Folder saved at ${getSourceUrl(savedFolder)}`);
        this.$setCurrentThingUrl(params.dest)
      } catch(e){
        alert(e)
      }
    },


    Vue.prototype.$deleteOnPod = async function(url){
      try{
        if(url.endsWith('/')){
          await deleteContainer(
            url, { fetch: sc.fetch }
          );
        }
        else{
          await deleteFile(
            url, { fetch: sc.fetch }
          );
        }
        console.log(" deleted !",url);
        let parent = url.slice(0, url.lastIndexOf('/'))+'/';
        console.log("parent",parent)
        this.$setCurrentThingUrl(parent)
      } catch(e){
        alert(e)
      }

    }

    // Vue.prototype.$subscribe = async function(resourceURL){
    //
    //   const gateway = "https://notification.pod.inrupt.com/";
    //
    //   const websocket = new WebsocketNotification(
    //     resourceURL,
    //     { fetch: sc.fetch, gateway }
    //   );
    //   console.log("Subscription to", resourceURL)
    //   websocket.on("connected", () =>
    //   console.log("connected", websocket)
    //   // setMessages((prev) => [
    //   //   ...prev,
    //   //   `Websocket connected; watching ${podRoot}`,
    //   // ])
    // );
    //
    // websocket.on("message", (message) =>
    // {
    //   console.log('message', JSON.parse(message))
    // }
    //   // setMessages((prev) => [...prev, formatMessage(message)])
    // );
    //
    // websocket.on("closed", () =>
    // console.log("websocket closed")
    // //  setMessages((prev) => [...prev, "Websocket closed"])
    // );
    //
    // websocket.on("error", (error) => {
    //   /* eslint no-console: 0 */
    //   console.error(error);
    //   // setMessages((prev) => [
    //   //   ...prev,
    //   //   "Websocket error (see console for details)",
    //   // ]);
    // });
    //
    //   // websocket.on("message", console.log);
    //   // websocket.on("*", console.log);
    //   // websocket.on("connect", console.log);
    //   // websocket.on("CREATE", console.log);
    //
    //   websocket.connect();
    // }


    ////////////////////////////



    async function parseTagsRdf(url){
      let graph = {nodes: [], edges: []}
      console.log("parseTagsRdf",url)
      try{

        let dataset = await getSolidDataset(url, { fetch: sc.fetch });
        console.log(dataset)
        await dataset._quads.forEach(async function (q)  {
          let [s,p,o] = [
            {id:q.subject.id, label: await lastPart(q.subject.id)},
            q.predicate.id,
            {id:q.object.id, label: await lastPart(q.object.id)}
          ]
          //  console.log(s,p,o)
          var indexS = graph.nodes.findIndex(x => x.id==s.id);
          indexS === -1 ? graph.nodes.push(s) : "" //console.log("object already exists")
          var indexO = graph.nodes.findIndex(x => x.id==o.id);
          indexO === -1 ? graph.nodes.push(o) : "" //console.log("object already exists")
          let edge = {from: s.id, to: o.id, label: await lastPart(p)}
          var indexP = graph.edges.findIndex(x => x.from==edge.from && x.to == edge.to && x.label == edge.label);
          indexP === -1 ? graph.edges.push(edge) : ""//console.log("object already exists")
        });
      }
      catch(e){
        console.log(e)
      }

      console.log(graph)
      return graph
    }

    async function parseTagsJsonld(url){
      let documentLoaderType = 'xhr'
      await jsonld.useDocumentLoader(documentLoaderType/*, options*/);
      let doc = await jsonld.documentLoader(url, function(err) {
        if(err) {
          alert(err)
        }
      })
      doc.jsonld = JSON.parse(doc.document)
      doc.jsonld.forEach((t) => {
        console.log(t)

      });

      //  delete doc.document
      //  console.log(doc)
      return doc
    }

    async function lastPart(text){
      //  console.log(text, typeof text)
      let wikidata = 'http://www.wikidata.org/entity/'
      const API_URL = 'https://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&format=json'
      let language =  navigator.language.split("-")[0] || 'en'
      language+='|en'
      if (text.endsWith('card#me')){
        let lab = text.split('/')[2]
        console.log(lab)
        return lab
      }else
      if (text.startsWith(wikidata)){
        let splitext = text.split(wikidata)[1]
        //  console.log(splitext)
        //  try{
        let search_url = API_URL+"&ids="+splitext+"&props=labels&languages="+language
        const res = await fetch(search_url)
        //  console.log(res)
        const json = await res.json()
        let label
        try{
          label = json.entities[splitext].labels[language] != undefined ? json.entities[splitext].labels[language].value : json.entities[splitext].labels.en.value
        }
        catch(e){
          console.log(e,json.entities)
        }
        return label
        // this.items = suggestions.search
        // console.log(this.items)
        // }catch(e){
        //   alert(e)
        // }

      }else if (typeof text == 'object' && text['rdfs:label'] != undefined){
        return text['rdfs:label']
      }else if (typeof text == 'string' && text.startsWith('http')){
        var n = text.lastIndexOf('/');
        return text.substring(n + 1);
      }
      else{
        return text
      }
    }


  }
}
// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
