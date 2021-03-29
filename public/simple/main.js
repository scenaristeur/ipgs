import Source from './modules/Source.js'



let source
let graphs = []
let network = []
let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", "type", "title", "color", "image"]
document.getElementById("url_input").value = "https://data.virtual-assembly.org/users/"
document.getElementById("load_btn").addEventListener("click", function() {
  load()
});
document.getElementById("all_btn").addEventListener("click", function() {
  loadAll()
});


// create a network
const vis = window.vis
var container = document.getElementById("mynetwork");
var options= {
  nodes: {
    //  shape: "dot",
    scaling: {
      min: 10,
      max: 30,
    },
    font: {
      size: 12,
      face: "Tahoma",
    },
  },
  edges: {
    arrows: 'to',
    width: 0.15,
    color: { inherit: "from" },
    font: {
      align: 'top'
    },
    smooth: {
      type: "continuous",
    },
  },
  physics: {
    stabilization: false,
    barnesHut: {
      gravitationalConstant: -10000, //-8000, //-8000
      springConstant: 0.05, //0.001 //0.01 //0.03
      springLength: 50, //200
    },
  },
  interaction: {
    navigationButtons: true,
    tooltipDelay: 200,
    hideEdgesOnDrag: true,
  },
}


async function asyncCall() {
  document.getElementById("result").innerHTML = JSON.stringify("LOADING") + new Date() +"<hr>"
  let g = await source.load()
  document.getElementById("result").innerHTML = JSON.stringify("LOADED") + new Date() + "<hr>" +  document.getElementById("result").innerHTML
  await process(g)

  // expected output: "resolved"
}

function load(){
  let url = document.getElementById("url_input").value
  let s = {name: "Semapps users", url: url}
  let sources = []
  sources.push(s)
  source = new Source(sources)

  asyncCall();
}

function loadAll(){
  let sources = [
    {name: "users", url:"https://data.virtual-assembly.org/users/"},
    {name: "organizations", url:"https://data.virtual-assembly.org/organizations/"},
    {name: "skills", url:"https://data.virtual-assembly.org/skills/"},
    {name: "projects", url:"https://data.virtual-assembly.org/projects/"},
    {name: "themes", url:"https://data.virtual-assembly.org/themes/"}
  ]
  source = new Source(sources)

  asyncCall();
}



async function process(g){
  graphs = g
  console.log("GRAPHS",graphs)
  //network = graphs[0]
  network = {nodes: [], edges: []}
  for await (let g of graphs){
    Array.prototype.push.apply(network.nodes, g.nodes);
    Array.prototype.push.apply(network.edges, g.edges);
  }


  for await (let n of network.nodes) {
    if(n.built == undefined){
      await buildEdges(n)
    }
  }
  document.getElementById("result").innerHTML = document.getElementById("result").innerHTML +JSON.stringify(network, undefined, 2)
  document.getElementById("result").innerHTML = JSON.stringify("EDGES BUILD, DONE") + new Date() + "<hr>" +  document.getElementById("result").innerHTML

  console.log("done", network)


  var data = {
    nodes: network.nodes,
    edges: network.edges,
  };

  var networkVis = new vis.Network(container, data, options);
  console.log(networkVis)

}


//
// var nodes = new vis.DataSet([
//    { id: 1, label: "Node 1" },
//    { id: 2, label: "Node 2" },
//    { id: 3, label: "Node 3" },
//    { id: 4, label: "Node 4" },
//    { id: 5, label: "Node 5" },
//  ]);
//
//  // create an array with edges
//  var edges = new vis.DataSet([
//    { from: 1, to: 3 },
//    { from: 1, to: 2 },
//    { from: 2, to: 4 },
//    { from: 2, to: 5 },
//    { from: 3, to: 3 },
//  ]);
//




async function  buildEdges(n){
  for (const [k, v] of Object.entries(n)) {
    await parse(n,k,v)
  }
  n.built = true
}

async function parse(n, k, v){
  //  let network = this.network
  if (typeof v == "string"){
    v = v.trim()
    let edgeLength = undefined
    if(!omitted.includes(k) && v.length > 0){
      var indexO = network.nodes.findIndex(x => x.id==v);
      if(indexO === -1){
        let ob =   {id: v, shape: "box", mass: 1}
        if (v.length > 20 ){
          ob.label = v.substring(0,20)+".."
          ob.title = v
        }
        else{
          ob.label = v
        }

        if (v.startsWith('http')){
          ob.color = "#7FD1B9"
          if (v.length > 50 ){
            let lab = v.endsWith('/') ? v.slice(0, -1) : v
            ob.label = lab.substr(lab.lastIndexOf('/') + 1);
            ob.label = ob.label.length > 20 ? ob.label.substring(0,20)+".." : ob.label
            ob.label = "->"+ob.label
            ob.title = v

          }else{
            ob.label = v
          }
        }else{
          ob.color = "#ECC046"
          edgeLength = 1
          ob.mass = 1
        }
        if( k == "type"){
          ob.shape = "star"
          ob.color= "#DE6E4B"
        }


        ob.built = true
        network.nodes.push(ob)
      }else{
        network.nodes[indexO].mass == undefined ? network.nodes[indexO].mass=1 : network.nodes[indexO].mass+=3
      }
      let o = network.nodes.find(n => n.id == v)
      o.mass+= 3
      // if( k == "type"){
      //   // must do this test a second time after the node has been added to get network.nodes.length ????
      //   edgeLength = 1000
      // }
      let edge = {from: n.id, to: o.id, label: k }
      if (edgeLength != undefined){
        edge.length = edgeLength
        //edge.strength = 300
      }
      network.edges.push(edge)

    }else{
      k == "pair:label" ? n.label = v : ""
      k == "label" ? n.label = v : ""
      k == "name" ? n.label = v : ""
      if(k ==  "image"){
        n.shape = "circularImage"
        n.image = v
      }
      if(k ==  "depiction"){
        n.shape = "circularImage"
        n.image = v
      }

    }
  }else if (Array.isArray(v)){
    //console.log(v)
    v.forEach((_v) => {
      parse(n,k,_v)
    });


  } else{
    if(!omitted.includes(k) && typeof v == "object"){

      var indexOBJ = network.nodes.findIndex(x => x.id==v.id);
      if(indexOBJ === -1){
        console.log("ADDING",n.id, typeof v,k, v)
        network.nodes.push(v)


      }
      network.edges.push({from: n.id, to: v.id, label: k})
      console.log("ADDING edge",n.id, k, v.id)
    }
    else  if(!omitted.includes(k) && typeof v == "number"){
      console.log("TODO",n.id, typeof v,k, v)
      //  this.parse(n, k, v)
    }
    else
    {
      console.log("TODO",n.id, typeof v,k, v)
    }

  }
}
