export default {
  methods: {
    nodeFromLabel(label) {
      return {id: "#"+label.trim().split(' ').join('_'),
      label: label,
      color: {  background: '#D2E5FF', border: '#2B7CE9'},
      shape: 'ellipse'}
    },
    edgeFromLabel(data){
      return { from: data.from, to: data.to, label: data.label}
    }
  }
}
