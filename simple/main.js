import Source from './modules/Source.js'



let source
let graphs = []
let network = []
let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", "type", "title", "color", "image"]
document.getElementById("url_input").value = "https://data.virtual-assembly.org/users/"
document.getElementById("load_btn").addEventListener("click", function() {
  load()
});


async function asyncCall() {
  document.getElementById("result").innerHTML = JSON.stringify("LOADING")
  let g = await source.load()
  document.getElementById("result").innerHTML = JSON.stringify("LOADED")
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



async function process(g){
  graphs = g
  console.log("GRAPHS",graphs)
  network = graphs[0]
  network.nodes.forEach(async function (n) {
    if(n.built == undefined){
      await buildEdges(n)
    }
  });

}


async function  buildEdges(n){
  for (const [k, v] of Object.entries(n)) {
    await parse(n,k,v)
  }
  n.built = true
  document.getElementById("result").innerHTML = JSON.stringify(network, undefined, 2)
}

async function parse(n, k, v){
  if (typeof v == "string"){
    v = v.trim()
    //    let network = this.network
    if(!omitted.includes(k) && v.length > 0){
      var indexO = network.nodes.findIndex(x => x.id==v);
      if(indexO === -1){
        let ob =   {id: v, shape: "box"}
        if (v.length > 50 ){
          ob.label = v.substring(0,50)+".."
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
            ob.title = v
          }else{
            ob.label = v
          }
        }else{
          ob.color = "#ECC046"
        }
        if( k == "type"){
          ob.shape = "star"
          ob.color= "#DE6E4B"
        }


        ob.built = true
        network.nodes.push(ob)
      }
      let o = network.nodes.find(n => n.id == v)
      let edge = {from: n.id, to: o.id, label: k}
      network.edges.push(edge)

    }else{
      k == "pair:label" ? n.label = v : ""
      k == "label" ? n.label = v : ""
      k == "name" ? n.label = v : ""
      if(k ==  "image"){
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
    if(!omitted.includes(k)){
      console.log("TODO",typeof v,k, v)
    }

  }
}
