(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d215ca0"],{c063:function(e,n,o){"use strict";o.r(n);var t=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("NodeModal",{attrs:{node:e.node},on:{ok:e.saveNode}}),o("EdgeModal",{attrs:{edge:e.edge},on:{ok:e.saveEdge}}),o("ImportModal"),o("ExportModal"),o("PropertiesPopup")],1)},d=[],s=(o("d3b7"),o("3ca3"),o("ddb0"),o("c740"),o("7db0"),{name:"NetworkPopups",props:["network"],components:{NodeModal:function(){return o.e("chunk-dc510af6").then(o.bind(null,"b7ab"))},EdgeModal:function(){return o.e("chunk-2d0cc5ba").then(o.bind(null,"4e1d"))},ImportModal:function(){return o.e("chunk-2d22d037").then(o.bind(null,"f64e"))},ExportModal:function(){return Promise.all([o.e("chunk-1f47cca5"),o.e("chunk-2d21d8af")]).then(o.bind(null,"d26a"))},PropertiesPopup:function(){return o.e("chunk-180affe4").then(o.bind(null,"9e7a"))}},data:function(){return{node:{label:"",color:{background:"#D2E5FF",border:"#2B7CE9"},shape:"ellipse",props:[]},edge:{},n:null}},created:function(){this.n=this.network},computed:{action:{get:function(){return this.$store.state.ipgs.action},set:function(){}}},methods:{saveNode:function(e){var n=this.network.nodes.findIndex((function(n){return n.id==e.id}));-1===n?this.n.nodes.push(e):Object.assign(this.network.nodes[n],e)},saveEdge:function(e){console.log(e);var n=this.network.edges.findIndex((function(n){return n.id==e.id}));-1===n?this.n.edges.push(e):Object.assign(this.network.edges[n],e)}},watch:{action:function(){var e=this;switch(this.action.action){case"editNode":this.node=this.network.nodes.find((function(n){return n.id==e.action.node.id}))||this.action.node,console.log("props",this.node.props),this.$bvModal.show("node-popup");break;case"editEdge":this.edge=this.network.edges.find((function(n){return n.id==e.action.edge.id}))||this.action.edge,console.log("props",this.edge.props),this.$bvModal.show("edge-popup");break;case"import":this.$bvModal.show("import-popup");break;case"export":this.$store.commit("ipgs/setEditorContent",{content:{nodes:this.network.nodes,edges:this.network.edges},format:"json"}),this.$bvModal.show("export-popup");break;default:}}}}),i=s,r=o("2877"),a=Object(r["a"])(i,t,d,!1,null,null,null);n["default"]=a.exports}}]);
//# sourceMappingURL=chunk-2d215ca0.2b7c3057.js.map