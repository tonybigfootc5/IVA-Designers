const env = {
  appUrl: process.env.APP_URL ?? "http://localhost:3000",
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  vdoCipherSecret: process.env.VDOCIPHER_API_SECRET,
  muxTokenId: process.env.MUX_TOKEN_ID,
  muxTokenSecret: process.env.MUX_TOKEN_SECRET,
  muxWebhookSecret: process.env.MUX_WEBHOOK_SECRET,
  phonePeMerchantId: process.env.PHONEPE_MERCHANT_ID,
  phonePeSaltKey: process.env.PHONEPE_SALT_KEY,
  phonePeSaltIndex: process.env.PHONEPE_SALT_INDEX,
};

export const envConfig = {
  ...env,
  isDemoAuthEnabled:
    process.env.NODE_ENV !== "production" ||
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY,
};
