(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ipfs"],{"007b":function(e,t,n){"use strict";n("1133")},1133:function(e,t,n){},"25f0":function(e,t,n){"use strict";var r=n("e330"),s=n("5e77").PROPER,a=n("6eeb"),c=n("825a"),i=n("3a9b"),o=n("577e"),u=n("d039"),f=n("ad6d"),l="toString",d=RegExp.prototype,p=d[l],g=r(f),v=u((function(){return"/a/b"!=p.call({source:"a",flags:"b"})})),b=s&&p.name!=l;(v||b)&&a(RegExp.prototype,l,(function(){var e=c(this),t=o(e.source),n=e.flags,r=o(void 0===n&&i(d,e)&&!("flags"in d)?g(e):n);return"/"+t+"/"+r}),{unsafe:!0})},c405:function(e,t,n){e.exports=n.p+"img/ipfs-logo.764c7678.svg"},e9c4:function(e,t,n){var r=n("23e7"),s=n("da84"),a=n("d066"),c=n("2ba4"),i=n("e330"),o=n("d039"),u=s.Array,f=a("JSON","stringify"),l=i(/./.exec),d=i("".charAt),p=i("".charCodeAt),g=i("".replace),v=i(1..toString),b=/[\uD800-\uDFFF]/g,x=/^[\uD800-\uDBFF]$/,h=/^[\uDC00-\uDFFF]$/,m=function(e,t,n){var r=d(n,t-1),s=d(n,t+1);return l(x,e)&&!l(h,s)||l(h,e)&&!l(x,r)?"\\u"+v(p(e,0),16):e},k=o((function(){return'"\\udf06\\ud834"'!==f("\udf06\ud834")||'"\\udead"'!==f("\udead")}));f&&r({target:"JSON",stat:!0,forced:k},{stringify:function(e,t,n){for(var r=0,s=arguments.length,a=u(s);r<s;r++)a[r]=arguments[r];var i=c(f,null,a);return"string"==typeof i?g(i,b,m):i}})},eff4:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-container",[r("div",{staticClass:"ipfs-info"},[r("img",{staticClass:"ipfs-logo",attrs:{alt:"IPFS logo",src:n("c405")}}),r("h5",[e._v(e._s(e.status))]),r("h6",[e._v("ID: "+e._s(e.id))]),r("h6",[e._v("Agent version: "+e._s(e.agentVersion))]),r("b-input",{attrs:{placeholder:"text"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),r("b-button",{on:{click:e.sendToIpfs}},[e._v("Send")]),e._v(" Cid : "+e._s(e.cid)+" "),r("b-button",{on:{click:e.readFromIpfs}},[e._v("Read")]),r("b-textarea",{attrs:{cols:"10",rows:"10"},model:{value:e.restit,callback:function(t){e.restit=t},expression:"restit"}}),r("hr"),e._v(" example of cid json.string : QmZPhUqJQJ1UbnyPqXTENxMjPWjfgJ5ULyfKSgFS5AzuQ3 "),r("hr"),e._v(" new vis js graph : QmVCeXk6HKeSzvbyYTYARWqVm4x1DYHUDgLdSKTd4ajEA4 "),r("hr"),e._v(" basic vis graph : Qmb69aSsNwiboGpoY2gbndaSGd64UGwUvsEkz5MbfKyoEv "),r("hr"),e._v(" see it on https://ipfs.io/ipfs/QmZPhUqJQJ1UbnyPqXTENxMjPWjfgJ5ULyfKSgFS5AzuQ3 ")],1),r("hr"),e._v(" File "),r("b-button",{on:{click:e.addToFile}},[e._v("Add to file")])],1)},s=[],a=n("1da1"),c=n("668b"),i=(n("d3b7"),n("25f0"),n("e9c4"),n("96cf"),n("a828")),o={name:"Ipfs",data:function(){return{status:"Connecting to IPFS...",id:"",agentVersion:"",text:"",cid:"QmZPhUqJQJ1UbnyPqXTENxMjPWjfgJ5ULyfKSgFS5AzuQ3",restit:""}},mounted:function(){this.getIpfsNodeInfo()},methods:{getIpfsNodeInfo:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$ipfs;case 3:return e.ipfs=t.sent,t.next=6,e.ipfs.id();case 6:n=t.sent,r=n.agentVersion,s=n.id,e.agentVersion=r,e.id=s,e.status="Connected to IPFS =)",t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](0),e.status="Error: ".concat(t.t0);case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))()},sendToIpfs:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e.ipfs),n=e.text,t.next=4,e.ipfs.add(n);case 4:return r=t.sent,console.log("res",r),t.t0=console,t.next=9,r.cid;case 9:t.t1=t.sent,t.t0.log.call(t.t0,t.t1),e.cid=r.cid;case 12:case"end":return t.stop()}}),t)})))()},readFromIpfs:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r,s,a,i,o,u,f;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ipfs.cat(e.cid);case 2:n=t.sent,r="",s=!1,a=!1,t.prev=6,o=Object(c["a"])(n);case 8:return t.next=10,o.next();case 10:if(!(s=!(u=t.sent).done)){t.next=16;break}f=u.value,r+=f.toString();case 13:s=!1,t.next=8;break;case 16:t.next=22;break;case 18:t.prev=18,t.t0=t["catch"](6),a=!0,i=t.t0;case 22:if(t.prev=22,t.prev=23,!s||null==o.return){t.next=27;break}return t.next=27,o.return();case 27:if(t.prev=27,!a){t.next=30;break}throw i;case 30:return t.finish(27);case 31:return t.finish(22);case 32:e.restit=r,console.log(r);case 34:case"end":return t.stop()}}),t,null,[[6,18,22,32],[23,,27,31]])})))()},addToFile:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r,s,a,o,u,f,l,d,p,g;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.stringify({foo:"bar",tic:"tac"}),t.next=3,e.ipfs.add(n);case 3:return r=t.sent,console.log("IPFS cid:",r),t.t0=console,t.next=8,e.ipfs.cat(r);case 8:return t.t1=t.sent,t.t0.log.call(t.t0,t.t1),t.next=12,e.ipfs.add({path:"vis_default.json",content:JSON.stringify({nodes:[{id:"1",label:"One"},{id:"2",label:"Two"}],edges:[{from:"1",to:"2",label:"A link"}]})});case 12:s=t.sent,console.log(s),console.log("Added file:",s.path,s.cid),a=[],o=!1,u=!1,t.prev=18,l=Object(c["a"])(e.ipfs.cat(s.cid));case 20:return t.next=22,l.next();case 22:if(!(o=!(d=t.sent).done)){t.next=28;break}p=d.value,a.push(p);case 25:o=!1,t.next=20;break;case 28:t.next=34;break;case 30:t.prev=30,t.t2=t["catch"](18),u=!0,f=t.t2;case 34:if(t.prev=34,t.prev=35,!o||null==l.return){t.next=39;break}return t.next=39,l.return();case 39:if(t.prev=39,!u){t.next=42;break}throw f;case 42:return t.finish(39);case 43:return t.finish(34);case 44:return console.log(a),console.log("Added file contents:",i(a).toString()),t.next=48,e.ipfs.cat(s.cid);case 48:g=t.sent,console.log(g);case 50:case"end":return t.stop()}}),t,null,[[18,30,34,44],[35,,39,43]])})))()}}},u=o,f=(n("007b"),n("2877")),l=Object(f["a"])(u,r,s,!1,null,"d88fb224",null);t["default"]=l.exports}}]);
//# sourceMappingURL=ipfs.58ad6823.js.map