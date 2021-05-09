<template>
  <div class="flotingbox">
    <div id="outerContainer">
      <div id="container" ref="container">
        <GraphsList />
        <div id="item" ref="item">

        </div>
      </div>
    </div>
    <vue-window-modal  :active="graphsPanelShow"  title="Client 1"  v-on:clickClose="visibleFormCrudUpdate(false)">
    FOO TEXT ON DEFAULT SLOT :DDDDD 1
</vue-window-modal>
    <b-button @click="toggleGraphsPanel">Toogle Graphs Panel</b-button>
  </div>
</template>

<script>
// SEE https://vuejsexamples.com/windows-like-modal-component-for-vue-js/
//https://www.kirupa.com/html5/drag.htm





var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;



export default {
  name: 'Graphs',
  components: {
    'GraphsList': () => import('@/components/graphs/GraphsList'),
    // 'VueWindowModal': () => import('vue-window-modal')

  },
  data(){
    return {
      dragItem  : null
    }
  },
  mounted(){
    this.dragItem = this.$refs.item
    this.container = this.$refs.container

  },
  methods: {
    toggleGraphsPanel(){
      this.$store.commit('ipgs/toggleGraphsPanel')
    },
    dragStart(e) {

      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === this.dragItem) {
        active = true;
      }
    },

    dragEnd() {
      initialX = currentX;
      initialY = currentY;

      active = false;
    },

    drag(e) {
      if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        this.setTranslate(currentX, currentY, this.dragItem);
      }
    },

    setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
  },
  watch:{
    graphsPanelShow(){

      if (this.graphsPanelShow== true){

        this.container.style.display = "block"
        this.container.addEventListener("touchstart", this.dragStart, false);
        this.container.addEventListener("touchend", this.dragEnd, false);
        this.container.addEventListener("touchmove", this.drag, false);

        this.container.addEventListener("mousedown", this.dragStart, false);
        this.container.addEventListener("mouseup", this.dragEnd, false);
        this.container.addEventListener("mousemove", this.drag, false);
      }else{
        this.container.style.display = "none"
      }
    }
  },
  computed: {
    graphsPanelShow: {
      get () { return this.$store.state.ipgs.graphsPanelShow},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>
#container {
  width: 100%;
  height: 400px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 7px;
  touch-action: none;
}
#item {
  width: 100px;
  height: 100px;
  background-color: rgb(245, 230, 99);
  border: 10px solid rgba(136, 136, 136, .5);
  border-radius: 50%;
  touch-action: none;
  user-select: none;
}
#item:active {
  background-color: rgba(168, 218, 220, 1.00);
}
#item:hover {
  cursor: pointer;
  border-width: 20px;
}
</style>
