export function computeDeviceFingerprint(headers: Headers) {
  const userAgent = headers.get("user-agent") ?? "unknown";
  const language = headers.get("accept-language") ?? "unknown";
  const platform = headers.get("sec-ch-ua-platform") ?? "unknown";

  return Buffer.from(`${userAgent}|${language}|${platform}`).toString("base64url");
}

export function evaluateDeviceTrust(activeFingerprint: string, incomingFingerprint: string) {
  const isKnownDevice = activeFingerprint === incomingFingerprint;

  return {
    isKnownDevice,
    trustScore: isKnownDevice ? 100 : 42,
    action: isKnownDevice ? "ALLOW" : "REVIEW",
  } as const;
}
