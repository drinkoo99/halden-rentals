/**
 * Every Material Symbols icon the app renders. The stylesheet asks Google Fonts for only these glyphs
 * (`icon_names=`), which cuts the icon font from ~3.9 MB (the whole set) to a small subset; the axes are
 * unchanged, so filled / weight / optical-size variants look exactly as before.
 *
 * Adding an icon? Add its name here — `icons.test.ts` scans the source and fails if one is missing
 * (a missing glyph would show its ligature name as text instead of the icon).
 */
export const ICON_NAMES = [
  "ac_unit", "account_balance", "account_circle", "add", "add_a_photo", "add_photo_alternate", "admin_panel_settings",
  "all_inclusive", "alt_route", "alternate_email", "altitude", "apartment", "arrow_back", "arrow_back_ios_new",
  "arrow_downward", "arrow_drop_down", "arrow_forward", "auto_stories", "badge", "barcode_scanner", "bolt",
  "bookmark_added", "calendar_add_on", "calendar_today", "call", "check", "check_circle", "checklist", "chevron_left",
  "chevron_right", "child_friendly", "close", "concierge", "confirmation_number", "delete_forever", "directions_car",
  "distance", "document_scanner", "done", "download", "drag_indicator", "east", "edit_calendar", "electric_car", "error",
  "event_available", "event_busy", "expand_more", "explore", "favorite", "favorite_border", "file_download",
  "filter_alt_off", "filter_list", "fingerprint", "flight_land", "flight_takeoff", "folder_special", "garage", "gavel",
  "grid_view", "history", "history_edu", "hotel", "info", "inventory_2", "ios_share", "key", "landscape",
  "local_gas_station", "local_shipping", "location_on", "lock", "lock_clock", "lock_reset", "mail", "manage_search",
  "menu", "more_vert", "museum", "my_location", "near_me", "north_east", "notifications", "open_in_new", "person",
  "person_add", "phone_in_talk", "precision_manufacturing", "print", "priority_high", "progress_activity", "qr_code_2",
  "qr_code_scanner", "radio_button_unchecked", "refresh", "restart_alt", "restaurant", "room_service", "satellite_alt",
  "schedule", "search", "security", "severe_cold", "share", "shield", "shield_person", "shield_with_heart", "snowing",
  "south", "spa", "speed", "storefront", "support_agent", "sync", "task_alt", "terrain", "timelapse", "tune",
  "upload_file", "verified", "verified_user", "view_carousel", "view_list", "visibility", "visibility_off", "warning",
  "wb_sunny", "west",
] as const;

/** Google Fonts stylesheet for the icon subset (the API needs the names sorted). */
export const ICON_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" +
  `&icon_names=${[...ICON_NAMES].sort().join(",")}&display=block`;
