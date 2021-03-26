export default {

methods: {
  onSelectNode(p){
    console.log(p)
    console.log(p.nodes[0])
    //console.log(this.nodes)
    let node = this.network.nodes.find(x => x.id==p.nodes[0]);
    console.log(node)
    this.$store.commit('ipgs/addToHistory', node)
    //  if(node.type == 'folder' || node.type == 'file'){
    try{
      if(node.id.startsWith('http')){
        this.load(node.id)
      }else{
        this.$store.commit('ipgs/setCommandInput', node.label+' ')
      }
    }catch(e){
      alert(e)
    }
  },

}
}
