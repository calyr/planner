import { MessageType, type PlannerMessageModel } from "./types";
import { PlannerAction } from "./plannerActions";
import { v4 as uuid } from "uuid";


export function bridgeAck() {
  const message: PlannerMessageModel = {
    schema: "tmobnfc-bridge",
    version: 1,
    type: MessageType.EVENT,
    action: PlannerAction.PROTOCOL_HANDSHAKE_ACK,
    payload: { protocolVersion: 1, plannerVersion: 'planner-v3.4.1' }
  };

  sendToNative(message);
}

export function bridgeSettings(
) {
  const message: PlannerMessageModel = {
    schema: "tmobnfc-bridge",
    version: 1,
    type: MessageType.REQUEST,
    action: PlannerAction.APPEARANCE_GET_SETTINGS, 
    payload: {}    
  };

  sendToNative(message);
}

export function bridgePreferences(
) {
  const message: PlannerMessageModel = {
    schema: "tmobnfc-bridge",
    version: 1,
    type: MessageType.REQUEST,
    action: PlannerAction.SETTINGS_GET_PREFERENCIES, 
    id: uuid(),
    payload: {}
  };

  sendToNative(message);
}

export function bridgeReady(
 
) {
  const message: PlannerMessageModel = {
    schema: "tmobnfc-bridge",
    version: 1,
    type: MessageType.EVENT,
    action: PlannerAction.PLANNER_READY, 
    payload: {
      "plannerVersion": "planner-v3.4.1"
    }
  };

  sendToNative(message);
}

export function sendPlannerMessage(
  type: MessageType,
  action: keyof typeof PlannerAction,
  payload: Record<string, any> = {}
) {
  const message: PlannerMessageModel = {
    schema: "tmobnfc-bridge",
    version: 1,
    type,
    action: PlannerAction[action], 
    id: uuid(),
    payload
  };

  sendToNative(message);
}

function sendToNative(message: PlannerMessageModel) {
  console.log(message.action, message)
  // iOS
  if ((window as any).webkit?.messageHandlers?.bridge) {
    (window as any).webkit.messageHandlers.bridge.postMessage(message);
    console.log("→ SENT (iOS)", message);
    return;
  }

  // Android
  if ((window as any).AndroidBridge?.postMessage) {
    (window as any).AndroidBridge.postMessage(JSON.stringify(message));
    console.log("→ SENT (Android)", message);
    return;
  }

  console.warn("No native bridge available");
}
