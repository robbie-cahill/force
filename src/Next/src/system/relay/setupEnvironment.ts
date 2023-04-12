import { useMemo } from "react"
import { RelayNetworkLayer } from "react-relay-network-modern"
import { Environment, RecordSource, Store } from "relay-runtime"
import { getRelayMiddleware } from "./middleware"
import { User } from "next-auth"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"

let relayEnvironment: Environment

interface SetupEnvironmentProps {
  initialRecords?: any
  user?: User
}

export function setupEnvironment({
  initialRecords,
  user,
}: SetupEnvironmentProps = {}) {
  const environment = relayEnvironment ?? createEnvironment(user)

  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords))
  }
  if (typeof window === "undefined") {
    return environment
  }
  if (!relayEnvironment) {
    relayEnvironment = environment
  }

  return relayEnvironment
}

function createEnvironment(user?: User) {
  return createRelaySSREnvironment({ user })
  // return new Environment({
  //   network: new RelayNetworkLayer(getRelayMiddleware(user), { noThrow: true }),
  //   store: new Store(new RecordSource()),
  // })
}

export function useEnvironment({
  initialRecords,
  user,
}: SetupEnvironmentProps = {}) {
  const environment = setupEnvironment({ initialRecords, user })
  return environment
}
