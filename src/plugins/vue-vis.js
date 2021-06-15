
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)
    // Vue.prototype.$login= async function(issuer) {
    //
    //
    // },
    /**
    * Extract given field from items array and return unique values in an array
    */
    Vue.prototype.$nodeSelected = function(v, evt){
      {
        if (evt.nodes.length == 1) {
          if (v.network.isCluster(evt.nodes[0]) == true) {
            v.network.openCluster(evt.nodes[0]);
          }else{
            let n_id = evt.nodes[0]
            //  input.value = n_id
            store.commit('vatch/setInput', n_id)
            console.log("input.value", n_id)
            let n = v.data.nodes.get(n_id);
            console.log("selected",n)

            if (n.type == 'file'){

              v.$socket.emit('read file', {path: n.id});
              n.shape = "ellipse"
              v.data.nodes.update(n)
            }else if (n.type == "folder"){
              n.shape = "box"
              v.data.nodes.update(n)
            }
          }
        }
      }
    }

    Vue.prototype.$clusterByGroup = function(network){
      // Determine all distinct group id's
      console.log("cluster", network)
      var groups = collectGroups(network.body.data);

      // Cluster per group
      for (var n in groups) {
        var group = groups[n];

        network.cluster({
          joinCondition: function(item) {
            return item.group == group;
          },
          clusterNodeProperties: {
            label: 'Group ' + group,
            borderWidth: 3,
            shape: "database",
            color: 'orange'
          }
        });
      }
    }

    function fieldFromItems(items, field) {
      var tmpHash = {};
      for (var n in items) {
        tmpHash[items[n][field]] = true;
      }
      return Object.keys(tmpHash);
    }

    function collectGroups(data) {
      var items = data.nodes.get({
        fields: ['group']
      });
      return fieldFromItems(items, 'group');
    }

  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
