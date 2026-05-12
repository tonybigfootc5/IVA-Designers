import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { envConfig } from "@/lib/env";
import { syncOAuthUser, verifyOtpUser } from "@/lib/repositories/users";

const providers: NextAuthOptions["providers"] = [];

if (envConfig.googleClientId && envConfig.googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: envConfig.googleClientId,
      clientSecret: envConfig.googleClientSecret,
    }),
  );
}

providers.push(
  CredentialsProvider({
    id: "phone-otp",
    name: "Phone OTP",
    credentials: {
      phone: { label: "Phone", type: "tel" },
      otp: { label: "OTP", type: "text" },
    },
    async authorize(credentials) {
      if (!credentials?.phone || !credentials.otp) {
        return null;
      }

      return verifyOtpUser(credentials.phone, credentials.otp);
    },
  }),
);

export const authOptions: NextAuthOptions = {
  secret: envConfig.nextAuthSecret,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const linked = await syncOAuthUser({
          email: profile?.email,
          name: user.name,
          image: user.image,
        });
        user.id = linked.id;
        user.role = linked.role;
        user.phone = linked.phone;
      }

      if (!user.role) {
        user.role = "STUDENT";
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.phone = user.phone ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "anonymous";
        session.user.role = token.role ?? "STUDENT";
        session.user.phone = token.phone ?? null;
      }

      return session;
    },
  },
};

export function getServerAuthSession() {
  return getServerSession(authOptions);
}
