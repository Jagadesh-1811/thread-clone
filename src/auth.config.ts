import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.image = token.image as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [], // Add providers with an empty array for middleware config
} satisfies NextAuthConfig;
