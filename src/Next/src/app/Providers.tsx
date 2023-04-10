"use client"

import track from "react-tracking"
import { Boot as LegacyBoot } from "System/Router/Boot"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { SessionProvider, useSession } from "next-auth/react"
import { Session } from "next-auth"

export const Providers: React.FC<{
  children: React.ReactNode
  session: Session
}> = track(
  undefined,
  {}
)(({ children, session }) => {
  const relayEnvironment = createRelaySSREnvironment({
    metaphysicsEndpoint: "https://metaphysics-staging.artsy.net/v2",
    // cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
  })

  return (
    <SessionProvider>
      {/* @ts-ignore */}
      <LegacyBoot user={session.user} relayEnvironment={relayEnvironment}>
        {children}
      </LegacyBoot>
    </SessionProvider>
  )
})
