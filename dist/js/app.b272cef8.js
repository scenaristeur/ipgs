(function(e){function n(n){for(var r,a,u=n[0],s=n[1],i=n[2],l=0,d=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(n);while(d.length)d.shift()();return c.push.apply(c,i||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,a=1;a<t.length;a++){var u=t[a];0!==o[u]&&(r=!1)}r&&(c.splice(n--,1),e=s(s.s=t[0]))}return e}var r={},a={app:0},o={app:0},c=[];function u(e){return s.p+"js/"+({about:"about",browser:"browser",editor:"editor",agora:"agora",help:"help",history:"history",ipfs:"ipfs",login:"login",network:"network",reunion:"reunion",suggested:"suggested"}[e]||e)+"."+{about:"ade64c8c",browser:"bf2a3a3b","chunk-0ab2b3cb":"7cc103ec","chunk-2d207f75":"860b5f05","chunk-6d5e81fe":"98f3a560","chunk-1f47cca5":"da99f17d","chunk-8dad4b3a":"4a7fddd6",editor:"d83a8661","chunk-70fb2042":"6a753f22","chunk-7a407552":"67c20ca8",agora:"75fd474f",help:"66ac19ea",history:"64c99bd2",ipfs:"45e8908c",login:"bcb1c95b",network:"49cf1001",reunion:"c30041f4",suggested:"00a4bb4f","chunk-2d226c5a":"d956e52b","chunk-2d216f1a":"5fa32e58","chunk-629e1dd0":"37e3760a","chunk-61ade157":"5ffd1e95","chunk-7580ba76":"ca8378b3","chunk-2d225840":"aae3991c","chunk-557f8816":"33f50e6e","chunk-4060d866":"4ae02038","chunk-2d215ca0":"642d995a","chunk-2d21d8af":"39c10a9b","chunk-2d0cc5ba":"4c85c616","chunk-2d22d037":"47a6e9b4","chunk-c1e5d7b4":"4dbd6f8f","chunk-2d20f377":"9d77d977","chunk-2d0e2723":"5a46e659"}[e]+".js"}function s(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.e=function(e){var n=[],t={browser:1,help:1,ipfs:1,reunion:1,"chunk-61ade157":1,"chunk-7580ba76":1,"chunk-557f8816":1,"chunk-4060d866":1,"chunk-c1e5d7b4":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({about:"about",browser:"browser",editor:"editor",agora:"agora",help:"help",history:"history",ipfs:"ipfs",login:"login",network:"network",reunion:"reunion",suggested:"suggested"}[e]||e)+"."+{about:"31d6cfe0",browser:"16bdde28","chunk-0ab2b3cb":"31d6cfe0","chunk-2d207f75":"31d6cfe0","chunk-6d5e81fe":"31d6cfe0","chunk-1f47cca5":"31d6cfe0","chunk-8dad4b3a":"31d6cfe0",editor:"31d6cfe0","chunk-70fb2042":"31d6cfe0","chunk-7a407552":"31d6cfe0",agora:"31d6cfe0",help:"99a62151",history:"31d6cfe0",ipfs:"d578ceb0",login:"31d6cfe0",network:"31d6cfe0",reunion:"b1f79352",suggested:"31d6cfe0","chunk-2d226c5a":"31d6cfe0","chunk-2d216f1a":"31d6cfe0","chunk-629e1dd0":"31d6cfe0","chunk-61ade157":"16bdde28","chunk-7580ba76":"45d5e831","chunk-2d225840":"31d6cfe0","chunk-557f8816":"c04bb7e0","chunk-4060d866":"4add8c6f","chunk-2d215ca0":"31d6cfe0","chunk-2d21d8af":"31d6cfe0","chunk-2d0cc5ba":"31d6cfe0","chunk-2d22d037":"31d6cfe0","chunk-c1e5d7b4":"2fa51c44","chunk-2d20f377":"31d6cfe0","chunk-2d0e2723":"31d6cfe0"}[e]+".css",o=s.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var i=c[u],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===o))return n()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){i=d[u],l=i.getAttribute("data-href");if(l===r||l===o)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],f.parentNode.removeChild(f),t(c)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var c=new Promise((function(n,t){r=o[e]=[n,t]}));n.push(r[2]=c);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=u(e);var d=new Error;i=function(n){l.onerror=l.onload=null,clearTimeout(f);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,t[1](d)}o[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(n)},s.m=e,s.c=r,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)s.d(t,r,function(n){return e[n]}.bind(null,r));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/ipgs/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=n,i=i.slice();for(var d=0;d<i.length;d++)n(i[d]);var f=l;c.push([1,"chunk-vendors"]),t()})({0:function(e,n){},1:function(e,n,t){e.exports=t("56d7")},10:function(e,n){},11:function(e,n){},12:function(e,n){},13:function(e,n){},14:function(e,n){},15:function(e,n){},16:function(e,n){},17:function(e,n){},18:function(e,n){},19:function(e,n){},2:function(e,n){},20:function(e,n){},21:function(e,n){},22:function(e,n){},23:function(e,n){},24:function(e,n){},25:function(e,n){},26:function(e,n){},3:function(e,n){},3635:function(e,n,t){"use strict";var r=t("1da1"),a=(t("96cf"),t("53ca")),o=t("3835"),c=t("d4ec"),u=t("bee2"),s=t("668b"),i=(t("b0c0"),t("8a79"),t("159b"),t("c740"),t("4fad"),t("3ca3"),t("ddb0"),t("caad"),t("99af"),t("2532"),t("2ca0"),t("00e8")),l=t.n(i),d=t("7fed"),f=t.n(d),p=t("46bd"),h=t("8522"),b=t("93ef"),g=new f.a(l.a),m=function(){function e(n){Object(c["a"])(this,e),console.log(n),this.sources=n,this.graphs=[]}return Object(u["a"])(e,[{key:"load",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var n,t,r,a,o,c,u,i,l=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=!(l.length>0&&void 0!==l[0])||l[0],console.log(this.sources),1==n&&(this.graphs=[]),t=!0,r=!1,e.prev=5,o=Object(s["a"])(this.sources);case 7:return e.next=9,o.next();case 9:return c=e.sent,t=c.done,e.next=13,c.value;case 13:if(u=e.sent,t){e.next=51;break}if(i=u,void 0==i.url&&alert("undefined url for ",i.name),void 0!=i.type){e.next=22;break}return e.next=20,this.findType(i);case 20:e.next=23;break;case 22:case 23:console.log(i),e.t0=i.type,e.next="folder"===e.t0?27:"profile"===e.t0||"ttl"===e.t0?30:"json"===e.t0?33:"jsonld"===e.t0?36:39;break;case 27:return e.next=29,this.loadFolder(i);case 29:return e.abrupt("break",48);case 30:return e.next=32,this.loadTtl(i);case 32:return e.abrupt("break",48);case 33:return e.next=35,this.loadJson(i);case 35:return e.abrupt("break",48);case 36:return e.next=38,this.loadJsonld(i);case 38:return e.abrupt("break",48);case 39:return e.prev=39,e.next=42,this.loadFolder(i);case 42:e.next=48;break;case 44:return e.prev=44,e.t1=e["catch"](39),e.next=48,this.loadTtl(i);case 48:t=!0,e.next=7;break;case 51:e.next=57;break;case 53:e.prev=53,e.t2=e["catch"](5),r=!0,a=e.t2;case 57:if(e.prev=57,e.prev=58,t||null==o.return){e.next=62;break}return e.next=62,o.return();case 62:if(e.prev=62,!r){e.next=65;break}throw a;case 65:return e.finish(62);case 66:return e.finish(57);case 67:return e.abrupt("return",this.graphs);case 68:case"end":return e.stop()}}),e,this,[[5,53,57,67],[39,44],[58,,62,66]])})));function n(){return e.apply(this,arguments)}return n}()},{key:"findType",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n.url.endsWith("/")&&(n.type="folder"),n.url.endsWith(".ttl")&&(n.type="ttl"),n.url.endsWith("card#me")&&(n.type="profile"),n.url.endsWith(".json")&&(n.type="json"),n.url.endsWith(".jsonld")&&(n.type="jsonld"),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"loadFolder",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("Solid Folder or Semapps container ?",n),e.next=3,g.readFolder(n.url);case 3:if(t=e.sent,void 0!=t.size){e.next=9;break}return e.next=7,this.loadJsonld(n);case 7:e.next=12;break;case 9:return console.log(t),e.next=12,this.folderToGraph(t);case 12:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"loadTtl",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("Load",n),e.next=3,this.rdfParse(n);case 3:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"loadJson",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("Load",n),e.next=3,this.loadJsonld(n);case 3:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"loadJsonld",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t="xhr",e.next=3,p["useDocumentLoader"](t);case 3:return e.next=5,p["documentLoader"](n.url,(function(e){e&&alert(e)}));case 5:return r=e.sent,r.jsonld=JSON.parse(r.document),delete r.document,console.log(r),e.next=11,this.ldpToGraph(r);case 11:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"ldpToGraph",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(Array.isArray(n.jsonld.nodes)&&Array.isArray(n.jsonld.edges)&&n.jsonld.nodes.length>0)){e.next=4;break}t=n.jsonld,e.next=13;break;case 4:if(!(Array.isArray(n.jsonld["ldp:contains"])&&n.jsonld["ldp:contains"].length>0)){e.next=10;break}return e.next=7,this.pairToGraph(n);case 7:t=e.sent,e.next=13;break;case 10:return e.next=12,this.oneItemToGraph(n);case 12:t=e.sent;case 13:this.graphs.push(t);case 14:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"folderToGraph",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=[],a=[],console.log(n),t.push({id:n.url,label:n.name,shape:"image",image:"./assets/folder.png",type:"folder",built:!0}),t.push({id:n.parent,label:n.parent,shape:"image",image:"./assets/parentfolder.png",type:"folder",built:!0}),a.push({from:n.parent,to:n.url,label:"contains"}),e.next=7,n.folders.forEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.push({id:r.url,label:r.name,shape:"image",image:"./assets/folder.png",type:"folder",built:!0}),a.push({from:n.url,to:r.url,label:"contains"});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());case 7:return e.next=9,n.files.forEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.push({id:r.url,label:r.name,shape:"image",image:"./assets/document.png",type:"file",built:!0}),a.push({from:n.url,to:r.url,label:"contains"});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());case 9:this.graphs.push({nodes:t,edges:a});case 10:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"pairToGraph",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={nodes:[],edges:[]},r=n.jsonld["ldp:contains"],t.nodes=r,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"oneItemToGraph",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={nodes:[],edges:[]},r=n.jsonld,t.nodes.push(r),e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"pairToGraph1",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t,a,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,a={nodes:[],edges:[]},console.log(n),c=["id","publicKey"],u=n.jsonld["ldp:contains"],u.forEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var u,i,l,d,f,p,h,b;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:u=a.nodes.findIndex((function(e){return e.id==n.id})),-1===u?a.nodes.push(n):console.log("object already exists"),i=!0,l=!1,e.prev=4,f=regeneratorRuntime.mark((function e(){var u,s,i,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(u=b,s=Object(o["a"])(u,2),i=s[0],l=s[1],c.includes(i)){e.next=10;break}if(!Array.isArray(l)){e.next=6;break}l.forEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(i,r),e.next=3,t.addEdge(n,i,r,a);case 3:a=e.sent;case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()),e.next=10;break;case 6:return console.log("".concat(i,": ").concat(l)),e.next=9,t.addEdge(n,i,l,a);case 9:a=e.sent;case 10:case"end":return e.stop()}}),e)})),p=Object(s["a"])(Object.entries(n));case 7:return e.next=9,p.next();case 9:return h=e.sent,i=h.done,e.next=13,h.value;case 13:if(b=e.sent,i){e.next=19;break}return e.delegateYield(f(),"t0",16);case 16:i=!0,e.next=7;break;case 19:e.next=25;break;case 21:e.prev=21,e.t1=e["catch"](4),l=!0,d=e.t1;case 25:if(e.prev=25,e.prev=26,i||null==p.return){e.next=30;break}return e.next=30,p.return();case 30:if(e.prev=30,!l){e.next=33;break}throw d;case 33:return e.finish(30);case 34:return e.finish(25);case 35:case"end":return e.stop()}}),e,null,[[4,21,25,35],[26,,30,34]])})));return function(n){return e.apply(this,arguments)}}()),e.abrupt("return",a);case 7:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"rdfParse",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,a={nodes:[],edges:[]},e.next=4,Object(b["a"])(n.url,{fetch:h["fetch"]});case 4:return o=e.sent,console.log(o),e.next=8,o.quads.forEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var r,o,c,u,s,i,l,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=n.subject.id,e.next=3,t.lastPart(n.subject.id);case 3:return e.t1=e.sent,e.t2={id:e.t0,label:e.t1},e.t3=n.predicate.id,e.t4=n.object.id,e.next=9,t.lastPart(n.object.id);case 9:return e.t5=e.sent,e.t6={id:e.t4,label:e.t5},r=[e.t2,e.t3,e.t6],o=r[0],c=r[1],u=r[2],console.log(o,c,u),s=a.nodes.findIndex((function(e){return e.id==o.id})),-1===s?a.nodes.push(o):console.log("object already exists"),i=a.nodes.findIndex((function(e){return e.id==u.id})),-1===i?a.nodes.push(u):console.log("object already exists"),e.t7=o.id,e.t8=u.id,e.next=24,t.lastPart(c);case 24:e.t9=e.sent,l={from:e.t7,to:e.t8,label:e.t9},d=a.edges.findIndex((function(e){return e.from==l.from&&e.to==l.to&&e.label==l.label})),-1===d?a.edges.push(l):console.log("object already exists");case 28:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());case 8:this.graphs.push(a);case 9:case"end":return e.stop()}}),e,this)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"lastPart",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("object"!=Object(a["a"])(n)||void 0==n["rdfs:label"]){e.next=4;break}return e.abrupt("return",n["rdfs:label"]);case 4:if("string"!=typeof n||!n.startsWith("http")){e.next=9;break}return t=n.lastIndexOf("/"),e.abrupt("return",n.substring(t+1));case 9:return e.abrupt("return",n);case 10:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()}]),e}();n["a"]={methods:{checkQueryUrl:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.$store.commit("ipgs/spinnerInit"),!(void 0!=e.$route.query.url&&e.$route.query.url.length>0)){n.next=6;break}return n.next=4,e.load({name:"Query_url",url:e.$route.query.url});case 4:n.next=11;break;case 6:if(e.storage=e.$store.state.solid.storage,null==e.storage){n.next=11;break}return console.log("load storage",e.storage),n.next=11,e.load({name:"Storage",url:e.storage});case 11:case"end":return n.stop()}}),n)})))()},load:function(e){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var r,a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("TODO, find another way to not clear the graph when navig with Solid folder, and allow expanding when clicking on a node for ldp semapps container"),n.$store.commit("ipgs/setGraphs",[{nodes:[],edges:[]}]),n.$store.commit("ipgs/spinnerAdd"),r=[],r.push(e),a=new m(r),t.next=8,a.load();case 8:o=t.sent,console.log(o),n.$store.commit("ipgs/setGraphs",o),n.$store.commit("ipgs/spinnerRemove");case 12:case"end":return t.stop()}}),t)})))()}}}},4:function(e,n){},5:function(e,n){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("Navbar",{attrs:{size:"sm"}}),e.spinner>0?t("b-spinner",{staticClass:"ml-auto",staticStyle:{"z-index":"6"},attrs:{variant:"primary"}}):e._e(),t("transition",{attrs:{name:"slide"}},[t("router-view")],1),t("SolidTrackSession"),t("HelpView")],1)},o=[],c=t("1da1"),u=(t("96cf"),t("d3b7"),t("3ca3"),t("ddb0"),t("3635")),s={name:"App",mixins:[u["a"]],components:{Navbar:function(){return t.e("chunk-2d207f75").then(t.bind(null,"a37d"))},SolidTrackSession:function(){return t.e("chunk-0ab2b3cb").then(t.bind(null,"c1a7"))},HelpView:function(){return t.e("help").then(t.bind(null,"502d"))}},created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.checkQueryUrl();case 1:case"end":return n.stop()}}),n)})))()},watch:{$route:function(){this.checkQueryUrl()}},computed:{spinner:{get:function(){return this.$store.state.ipgs.spinner},set:function(){}}}},i=s,l=t("2877"),d=Object(l["a"])(i,a,o,!1,null,null,null),f=d.exports,p=t("9483");Object(p["a"])("".concat("/ipgs/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh."),alert("New content is available; please close the app & reopen.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var h=t("8c4f"),b=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("NetworkView")],1)},g=[],m={name:"Home",components:{NetworkView:function(){return t.e("network").then(t.bind(null,"8475"))}}},k=m,v=Object(l["a"])(k,b,g,!1,null,null,null),w=v.exports;r["default"].use(h["a"]);var y=[{path:"/",name:"Home",component:w},{path:"/about",name:"About",component:function(){return t.e("about").then(t.bind(null,"f820"))}},{path:"/browser",name:"Browser",component:function(){return t.e("browser").then(t.bind(null,"d9ad"))}},{path:"/network",name:"Network",component:function(){return t.e("network").then(t.bind(null,"8475"))}},{path:"/history",name:"History",component:function(){return t.e("history").then(t.bind(null,"bc91"))}},{path:"/login",name:"Login",component:function(){return t.e("login").then(t.bind(null,"3bea"))}},{path:"/editor",name:"Editor",component:function(){return Promise.all([t.e("chunk-6d5e81fe"),t.e("chunk-1f47cca5"),t.e("chunk-8dad4b3a"),t.e("editor")]).then(t.bind(null,"32cb"))}},{path:"/help",name:"Help",component:function(){return t.e("help").then(t.bind(null,"502d"))}},{path:"/agora",name:"Agora",component:function(){return Promise.all([t.e("chunk-70fb2042"),t.e("chunk-7a407552"),t.e("agora")]).then(t.bind(null,"de5b"))}},{path:"/suggested",name:"Suggested",component:function(){return t.e("suggested").then(t.bind(null,"55e8"))}},{path:"/reunion",name:"Reunion",component:function(){return t.e("reunion").then(t.bind(null,"4f27"))}},{path:"/ipfs",name:"Ipfs",component:function(){return t.e("ipfs").then(t.bind(null,"eff4"))}}],x=new h["a"]({mode:"history",base:"/ipgs/",routes:y}),j=x,O=t("2f62"),R=(t("99af"),window.solid),T=function(){return{webId:null,storage:null}},S={},A={setWebId:function(e,n){return Object(c["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.commit("setWebId",n),null==n){t.next=10;break}return t.t0="",t.next=5,R.data[n].storage;case 5:t.t1=t.sent,r=t.t0.concat.call(t.t0,t.t1),e.commit("setStorage",r),t.next=11;break;case 10:e.commit("setStorage",null);case 11:case"end":return t.stop()}}),t)})))()}},E={setWebId:function(e,n){console.log(n),e.webId=n},setStorage:function(e,n){console.log(n),e.storage=n}},I={namespaced:!0,state:T,getters:S,actions:A,mutations:E},N=(t("498a"),t("4de4"),function(){return{spinner:0,graphs:[],inputObject:null,commands:{"/i":"import","/h":"help","/n":"newGraph","/e":"export","/c":"capture"},commandInput:"",history:[],action:null,editorContent:{},dataToSave:{},socketMessageUrl:"gr",newGraph:{}}}),P={},G={},$={setAction:function(e,n){console.log(n),e.action=n},setWebsocketMesssage:function(e,n){console.log("message in store",n),e.socketMessageUrl=n},setNewGraph:function(e,n){e.newGraph=n},setInputObject:function(e,n){console.log(n),"commande"==n.type?(e.action={action:e.commands[n.value]},console.log(e.action),void 0==e.action.action&&alert("Warning : Unknown action "+n.value+" , type /h for help")):e.inputObject=n},setCommandInput:function(e,n){console.log(n),n=n.trim(),e.commandInput=n.indexOf(" ")>=0?'"'+n+'" ':n+" "},addToHistory:function(e,n){var t=e.history.filter((function(e){return e.id!==n.id}));t.push(n),e.history=t},setEditorContent:function(e,n){console.log(n),e.editorContent=n},setNetwork:function(e,n){console.log(n),e.network=n},setDataToSave:function(e,n){console.log(n),e.dataToSave=n},spinnerAdd:function(e){console.log("spinnerAdd",new Date),e.spinner++},spinnerRemove:function(e){console.log("spinnerRemove",new Date),e.spinner--},spinnerInit:function(e){e.spinner=0},setGraphs:function(e,n){e.graphs=n}},_={namespaced:!0,state:N,getters:P,actions:G,mutations:$};r["default"].use(O["a"]);var C=new O["a"].Store({state:{},mutations:{},actions:{},modules:{solid:I,ipgs:_}}),W=t("b329"),L=t("bd8c"),J=t.n(L),F=t("5f5b"),H=t("b1e0"),q=(t("f9e3"),t("2dd8"),t("63f8"),t("9b56")),D=t.n(q),M={install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.prototype.$ipfs=D.a.create(n)}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(M);var U=M;r["default"].component("network",W["Network"]),r["default"].use(J.a),r["default"].use(F["a"]),r["default"].use(H["a"]),r["default"].use(U),r["default"].config.productionTip=!1,new r["default"]({router:j,store:C,render:function(e){return e(f)}}).$mount("#app")},6:function(e,n){},7:function(e,n){},8:function(e,n){},9:function(e,n){}});
//# sourceMappingURL=app.b272cef8.js.map