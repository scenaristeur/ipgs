(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2107ec"],{b7ab:function(e,t,l){"use strict";l.r(t);var o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("b-modal",{attrs:{id:"node-popup",title:"Node","no-close-on-backdrop":"","content-class":"shadow"},on:{ok:e.addNodeModal}},[l("b-input-group",{attrs:{size:"sm",prepend:"Label"}},[l("b-form-input",{attrs:{autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addNodeModal(t)}},model:{value:e.value.label,callback:function(t){e.$set(e.value,"label",t)},expression:"value.label"}})],1),l("b-form-select",{staticClass:"mt-3",attrs:{options:e.node_types,size:"sm"},model:{value:e.value.node_type,callback:function(t){e.$set(e.value,"node_type",t)},expression:"value.node_type"}}),l("b-collapse",{attrs:{id:"collapse-node-id"}},[l("b-card",[l("b-input-group",{attrs:{size:"sm",prepend:"Id"}},[l("b-form-input",{model:{value:e.value.id,callback:function(t){e.$set(e.value,"id",t)},expression:"value.id"}})],1)],1)],1),l("b-collapse",{attrs:{id:"collapse-node-shape"}},[l("b-card",[l("b-input-group",{attrs:{size:"sm",prepend:"shape"}},[l("b-form-input",{model:{value:e.value.id,callback:function(t){e.$set(e.value,"id",t)},expression:"value.id"}})],1)],1)],1),l("b-collapse",{attrs:{id:"collapse-node-expert"}},[l("b-input-group",{attrs:{size:"sm",prepend:"expert"}},[l("b-form-input",{model:{value:e.value.id,callback:function(t){e.$set(e.value,"id",t)},expression:"value.id"}})],1)],1)],1)},a=[],n={name:"NodeModal",props:["value"],mounted:function(){console.log(this.value),void 0==this.value.node_type&&(this.value.node_type="default")},data:function(){return{node_type:"default",node_types:[{value:null,text:"Please select some item"},{value:"default",text:"Default"},{value:"folder",text:"Folder"},{value:"file",text:"File"},{value:"actor",text:"Actor"},{value:"remote",text:"Remote"}]}},methods:{addNodeModal:function(){console.log(this.value),this.$emit("ok",this.value),this.$bvModal.hide("node-popup")}}},s=n,u=l("2877"),d=Object(u["a"])(s,o,a,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d2107ec.c2ea4488.js.map