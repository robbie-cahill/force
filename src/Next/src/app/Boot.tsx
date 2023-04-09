"use client"

import track from "react-tracking"
import { Boot as LegacyBoot } from "System/Router/Boot"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"

export const Boot: React.FC<{ children: React.ReactNode }> = track(
  undefined,
  {}
)(({ children }) => {
  const relayEnvironment = createRelaySSREnvironment({
    metaphysicsEndpoint: "https://metaphysics-staging.artsy.net/v2",
    // cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
  })

  // @ts-ignore
  return <LegacyBoot relayEnvironment={relayEnvironment}>{children}</LegacyBoot>
})
