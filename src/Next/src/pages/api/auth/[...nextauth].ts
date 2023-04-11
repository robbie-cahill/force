import NextAuth from "next-auth"
import { UserinfoEndpointHandler } from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextApiRequest, NextApiResponse } from "next"
import qs from "qs"
import { LoginCredentials, login } from "Next/src/system/auth/login"
import { SignupCredentials, signUp } from "Next/src/system/auth/signUp"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    callbacks: {
      session: async ({ session, token }) => {
        if (token.user) {
          session.user = token.user
        }
        return session
      },
      jwt: async ({ token, user }) => {
        if (user) {
          token.user = user
        }
        return token
      },
    },
    providers: [
      CredentialsProvider({
        id: "artsy-credentials",
        name: "ArtsyCredentials",
        credentials: {
          name: { label: "Name", type: "text" },
          email: {
            label: "Email",
            type: "email",
          },
          password: { label: "Password", type: "password" },
          agreedToReceiveEmails: {
            label: "Agreed to receive emails",
            type: "boolean",
          },
          otpAttempt: { label: "OTP", type: "text" },
          otpRequired: { label: "OTP Required", type: "boolean" },
          sessionId: { label: "Session ID", type: "text" },
          mode: { label: "Mode", type: "enum", options: ["login", "signup"] },
          _csrf: { label: "CSRF", type: "text" },
        },
        authorize: async (credentials, req) => {
          switch (credentials?.mode) {
            case "login": {
              return await login((credentials as unknown) as LoginCredentials)
            }
            case "signUp": {
              return await signUp((credentials as unknown) as SignupCredentials)
            }
          }
        },
      }),
    ],
  })
}
