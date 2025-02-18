import { Clickable, Column, Text } from "@artsy/palette"
import { Children, isValidElement, useState } from "react"
import * as React from "react"

interface ShowMoreProps {
  initial?: number
  expanded?: boolean
}

export const INITIAL_ITEMS_TO_SHOW = 6

export const ShowMore: React.FC<ShowMoreProps> = ({
  initial = INITIAL_ITEMS_TO_SHOW,
  children,
  expanded = false,
}) => {
  const nodes = Children.toArray(children).filter(isValidElement)
  const hasMore = nodes.length > initial

  const [isExpanded, setExpanded] = useState(expanded)

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      {hasMore && (
        <Column span={12}>
          <Clickable
            textDecoration="underline"
            textAlign="left"
            onClick={() => setExpanded(visibility => !visibility)}
          >
            {!expanded && <Text>{isExpanded ? "Hide" : "Show more"}</Text>}
          </Clickable>
        </Column>
      )}
    </>
  )
}
