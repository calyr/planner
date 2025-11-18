<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue';
import { useBridgeStore } from '../stores/bridge'; 

const bridgeStore = useBridgeStore();


/**
 * Función central para procesar mensajes recibidos de la aplicación nativa.
 * @param envelope El objeto o string del mensaje recibido.
 */
const handleReceivedMessage = (envelope: any) => {
    try {
        console.log("MENSAJE DE KMP2", envelope);
        const msg = typeof envelope === 'string' ? JSON.parse(envelope) : envelope;
        
        console.log("← RECEIVED (Native)", msg);
        bridgeStore.processNativeMessage(msg);

    } catch (error) {
        console.error("Error al procesar mensaje nativo:", error);
    }
};

let androidListener: ((evt: MessageEvent) => void) | null = null;
let iosBridgeDispatch: ((envelope: any) => void) | null = null;

const initializeNativeListeners = () => {
    console.log("Initializing Native Bridge Listeners...");

    // 1. **iOS Bridge Dispatch**
    // La función que la app nativa (iOS) llama directamente en el `window`.
    iosBridgeDispatch = (envelope: any) => {
        handleReceivedMessage(envelope);
    };
    (window as any).__bridgeDispatch = iosBridgeDispatch;
    
    // 2. **Android Event Listener**
    // El listener para el evento "message" usado por Android.
    androidListener = (evt: MessageEvent) => {
        // Asegúrate de filtrar mensajes irrelevantes si es necesario
        handleReceivedMessage(evt.data);
    };
    window.addEventListener("message", androidListener);
    
    console.log("Native Bridge Listeners ready.");
};


const cleanupNativeListeners = () => {
    console.log("Cleaning up Native Bridge Listeners...");
    
    if (androidListener) {
        window.removeEventListener("message", androidListener);
        androidListener = null;
    }

    if ((window as any).__bridgeDispatch === iosBridgeDispatch) {
        (window as any).__bridgeDispatch = undefined;
        iosBridgeDispatch = null;
    }
};


onMounted(() => {
    nextTick(() => {
        initializeNativeListeners();
    });
});

onUnmounted(() => {
    cleanupNativeListeners();
});
</script>

<template>
</template>