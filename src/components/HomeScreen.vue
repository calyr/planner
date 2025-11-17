<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MapView from './MapView.vue'
import FloatButtons from './FloatButtons.vue'
import { bridgeAck, sendPlannerMessage, bridgeReady, bridgeSettings, bridgePreferences } from '../services/bridge'
// 🚀 Recibir parámetro init de la URL
const route = useRoute()
onMounted(() => {
  const initParam = route.query.init
  console.log("Valor de init:", initParam)

  if (initParam) {
    try {
      const decoded = atob(initParam as string)
      const json = JSON.parse(decoded)
      console.log("JSON decodificado:", json)
      iniciarApp()
    } catch (e) {
      console.error("Error decodificando init", e)
    }
  }

  
})

// Métodos a ejecutar en orden
function sendACK() {
        bridgeAck();
}

function getSettings() {
  bridgeSettings()
}

function getPreferences() {
  bridgePreferences()
}

function sendReady() {
  bridgeReady()
}

// Ejecutar todo en orden al iniciar la app
async function iniciarApp() {
  console.log("App iniciada")
  sendACK()
  getSettings()
  getPreferences()
  sendReady()
}

function onMapReady(mapApi: any) {
  console.log('Ready to use map', mapApi)
}
</script>

<template>
  <div>
    <MapView @ready="onMapReady" />
    <FloatButtons />
  </div>
</template>

<style scoped>
</style>
