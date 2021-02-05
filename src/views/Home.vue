<template>
  <div class="home">


    <NetworkView />
    <!-- <Upload /> -->
    <!-- <HelloWorld msg="Welcome to Portfolio WebApp based on Solid Specifications"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    'NetworkView': () => import('@/views/NetworkView'),
  },
}
</script>
