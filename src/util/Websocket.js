
export default class Websocket {
  constructor(url, callback){
    this.url = url
    this.callback = callback
    console.log(this.url)
    this.test(this.url)
  }

  test(url){
    let module = this
    var websocket = "wss://"+url.split('/')[2];
    let socket = new WebSocket(websocket, ['solid.0.1.0']);
    //  var socket = new WebSocket('wss://ipgs.solidcommunity.net/', ['solid-0.1']);
    //  var socket = new WebSocket('wss://solidweb.org');

    console.log(socket)
    socket.onopen = function() {
      console.log("socket open")
      this.send('sub '+url);
      console.log("socket sub to "+url)
    };
    socket.onmessage = function(msg) {
      //  console.log("message",msg)
      if (msg.data && msg.data.slice(0, 3) === 'pub') {
        //  console.log(msg)
        console.log(msg.data)
        module.newMessage(msg.data.split('pub ')[1])
        // resource updated, refetch resource
      }
    };
  }

  newMessage(url){
    console.log("NEW MESSAGE", url)
    this.callback(url)
    //this.store.commit('ipgs/setWebsocketMesssage', url)
  }



}
