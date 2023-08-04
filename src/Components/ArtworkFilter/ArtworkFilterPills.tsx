import React, { FC } from "react"
import { Flex, Pill } from "@artsy/palette"
import { useActiveFilterPills } from "Components/SavedSearchAlert/useActiveFilterPills"

export const ArtworkFilterPills: FC = () => {
  const { pills, removePill } = useActiveFilterPills()

  if (pills.length === 0) {
    return null
  }

  return (
    <Flex data-testid="artworkGridFilterPills" gap={1} flexWrap="wrap">
      {pills.map(pill => {
        return (
          <Pill
            key={[pill.field, pill.value].join("-")}
            variant="filter"
            onClick={() => removePill(pill)}
          >
            {pill.displayValue}
          </Pill>
        )
      })}
    </Flex>
  )
}
