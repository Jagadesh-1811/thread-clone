import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    image?: string;
  }
}
