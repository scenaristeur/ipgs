(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-325a11ea"],{1276:function(t,e,n){"use strict";var i=n("d784"),r=n("44e7"),a=n("825a"),c=n("1d80"),u=n("4840"),o=n("8aa5"),l=n("50c4"),s=n("14c3"),p=n("9263"),d=n("d039"),f=[].push,h=Math.min,g=4294967295,v=!d((function(){return!RegExp(g,"y")}));i("split",2,(function(t,e,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var i=String(c(this)),a=void 0===n?g:n>>>0;if(0===a)return[];if(void 0===t)return[i];if(!r(t))return e.call(i,t,a);var u,o,l,s=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,v=new RegExp(t.source,d+"g");while(u=p.call(v,i)){if(o=v.lastIndex,o>h&&(s.push(i.slice(h,u.index)),u.length>1&&u.index<i.length&&f.apply(s,u.slice(1)),l=u[0].length,h=o,s.length>=a))break;v.lastIndex===u.index&&v.lastIndex++}return h===i.length?!l&&v.test("")||s.push(""):s.push(i.slice(h)),s.length>a?s.slice(0,a):s}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var r=c(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,r,n):i.call(String(r),e,n)},function(t,r){var c=n(i,t,this,r,i!==e);if(c.done)return c.value;var p=a(t),d=String(this),f=u(p,RegExp),m=p.unicode,x=(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.unicode?"u":"")+(v?"y":"g"),b=new f(v?p:"^(?:"+p.source+")",x),y=void 0===r?g:r>>>0;if(0===y)return[];if(0===d.length)return null===s(b,d)?[d]:[];var E=0,w=0,I=[];while(w<d.length){b.lastIndex=v?w:0;var k,R=s(b,v?d:d.slice(w));if(null===R||(k=h(l(b.lastIndex+(v?0:w)),d.length))===E)w=o(d,w,m);else{if(I.push(d.slice(E,w)),I.length===y)return I;for(var _=1;_<=R.length-1;_++)if(I.push(R[_]),I.length===y)return I;w=E=k}}return I.push(d.slice(E)),I}]}),!v)},"14c3":function(t,e,n){var i=n("c6b6"),r=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var a=n.call(t,e);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==i(t))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"2ca0":function(t,e,n){"use strict";var i=n("23e7"),r=n("06cf").f,a=n("50c4"),c=n("5a34"),u=n("1d80"),o=n("ab13"),l=n("c430"),s="".startsWith,p=Math.min,d=o("startsWith"),f=!l&&!d&&!!function(){var t=r(String.prototype,"startsWith");return t&&!t.writable}();i({target:"String",proto:!0,forced:!f&&!d},{startsWith:function(t){var e=String(u(this));c(t);var n=a(p(arguments.length>1?arguments[1]:void 0,e.length)),i=String(t);return s?s.call(e,i,n):e.slice(n,n+i.length)===i}})},"44e7":function(t,e,n){var i=n("861d"),r=n("c6b6"),a=n("b622"),c=a("match");t.exports=function(t){var e;return i(t)&&(void 0!==(e=t[c])?!!e:"RegExp"==r(t))}},"8a79":function(t,e,n){"use strict";var i=n("23e7"),r=n("06cf").f,a=n("50c4"),c=n("5a34"),u=n("1d80"),o=n("ab13"),l=n("c430"),s="".endsWith,p=Math.min,d=o("endsWith"),f=!l&&!d&&!!function(){var t=r(String.prototype,"endsWith");return t&&!t.writable}();i({target:"String",proto:!0,forced:!f&&!d},{endsWith:function(t){var e=String(u(this));c(t);var n=arguments.length>1?arguments[1]:void 0,i=a(e.length),r=void 0===n?i:p(a(n),i),o=String(t);return s?s.call(e,o,r):e.slice(r-o.length,r)===o}})},"8aa5":function(t,e,n){"use strict";var i=n("6547").charAt;t.exports=function(t,e,n){return e+(n?i(t,e).length:1)}},9263:function(t,e,n){"use strict";var i=n("ad6d"),r=n("9f7f"),a=RegExp.prototype.exec,c=String.prototype.replace,u=a,o=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),l=r.UNSUPPORTED_Y||r.BROKEN_CARET,s=void 0!==/()??/.exec("")[1],p=o||s||l;p&&(u=function(t){var e,n,r,u,p=this,d=l&&p.sticky,f=i.call(p),h=p.source,g=0,v=t;return d&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),v=String(t).slice(p.lastIndex),p.lastIndex>0&&(!p.multiline||p.multiline&&"\n"!==t[p.lastIndex-1])&&(h="(?: "+h+")",v=" "+v,g++),n=new RegExp("^(?:"+h+")",f)),s&&(n=new RegExp("^"+h+"$(?!\\s)",f)),o&&(e=p.lastIndex),r=a.call(d?n:p,v),d?r?(r.input=r.input.slice(g),r[0]=r[0].slice(g),r.index=p.lastIndex,p.lastIndex+=r[0].length):p.lastIndex=0:o&&r&&(p.lastIndex=p.global?r.index+r[0].length:e),s&&r&&r.length>1&&c.call(r[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(r[u]=void 0)})),r}),t.exports=u},"9f7f":function(t,e,n){"use strict";var i=n("d039");function r(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=i((function(){var t=r("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=i((function(){var t=r("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},ac1f:function(t,e,n){"use strict";var i=n("23e7"),r=n("9263");i({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},ad6d:function(t,e,n){"use strict";var i=n("825a");t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},c52d:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-input-group",{scopedSlots:t._u([{key:"append",fn:function(){return[n("NetworkToolBar")]},proxy:!0}])},[n("b-form-input",{attrs:{id:"input",autofocus:"",title:"type three words followed by a comma",placeholder:"/h + Enter for help"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter(e)}},model:{value:t.main_input,callback:function(e){t.main_input=e},expression:"main_input"}})],1)},r=[],a=(n("d3b7"),n("3ca3"),n("ddb0"),n("498a"),n("fb6a"),n("1276"),n("ac1f"),n("159b"),n("2ca0"),n("8a79"),n("2b3d"),{name:"CommandInput",components:{NetworkToolBar:function(){return n.e("chunk-4060d866").then(n.bind(null,"2647"))}},data:function(){return{main_input:"",commandHistory:[]}},methods:{onEnter:function(){console.log(this.main_input);var t=this.main_input.trim();if(t.length>0){var e=this.getInputType(t);console.log("inputObject",e),this.$store.commit("ipgs/setInputObject",e),this.main_input=e.inputNew}},getInputType:function(t){var e={};if(this.isValidUrl(t))e.type="url",e.value=t,e.isFile=this.isFile(t);else{var n=t.charAt(0),i="";switch(n){case"/":e.type="commande",e.value=t,e.inputNew="";break;case".":i=this.commandHistory[this.commandHistory.length-1],e.inputNew=i.s+" "+i.p+" "+i.o;break;case";":i=this.commandHistory[this.commandHistory.length-1],e.inputNew=i.s+" "+i.p+" ";break;case",":i=this.commandHistory[this.commandHistory.length-1],e.inputNew=i.s+" ";break;default:e=this.traiteTriplet(t),this.catchTriplet(e)}}return e},traiteTriplet:function(t){var e={},n="",i=t.slice(-1),r=t.slice(0,-1).split(" "),a=!0,c="",u=[];switch(r.forEach((function(t){t=t.trim(),t.startsWith('"')?(c="debut",u.push(t.substr(1))):t.endsWith('"')?(c="fin",u.push(u.pop()+" "+t.slice(0,-1))):"debut"==c?u.push(u.pop()+" "+t):u.push(t)})),u.length>0&&(r=u),i){case".":n="";break;case";":n=r[0].indexOf(" ")>-1?'"'+r[0]+'" ':r[0]+" ";break;case",":n=r[0].indexOf(" ")>-1?'"'+r[0]+'" ':r[0]+" ",r[1].indexOf(" ")>-1?n+='"'+r[1]+'" ':n+=r[1]+" ";break;case"-":n=r[2].indexOf(" ")>-1?'"'+r[2]+'" ':r[2]+" ";break;default:console.log("message to chat "+t),n="",a=!1}if(a){e.type="triplet";var o={};o.subject=r[0],o.predicate=r[1],o.object=r[2],e.value=o,e.inputNew=n}else e.type="message",e.value=t,e.inputNew=n;return e},catchTriplet:function(t){console.log(t)},updateInput:function(t){document.getElementById("input").value=t||""},isFile:function(t){return t.split("/").pop().indexOf(".")>-1},isValidUrl:function(t){try{return new URL(t),!0}catch(e){return!1}}},watch:{commandInput:function(){console.log(this.commandInput),this.main_input=this.commandInput}},computed:{commandInput:{get:function(){return this.$store.state.ipgs.commandInput},set:function(){}}}}),c=a,u=n("2877"),o=Object(u["a"])(c,i,r,!1,null,null,null);e["default"]=o.exports},d784:function(t,e,n){"use strict";n("ac1f");var i=n("6eeb"),r=n("d039"),a=n("b622"),c=n("9263"),u=n("9112"),o=a("species"),l=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),s=function(){return"$0"==="a".replace(/./,"$0")}(),p=a("replace"),d=function(){return!!/./[p]&&""===/./[p]("a","$0")}(),f=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,p){var h=a(t),g=!r((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),v=g&&!r((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[o]=function(){return n},n.flags="",n[h]=/./[h]),n.exec=function(){return e=!0,null},n[h](""),!e}));if(!g||!v||"replace"===t&&(!l||!s||d)||"split"===t&&!f){var m=/./[h],x=n(h,""[t],(function(t,e,n,i,r){return e.exec===c?g&&!r?{done:!0,value:m.call(e,n,i)}:{done:!0,value:t.call(n,e,i)}:{done:!1}}),{REPLACE_KEEPS_$0:s,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),b=x[0],y=x[1];i(String.prototype,t,b),i(RegExp.prototype,h,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)})}p&&u(RegExp.prototype[h],"sham",!0)}}}]);
//# sourceMappingURL=chunk-325a11ea.78410bec.js.map