<script setup lang="ts">
import { sendPlannerMessage } from "../services/bridge";

function onPlannerReady() {
  sendPlannerMessage("EVENT", "PLANNER_READY", {
    info: "Planner is now visible on screen"
  });
}

function onLoadRoute() {
  sendPlannerMessage("REQUEST", "PLANNER_LOAD_ROUTE", {
    origin: "A",
    destination: "B"
  });
}
</script>

<template>
  <div> <!-- </div> class="floating-controls"> -->
    <button class="fab" @click="onPlannerReady">Planner Ready</button>
    <button class="fab" @click="onLoadRoute">Load Route</button>
  </div>
</template>

<!-- <script lang="ts" setup>
const onNavigate = () => {
  // aquí disparas la lógica para planificar ruta (ej: abrir modal, usar control directions)
  window.dispatchEvent(new CustomEvent('plan-route'))
}
const onClear = () => {
  window.dispatchEvent(new CustomEvent('clear-route'))
}
</script> -->

<style scoped>
.floating-controls {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  display:flex;
  gap:12px;
  z-index: 50;
}
.fab {
  background: white;
  border-radius: 28px;
  padding: 10px 16px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
  cursor:pointer;
  font-weight:600;
  color: black;
}
</style>