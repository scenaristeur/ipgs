(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["network"],{"0538":function(t,e,n){"use strict";var r=n("1c0b"),o=n("861d"),i=[].slice,a={},c=function(t,e,n){if(!(e in a)){for(var r=[],o=0;o<e;o++)r[o]="a["+o+"]";a[e]=Function("C,a","return new C("+r.join(",")+")")}return a[e](t,n)};t.exports=Function.bind||function(t){var e=r(this),n=i.call(arguments,1),a=function(){var r=n.concat(i.call(arguments));return this instanceof a?c(e,r.length,r):e.apply(t,r)};return o(e.prototype)&&(a.prototype=e.prototype),a}},"057f":function(t,e,n){var r=n("fc6a"),o=n("241c").f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?c(t):o(r(t))}},"11c1":function(t,e,n){var r=n("c437"),o=n("c64e"),i=o;i.v1=r,i.v4=o,t.exports=i},"159b":function(t,e,n){var r=n("da84"),o=n("fdbc"),i=n("17c2"),a=n("9112");for(var c in o){var s=r[c],u=s&&s.prototype;if(u&&u.forEach!==i)try{a(u,"forEach",i)}catch(f){u.forEach=i}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,o=n("a640"),i=n("ae40"),a=o("forEach"),c=i("forEach");t.exports=a&&c?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},2192:function(t,e,n){"use strict";n("7ca4")},2366:function(t,e){for(var n=[],r=0;r<256;++r)n[r]=(r+256).toString(16).substr(1);function o(t,e){var r=e||0,o=n;return[o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],"-",o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]],o[t[r++]]].join("")}t.exports=o},"25f0":function(t,e,n){"use strict";var r=n("6eeb"),o=n("825a"),i=n("d039"),a=n("ad6d"),c="toString",s=RegExp.prototype,u=s[c],f=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),l=u.name!=c;(f||l)&&r(RegExp.prototype,c,(function(){var t=o(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in s)?a.call(t):n);return"/"+e+"/"+r}),{unsafe:!0})},3410:function(t,e,n){var r=n("23e7"),o=n("d039"),i=n("7b0b"),a=n("e163"),c=n("e177"),s=o((function(){a(1)}));r({target:"Object",stat:!0,forced:s,sham:!c},{getPrototypeOf:function(t){return a(i(t))}})},"38b4":function(t,e,n){},"3ca3":function(t,e,n){"use strict";var r=n("6547").charAt,o=n("69f3"),i=n("7dd0"),a="String Iterator",c=o.set,s=o.getterFor(a);i(String,"String",(function(t){c(this,{type:a,string:String(t),index:0})}),(function(){var t,e=s(this),n=e.string,o=e.index;return o>=n.length?{value:void 0,done:!0}:(t=r(n,o),e.index+=t.length,{value:t,done:!1})}))},4160:function(t,e,n){"use strict";var r=n("23e7"),o=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},"4ae1":function(t,e,n){var r=n("23e7"),o=n("d066"),i=n("1c0b"),a=n("825a"),c=n("861d"),s=n("7c73"),u=n("0538"),f=n("d039"),l=o("Reflect","construct"),d=f((function(){function t(){}return!(l((function(){}),[],t)instanceof t)})),p=!f((function(){l((function(){}))})),h=d||p;r({target:"Reflect",stat:!0,forced:h,sham:h},{construct:function(t,e){i(t),a(e);var n=arguments.length<3?t:i(arguments[2]);if(p&&!d)return l(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(u.apply(t,r))}var o=n.prototype,f=s(c(o)?o:Object.prototype),h=Function.apply.call(t,f,e);return c(h)?h:f}})},6547:function(t,e,n){var r=n("a691"),o=n("1d80"),i=function(t){return function(e,n){var i,a,c=String(o(e)),s=r(n),u=c.length;return s<0||s>=u?t?"":void 0:(i=c.charCodeAt(s),i<55296||i>56319||s+1===u||(a=c.charCodeAt(s+1))<56320||a>57343?t?c.charAt(s):i:t?c.slice(s,s+2):a-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)}},"746f":function(t,e,n){var r=n("428f"),o=n("5135"),i=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});o(e,t)||a(e,t,{value:i.f(t)})}},"7ca4":function(t,e,n){},8475:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("CommandInput",{on:{onCommand:t.onCommand}}),n("network",{ref:"network",staticClass:"wrapper",attrs:{nodes:t.nodes,edges:t.edges,options:t.options},on:{click:t.onClick}}),n("vue-fab",{attrs:{mainBtnColor:"#3599DB"}},[n("fab-item",{attrs:{idx:0,title:"browser",icon:"folder"},on:{clickItem:t.clickItem}}),n("fab-item",{attrs:{idx:1,title:"about",icon:"question"},on:{clickItem:t.clickItem}}),n("fab-item",{attrs:{idx:2,title:"share",icon:"share"},on:{clickItem:t.clickItem}})],1),n("NodeModal",{on:{ok:t.saveNode},model:{value:t.nodeData,callback:function(e){t.nodeData=e},expression:"nodeData"}}),n("EdgeModal",{on:{ok:t.saveEdge},model:{value:t.edgeData,callback:function(e){t.edgeData=e},expression:"edgeData"}})],1)},o=[],i=(n("c740"),n("c975"),n("d81d"),n("d3b7"),n("96cf"),n("1da1"));n("38b4"),n("4160"),n("159b");function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t,e){return f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},f(t,e)}function l(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}n("4ae1"),n("3410");function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}n("25f0");function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}n("a4d3"),n("e01a"),n("d28b"),n("3ca3"),n("ddb0");function h(t){return h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function g(t,e){return!e||"object"!==h(e)&&"function"!==typeof e?u(t):e}function v(t){var e=p();return function(){var n,r=d(t);if(e){var o=d(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return g(this,n)}}var b=function t(){a(this,t),this["@context"]={owl:"http://www.w3.org/2002/07/owl#",terms:"http://purl.org/dc/terms/",rdfs:"http://www.w3.org/2000/01/rdf-schema#"},this["@id"]=null,this["@type"]="owl:Thing",this["rdfs:label"]="",this["terms:created"]=(new Date).toISOString()+"^^XML:dateTime",this["terms:modified"]=(new Date).toISOString()+"^^XML:dateTime"},m=n("00e8"),y=n.n(m),w=n("7fed"),S=n.n(w),O=new S.a(y.a),k={"@context":{terms:"http://purl.org/dc/terms/",rdfs:"http://www.w3.org/2000/01/rdf-schema#",motifs:"http://purl.org/net/wf-motifs#",ipgs:"https://scenaristeur.github.io/ipgs#"},"@id":"","rdfs:label":"","@type":"motifs:DataVisualization","@graph":[{"@id":"#nodes","@type":"rdfs:Set","@graph":[]},{"@id":"#edges","@type":"rdfs:Set","@graph":[]}],nodes:[],edges:[]},x=function(t){l(n,t);var e=v(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k;return a(this,n),t=e.call(this),Object.assign(u(t),r),t}return s(n,[{key:"setId",value:function(t){this["@id"]=t,this["@context"]["@base"]=t}},{key:"init",value:function(t){Object.assign(this,t);var e=this["@graph"][0]["@graph"],n=this["@graph"][1]["@graph"];console.log(e),console.log(n)}},{key:"save",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this["@graph"][0]["@graph"]=[],this["@graph"][1]["@graph"]=[],this.nodes.forEach((function(t){var n={};Object.assign(n,t),n["@id"]="#"+t.id,n["@type"]="ipgs:Node",n["rdfs:label"]=t.label,delete n.id,delete n.label,e["@graph"][0]["@graph"].push(n)})),this.edges.forEach((function(t){var n={};Object.assign(n,t),n["@id"]="#"+t.id,n["@type"]="ipgs:Edge",n["igps:from"]={"@id":"#"+t.from},n["igps:to"]={"@id":"#"+t.to},n["rdfs:label"]=t.label,delete n.id,delete n.from,delete n.to,delete n.label,e["@graph"][1]["@graph"].push(n)})),console.log("SAVE",this["@id"],this),t.next=7,O.createFile(this["@id"],JSON.stringify(this),"application/json").then((function(t){console.log(t)}));case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),n}(b),E=n("11c1"),j=new S.a(y.a),C={name:"NetworkView",components:{NodeModal:function(){return n.e("chunk-2d2107ec").then(n.bind(null,"b7ab"))},EdgeModal:function(){return n.e("chunk-2d0cc5ba").then(n.bind(null,"4e1d"))},CommandInput:function(){return n.e("chunk-028afe3a").then(n.bind(null,"c52d"))}},data:function(){return{nodes:[],edges:[],nodeData:{},edgeData:{},options:{edges:{arrows:"to",color:"lightgray"},manipulation:!0,interaction:{navigationButtons:!0}},inputVisible:!1}},created:function(){console.log(this.$route),this.initManipulationOptions(),void 0!=this.$route.query.url?(this.url=this.$route.query.url,console.log(this.url),this.read(this.url)):(this.network=new x,this.network.setId("https://spoggy-test9.solidcommunity.net/public/network/test.json"),console.log("network",this.network))},methods:{onCommand:function(t){switch(console.log("onCommand",t),t.type){case"triplet":this.saveNode({id:t.value.subject,label:t.value.subject}),this.saveNode({id:t.value.object,label:t.value.object}),this.saveEdge({id:Object(E["v4"])(),from:t.value.subject,to:t.value.object,label:t.value.predicate});break;default:console.log("TODO",t)}},onClick:function(){},read:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("url",t),e.network=new x,n.next=4,j.itemExists(t);case 4:if(!n.sent){n.next=15;break}return r=!0,o={},n.next=9,j.readFile(t);case 9:i=n.sent;try{o=JSON.parse(i),console.log("JSONLD",o),void 0!=o["@"]&&(r=window.confirm("Be careful this file does not seem to be a compatible JSONLD GRAPH file. Are you sure you want to replace it ???"+o))}catch(a){r=window.confirm("Be careful this file does not seem to be a compatible JSONLD GRAPH file. Are you sure you want to replace it ???"+i)}console.log(r),1==r&&(e.network.init(o),console.log("network",e.network),e.nodes=e.network.nodes,e.edges=e.network.edges),n.next=16;break;case 15:e.network.setId(t);case 16:case"end":return n.stop()}}),n)})))()},initManipulationOptions:function(){var t=this;this.options.manipulation={initiallyActive:!0,addNode:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.label="",t.editNode(n,r);case 2:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}(),editNode:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.editNode(n,r);case 1:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}(),addEdge:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.addEdge(n,r);case 1:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}(),editEdge:{editWithoutDrag:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.editEdgeWithoutDrag(n,r);case 1:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}()}}},editNode:function(t,e){this.nodeData=t,this.$bvModal.show("node-popup"),e()},addEdge:function(t,e){if(this.edgeData=t,t.from==t.to){var n=confirm("Do you want to connect the node to itself?");if(1!=n)return void e(null)}this.editEdgeWithoutDrag(t,e)},editEdge:function(t,e){this.editEdgeWithoutDrag(t,e)},editEdgeWithoutDrag:function(t,e){this.edgeData=t,this.$bvModal.show("edge-popup"),e()},saveNode:function(t){var e=this.nodes.findIndex((function(e){return e.id==t.id}));-1===e?this.nodes.push(t):Object.assign(this.nodes[e],t),this.network.nodes=this.nodes,this.network.save()},saveEdge:function(t){var e=this.edges.map((function(t){return t.id})).indexOf(t.id);e>-1?this.edges[e].label=t.label:this.edges.push(t),this.network.edges=this.edges,this.network.save()},clickItem:function(t){switch(console.log("item",t),t.idx){case 0:this.$router.push({path:"browser"});break;case 1:this.$router.push({path:"about"});break;case 2:navigator.share?navigator.share({title:"IPGS",text:"Check out this IPGS graph.",url:"https://scenaristeur.github.io/ipgs/?url="+this.url}).then((function(){return console.log("Successful share")})).catch((function(t){return console.log("Error sharing",t)})):console.log("no share");break;default:}}}},R=C,D=(n("2192"),n("2877")),L=Object(D["a"])(R,r,o,!1,null,null,null);e["default"]=L.exports},a4d3:function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),i=n("d066"),a=n("c430"),c=n("83ab"),s=n("4930"),u=n("fdbf"),f=n("d039"),l=n("5135"),d=n("e8b5"),p=n("861d"),h=n("825a"),g=n("7b0b"),v=n("fc6a"),b=n("c04e"),m=n("5c6c"),y=n("7c73"),w=n("df75"),S=n("241c"),O=n("057f"),k=n("7418"),x=n("06cf"),E=n("9bf2"),j=n("d1e7"),C=n("9112"),R=n("6eeb"),D=n("5692"),L=n("f772"),A=n("d012"),N=n("90e3"),P=n("b622"),I=n("e538"),T=n("746f"),M=n("d44e"),V=n("69f3"),F=n("b727").forEach,G=L("hidden"),$="Symbol",_="prototype",J=P("toPrimitive"),q=V.set,B=V.getterFor($),H=Object[_],W=o.Symbol,X=i("JSON","stringify"),z=x.f,Q=E.f,U=O.f,K=j.f,Y=D("symbols"),Z=D("op-symbols"),tt=D("string-to-symbol-registry"),et=D("symbol-to-string-registry"),nt=D("wks"),rt=o.QObject,ot=!rt||!rt[_]||!rt[_].findChild,it=c&&f((function(){return 7!=y(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=z(H,e);r&&delete H[e],Q(t,e,n),r&&t!==H&&Q(H,e,r)}:Q,at=function(t,e){var n=Y[t]=y(W[_]);return q(n,{type:$,tag:t,description:e}),c||(n.description=e),n},ct=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},st=function(t,e,n){t===H&&st(Z,e,n),h(t);var r=b(e,!0);return h(n),l(Y,r)?(n.enumerable?(l(t,G)&&t[G][r]&&(t[G][r]=!1),n=y(n,{enumerable:m(0,!1)})):(l(t,G)||Q(t,G,m(1,{})),t[G][r]=!0),it(t,r,n)):Q(t,r,n)},ut=function(t,e){h(t);var n=v(e),r=w(n).concat(ht(n));return F(r,(function(e){c&&!lt.call(n,e)||st(t,e,n[e])})),t},ft=function(t,e){return void 0===e?y(t):ut(y(t),e)},lt=function(t){var e=b(t,!0),n=K.call(this,e);return!(this===H&&l(Y,e)&&!l(Z,e))&&(!(n||!l(this,e)||!l(Y,e)||l(this,G)&&this[G][e])||n)},dt=function(t,e){var n=v(t),r=b(e,!0);if(n!==H||!l(Y,r)||l(Z,r)){var o=z(n,r);return!o||!l(Y,r)||l(n,G)&&n[G][r]||(o.enumerable=!0),o}},pt=function(t){var e=U(v(t)),n=[];return F(e,(function(t){l(Y,t)||l(A,t)||n.push(t)})),n},ht=function(t){var e=t===H,n=U(e?Z:v(t)),r=[];return F(n,(function(t){!l(Y,t)||e&&!l(H,t)||r.push(Y[t])})),r};if(s||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=N(t),n=function(t){this===H&&n.call(Z,t),l(this,G)&&l(this[G],e)&&(this[G][e]=!1),it(this,e,m(1,t))};return c&&ot&&it(H,e,{configurable:!0,set:n}),at(e,t)},R(W[_],"toString",(function(){return B(this).tag})),R(W,"withoutSetter",(function(t){return at(N(t),t)})),j.f=lt,E.f=st,x.f=dt,S.f=O.f=pt,k.f=ht,I.f=function(t){return at(P(t),t)},c&&(Q(W[_],"description",{configurable:!0,get:function(){return B(this).description}}),a||R(H,"propertyIsEnumerable",lt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:W}),F(w(nt),(function(t){T(t)})),r({target:$,stat:!0,forced:!s},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var n=W(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),r({target:"Object",stat:!0,forced:!s,sham:!c},{create:ft,defineProperty:st,defineProperties:ut,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:pt,getOwnPropertySymbols:ht}),r({target:"Object",stat:!0,forced:f((function(){k.f(1)}))},{getOwnPropertySymbols:function(t){return k.f(g(t))}}),X){var gt=!s||f((function(){var t=W();return"[null]"!=X([t])||"{}"!=X({a:t})||"{}"!=X(Object(t))}));r({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,n){var r,o=[t],i=1;while(arguments.length>i)o.push(arguments[i++]);if(r=e,(p(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),o[1]=e,X.apply(null,o)}})}W[_][J]||C(W[_],J,W[_].valueOf),M(W,$),A[G]=!0},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},ae40:function(t,e,n){var r=n("83ab"),o=n("d039"),i=n("5135"),a=Object.defineProperty,c={},s=function(t){throw t};t.exports=function(t,e){if(i(c,t))return c[t];e||(e={});var n=[][t],u=!!i(e,"ACCESSORS")&&e.ACCESSORS,f=i(e,0)?e[0]:s,l=i(e,1)?e[1]:void 0;return c[t]=!!n&&!o((function(){if(u&&!r)return!0;var t={length:-1};u?a(t,1,{enumerable:!0,get:s}):t[1]=1,n.call(t,f,l)}))}},b727:function(t,e,n){var r=n("0366"),o=n("44ad"),i=n("7b0b"),a=n("50c4"),c=n("65f0"),s=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,f=4==t,l=6==t,d=7==t,p=5==t||l;return function(h,g,v,b){for(var m,y,w=i(h),S=o(w),O=r(g,v,3),k=a(S.length),x=0,E=b||c,j=e?E(h,k):n||d?E(h,0):void 0;k>x;x++)if((p||x in S)&&(m=S[x],y=O(m,x,w),t))if(e)j[x]=y;else if(y)switch(t){case 3:return!0;case 5:return m;case 6:return x;case 2:s.call(j,m)}else switch(t){case 4:return!1;case 7:s.call(j,m)}return l?-1:u||f?f:j}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},c437:function(t,e,n){var r,o,i=n("e1f4"),a=n("2366"),c=0,s=0;function u(t,e,n){var u=e&&n||0,f=e||[];t=t||{};var l=t.node||r,d=void 0!==t.clockseq?t.clockseq:o;if(null==l||null==d){var p=i();null==l&&(l=r=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==d&&(d=o=16383&(p[6]<<8|p[7]))}var h=void 0!==t.msecs?t.msecs:(new Date).getTime(),g=void 0!==t.nsecs?t.nsecs:s+1,v=h-c+(g-s)/1e4;if(v<0&&void 0===t.clockseq&&(d=d+1&16383),(v<0||h>c)&&void 0===t.nsecs&&(g=0),g>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=h,s=g,o=d,h+=122192928e5;var b=(1e4*(268435455&h)+g)%4294967296;f[u++]=b>>>24&255,f[u++]=b>>>16&255,f[u++]=b>>>8&255,f[u++]=255&b;var m=h/4294967296*1e4&268435455;f[u++]=m>>>8&255,f[u++]=255&m,f[u++]=m>>>24&15|16,f[u++]=m>>>16&255,f[u++]=d>>>8|128,f[u++]=255&d;for(var y=0;y<6;++y)f[u+y]=l[y];return e||a(f)}t.exports=u},c64e:function(t,e,n){var r=n("e1f4"),o=n("2366");function i(t,e,n){var i=e&&n||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null),t=t||{};var a=t.random||(t.rng||r)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,e)for(var c=0;c<16;++c)e[i+c]=a[c];return e||o(a)}t.exports=i},c740:function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").findIndex,i=n("44d2"),a=n("ae40"),c="findIndex",s=!0,u=a(c);c in[]&&Array(1)[c]((function(){s=!1})),r({target:"Array",proto:!0,forced:s||!u},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i(c)},c975:function(t,e,n){"use strict";var r=n("23e7"),o=n("4d64").indexOf,i=n("a640"),a=n("ae40"),c=[].indexOf,s=!!c&&1/[1].indexOf(1,-0)<0,u=i("indexOf"),f=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:s||!u||!f},{indexOf:function(t){return s?c.apply(this,arguments)||0:o(this,t,arguments.length>1?arguments[1]:void 0)}})},d28b:function(t,e,n){var r=n("746f");r("iterator")},d81d:function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").map,i=n("1dde"),a=n("ae40"),c=i("map"),s=a("map");r({target:"Array",proto:!0,forced:!c||!s},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(t,e,n){var r=n("da84"),o=n("fdbc"),i=n("e260"),a=n("9112"),c=n("b622"),s=c("iterator"),u=c("toStringTag"),f=i.values;for(var l in o){var d=r[l],p=d&&d.prototype;if(p){if(p[s]!==f)try{a(p,s,f)}catch(g){p[s]=f}if(p[u]||a(p,u,l),o[l])for(var h in i)if(p[h]!==i[h])try{a(p,h,i[h])}catch(g){p[h]=i[h]}}}},e01a:function(t,e,n){"use strict";var r=n("23e7"),o=n("83ab"),i=n("da84"),a=n("5135"),c=n("861d"),s=n("9bf2").f,u=n("e893"),f=i.Symbol;if(o&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var l={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new f(t):void 0===t?f():f(t);return""===t&&(l[e]=!0),e};u(d,f);var p=d.prototype=f.prototype;p.constructor=d;var h=p.toString,g="Symbol(test)"==String(f("test")),v=/^Symbol\((.*)\)[^)]+$/;s(p,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=h.call(t);if(a(l,t))return"";var n=g?e.slice(7,-1):e.replace(v,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:d})}},e1f4:function(t,e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var r=new Uint8Array(16);t.exports=function(){return n(r),r}}else{var o=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0===(3&e)&&(t=4294967296*Math.random()),o[e]=t>>>((3&e)<<3)&255;return o}}},e538:function(t,e,n){var r=n("b622");e.f=r},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=network.264eae43.js.map