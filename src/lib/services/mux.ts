export function normalizeMuxWebhook(eventType: string) {
  const map: Record<string, string> = {
    "video.live_stream.active": "LIVE_STARTED",
    "video.live_stream.idle": "LIVE_IDLE",
    "video.asset.ready": "ARCHIVE_READY",
  };

  return map[eventType] ?? "UNKNOWN";
}
