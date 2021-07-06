//let ldflex = window.solid

const state = () => ({
  //  sources: [],
  spinner: 0,
  graphs: [],

  /////////////////////////////////////
  inputObject: null,
  commands : {'/i': 'import', '/h': 'help', '/n': 'newGraph', '/e': 'export', '/c': 'capture' },
  commandInput: "",
  history: [],
  action: null,
  editorContent: {},
  dataToSave: {},
  socketMessageUrl: "gr",
  newGraph: {},
  currentItem: {},
  edgeFilter: {},
  hiddenEdges : []
  // graphs: [],
  // currentGraphId: null,
  // network: {
  //   nodes: [],
  //   edges: [],
  //   options: {
  //     locale: navigator.language,
  //     nodes: {
  //       color: {
  //         //  border: 'grey',
  //         background: '#D2E5FF',
  //         border: '#2B7CE9',
  //
  //         highlight: {
  //           border: 'black',
  //           background: 'white'
  //         },
  //         hover: {
  //           border: 'orange',
  //           background: 'grey'
  //         }
  //       },
  //       font:{color:'black'},
  //       shapeProperties: {
  //         useBorderWithImage:true
  //       }
  //     },
  //     edges: {
  //       arrows: 'to',
  //       //  color: 'lightgray'
  //     },
  //     interaction: {
  //       navigationButtons: true,
  //     }
  //   },
  // },

  //  command: ""
  //  storage: null
})

// getters
const getters = {}

// actions
const actions = {
  // async setWebId(context, webId){
  //   context.commit('setWebId',webId)
  //   if (webId != null){
  //     let storage = `${await ldflex.data[webId].storage}`
  //     context.commit('setStorage', storage)
  //   //  console.log("rootstate",context.rootState.ldp_store)
  // //    context.commit('ldp_store/setServer', {name: webId+' storage', url: storage}, { root: true })
  //   //  context.rootState.ldp_store.commit('setServer', {name: webId+' storage', url: storage})
  //   }else{
  //     context.commit('setStorage', null)
  //   //  context.commit('ldp_store/setServer', {name: 'Localhost', url: 'http://localhost:3000'}, { root: true })
  //
  //   }
  //   //   let groups = []
  //   //   console.log("TODO: remplacer par solid-client-js peut-il eviter les nombreux appels ?")
  //   //   for await (const group of ldflex.data[webId]['http://www.w3.org/ns/org#memberOf']){
  //   //     //  console.log(`${group}`)
  //   //     let g = {url:`${group}`, name: await ldflex.data[`${group}`].vcard$fn}
  //   //     groups.push(g)
  //   //     context.commit('setGroups',groups)
  //   //   }
  //   //
  //   // }
  // }
}

// mutations
const mutations = {
  setAction(state, a){
    console.log(a)
    state.action = a
  },
  setWebsocketMesssage(state, url){
    console.log("message in store", url)
    state.socketMessageUrl = url
  },
  setNewGraph(state, g){
    state.newGraph = g
  },
  setCurrentItem(state, i){
    console.log(i)
    state.currentItem = i
  },
  setInputObject(state, io){
    console.log(io)
    if (io.type == 'commande'){
      // switch (io.value) {
      //   case '/i':
      //     state.command = {action: 'import'}
      //     break;
      //   default:
      //
      // }
      state.action = {action: state.commands[io.value]}
      console.log(state.action)
      if(state.action.action == undefined){
        alert("Warning : Unknown action "+ io.value + " , type /h for help" )
      }
    }else{
      state.inputObject = io
    }

  },
  setCommandInput(state, text){
    console.log(text)
    text = text.trim()
    state.commandInput = text.indexOf(' ') >= 0 ? '"'+text+'" ' : text+" "
  },
  addToHistory(state, node){
    const updatedHistory = state.history.filter(item => item.id !== node.id);
    updatedHistory.push(node)
    state.history = updatedHistory
  },
  setEditorContent(state, c){
    console.log(c)
    state.editorContent = c
  },
  setNetwork(state, n){
    console.log(n)
    state.network = n
  },
  setDataToSave(state, d){
    console.log(d)
    state.dataToSave = d
  },
  spinnerAdd(state){
    console.log("spinnerAdd", new Date())
    state.spinner++
  },
  spinnerRemove(state){
    console.log("spinnerRemove", new Date())
    state.spinner--
  },
  spinnerInit(state){
    state.spinner = 0
  },
  setGraphs(state, graphs){
    state.graphs = graphs
  },
  setEdgeFilter(state, f){
    state.edgeFilter = f
  },
  setHiddenEdges(state, he){
    state.hiddenEdges = he
  }


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
