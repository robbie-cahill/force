"use client"

import { Theme, injectGlobalStyles } from "@artsy/palette"
import { SystemContextProvider } from "System/SystemContext"
import track from "react-tracking"

const { GlobalStyles } = injectGlobalStyles()

export const Boot: React.FC<{ children: React.ReactNode }> = track(
  undefined,
  {}
)(({ children }) => {
  return (
    <SystemContextProvider>
      <Theme theme="v3">
        <GlobalStyles />
        {children}
      </Theme>
    </SystemContextProvider>
  )
})
