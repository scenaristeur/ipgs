(function(e){function n(n){for(var r,o,c=n[0],i=n[1],s=n[2],l=0,d=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(n);while(d.length)d.shift()();return u.push.apply(u,s||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,o=1;o<t.length;o++){var c=t[o];0!==a[c]&&(r=!1)}r&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},a={app:0},u=[];function c(e){return i.p+"js/"+({about:"about","browser~network":"browser~network",browser:"browser",network:"network"}[e]||e)+"."+{about:"09c70fa7","chunk-2d0a3369":"89afb4b2","browser~network":"b97d14f2",browser:"f77a9bf7",network:"4bd01eb9","chunk-2d226c5a":"49644029","chunk-bdccffe8":"4de1ffda","chunk-2d207f75":"24f827eb","chunk-2d0cc5ba":"77f44372","chunk-2d2107ec":"5e5c6ae9","chunk-08004dc9":"6aed2c59"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={network:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var r="css/"+({about:"about","browser~network":"browser~network",browser:"browser",network:"network"}[e]||e)+"."+{about:"31d6cfe0","chunk-2d0a3369":"31d6cfe0","browser~network":"31d6cfe0",browser:"31d6cfe0",network:"b68fb52e","chunk-2d226c5a":"31d6cfe0","chunk-bdccffe8":"31d6cfe0","chunk-2d207f75":"31d6cfe0","chunk-2d0cc5ba":"31d6cfe0","chunk-2d2107ec":"31d6cfe0","chunk-08004dc9":"31d6cfe0"}[e]+".css",a=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var s=u[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return n()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){s=d[c],l=s.getAttribute("data-href");if(l===r||l===a)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],f.parentNode.removeChild(f),t(u)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)n.push(r[2]);else{var u=new Promise((function(n,t){r=a[e]=[n,t]}));n.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var d=new Error;s=function(n){l.onerror=l.onload=null,clearTimeout(f);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,t[1](d)}a[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/ipgs/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var d=0;d<s.length;d++)n(s[d]);var f=l;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";t("85ec")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("Navbar",{attrs:{size:"sm"}}),null==e.webId?t("p",[e._v(" To browse your POD or save graphs, please login with your WebId "),t("SolidLoginButton")],1):e._e(),t("transition",{attrs:{name:"slide"}},[t("router-view")],1),t("SolidTrackSession")],1)},a=[],u=(t("d3b7"),t("2f62")),c={name:"App",components:{Navbar:function(){return t.e("chunk-2d207f75").then(t.bind(null,"a37d"))},SolidTrackSession:function(){return Promise.all([t.e("chunk-2d0a3369"),t.e("chunk-bdccffe8")]).then(t.bind(null,"c1a7"))},SolidLoginButton:function(){return Promise.all([t.e("chunk-2d0a3369"),t.e("chunk-2d226c5a")]).then(t.bind(null,"e9a1"))}},created:function(){void 0!=this.$route.query.url&&(this.url=this.$route.query.url,this.$router.push({name:"Network",query:{url:this.url}}))},methods:{onCommand:function(e){console.log(e)}},computed:Object(u["b"])({webId:function(e){return e.solid.webId}})},i=c,s=(t("034f"),t("2877")),l=Object(s["a"])(i,o,a,!1,null,null,null),d=l.exports,f=t("9483");Object(f["a"])("".concat("/ipgs/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh."),alert("New content is available; please close the app & reopen.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var p=t("8c4f"),b=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("NetworkView")],1)},h=[],w={name:"Home",components:{NetworkView:function(){return Promise.all([t.e("chunk-2d0a3369"),t.e("browser~network"),t.e("network")]).then(t.bind(null,"8475"))}}},m=w,g=Object(s["a"])(m,b,h,!1,null,null,null),k=g.exports;r["default"].use(p["a"]);var v=[{path:"/",name:"Home",component:k},{path:"/about",name:"About",component:function(){return t.e("about").then(t.bind(null,"f820"))}},{path:"/browser",name:"Browser",component:function(){return Promise.all([t.e("chunk-2d0a3369"),t.e("browser~network"),t.e("browser")]).then(t.bind(null,"d9ad"))}},{path:"/network",name:"Network",component:function(){return Promise.all([t.e("chunk-2d0a3369"),t.e("browser~network"),t.e("network")]).then(t.bind(null,"8475"))}}],y=new p["a"]({mode:"history",base:"/ipgs/",routes:v}),O=y,j=(t("99af"),t("96cf"),t("1da1")),S=window.solid,N=function(){return{webId:null,storage:null}},P={},_={setWebId:function(e,n){return Object(j["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.commit("setWebId",n),null==n){t.next=10;break}return t.t0="",t.next=5,S.data[n].storage;case 5:t.t1=t.sent,r=t.t0.concat.call(t.t0,t.t1),e.commit("setStorage",r),t.next=11;break;case 10:e.commit("setStorage",null);case 11:case"end":return t.stop()}}),t)})))()}},x={setWebId:function(e,n){console.log(n),e.webId=n},setStorage:function(e,n){console.log(n),e.storage=n}},E={namespaced:!0,state:N,getters:P,actions:_,mutations:x},A=function(){return{inputObject:null}},I={},T={},C={setInputObject:function(e,n){console.log(n),e.inputObject=n}},B={namespaced:!0,state:A,getters:I,actions:T,mutations:C};r["default"].use(u["a"]);var L=new u["a"].Store({state:{},mutations:{},actions:{},modules:{solid:E,ipgs:B}}),q=t("5f5b"),$=t("b1e0"),M=(t("f9e3"),t("2dd8"),t("63f8"),t("b329")),W=(t("4e46"),t("8cf7")),D=t.n(W);r["default"].use(q["a"]),r["default"].use($["a"]),r["default"].component("network",M["Network"]),r["default"].use(D.a),r["default"].config.productionTip=!1,new r["default"]({router:O,store:L,render:function(e){return e(d)}}).$mount("#app")},"85ec":function(e,n,t){}});
//# sourceMappingURL=app.d52f22af.js.map