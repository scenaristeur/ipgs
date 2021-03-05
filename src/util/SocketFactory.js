import store from '../store'

export default class Network {
  constructor(){
    this.sockets = []
    this.messages = []
  }

  add(url){
    let module = this
    var websocket = "wss://"+url.split('/')[2];
    let socket = new WebSocket(websocket);
    this.sockets.push(socket)
    socket.onopen = function() {
      //      var now = d.toLocaleTimeString(app.lang)
      this.send('sub '+url);
      console.log("subscribe to INBOX",websocket, url)
      //  app.agent.send('Messages',  {action:"info", info: now+"[souscription] "+url});
    }

    socket.onmessage = function(msg) {
      module.onMessage(msg)
    }
    return this.sockets
  }

  onMessage(msg){

    console.log(msg)
    if (msg.data && msg.data.slice(0, 3) === 'pub') {
      //  app.notification("nouveau message Socialid")
      //app.openLongChat()
      console.log(msg.data)
      store.commit('ipgs/addSocketMessages', msg.data)
      //  getMessages()
      //app.todayMessages()
      //  app.agent.send("Flux", {action: "websocketMessage", url : url})
    }

  }
}
