<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MapView from './MapView.vue'
import FloatButtons from './FloatButtons.vue'
import { bridgeAck, sendPlannerMessage, bridgeReady, bridgeSettings, bridgePreferences } from '../services/bridge'
import SettingsView from './SettingsView.vue'

const route = useRoute()
onMounted(() => {
  const initParam = route.query.init

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
    <SettingsView/>
  </div>
</template>

<style scoped>
</style>
