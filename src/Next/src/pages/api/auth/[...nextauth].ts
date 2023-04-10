import NextAuth from "next-auth"
import { UserinfoEndpointHandler } from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextApiRequest, NextApiResponse } from "next"
import qs from "qs"

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
          email: {
            label: "Email",
            type: "email",
          },
          password: { label: "Password", type: "password" },
          otpAttempt: { label: "OTP", type: "text" },
          otpRequired: { label: "OTP Required", type: "boolean" },
          sessionId: { label: "Session ID", type: "text" },
          _csrf: { label: "CSRF", type: "text" },
        },
        authorize: async (credentials, req) => {
          const payload = {
            email: credentials?.email,
            password: credentials?.password,
            otp_attempt: credentials?.otpAttempt,
            otpRequired: credentials?.otpRequired,
            session_id: credentials?.sessionId,
            grant_type: "credentials",
            client_id: process.env.ARTSY_ID,
            client_secret: process.env.ARTSY_SECRET,
            _csrf: credentials?._csrf,
          }

          const xAppTokenURL = `${
            process.env.API_URL
          }/api/v1/xapp_token?${qs.stringify({
            client_id: process.env.ARTSY_ID,
            client_secret: process.env.ARTSY_SECRET,
          })}`

          const xAppTokenRes = await fetch(xAppTokenURL)
          const xAppTokenResponse = await xAppTokenRes.json()

          const accessTokenReq = await fetch(
            `${process.env.API_URL}/oauth2/access_token`,
            {
              method: "POST",
              body: JSON.stringify(payload),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Xapp-Token": xAppTokenResponse.xapp_token as string,
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          )

          const accessTokenRes = await accessTokenReq.json()

          if (!accessTokenReq.ok) {
            throw new Error(accessTokenRes.error_description)
          }

          if (accessTokenReq.ok && accessTokenRes) {
            const userReq = await fetch(`${process.env.API_URL}/api/v1/me`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-ACCESS-TOKEN": accessTokenRes.access_token as string,
              },
            })

            const userRes = await userReq.json()

            const user = {
              ...accessTokenRes,
              ...userRes,
            }

            return user
          }

          // Return null if user data could not be retrieved
          return null
        },
      }),
    ],
  })
}
