(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["network"],{"0538":function(t,e,n){"use strict";var r=n("1c0b"),i=n("861d"),o=[].slice,a={},c=function(t,e,n){if(!(e in a)){for(var r=[],i=0;i<e;i++)r[i]="a["+i+"]";a[e]=Function("C,a","return new C("+r.join(",")+")")}return a[e](t,n)};t.exports=Function.bind||function(t){var e=r(this),n=o.call(arguments,1),a=function(){var r=n.concat(o.call(arguments));return this instanceof a?c(e,r.length,r):e.apply(t,r)};return i(e.prototype)&&(a.prototype=e.prototype),a}},"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?c(t):i(r(t))}},"159b":function(t,e,n){var r=n("da84"),i=n("fdbc"),o=n("17c2"),a=n("9112");for(var c in i){var s=r[c],u=s&&s.prototype;if(u&&u.forEach!==o)try{a(u,"forEach",o)}catch(f){u.forEach=o}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,i=n("a640"),o=n("ae40"),a=i("forEach"),c=o("forEach");t.exports=a&&c?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},2192:function(t,e,n){"use strict";n("7ca4")},"25f0":function(t,e,n){"use strict";var r=n("6eeb"),i=n("825a"),o=n("d039"),a=n("ad6d"),c="toString",s=RegExp.prototype,u=s[c],f=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),d=u.name!=c;(f||d)&&r(RegExp.prototype,c,(function(){var t=i(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in s)?a.call(t):n);return"/"+e+"/"+r}),{unsafe:!0})},3410:function(t,e,n){var r=n("23e7"),i=n("d039"),o=n("7b0b"),a=n("e163"),c=n("e177"),s=i((function(){a(1)}));r({target:"Object",stat:!0,forced:s,sham:!c},{getPrototypeOf:function(t){return a(o(t))}})},"38b4":function(t,e,n){},"3ca3":function(t,e,n){"use strict";var r=n("6547").charAt,i=n("69f3"),o=n("7dd0"),a="String Iterator",c=i.set,s=i.getterFor(a);o(String,"String",(function(t){c(this,{type:a,string:String(t),index:0})}),(function(){var t,e=s(this),n=e.string,i=e.index;return i>=n.length?{value:void 0,done:!0}:(t=r(n,i),e.index+=t.length,{value:t,done:!1})}))},4160:function(t,e,n){"use strict";var r=n("23e7"),i=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"4ae1":function(t,e,n){var r=n("23e7"),i=n("d066"),o=n("1c0b"),a=n("825a"),c=n("861d"),s=n("7c73"),u=n("0538"),f=n("d039"),d=i("Reflect","construct"),l=f((function(){function t(){}return!(d((function(){}),[],t)instanceof t)})),p=!f((function(){d((function(){}))})),h=l||p;r({target:"Reflect",stat:!0,forced:h,sham:h},{construct:function(t,e){o(t),a(e);var n=arguments.length<3?t:o(arguments[2]);if(p&&!l)return d(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(u.apply(t,r))}var i=n.prototype,f=s(c(i)?i:Object.prototype),h=Function.apply.call(t,f,e);return c(h)?h:f}})},6547:function(t,e,n){var r=n("a691"),i=n("1d80"),o=function(t){return function(e,n){var o,a,c=String(i(e)),s=r(n),u=c.length;return s<0||s>=u?t?"":void 0:(o=c.charCodeAt(s),o<55296||o>56319||s+1===u||(a=c.charCodeAt(s+1))<56320||a>57343?t?c.charAt(s):o:t?c.slice(s,s+2):a-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||a(e,t,{value:o.f(t)})}},"7ca4":function(t,e,n){},8475:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("network",{ref:"network",staticClass:"wrapper",attrs:{nodes:t.nodes,edges:t.edges,options:t.options},on:{click:t.onClick}}),n("vue-fab",{attrs:{mainBtnColor:"#3599DB"}},[n("fab-item",{attrs:{idx:0,title:"browser",icon:"folder"},on:{clickItem:t.clickItem}}),n("fab-item",{attrs:{idx:1,title:"about",icon:"question"},on:{clickItem:t.clickItem}})],1),n("NodeModal",{on:{ok:t.saveNode},model:{value:t.nodeData,callback:function(e){t.nodeData=e},expression:"nodeData"}}),n("EdgeModal",{on:{ok:t.saveEdge},model:{value:t.edgeData,callback:function(e){t.edgeData=e},expression:"edgeData"}})],1)},i=[],o=(n("c740"),n("c975"),n("d81d"),n("d3b7"),n("96cf"),n("1da1"));n("38b4"),n("4160"),n("159b");function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t,e){return f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},f(t,e)}function d(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}n("4ae1"),n("3410");function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}n("25f0");function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}n("a4d3"),n("e01a"),n("d28b"),n("3ca3"),n("ddb0");function h(t){return h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function g(t,e){return!e||"object"!==h(e)&&"function"!==typeof e?u(t):e}function b(t){var e=p();return function(){var n,r=l(t);if(e){var i=l(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return g(this,n)}}var v=function t(){a(this,t),this["@context"]={owl:"http://www.w3.org/2002/07/owl#",terms:"http://purl.org/dc/terms/",rdfs:"http://www.w3.org/2000/01/rdf-schema#"},this["@id"]=null,this["@type"]="owl:Thing",this["rdfs:label"]="",this["terms:created"]=(new Date).toISOString()+"^^XML:dateTime",this["terms:modified"]=(new Date).toISOString()+"^^XML:dateTime"},y=n("00e8"),m=n.n(y),w=n("7fed"),S=n.n(w),O=new S.a(m.a),k={"@context":{terms:"http://purl.org/dc/terms/",rdfs:"http://www.w3.org/2000/01/rdf-schema#",motifs:"http://purl.org/net/wf-motifs#",ipgs:"https://scenaristeur.github.io/ipgs#"},"@id":"","rdfs:label":"","@type":"motifs:DataVisualization","@graph":[{"@id":"#nodes","@type":"rdfs:Set","@graph":[{"@id":"#NodeOne","@type":"ipgs:Node","rdfs:label":"One"},{"@id":"#NodeTwo","@type":"ipgs:Node","rdfs:label":"Two"}]},{"@id":"#edges","@type":"rdfs:Set","@graph":[{"@id":"#EdgeOne","@type":"ipgs:Edge","ipgs:from":{"@id":"#nodeOne"},"ipgs:to":{"@id":"#NodeTwo"},"rdfs:label":"First Edge"},{"@id":"#EdgeTwo","@type":"ipgs:Edge","ipgs:from":{"@id":"#NodeTwo"},"ipgs:to":{"@id":"#NodeOne"},"rdfs:label":"Second Edge"}]}],nodes:[],edges:[]},x=function(t){d(n,t);var e=b(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k;return a(this,n),t=e.call(this),Object.assign(u(t),r),t}return s(n,[{key:"setId",value:function(t){this["@id"]=t,this["@context"]["@base"]=t}},{key:"init",value:function(t){Object.assign(this,t);var e=this["@graph"][0]["@graph"],n=this["@graph"][1]["@graph"];console.log(e),console.log(n)}},{key:"save",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.nodes.forEach((function(t){var n={};Object.assign(n,t),n["@id"]="#"+t.id,n["@type"]="ipgs:Node",n["rdfs:label"]=t.label,delete n.id,delete n.label,e["@graph"][0]["@graph"].push(n)})),this.edges.forEach((function(t){var n={};Object.assign(n,t),n["@id"]="#"+t.id,n["@type"]="ipgs:Edge",n["igps:from"]={"@id":"#"+t.from},n["igps:to"]={"@id":"#"+t.to},n["rdfs:label"]=t.label,delete n.id,delete n.from,delete n.to,delete n.label,e["@graph"][1]["@graph"].push(n)})),console.log("SAVE",this["@id"],this),t.next=5,O.createFile(this["@id"],JSON.stringify(this),"application/json").then((function(t){console.log(t)}));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),n}(v),E=new S.a(m.a),j={name:"NetworkView",components:{NodeModal:function(){return n.e("chunk-2d2107ec").then(n.bind(null,"b7ab"))},EdgeModal:function(){return n.e("chunk-2d0cc5ba").then(n.bind(null,"4e1d"))}},data:function(){return{nodes:[],edges:[],nodeData:{},edgeData:{},options:{edges:{arrows:"to",color:"lightgray"},manipulation:!0,interaction:{navigationButtons:!0}},inputVisible:!1}},created:function(){console.log(this.$route),this.initManipulationOptions(),void 0!=this.$route.query.url?(this.url=this.$route.query.url,console.log(this.url),this.read(this.url)):(this.network=new x,this.network.setId("https://spoggy-test9.solidcommunity.net/public/network/test.json"),console.log("network",this.network))},methods:{onClick:function(){this.inputVisible=!0},read:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var r,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("url",t),e.network=new x,n.next=4,E.itemExists(t);case 4:if(!n.sent){n.next=16;break}return n.next=7,E.readFile(t);case 7:r=n.sent,i=JSON.parse(r),console.log("JSONLD",i),e.network.init(i),console.log("network",e.network),e.nodes=e.network.nodes,e.edges=e.network.edges,n.next=17;break;case 16:e.network.setId(t);case 17:case"end":return n.stop()}}),n)})))()},initManipulationOptions:function(){var t=this;this.options.manipulation={initiallyActive:!0,addNode:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.label="",t.editNode(n,r);case 2:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}(),editNode:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.editNode(n,r);case 1:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}(),addEdge:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.addEdge(n,r);case 1:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}(),editEdge:{editWithoutDrag:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.editEdgeWithoutDrag(n,r);case 1:case"end":return e.stop()}}),e)})));function n(t,n){return e.apply(this,arguments)}return n}()}}},editNode:function(t,e){this.nodeData=t,this.$bvModal.show("node-popup"),e()},addEdge:function(t,e){if(this.edgeData=t,t.from==t.to){var n=confirm("Do you want to connect the node to itself?");if(1!=n)return void e(null)}this.editEdgeWithoutDrag(t,e)},editEdge:function(t,e){this.editEdgeWithoutDrag(t,e)},editEdgeWithoutDrag:function(t,e){this.edgeData=t,this.$bvModal.show("edge-popup"),e()},saveNode:function(t){var e=this,n=this.nodes.findIndex((function(t){return t.id==e.nodeData.id}));-1===n?this.nodes.push(t):Object.assign(this.nodes[n],t),this.network.nodes=this.nodes,this.network.save()},saveEdge:function(t){var e=this.edges.map((function(t){return t.id})).indexOf(t.id);e>-1?this.edges[e].label=t.label:this.edges.push(t),this.network.edges=this.edges,this.network.save()},clickItem:function(t){switch(console.log("item",t),t.idx){case 0:this.$router.push({path:"browser"});break;case 1:this.$router.push({path:"about"});break;default:}}}},D=j,L=(n("2192"),n("2877")),N=Object(L["a"])(D,r,i,!1,null,null,null);e["default"]=N.exports},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),a=n("c430"),c=n("83ab"),s=n("4930"),u=n("fdbf"),f=n("d039"),d=n("5135"),l=n("e8b5"),p=n("861d"),h=n("825a"),g=n("7b0b"),b=n("fc6a"),v=n("c04e"),y=n("5c6c"),m=n("7c73"),w=n("df75"),S=n("241c"),O=n("057f"),k=n("7418"),x=n("06cf"),E=n("9bf2"),j=n("d1e7"),D=n("9112"),L=n("6eeb"),N=n("5692"),R=n("f772"),T=n("d012"),C=n("90e3"),P=n("b622"),A=n("e538"),M=n("746f"),I=n("d44e"),V=n("69f3"),F=n("b727").forEach,$=R("hidden"),_="Symbol",J="prototype",G=P("toPrimitive"),W=V.set,q=V.getterFor(_),B=Object[J],H=i.Symbol,X=o("JSON","stringify"),z=x.f,Q=E.f,K=O.f,U=j.f,Y=N("symbols"),Z=N("op-symbols"),tt=N("string-to-symbol-registry"),et=N("symbol-to-string-registry"),nt=N("wks"),rt=i.QObject,it=!rt||!rt[J]||!rt[J].findChild,ot=c&&f((function(){return 7!=m(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=z(B,e);r&&delete B[e],Q(t,e,n),r&&t!==B&&Q(B,e,r)}:Q,at=function(t,e){var n=Y[t]=m(H[J]);return W(n,{type:_,tag:t,description:e}),c||(n.description=e),n},ct=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof H},st=function(t,e,n){t===B&&st(Z,e,n),h(t);var r=v(e,!0);return h(n),d(Y,r)?(n.enumerable?(d(t,$)&&t[$][r]&&(t[$][r]=!1),n=m(n,{enumerable:y(0,!1)})):(d(t,$)||Q(t,$,y(1,{})),t[$][r]=!0),ot(t,r,n)):Q(t,r,n)},ut=function(t,e){h(t);var n=b(e),r=w(n).concat(ht(n));return F(r,(function(e){c&&!dt.call(n,e)||st(t,e,n[e])})),t},ft=function(t,e){return void 0===e?m(t):ut(m(t),e)},dt=function(t){var e=v(t,!0),n=U.call(this,e);return!(this===B&&d(Y,e)&&!d(Z,e))&&(!(n||!d(this,e)||!d(Y,e)||d(this,$)&&this[$][e])||n)},lt=function(t,e){var n=b(t),r=v(e,!0);if(n!==B||!d(Y,r)||d(Z,r)){var i=z(n,r);return!i||!d(Y,r)||d(n,$)&&n[$][r]||(i.enumerable=!0),i}},pt=function(t){var e=K(b(t)),n=[];return F(e,(function(t){d(Y,t)||d(T,t)||n.push(t)})),n},ht=function(t){var e=t===B,n=K(e?Z:b(t)),r=[];return F(n,(function(t){!d(Y,t)||e&&!d(B,t)||r.push(Y[t])})),r};if(s||(H=function(){if(this instanceof H)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=C(t),n=function(t){this===B&&n.call(Z,t),d(this,$)&&d(this[$],e)&&(this[$][e]=!1),ot(this,e,y(1,t))};return c&&it&&ot(B,e,{configurable:!0,set:n}),at(e,t)},L(H[J],"toString",(function(){return q(this).tag})),L(H,"withoutSetter",(function(t){return at(C(t),t)})),j.f=dt,E.f=st,x.f=lt,S.f=O.f=pt,k.f=ht,A.f=function(t){return at(P(t),t)},c&&(Q(H[J],"description",{configurable:!0,get:function(){return q(this).description}}),a||L(B,"propertyIsEnumerable",dt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:H}),F(w(nt),(function(t){M(t)})),r({target:_,stat:!0,forced:!s},{for:function(t){var e=String(t);if(d(tt,e))return tt[e];var n=H(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(d(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!s,sham:!c},{create:ft,defineProperty:st,defineProperties:ut,getOwnPropertyDescriptor:lt}),r({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:pt,getOwnPropertySymbols:ht}),r({target:"Object",stat:!0,forced:f((function(){k.f(1)}))},{getOwnPropertySymbols:function(t){return k.f(g(t))}}),X){var gt=!s||f((function(){var t=H();return"[null]"!=X([t])||"{}"!=X({a:t})||"{}"!=X(Object(t))}));r({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(p(e)||void 0!==t)&&!ct(t))return l(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),i[1]=e,X.apply(null,i)}})}H[J][G]||D(H[J],G,H[J].valueOf),I(H,_),T[$]=!0},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},ae40:function(t,e,n){var r=n("83ab"),i=n("d039"),o=n("5135"),a=Object.defineProperty,c={},s=function(t){throw t};t.exports=function(t,e){if(o(c,t))return c[t];e||(e={});var n=[][t],u=!!o(e,"ACCESSORS")&&e.ACCESSORS,f=o(e,0)?e[0]:s,d=o(e,1)?e[1]:void 0;return c[t]=!!n&&!i((function(){if(u&&!r)return!0;var t={length:-1};u?a(t,1,{enumerable:!0,get:s}):t[1]=1,n.call(t,f,d)}))}},b727:function(t,e,n){var r=n("0366"),i=n("44ad"),o=n("7b0b"),a=n("50c4"),c=n("65f0"),s=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,f=4==t,d=6==t,l=7==t,p=5==t||d;return function(h,g,b,v){for(var y,m,w=o(h),S=i(w),O=r(g,b,3),k=a(S.length),x=0,E=v||c,j=e?E(h,k):n||l?E(h,0):void 0;k>x;x++)if((p||x in S)&&(y=S[x],m=O(y,x,w),t))if(e)j[x]=m;else if(m)switch(t){case 3:return!0;case 5:return y;case 6:return x;case 2:s.call(j,y)}else switch(t){case 4:return!1;case 7:s.call(j,y)}return d?-1:u||f?f:j}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},c740:function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").findIndex,o=n("44d2"),a=n("ae40"),c="findIndex",s=!0,u=a(c);c in[]&&Array(1)[c]((function(){s=!1})),r({target:"Array",proto:!0,forced:s||!u},{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o(c)},c975:function(t,e,n){"use strict";var r=n("23e7"),i=n("4d64").indexOf,o=n("a640"),a=n("ae40"),c=[].indexOf,s=!!c&&1/[1].indexOf(1,-0)<0,u=o("indexOf"),f=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:s||!u||!f},{indexOf:function(t){return s?c.apply(this,arguments)||0:i(this,t,arguments.length>1?arguments[1]:void 0)}})},d28b:function(t,e,n){var r=n("746f");r("iterator")},d81d:function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").map,o=n("1dde"),a=n("ae40"),c=o("map"),s=a("map");r({target:"Array",proto:!0,forced:!c||!s},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(t,e,n){var r=n("da84"),i=n("fdbc"),o=n("e260"),a=n("9112"),c=n("b622"),s=c("iterator"),u=c("toStringTag"),f=o.values;for(var d in i){var l=r[d],p=l&&l.prototype;if(p){if(p[s]!==f)try{a(p,s,f)}catch(g){p[s]=f}if(p[u]||a(p,u,d),i[d])for(var h in o)if(p[h]!==o[h])try{a(p,h,o[h])}catch(g){p[h]=o[h]}}}},e01a:function(t,e,n){"use strict";var r=n("23e7"),i=n("83ab"),o=n("da84"),a=n("5135"),c=n("861d"),s=n("9bf2").f,u=n("e893"),f=o.Symbol;if(i&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var d={},l=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof l?new f(t):void 0===t?f():f(t);return""===t&&(d[e]=!0),e};u(l,f);var p=l.prototype=f.prototype;p.constructor=l;var h=p.toString,g="Symbol(test)"==String(f("test")),b=/^Symbol\((.*)\)[^)]+$/;s(p,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=h.call(t);if(a(d,t))return"";var n=g?e.slice(7,-1):e.replace(b,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:l})}},e538:function(t,e,n){var r=n("b622");e.f=r},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=network.75dd872e.js.map