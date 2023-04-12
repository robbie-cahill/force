import { User } from "next-auth"
import {
  cacheMiddleware,
  errorMiddleware,
  Headers,
  loggerMiddleware,
  Middleware,
  urlMiddleware,
} from "react-relay-network-modern"
// import type { UserWithAccessToken } from "system"

const enableLogging =
  process.env.NODE_ENV === "development" && typeof window !== "undefined"

export const getRelayMiddleware = (user?: User): Middleware[] => {
  const authenticatedHeaders: Headers = user
    ? {
        "X-USER-ID": user.id,
        "X-ACCESS-TOKEN": user.access_token,
      }
    : {}

  const middleware = [
    urlMiddleware({
      url: process.env.METAPHYSICS_ENDPOINT + "/v2",
      headers: authenticatedHeaders,
    }),
    enableLogging && loggerMiddleware(),
    enableLogging && errorMiddleware({ disableServerMiddlewareTip: true }),
    cacheMiddleware({
      size: 100,
      ttl: 60 * 1000,
    }),
  ] as Middleware[]

  return middleware
}
