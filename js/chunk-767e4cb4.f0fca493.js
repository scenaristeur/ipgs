(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-767e4cb4","chunk-749e9e5f"],{"6d61":function(e,t,n){"use strict";var r=n("23e7"),a=n("da84"),c=n("94ca"),i=n("6eeb"),o=n("f183"),u=n("2266"),s=n("19aa"),f=n("861d"),l=n("d039"),d=n("1c7e"),p=n("d44e"),b=n("71560");e.exports=function(e,t,n){var h=-1!==e.indexOf("Map"),v=-1!==e.indexOf("Weak"),w=h?"set":"add",x=a[e],g=x&&x.prototype,m=x,k={},y=function(e){var t=g[e];i(g,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(v&&!f(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return v&&!f(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return!(v&&!f(e))&&t.call(this,0===e?0:e)}:function(e,n){return t.call(this,0===e?0:e,n),this})},E=c(e,"function"!=typeof x||!(v||g.forEach&&!l((function(){(new x).entries().next()}))));if(E)m=n.getConstructor(t,e,h,w),o.REQUIRED=!0;else if(c(e,!0)){var O=new m,R=O[w](v?{}:-0,1)!=O,j=l((function(){O.has(1)})),D=d((function(e){new x(e)})),I=!v&&l((function(){var e=new x,t=5;while(t--)e[w](t,t);return!e.has(-0)}));D||(m=t((function(t,n){s(t,m,e);var r=b(new x,t,m);return void 0!=n&&u(n,r[w],{that:r,AS_ENTRIES:h}),r})),m.prototype=g,g.constructor=m),(j||I)&&(y("delete"),y("has"),h&&y("get")),(I||R)&&y(w),v&&g.clear&&delete g.clear}return k[e]=m,r({global:!0,forced:m!=x},k),p(m,e),v||n.setStrong(m,e,h),m}},71560:function(e,t,n){var r=n("861d"),a=n("d2bb");e.exports=function(e,t,n){var c,i;return a&&"function"==typeof(c=t.constructor)&&c!==n&&r(i=c.prototype)&&i!==n.prototype&&a(e,i),e}},bb2f:function(e,t,n){var r=n("d039");e.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},dd8f:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-button",{attrs:{to:{path:"/agora"},size:"sm",variant:"dark"}},[e._v(e._s(e.nb))])],1)},a=[],c=n("1da1"),i=n("668b"),o=(n("96cf"),n("fb6a"),n("6655")),u=n.n(o),s="https://ipgs.solidcommunity.net/public/activity/",f={name:"Notification",data:function(){return{log:s+"log.ttl",nb:0}},created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.updateNb(),n=e,r=new WebSocket("wss://ipgs.solidcommunity.net/",["solid-0.1"]),r.onopen=function(){this.send("sub "+n.log)},r.onmessage=function(e){e.data&&"pub"===e.data.slice(0,3)&&n.updateNb()};case 5:case"end":return t.stop()}}),t)})))()},methods:{updateNb:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r,a,c,o,s,f,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=0,r=[],t.next=4,u.a.clearCache();case 4:a=!0,c=!1,t.prev=6,s=Object(i["a"])(u.a[e.log]["https://www.dublincore.org/specifications/dublin-core/dcmi-terms/hasPart"]);case 8:return t.next=10,s.next();case 10:return f=t.sent,a=f.done,t.next=14,f.value;case 14:if(l=t.sent,a){t.next=22;break}d=l,r.push("".concat(d)),n++;case 19:a=!0,t.next=8;break;case 22:t.next=28;break;case 24:t.prev=24,t.t0=t["catch"](6),c=!0,o=t.t0;case 28:if(t.prev=28,t.prev=29,a||null==s.return){t.next=33;break}return t.next=33,s.return();case 33:if(t.prev=33,!c){t.next=36;break}throw o;case 36:return t.finish(33);case 37:return t.finish(28);case 38:e.nb=n;case 39:case"end":return t.stop()}}),t,null,[[6,24,28,38],[29,,33,37]])})))()}}},l=f,d=n("2877"),p=Object(d["a"])(l,r,a,!1,null,null,null);t["default"]=p.exports},e439:function(e,t,n){var r=n("23e7"),a=n("d039"),c=n("fc6a"),i=n("06cf").f,o=n("83ab"),u=a((function(){i(1)})),s=!o||u;r({target:"Object",stat:!0,forced:s,sham:!o},{getOwnPropertyDescriptor:function(e,t){return i(c(e),t)}})},f183:function(e,t,n){var r=n("d012"),a=n("861d"),c=n("5135"),i=n("9bf2").f,o=n("90e3"),u=n("bb2f"),s=o("meta"),f=0,l=Object.isExtensible||function(){return!0},d=function(e){i(e,s,{value:{objectID:"O"+ ++f,weakData:{}}})},p=function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!c(e,s)){if(!l(e))return"F";if(!t)return"E";d(e)}return e[s].objectID},b=function(e,t){if(!c(e,s)){if(!l(e))return!0;if(!t)return!1;d(e)}return e[s].weakData},h=function(e){return u&&v.REQUIRED&&l(e)&&!c(e,s)&&d(e),e},v=e.exports={REQUIRED:!1,fastKey:p,getWeakData:b,onFreeze:h};r[s]=!0}}]);
//# sourceMappingURL=chunk-767e4cb4.f0fca493.js.map