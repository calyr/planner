// Importaciones necesarias de Pinia
import { defineStore } from 'pinia';
import { MessageType } from '../services/types'; // Asumiendo que MessageType está aquí
import { PlannerAction } from '../services/plannerActions'; // Tus acciones del bridge

interface Settings {
    theme: string; // 'light', 'dark'
    language: string; // 'es', 'en'
}

interface Preferences {
    notificationsEnabled: boolean;
    mapStyle: 'standard' | 'satellite';
}

interface BridgeState {
    isHandshakeComplete: boolean;
    settings: Settings | null;
    preferences: Preferences | null;
    lastReceivedMessage: any | null;
}

export const useBridgeStore = defineStore('bridge', {
    
    state: (): BridgeState => ({
        isHandshakeComplete: false,
        settings: null,
        preferences: null,
        lastReceivedMessage: null,
    }),

    getters: {
        currentTheme: (state) => state.settings?.theme || 'light',
    },

    actions: {

        processNativeMessage(message: any) {
            this.lastReceivedMessage = message; 
            if (message.type === MessageType.RESPONSE) {
                this.handleResponse(message);
            } else if (message.type === MessageType.EVENT) {
                this.handleEvent(message);
            } else {
                console.log("Not definied messageType", message.type)
            }
        },

        handleResponse(message: any) {
            switch (message.action) {
                case PlannerAction.APPEARANCE_GET_SETTINGS:
                    this.settings = message.payload as Settings;

                    break;
                
                case PlannerAction.SETTINGS_GET_PREFERENCIES:
                    this.preferences = message.payload as Preferences;
                    break;
                
                default:
                    console.log(`Bridge Store: Unhandled response action: ${message.action}`);
            }
        },

        
        handleEvent(message: any) {
            switch (message.action) {
                case PlannerAction.PROTOCOL_HANDSHAKE_ACK:
                    this.isHandshakeComplete = true;
                    break;
                
                case PlannerAction.PLANNER_READY:
                    console.log('Bridge Store: Native settings changed event received.');
                    break;

                default:
                    console.log(`Bridge Store: Unhandled event action: ${message.action}`);
            }
        }
    },
});