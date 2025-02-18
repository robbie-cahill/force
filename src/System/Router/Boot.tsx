import {
  Theme,
  injectGlobalStyles,
  THEME,
  ToastsProvider,
} from "@artsy/palette"
import { SystemContextProvider } from "System/SystemContext"
import { AppRouteConfig } from "System/Router/Route"
import { useEffect } from "react"
import * as React from "react"
import { HeadProvider } from "react-head"
import { Environment } from "react-relay"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
// eslint-disable-next-line no-restricted-imports
import { Provider as StateProvider } from "unstated"
import Events from "Utils/Events"
import { getENV } from "Utils/getENV"
import { ErrorBoundary } from "./ErrorBoundary"
import { FocusVisible } from "Components/FocusVisible"
import {
  MatchingMediaQueries,
  MediaContextProvider,
  ResponsiveProvider,
} from "Utils/Responsive"
import { ClientContext } from "System/Router/buildClientAppContext"
import { SiftContainer } from "Utils/SiftContainer"
import { setupSentryClient } from "Server/setupSentryClient"
import "System/i18n/i18n"
import track from "react-tracking"
import { StickyProvider } from "Components/Sticky"
import { AuthIntentProvider } from "Utils/Hooks/useAuthIntent"
import { AuthDialogProvider } from "Components/AuthDialog/AuthDialogContext"
import { ProgressiveOnboardingProvider } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { CookieConsentManager } from "Components/CookieConsentManager/CookieConsentManager"

export interface BootProps {
  children: React.ReactNode
  context: ClientContext
  headTags?: JSX.Element[]
  onlyMatchMediaQueries?: MatchingMediaQueries
  relayEnvironment: Environment
  routes: AppRouteConfig[]
  user: User | null
}

const { GlobalStyles } = injectGlobalStyles()

export const Boot = track(undefined, {
  dispatch: Events.postEvent,
})((props: BootProps) => {
  /**
   * Let our end-to-end tests know that the app is hydrated and ready to go; and
   * if in prod, initialize Sentry.
   */
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady") //

    if (getENV("NODE_ENV") === "production") {
      setupSentryClient(sd)
    }
  }, [])

  const {
    children,
    context,
    headTags = [],
    onlyMatchMediaQueries,
    ...rest
  } = props

  const contextProps = {
    ...rest,
    ...context,
  }

  return (
    <Theme>
      <GlobalStyles />

      <HeadProvider headTags={headTags}>
        <StateProvider>
          <SystemContextProvider {...contextProps}>
            <ErrorBoundary>
              <MediaContextProvider onlyMatch={onlyMatchMediaQueries}>
                <ResponsiveProvider
                  mediaQueries={THEME.mediaQueries}
                  initialMatchingMediaQueries={onlyMatchMediaQueries as any}
                >
                  <ToastsProvider>
                    <StickyProvider>
                      <AuthIntentProvider>
                        <AuthDialogProvider>
                          <ProgressiveOnboardingProvider>
                            <CookieConsentManager>
                              <FocusVisible />
                              <SiftContainer />

                              {children}
                            </CookieConsentManager>
                          </ProgressiveOnboardingProvider>
                        </AuthDialogProvider>
                      </AuthIntentProvider>
                    </StickyProvider>
                  </ToastsProvider>
                </ResponsiveProvider>
              </MediaContextProvider>
            </ErrorBoundary>
          </SystemContextProvider>
        </StateProvider>
      </HeadProvider>
    </Theme>
  )
})
