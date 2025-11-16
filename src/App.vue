<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import MapView from './components/MapView.vue';
import FloatButtons from './components/FloatButtons.vue';

function onMapReady(mapApi: any) {
  console.log('Ready to use map', mapApi)
}
</script>

<template>
   <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> 
  <MapView/>
  <FloatButtons/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
