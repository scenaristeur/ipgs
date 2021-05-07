let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", /*"type",*/ "title", "color", "image"]


export async function buildEdges(g){
//  for await (const n of g.nodes){
    await g.nodes.forEach(async function(n) {
      console.log(n)
      for await (const [k, v] of await Object.entries(n)) {
        await parse(n,k,v, g)

      }
      // for await  (const [k, v] of await Object.entries(n)) {
      //   await parse(n,k,v, g)
      // }
    })
    return g
  }


  function parse(n, k, v, g){

    //  console.log(n, k, v, g)
    switch (typeof v) {
      case "string":
      v = v.trim()
      parseString(n,k,v, g)
      break;
      case "object1":
      parseObject(n,k,v, g)
      break;
      case "array1":
      parseArray(n,k,v, g)
      break;
      case "number1":
      parseNumber(n,k,v, g)
      break;
      default:
    //  console.log("TODO",n.id, typeof v,k, v)
    }

  }

  function parseString(n,k,v, g){
    let edgeLength = undefined
    if(!omitted.includes(k) && v.length > 0){
      var indexO = g.nodes.findIndex(x => x.id==v);
      if(indexO === -1){
        let ob = {id: v, shape: "box", mass: 1}
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
        g.nodes.push(ob)
      }else{
        g.nodes[indexO].mass == undefined ? g.nodes[indexO].mass=1 : g.nodes[indexO].mass++
      }
      let o = g.nodes.find(n => n.id == v)
      console.log("OOOO",o)
      o.mass++
      // if( k == "type"){
      //   // must do this test a second time after the node has been added to get network.nodes.length ????
      //   edgeLength = 1000
      // }
      let edge = {from: n.id, to: o.id, label: k }
      console.log("ee",edge)
      if (edgeLength != undefined){
        edge.length = edgeLength
        //edge.strength = 300
      }
      g.edges.push(edge)

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
      if(k == "publicKey"){
        delete n[k]
      }

    }
    debug('string',n,k,v, g)
  }
  function parseObject(n,k,v, g){
    v['@id'] != undefined ? v.id = v['@id'] : ''
    var indexOBJ = g.nodes.findIndex(x => x.id==v.id);
    if(indexOBJ === -1){
      console.log("ADDING",n.id, typeof v,k, v)
      g.nodes.push(v)


    }
    g.edges.push({from: n.id, to: v.id, label: k})
    console.log("ADDING edge",n.id, k, v.id, v)
    debug('object',n,k,v, g)
  }
  function parseArray(n,k,v, g){
    v.forEach((_v) => {
      parse(n,k,_v, g)
    });
    debug('array',n,k,v, g)
  }

  function parseNumber(n,k,v, g){
    console.log("TODO",n.id, typeof v,k, v, g)
  }



  // shortLabel(n){
  //   if (n.id.length > 50 ){
  //     console.warn("todo text must not be a id")
  //   }
  //   if (n.id.length > 20 ){
  //     n.label = n.id.substring(0,20)+".."
  //     n.title = n.id
  //   }
  //   else{
  //     n.label = n.id
  //   }
  //   return n
  // },

  function debug(p,n,k,v, g){
    console.warn(p,n,k,v, g)
  }
