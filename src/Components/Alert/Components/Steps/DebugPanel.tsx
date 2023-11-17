import { Text } from "@artsy/palette"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import {
  ArtworkFilterContextProps,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import _ from "lodash"
import { useRouter } from "System/Router/useRouter"

export const DebugPanel = () => {
  const artworkFilterContext = useArtworkFilterContext()
  const alertContext = useAlertContext()

  const router = useRouter()
  const shouldRender = router.match.location.query.hasOwnProperty("debug")

  if (!shouldRender) {
    return null
  }

  return (
    <div
      style={{
        background: "#fffc",
        border: "1px solid black",
        boxShadow: "0 0 20px 0 #0003",
        fontSize: "100%",
        maxHeight: "calc(100vh - 20px)",
        overflow: "scroll",
        padding: "0 10px 10px 10px",
        position: "fixed",
        right: 10,
        top: 10,
        width: "40em",
        zIndex: 100000,
      }}
    >
      <Text as="h1" variant={"md"}>
        AlertContext
      </Text>

      <details>
        <summary>state.criteria</summary>
        <pre>{JSON.stringify(alertContext.state.criteria, null, 2)}</pre>
      </details>

      <details>
        <summary>state.preview</summary>
        <pre>{JSON.stringify(alertContext.state.preview, null, 2)}</pre>
      </details>

      <details>
        <summary>state.settings</summary>
        <pre>{JSON.stringify(alertContext.state.settings, null, 2)}</pre>
      </details>

      <Text as="h1" variant={"md"} mt={1}>
        ArtworkFilterContext
      </Text>

      <details>
        <summary>active filters</summary>
        <pre>
          {JSON.stringify(getActiveFilters(artworkFilterContext), null, 2)}
        </pre>
      </details>

      <details>
        <summary>filters</summary>
        <pre>{JSON.stringify(artworkFilterContext.filters, null, 2)}</pre>
      </details>

      <details>
        <summary>aggregations</summary>
        {artworkFilterContext.aggregations?.map(agg => {
          return (
            <details key={agg.slice} style={{ paddingLeft: "1em" }}>
              <summary>{agg.slice}</summary>
              <pre>{JSON.stringify(agg.counts, null, 2)}</pre>
            </details>
          )
        })}
      </details>
    </div>
  )
}

/**
 * For convenince, a minimal diff representing the currently active filters
 */
function getActiveFilters(artworkFilterContext: ArtworkFilterContextProps) {
  const difference: Partial<ArtworkFilterContextProps> = {}

  for (const key in artworkFilterContext.filters) {
    if (key === "debug") continue

    const currentValue = artworkFilterContext.filters[key]
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const defaultValue = artworkFilterContext.defaultFilters![key]

    const isDifferent = !_.isEqual(currentValue, defaultValue)
    if (isDifferent) {
      difference[key] = artworkFilterContext.filters[key]
    }
  }

  return difference
}
