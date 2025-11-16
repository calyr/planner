import type { PlannerMessageModel, MessageType } from "./types";
import { PlannerAction } from "./plannerActions";
import { v4 as uuid } from "uuid";

export function sendPlannerMessage(
  type: MessageType,
  action: keyof typeof PlannerAction,
  payload: Record<string, any> = {}
) {
  const message: PlannerMessageModel = {
    schema: "tmobnfc-bridge",
    version: 1,
    type,
    action: PlannerAction[action], // convert enum key → actionName string
    id: uuid(),
    payload
  };

  sendToNative(message);
}

function sendToNative(message: PlannerMessageModel) {
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
