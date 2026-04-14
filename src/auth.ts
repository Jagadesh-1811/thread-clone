import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "./lib/mongoose";
import User from "./lib/models/user.model";

import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        await connectToDB();
        
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (passwordsMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            image: user.image
          };
        }

        return null;
      }
    })
  ]
});
