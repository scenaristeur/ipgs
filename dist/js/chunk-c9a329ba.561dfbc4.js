(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c9a329ba"],{1276:function(t,e,n){"use strict";var r=n("d784"),i=n("44e7"),a=n("825a"),c=n("1d80"),o=n("4840"),u=n("8aa5"),l=n("50c4"),s=n("14c3"),p=n("9263"),f=n("d039"),h=[].push,d=Math.min,g=4294967295,v=!f((function(){return!RegExp(g,"y")}));r("split",2,(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(c(this)),a=void 0===n?g:n>>>0;if(0===a)return[];if(void 0===t)return[r];if(!i(t))return e.call(r,t,a);var o,u,l,s=[],f=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,v=new RegExp(t.source,f+"g");while(o=p.call(v,r)){if(u=v.lastIndex,u>d&&(s.push(r.slice(d,o.index)),o.length>1&&o.index<r.length&&h.apply(s,o.slice(1)),l=o[0].length,d=u,s.length>=a))break;v.lastIndex===o.index&&v.lastIndex++}return d===r.length?!l&&v.test("")||s.push(""):s.push(r.slice(d)),s.length>a?s.slice(0,a):s}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=c(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,i,n):r.call(String(i),e,n)},function(t,i){var c=n(r,t,this,i,r!==e);if(c.done)return c.value;var p=a(t),f=String(this),h=o(p,RegExp),x=p.unicode,m=(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.unicode?"u":"")+(v?"y":"g"),b=new h(v?p:"^(?:"+p.source+")",m),y=void 0===i?g:i>>>0;if(0===y)return[];if(0===f.length)return null===s(b,f)?[f]:[];var E=0,w=0,I=[];while(w<f.length){b.lastIndex=v?w:0;var R,k=s(b,v?f:f.slice(w));if(null===k||(R=d(l(b.lastIndex+(v?0:w)),f.length))===E)w=u(f,w,x);else{if(I.push(f.slice(E,w)),I.length===y)return I;for(var _=1;_<=k.length-1;_++)if(I.push(k[_]),I.length===y)return I;w=E=R}}return I.push(f.slice(E)),I}]}),!v)},"14c3":function(t,e,n){var r=n("c6b6"),i=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var a=n.call(t,e);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"159b":function(t,e,n){var r=n("da84"),i=n("fdbc"),a=n("17c2"),c=n("9112");for(var o in i){var u=r[o],l=u&&u.prototype;if(l&&l.forEach!==a)try{c(l,"forEach",a)}catch(s){l.forEach=a}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,i=n("a640"),a=i("forEach");t.exports=a?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"2ca0":function(t,e,n){"use strict";var r=n("23e7"),i=n("06cf").f,a=n("50c4"),c=n("5a34"),o=n("1d80"),u=n("ab13"),l=n("c430"),s="".startsWith,p=Math.min,f=u("startsWith"),h=!l&&!f&&!!function(){var t=i(String.prototype,"startsWith");return t&&!t.writable}();r({target:"String",proto:!0,forced:!h&&!f},{startsWith:function(t){var e=String(o(this));c(t);var n=a(p(arguments.length>1?arguments[1]:void 0,e.length)),r=String(t);return s?s.call(e,r,n):e.slice(n,n+r.length)===r}})},"44e7":function(t,e,n){var r=n("861d"),i=n("c6b6"),a=n("b622"),c=a("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[c])?!!e:"RegExp"==i(t))}},"5a34":function(t,e,n){var r=n("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("ad6d"),i=n("9f7f"),a=RegExp.prototype.exec,c=String.prototype.replace,o=a,u=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),l=i.UNSUPPORTED_Y||i.BROKEN_CARET,s=void 0!==/()??/.exec("")[1],p=u||s||l;p&&(o=function(t){var e,n,i,o,p=this,f=l&&p.sticky,h=r.call(p),d=p.source,g=0,v=t;return f&&(h=h.replace("y",""),-1===h.indexOf("g")&&(h+="g"),v=String(t).slice(p.lastIndex),p.lastIndex>0&&(!p.multiline||p.multiline&&"\n"!==t[p.lastIndex-1])&&(d="(?: "+d+")",v=" "+v,g++),n=new RegExp("^(?:"+d+")",h)),s&&(n=new RegExp("^"+d+"$(?!\\s)",h)),u&&(e=p.lastIndex),i=a.call(f?n:p,v),f?i?(i.input=i.input.slice(g),i[0]=i[0].slice(g),i.index=p.lastIndex,p.lastIndex+=i[0].length):p.lastIndex=0:u&&i&&(p.lastIndex=p.global?i.index+i[0].length:e),s&&i&&i.length>1&&c.call(i[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(i[o]=void 0)})),i}),t.exports=o},"9f7f":function(t,e,n){"use strict";var r=n("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},ab13:function(t,e,n){var r=n("b622"),i=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[i]=!1,"/./"[t](e)}catch(r){}}return!1}},ac1f:function(t,e,n){"use strict";var r=n("23e7"),i=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},c52d:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-form-input",{attrs:{id:"input",autofocus:"",title:"type three words followed by a comma",placeholder:"/h + Enter for help"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter(e)}},model:{value:t.main_input,callback:function(e){t.main_input=e},expression:"main_input"}})],1)},i=[],a=(n("498a"),n("fb6a"),n("1276"),n("ac1f"),n("159b"),n("2ca0"),n("8a79"),n("2b3d"),n("d3b7"),n("3ca3"),n("ddb0"),{name:"CommandInput",data:function(){return{main_input:"",commandHistory:[]}},methods:{onEnter:function(){console.log(this.main_input);var t=this.main_input.trim();if(t.length>0){var e=this.getInputType(t);console.log("inputObject",e),this.$store.commit("ipgs/setInputObject",e),this.main_input=e.inputNew}},getInputType:function(t){var e={};if(this.isValidUrl(t))e.type="url",e.value=t,e.isFile=this.isFile(t);else{var n=t.charAt(0),r="";switch(n){case"/":e.type="commande",e.value=t,e.inputNew="";break;case".":r=this.commandHistory[this.commandHistory.length-1],e.inputNew=r.s+" "+r.p+" "+r.o;break;case";":r=this.commandHistory[this.commandHistory.length-1],e.inputNew=r.s+" "+r.p+" ";break;case",":r=this.commandHistory[this.commandHistory.length-1],e.inputNew=r.s+" ";break;default:e=this.traiteTriplet(t),this.catchTriplet(e)}}return e},traiteTriplet:function(t){var e={},n="",r=t.slice(-1),i=t.slice(0,-1).split(" "),a=!0,c="",o=[];switch(i.forEach((function(t){t=t.trim(),t.startsWith('"')?(c="debut",o.push(t.substr(1))):t.endsWith('"')?(c="fin",o.push(o.pop()+" "+t.slice(0,-1))):"debut"==c?o.push(o.pop()+" "+t):o.push(t)})),o.length>0&&(i=o),r){case".":n="";break;case";":n=i[0].indexOf(" ")>-1?'"'+i[0]+'" ':i[0]+" ";break;case",":n=i[0].indexOf(" ")>-1?'"'+i[0]+'" ':i[0]+" ",i[1].indexOf(" ")>-1?n+='"'+i[1]+'" ':n+=i[1]+" ";break;case"-":n=i[2].indexOf(" ")>-1?'"'+i[2]+'" ':i[2]+" ";break;default:console.log("message to chat "+t),n="",a=!1}if(a){e.type="triplet";var u={};u.subject=i[0],u.predicate=i[1],u.object=i[2],e.value=u,e.inputNew=n}else e.type="message",e.value=t,e.inputNew=n;return e},catchTriplet:function(t){console.log(t)},updateInput:function(t){document.getElementById("input").value=t||""},isFile:function(t){return t.split("/").pop().indexOf(".")>-1},isValidUrl:function(t){try{return new URL(t),!0}catch(e){return!1}}},watch:{commandInput:function(){console.log(this.commandInput),this.main_input=this.commandInput}},computed:{commandInput:{get:function(){return this.$store.state.ipgs.commandInput},set:function(){}}}}),c=a,o=n("2877"),u=Object(o["a"])(c,r,i,!1,null,null,null);e["default"]=u.exports},d784:function(t,e,n){"use strict";n("ac1f");var r=n("6eeb"),i=n("d039"),a=n("b622"),c=n("9263"),o=n("9112"),u=a("species"),l=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),s=function(){return"$0"==="a".replace(/./,"$0")}(),p=a("replace"),f=function(){return!!/./[p]&&""===/./[p]("a","$0")}(),h=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,p){var d=a(t),g=!i((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),v=g&&!i((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[d]=/./[d]),n.exec=function(){return e=!0,null},n[d](""),!e}));if(!g||!v||"replace"===t&&(!l||!s||f)||"split"===t&&!h){var x=/./[d],m=n(d,""[t],(function(t,e,n,r,i){return e.exec===c?g&&!i?{done:!0,value:x.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:s,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),b=m[0],y=m[1];r(String.prototype,t,b),r(RegExp.prototype,d,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)})}p&&o(RegExp.prototype[d],"sham",!0)}}}]);
//# sourceMappingURL=chunk-c9a329ba.561dfbc4.js.map