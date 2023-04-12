"use client"

import track from "react-tracking"
import { Boot as LegacyBoot } from "System/Router/Boot"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { SessionProvider, useSession } from "next-auth/react"
import { Session } from "next-auth"

export const Providers: React.FC<{
  children: React.ReactNode
  session: Session | null
}> = track(
  undefined,
  {}
)(({ children, session }) => {
  const environment = createRelaySSREnvironment({
    metaphysicsEndpoint: process.env.METAPHYSICS_ENDPOINT + "/v2",
    cache:
      typeof window === "undefined"
        ? {}
        : JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
    user: session?.user,
  })

  return (
    <SessionProvider>
      <LegacyBoot user={session?.user} relayEnvironment={environment}>
        {children}
      </LegacyBoot>
    </SessionProvider>
  )
})
