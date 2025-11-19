<script setup lang="ts">
import { computed } from 'vue';
import { useBridgeStore } from '../stores/bridge';
import { storeToRefs } from 'pinia';

const bridgeStore = useBridgeStore();

const { settings, preferences } = storeToRefs(bridgeStore);

const currentTheme = bridgeStore.currentTheme;

const isLoading = computed(() => {  
    return !settings.value;
})
</script>

<template>
    <div class="settings-container">
        <h2>Ajustes Recibidos del Nativo</h2>
        <div v-if="isLoading" class="loading-message">
            Cargando ajustes del Bridge... ⏳
        </div>

        <div v-else class="settings-content">
            <h3>Configuración de Apariencia (Settings)</h3>
            <div class="setting-item">
                <strong>Tema:</strong> 
                <span class="value">{{ settings?.theme }}</span>
            </div>
            <div class="setting-item">
                <strong>Idioma:</strong> 
                <span class="value">{{ settings?.language }}</span>
            </div>

            <div class="setting-item highlight">
                <strong>Tema Actual (Getter):</strong> 
                <span class="value">{{ currentTheme }}</span>
            </div>

            <hr>

            <h3>Preferencias de Usuario</h3>
            <div class="setting-item">
                <strong>Notificaciones:</strong> 
                <span class="value">{{ preferences?.notificationsEnabled ? 'Activadas ✅' : 'Desactivadas ❌' }}</span>
            </div>
            <div class="setting-item">
                <strong>Estilo de Mapa:</strong> 
                <span class="value">{{ preferences?.mapStyle }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings-container {
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    max-width: 400px;
    margin: 20px auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.setting-item {
    margin-bottom: 10px;
    padding: 8px;
    background-color: white;
    border-left: 4px solid #42b883;
    display: flex;
    justify-content: space-between;
}
.value {
    font-weight: 600;
    color: #35495e;
}
.loading-message {
    text-align: center;
    color: #ff9800;
}
.highlight {
    background-color: #e0f7fa;
}
hr {
    margin: 15px 0;
}
</style>