import { getSession } from "next-auth/react"
import {
  CacheConfig,
  fetchQuery,
  FetchQueryFetchPolicy,
  GraphQLTaggedNode,
  OperationType,
} from "relay-runtime"
// import type { UserWithAccessToken } from "system"
import { setupEnvironment } from "Next/src/system/relay/setupEnvironment"
import { headers } from "next/headers"

interface FetchRelayDataProps<T extends OperationType> {
  query: GraphQLTaggedNode
  variables?: T["variables"]
  cache?: boolean
  cacheConfig?: {
    networkCacheConfig?: CacheConfig | null | undefined
    fetchPolicy?: FetchQueryFetchPolicy | null | undefined
  } | null
}

export async function fetchRelayData<T extends OperationType>({
  query,
  variables = {},
  cacheConfig = {},
  cache = false,
}: FetchRelayDataProps<T>) {
  const session = await getSession(headers().get("cookie") ?? "")
  const user = session?.user

  const environment = setupEnvironment({ user })

  if (cache) {
    cacheConfig = {
      fetchPolicy: "store-or-network",
      networkCacheConfig: {
        force: false,
      },
    }
  }

  const data = (await fetchQuery(
    environment,
    query,
    variables,
    cacheConfig
  ).toPromise()) as T["response"]

  const relayStoreRecords = environment.getStore().getSource().toJSON()

  return {
    data,
    relayStoreRecords,
    environment,
  }
}
