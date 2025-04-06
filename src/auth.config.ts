// import { PrismaAdapter } from "@auth/prisma-adapter"

import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
// import prisma from "./lib/db"
import { loginCheckUser } from "./actions/user.action"
// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()
export const authConfig  = {
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24,
    },
    secret: process.env.AUTH_SECRET,
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
  
        profile(profile) {
          return {
            id: profile.sub,
            name: `${profile.given_name} ${profile.family_name || ""}`.trim(),
            email: profile.email,
            image: profile.picture,
            role: "USER",
          };
        },
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } = credentials as {
            email: string;
            password: string
          };
          // console.log(email,password)
          const { success, message, user } = await loginCheckUser(email, password);
          if (!success) throw new Error(message);
  
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            image: user?.image,
            role: user?.role,
            phoneNumber: user?.phoneNumber as string
          };
        },
      }),
    ],
    callbacks: {
      async authorized({ auth }) {
        // console.log({request})
        console.log({auth})      
        return !!auth
      },
      async signIn({ account, profile }) {
  
        if (account?.provider === "google") {
          return profile?.email_verified as boolean && profile?.email?.endsWith("@gmail.com") as boolean
        }
        return true // Do different verification for other providers that don't have `email_verified`
  
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.role = user.role
          token.phoneNumber = user.phoneNumber
        }
        return token
      },
      async session({ session, token }) {
        // console.log({token,user})
        // session.user.role = user.role 
        // session.user.id = user.id;
        // session.user.phoneNumber = user.phoneNumber
        if(session.user){
  
          session.user.id = token.id as string;
          session.user.role = token.role as "ADMIN" | "USER";
          session.user.phoneNumber = token.phoneNumber as string;
        }
        return session
      },
    },
    pages: {
      signIn: '/login',
      error: '/error'
    },
    debug: process.env.NODE_ENV === "development",
  
  }  satisfies NextAuthConfig
