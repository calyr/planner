export const PlannerAction = {
  PROTOCOL_HANDSHAKE_ACK: "protocol.handshake.ack",

  APPEARANCE_LANGUAGE_CHANGED: "appearance.languageChanged",
  APPEARANCE_THEME_CHANGED: "appearance.themeChanged",
  APPEARANCE_GET_SETTINGS: "appearance.getSettings",

  NAV_PLANNER_SHOWN: "nav.plannerShown",
  NAV_PLANNER_HIDDEN: "nav.plannerHidden",
  NAV_BACK_PRESSED: "nav.backPressed",
  NAV_CLOSE_PRESSED: "nav.closePressed",
  NAV_HAMBURGER_CLICKED: "nav.hamburgerClicked",
  NAV_FLOW_STARTED: "nav.flowStarted",
  NAV_FLOW_FINISHED: "nav.flowFinished",

  PLANNER_READY: "planner.ready",
  PLANNER_ERROR: "planner.error",
  PLANNER_RESTART: "planner.restartPlanner",
  PLANNER_MANAGE_FAVORITES: "planner.manageFavorites",
  PLANNER_LOAD_ROUTE: "planner.loadRoute",
  PLANNER_TRIP_PLANNED: "planner.tripPlanned",

  PSMP_GET_ACTION_LABEL: "psmp.getActionLabel",
  PSMP_PERFORM_ACTION: "psmp.performAction",

  SETTINGS_GET_PREFERENCIES: "settings.getPreferences",
  SETTINGS_SAVE_PREFERENCES: "settings.savePreferences",
  SETTINGS_GET_FAVORITES: "settings.getFavorites",
  SETTINGS_SAVE_FAVORITES: "settings.saveFavorites"
} as const;

export type PlannerActionType = keyof typeof PlannerAction;
