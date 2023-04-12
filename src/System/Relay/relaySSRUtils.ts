import serialize from "serialize-javascript"

export function cleanRelayData(relayData: any) {
  try {
    relayData.forEach(item => {
      item.forEach(i => {
        delete i._res
      })
    })
  } catch (error) {
    console.error("[Artsy/Router/buildServerApp] Error cleaning data", error)
  }

  return relayData
}
/**
 * Serialize data for client-side consumption
 */
export function serializeRelayData(relayData: any) {
  let hydrationData
  try {
    hydrationData = serialize(relayData, {
      isJSON: true,
    })
  } catch (error) {
    hydrationData = "{}"
    console.error(
      "[Artsy/Router/buildServerApp] Error serializing data:",
      error
    )
  }
  return serialize(hydrationData || {}, {
    isJSON: true,
  })
}
