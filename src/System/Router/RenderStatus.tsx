import * as React from "react"
import StaticContainer from "react-static-container"
import { Box } from "@artsy/palette"
import { useSystemContext } from "System/useSystemContext"
import { ErrorPage } from "Components/ErrorPage"
import ElementsRenderer from "found/ElementsRenderer"
import createLogger from "Utils/logger"
import { NetworkTimeout } from "./NetworkTimeout"
import { PageLoader } from "./PageLoader"
import { AppShell } from "Apps/Components/AppShell"
import { getENV } from "Utils/getENV"
import { HttpError } from "found"

const logger = createLogger("Artsy/Router/Utils/RenderStatus")

export const RenderPending = () => {
  const { isFetching } = useSystemContext()

  if (!isFetching) {
    return undefined
  }

  return (
    <>
      <Renderer>{null}</Renderer>

      <PageLoader
        className="reactionPageLoader" // positional styling comes from Force body.styl
        showBackground={false}
        step={10} // speed of progress bar, randomized between 1/x to simulate variable progress
        style={{
          borderTop: "1px solid white",
          position: "fixed",
          left: 0,
          top: -5,
          zIndex: 1000,
        }}
      />

      <NetworkTimeout />
    </>
  )
}

export const RenderReady = ({ elements }: { elements: React.ReactNode }) => {
  const { isFetching } = useSystemContext()

  if (isFetching) {
    return undefined
  }

  return (
    <Renderer shouldUpdate>
      <ElementsRenderer elements={elements} />
    </Renderer>
  )
}

export const RenderError: React.FC<{
  error: { status?: number; data?: any }
}> = ({ error }) => {
  logger.error(error.data)

  const status = error.status || 500

  const { isFetching, setFetching } = useSystemContext()

  if (isFetching) {
    setTimeout(() => setFetching?.(false), 0)
  }

  const message =
    getENV("NODE_ENV") === "development" ? String(error.data) : "Internal Error"

  // Server-side 404s are handled by the error handler middleware
  if (typeof window === "undefined" && typeof jest === "undefined") {
    throw new HttpError(status, message)
  }

  return (
    <AppShell>
      <ErrorPage mt={4} code={status} message={message} />
    </AppShell>
  )
}

/**
 * Define a container component so that we don't run into reconciliation issues
 * due to an element existing in RenderPending that doesn't exist in RenderReady,
 * between the top most container and StaticContainer.
 *
 */
const Renderer = ({ children, ...props }) => {
  return (
    <Box>
      <StaticContainer {...props}>{children}</StaticContainer>
    </Box>
  )
}
