(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16c0cd02","chunk-61ade157","chunk-749e9e5f"],{"057d":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-modal",{attrs:{id:"storage-modal",title:"Storage"}},[null==t.webId?n("SolidLoginButton"):n("div",[n("b-container",[n("b-input-group",{staticClass:"mt-3"},[n("b-form-input",{attrs:{placeholder:"New Graph Name"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.save(e)}},model:{value:t.new_graph_name,callback:function(e){t.new_graph_name=e},expression:"new_graph_name"}}),n("b-input-group-append",[n("b-button",{attrs:{variant:"info"},on:{click:t.save}},[t._v("create")])],1)],1),n("b-form-checkbox",{model:{value:t.publish,callback:function(e){t.publish=e},expression:"publish"}},[t._v(" publish To Agora ")]),null!=t.storage?n("b-list-group",{staticClass:"item list-group-item d-flex justify-content-between p-1"},["https://"!=t.folder.parent?n("b-list-group-item",{attrs:{variant:"dark",button:""},on:{click:function(e){return t.readParent(t.folder.parent)}}},[t._v(t._s(t.folder.parent))]):t._e(),t._l(t.folder.folders,(function(e){return n("b-list-group-item",{key:e.url,attrs:{button:""},on:{click:function(n){return t.read(e)}}},[n("div",{staticClass:"input-group",staticStyle:{display:"table",width:"100%"}},[n("b-button",{staticClass:"unstyled-button",attrs:{variant:"outline-warning"}},[n("b-icon-folder-fill")],1),t._v(" "+t._s(e.name)+" "),n("span",{staticStyle:{display:"table-cell",width:"40px"}},[n("b-button",{attrs:{size:"sm",variant:"outline-info"},on:{click:function(n){return n.stopPropagation(),t.see(e)}}},[n("b-icon-eye",{attrs:{variant:"info"},on:{click:function(n){return n.stopPropagation(),t.see(e)}}})],1)],1)],1)])})),t._l(t.folder.files,(function(e){return n("b-list-group-item",{key:e.url,staticClass:"item list-group-item d-flex justify-content-between",attrs:{variant:"light",button:""}},[n("p",{staticClass:"p-0 m-0 flex-grow-1"},[n("b-icon-file-text"),t._v(" "+t._s(e.name))],1)])}))],2):t._e()],1)],1)],1)},o=[],a=n("1da1"),i=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("ac1f"),n("1276"),n("00e8")),s=n.n(i),c=n("7fed"),u=n.n(c),l=n("d4ec"),d=n("bee2"),p=n("ec26"),f=n("6655"),h=n.n(f),b=n("9b92"),g=new u.a(s.a),m="https://ipgs.solidcommunity.net/public/activity/",w=m+"log.ttl",v=function(){function t(){Object(l["a"])(this,t),this.jsonld={"@context":"https://www.w3.org/ns/activitystreams","@type":"Create","@id":m+"data/"+Object(p["a"])()+".json",object:{id:"https://example.com/~mallory/note/72",type:"Note",attributedTo:"https://example.net/~mallory",content:"This is a note",published:"2015-02-10T15:04:55Z",to:["https://example.org/~john/"],cc:["https://example.com/~erik/followers","https://www.w3.org/ns/activitystreams#Public"]},published:new Date,to:["https://example.org/~john/"],cc:["https://example.com/~erik/followers","https://www.w3.org/ns/activitystreams#Public"]}}return Object(d["a"])(t,[{key:"publish",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(this.jsonld["@id"]),t.next=3,g.postFile(this.jsonld["@id"],JSON.stringify(this.jsonld),"application/json").then(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e),n=e.headers.get("location"),console.log("Activity send",n),t.next=5,h.a[w]["https://www.dublincore.org/specifications/dublin-core/dcmi-terms/hasPart"].add(Object(b["namedNode"])(n));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),t}(),y=new u.a(s.a),x={json:"application/json",jsonld:"application/ld+json",ttl:"text/turtle"},k={name:"StorageModal",components:{SolidLoginButton:function(){return n.e("chunk-2d226c5a").then(n.bind(null,"e9a1"))}},props:["network"],data:function(){return{folder:{folders:[],files:[]},url:"",new_graph_name:"",publish:!0}},created:function(){this.dataToSave=this.$store.state.ipgs.dataToSave,null!=this.storage&&this.read({url:this.storage,name:this.storage,type:"folder"})},methods:{save:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r,o,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.new_graph_name.length>0)){e.next=20;break}return console.log("dataToSave",t.dataToSave),n=t.url+t.new_graph_name+"."+t.dataToSave.format,r=t.dataToSave.content,"jsonld"==t.dataToSave.format&&(o=JSON.parse(t.dataToSave.content),console.log(o),o["@context"]["@base"]=n,o["@id"]=n,o.label=t.new_graph_name.split("/").pop(),o.creator={"@id":t.webId},r=JSON.stringify(o,void 0,2),console.log("new content",r)),a=x[t.dataToSave.format],console.log(a,r),e.next=9,y.itemExists(n);case 9:if(!e.sent){e.next=16;break}if(i=confirm(n+" already exists, do you want to replace it ?"),1!=i){e.next=14;break}return e.next=14,y.createFile(n,r,a).then((function(e){console.log(e);var o=e.headers.get("location");if(console.log(o),1==t.publish){var a=new v;a.jsonld.creator=t.webId,a.jsonld.object="ttl"==t.dataToSave.format?r:JSON.parse(r),console.log(a),a.publish()}t.$bvModal.hide("storage-modal"),t.$router.push({path:"network",query:{url:n}})})).catch((function(t){return alert("Error: ".concat(t))}));case 14:e.next=18;break;case 16:return e.next=18,y.createFile(n,r,a).then((function(e){console.log(e);var o=e.headers.get("location");if(console.log(o),1==t.publish){var a=new v;a.jsonld.creator=t.webId,a.jsonld.object="ttl"==t.dataToSave.format?r:JSON.parse(r),a.jsonld.object.url=n,console.log(a),a.publish()}t.$bvModal.hide("storage-modal"),t.$router.push({path:"network",query:{url:n}})})).catch((function(t){return alert("Error: ".concat(t))}));case 18:e.next=21;break;case 20:alert("If you want to create a Graph, you must provide a name !");case 21:case"end":return e.stop()}}),e)})))()},see:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.$router.push({path:"network",query:{url:t.url}});case 1:case"end":return n.stop()}}),n)})))()},read:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("folder"!=t.type){n.next=7;break}return e.url=t.url,n.next=4,y.readFolder(t.url);case 4:e.folder=n.sent,n.next=8;break;case 7:e.$router.push({path:"network",query:{url:t.url}});case 8:case"end":return n.stop()}}),n)})))()},readParent:function(t){this.read({url:t,name:t,type:"folder"})}},watch:{storage:function(){null!=this.storage&&this.read({url:this.storage,name:this.storage,type:"folder"})}},computed:{webId:{get:function(){return this.$store.state.solid.webId},set:function(){}},storage:{get:function(){return this.$store.state.solid.storage},set:function(){}},dataToSave:{get:function(){return this.$store.state.ipgs.dataToSave},set:function(){}}}},j=k,_=(n("558e"),n("2877")),S=Object(_["a"])(j,r,o,!1,null,null,null);e["default"]=S.exports},"558e":function(t,e,n){"use strict";n("eb4d")},"6d61":function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),a=n("94ca"),i=n("6eeb"),s=n("f183"),c=n("2266"),u=n("19aa"),l=n("861d"),d=n("d039"),p=n("1c7e"),f=n("d44e"),h=n("71560");t.exports=function(t,e,n){var b=-1!==t.indexOf("Map"),g=-1!==t.indexOf("Weak"),m=b?"set":"add",w=o[t],v=w&&w.prototype,y=w,x={},k=function(t){var e=v[t];i(v,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(g&&!l(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!l(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!l(t))&&e.call(this,0===t?0:t)}:function(t,n){return e.call(this,0===t?0:t,n),this})},j=a(t,"function"!=typeof w||!(g||v.forEach&&!d((function(){(new w).entries().next()}))));if(j)y=n.getConstructor(e,t,b,m),s.REQUIRED=!0;else if(a(t,!0)){var _=new y,S=_[m](g?{}:-0,1)!=_,O=d((function(){_.has(1)})),E=p((function(t){new w(t)})),T=!g&&d((function(){var t=new w,e=5;while(e--)t[m](e,e);return!t.has(-0)}));E||(y=e((function(e,n){u(e,y,t);var r=h(new w,e,y);return void 0!=n&&c(n,r[m],{that:r,AS_ENTRIES:b}),r})),y.prototype=v,v.constructor=y),(O||T)&&(k("delete"),k("has"),b&&k("get")),(T||S)&&k(m),g&&v.clear&&delete v.clear}return x[t]=y,r({global:!0,forced:y!=w},x),f(y,t),g||n.setStrong(y,t,b),y}},71560:function(t,e,n){var r=n("861d"),o=n("d2bb");t.exports=function(t,e,n){var a,i;return o&&"function"==typeof(a=e.constructor)&&a!==n&&r(i=a.prototype)&&i!==n.prototype&&o(t,i),t}},bb2f:function(t,e,n){var r=n("d039");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},eb4d:function(t,e,n){},f183:function(t,e,n){var r=n("d012"),o=n("861d"),a=n("5135"),i=n("9bf2").f,s=n("90e3"),c=n("bb2f"),u=s("meta"),l=0,d=Object.isExtensible||function(){return!0},p=function(t){i(t,u,{value:{objectID:"O"+ ++l,weakData:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,u)){if(!d(t))return"F";if(!e)return"E";p(t)}return t[u].objectID},h=function(t,e){if(!a(t,u)){if(!d(t))return!0;if(!e)return!1;p(t)}return t[u].weakData},b=function(t){return c&&g.REQUIRED&&d(t)&&!a(t,u)&&p(t),t},g=t.exports={REQUIRED:!1,fastKey:f,getWeakData:h,onFreeze:b};r[u]=!0}}]);
//# sourceMappingURL=chunk-16c0cd02.08ccb6d2.js.map