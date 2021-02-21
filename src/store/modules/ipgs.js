//let ldflex = window.solid

const state = () => ({
  inputObject: null,
  commandInput: "",
  history: [],
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
  setInputObject(state, io){
    console.log(io)
    state.inputObject = io
  },
  setCommandInput(state, text){
    console.log(text)
    text = text.trim()
    state.commandInput = text.indexOf(' ') >= 0 ? '"'+text+'" ' : text+" "
  },
  addToHistory(state, node){
    state.history.push(node)
  },
  // setCommand(state, command){
  //   console.log(command)
  //   state.command = command
  // }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
