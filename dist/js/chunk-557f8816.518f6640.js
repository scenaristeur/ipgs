(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-557f8816"],{"058a":function(e,t,n){},"38b4":function(e,t,n){},"5a31":function(e,t,n){"use strict";n("058a")},"98a6":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper"},[n("network",{ref:"network",staticClass:"network",attrs:{id:"network",nodes:e.network.nodes,edges:e.network.edges,options:e.network.options},on:{"select-node":e.selectNodeEvent,"nodes-add":e.addNodeEvent,click:e.networkClickEvent}}),n("NetworkPopups",{attrs:{network:e.network}})],1)},i=[],s=(n("d3b7"),n("3ca3"),n("ddb0"),n("fb6a"),n("38b4"),n("1da1")),r=(n("d81d"),n("4de4"),n("caad"),n("2532"),n("c740"),n("96cf"),n("178c")),a=n("00e8"),l=n.n(a),c=n("7fed"),d=n.n(c),u=new d.a(l.a),h={mixins:[r["a"]],data:function(){return{}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e,e.network.options.manipulation={initiallyActive:!0,addNode:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,o){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.label="",n.editNode(t,o);case 2:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}(),editNode:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,o){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.editNode(t,o);case 1:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}(),addEdge:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,o){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.addEdge(t,o);case 1:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}(),editEdge:{editWithoutDrag:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,o){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.editWithoutDrag(t,o);case 1:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}()}};case 2:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this.network.nodes.map((function(e){return e.foo}));console.log(e);var t={joinCondition:function(e){return 1==e.cid},clusterNodeProperties:{id:"help",borderWidth:3,shape:"box",color:"#ECC046",label:"HELP / AIDE"}};this.$refs.network.cluster(t)},methods:{onRemoveNodes:function(e){this.network.nodes=this.network.nodes.filter((function(t){return!e.properties.items.includes(t.id)})),this.sendUpdate(e)},onRemoveEdges:function(e){this.network.edges=this.network.edges.filter((function(t){return!e.properties.items.includes(t.id)})),this.sendUpdate(e)},sendUpdate:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log(e),console.log(t.url),console.log(t.network),console.log("le json",t.json),void 0==t.json||"https://data.virtual-assembly.org/context.json"==t.json["@context"]){n.next=15;break}if(console.log("TODO must send only if different "),o=t.arraysEqual(t.json.nodes,t.network.nodes)&&t.arraysEqual(t.json.edges,t.network.edges),console.log("identiques",o),0!=o||void 0==t.url){n.next=15;break}return t.json.nodes=t.network.nodes,t.json.edges=t.network.edges,t.json.modified=new Date,console.log(t.json),n.next=15,u.createFile(t.json.url,JSON.stringify(t.json),"application/ld+json").then((function(e){console.log(e)}));case 15:case"end":return n.stop()}}),n)})))()},editNode:function(e,t){void 0==e.color&&(e.color={background:"#D2E5FF",border:"#2B7CE9"}),void 0==e.shape&&(e.shape="ellipse"),this.$store.commit("ipgs/setAction",{action:"editNode",node:e}),t()},addEdge:function(e,t){if(e.from==e.to){var n=confirm("Do you want to connect the node to itself?");if(1!=n)return void t(null)}this.editWithoutDrag(e,t)},editWithoutDrag:function(e,t){console.log(e);var n=e;n.from=void 0!=e.from.id?e.from.id:e.from,n.to=void 0!=e.to.id?e.to.id:e.to,this.$store.commit("ipgs/setAction",{action:"editEdge",edge:n}),t()},downloadCanvas:function(){var e=document.getElementById("network").childNodes[0].canvas;console.log(e);var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var n=t.getContext("2d");n.fillStyle="#FFFFFF",n.fillRect(0,0,e.width,e.height),n.drawImage(e,0,0);var o=t.toDataURL(),i=document.createElement("a");i.download="image.png",i.href=o,document.body.appendChild(i),i.click(),document.body.removeChild(i)},onInputObjectChange:function(e){var t,n,o;switch(console.log("onCommand",e),e.type){case"triplet":t=this.nodeFromLabel(e.value.subject),this.saveNode(t),n=this.nodeFromLabel(e.value.object),this.saveNode(n),console.log(t.id,n.id),o=this.edgeFromLabel({from:t.id,to:n.id,label:e.value.predicate}),console.log(o),this.saveEdge(o);break;case"url":console.log(e);break;default:console.log("TODO",e)}},saveNode:function(e){var t=this.network.nodes.findIndex((function(t){return t.id==e.id}));-1===t?this.network.nodes.push(e):Object.assign(this.network.nodes[t],e),this.sendUpdate(e)},saveEdge:function(e){console.log(e);var t=this.network.edges.findIndex((function(t){return t.id==e.id}));-1===t?this.network.edges.push(e):Object.assign(this.network.edges[t],e),console.log(this.network),this.sendUpdate(e)}},computed:{action:{get:function(){return this.$store.state.ipgs.action},set:function(){}},inputObject:{get:function(){return this.$store.state.ipgs.inputObject},set:function(){}},newGraph:{get:function(){return this.$store.state.ipgs.newGraph},set:function(){}}},watch:{newGraph:function(){console.log("New Graph",this.newGraph),this.network.nodes=[],this.network.edges=[];var e=this.newGraph.node;e.id=this.newGraph.url,this.network.nodes.push(e);var t={type:"commande",value:"/e",inputNew:""};this.$store.commit("ipgs/setInputObject",t)},action:function(){switch(console.log(this.action),this.action.action){case"newGraph":this.network.nodes=[],this.network.edges=[];break;case"capture":this.downloadCanvas();break;default:}},inputObject:function(){this.onInputObjectChange(this.inputObject)}}},p=n("53ca"),g=n("3835"),f=(n("159b"),n("4fad"),n("498a"),n("2ca0"),n("8a79"),n("7db0"),["@context","id","label","pair:label","name","inbox","outbox","followers","following","publicKey","shape","title","color","image"]),m={methods:{addNodeEvent:function(e){var t=this,n=this.network.nodes.filter((function(t){return e.properties.items.includes(t.id)}));console.log(n),n.forEach((function(e){void 0==e.built&&t.buildEdges(e)}))},buildEdges:function(e){for(var t=0,n=Object.entries(e);t<n.length;t++){var o=Object(g["a"])(n[t],2),i=o[0],s=o[1];this.parse(e,i,s)}e.built=!0},parse:function(e,t,n){var o=this,i=this.network;if("string"==typeof n){n=n.trim();var s=void 0;if(!f.includes(t)&&n.length>0){var r=i.nodes.findIndex((function(e){return e.id==n}));if(-1===r){var a={id:n,shape:"box",mass:1};if(n.length>20?(a.label=n.substring(0,20)+"..",a.title=n):a.label=n,n.startsWith("http"))if(a.color="#7FD1B9",n.length>50){var l=n.endsWith("/")?n.slice(0,-1):n;a.label=l.substr(l.lastIndexOf("/")+1),a.label=a.label.length>20?a.label.substring(0,20)+"..":a.label,a.label="->"+a.label,a.title=n}else a.label=n;else a.color="#ECC046",s=1,a.mass=1;"type"==t&&(a.shape="star",a.color="#DE6E4B"),a.built=!0,i.nodes.push(a)}else void 0==i.nodes[r].mass?i.nodes[r].mass=1:i.nodes[r].mass++;var c=i.nodes.find((function(e){return e.id==n}));c.mass++;var d={from:e.id,to:c.id,label:t};void 0!=s&&(d.length=s),i.edges.push(d)}else"pair:label"==t&&(e.label=n),"label"==t&&(e.label=n),"name"==t&&(e.label=n),"image"==t&&(e.shape="circularImage",e.image=n)}else if(Array.isArray(n))n.forEach((function(n){o.parse(e,t,n)}));else if(f.includes(t)||"object"!=Object(p["a"])(n))f.includes(t),console.log("TODO",e.id,Object(p["a"])(n),t,n);else{var u=i.nodes.findIndex((function(e){return e.id==n.id}));-1===u&&(console.log("ADDING",e.id,Object(p["a"])(n),t,n),i.nodes.push(n)),i.edges.push({from:e.id,to:n.id,label:t}),console.log("ADDING edge",e.id,t,n.id)}},selectNodeEvent:function(e){console.log(e);var t=e.nodes[0];if(console.log(t),console.log(this.$refs.network),this.$refs.network.isCluster(t))return console.log("is cluster"),void this.$refs.network.openCluster(t);var n=this.network.nodes.find((function(e){return e.id==t}));console.log(n),t.startsWith("http")?this.$route.query.url!=t?this.$router.push({path:"/",query:{url:t}}):alert("you are already watching this resource !"):this.$store.commit("ipgs/setCommandInput",n.label+" ")},networkClickEvent:function(e){console.log(e)},networkEvent:function(e){console.log(e)},graphsChanged:function(){console.log("GRAPHS CHANGED",this.graphs)}},watch:{graphs:function(){console.log(this.graphs),this.graphsChanged(),console.info("TEST WITH ONE GRAPH"),this.network=this.graphs[0]}},computed:{graphs:{get:function(){return this.$store.state.ipgs.graphs},set:function(){}}}},b=[{id:"n1",label:"Ipgs",color:{background:"red"},shape:"circle"},{id:"n2",label:"WebApp",color:{background:"green"},shape:"star"},{id:"n3",label:"InterPlanetary Graph System"},{id:"n4",label:"Mindmap App"},{id:"n5",label:"To know how to use Ipgs,\n type /h in the top input box and hit Enter",shape:"box",color:"#ECC046",cid:1},{id:"n6",label:"Pour savoir comment utiliser Ipgs,\n tapez /h dans le champ de saisie tout en haut",shape:"box",color:"#ECC046",cid:1},{id:"https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld",label:"Archipel Semapps",shape:"star",color:"#7FD1B9",cid:2},{id:"https://spoggy-test9.solidcommunity.net/public/",label:"Spoggy-test9 Public Folder",shape:"star",color:"#7FD1B9",cid:2}],w=[{id:"e1",from:"n1",to:"n2",label:"type"},{id:"e2",from:"n1",to:"n3",label:"long name"},{id:"e3",from:"n1",to:"n4",label:"category"},{id:"e4",from:"n1",to:"n5",label:"help"},{id:"e5",from:"n1",to:"n6",label:"help"},{id:"e6",from:"n1",to:"https://spoggy-test9.solidcommunity.net/public/network/Semapps.jsonld",label:"example"},{id:"e7",from:"n1",to:"https://spoggy-test9.solidcommunity.net/public/",label:"example"}],v={name:"NetworkVis",mixins:[m,h],components:{NetworkPopups:function(){return n.e("chunk-2d215ca0").then(n.bind(null,"c063"))}},data:function(){return{network:{nodes:b.slice(0),edges:w.slice(0),options:{nodes:{shape:"dot",scaling:{min:10,max:30},font:{size:12,face:"Tahoma"}},edges:{arrows:"to",width:.15,color:{inherit:"from"},font:{align:"top"},smooth:{type:"continuous"}},physics:{stabilization:!1,barnesHut:{gravitationalConstant:-8e3,springConstant:.03,springLength:100}},interaction:{navigationButtons:!0,tooltipDelay:200,hideEdgesOnDrag:!0}},options1:{interaction:{navigationButtons:!0},nodes:{font:{color:"black"}},edges:{arrows:"to"}}}}}},k=v,y=(n("5a31"),n("2877")),j=Object(y["a"])(k,o,i,!1,null,null,null);t["default"]=j.exports}}]);
//# sourceMappingURL=chunk-557f8816.518f6640.js.map