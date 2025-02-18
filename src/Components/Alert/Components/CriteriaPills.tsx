import { Pill, ShowMore, SkeletonBox } from "@artsy/palette"
import { FC } from "react"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

interface CriteriaPillsProps {
  editable?: boolean
}

export const CriteriaPills: FC<CriteriaPillsProps> = ({ editable = true }) => {
  const { state, dispatch } = useAlertContext()

  const labels = state?.preview?.labels

  if (!labels) {
    return <CriteriaPillsPlaceholder />
  }
  const PILLS_TO_DISPLAY = 10
  const countPills = labels.length
  const showMorePillsText = `+${countPills - PILLS_TO_DISPLAY} more`

  return (
    <ShowMore initial={PILLS_TO_DISPLAY} showMoreText={showMorePillsText}>
      {labels.map(label => {
        if (!label) return null

        const key = `filter-label-${label?.field}-${label?.value}`

        if (!editable || label?.field === "artistIDs") {
          return (
            <Pill key={key} variant="filter" disabled>
              {label?.displayValue}
            </Pill>
          )
        }

        return (
          <Pill
            key={key}
            variant="filter"
            selected
            onClick={() =>
              dispatch({
                type: "REMOVE_CRITERIA_ATTRIBUTE_VALUE",
                payload: {
                  key: label?.field as SearchCriteriaAttributeKeys,
                  value: label?.value as string,
                },
              })
            }
          >
            {label?.displayValue}
          </Pill>
        )
      })}
    </ShowMore>
  )
}

const CriteriaPillsPlaceholder: FC = () => {
  return (
    <>
      <SkeletonBox width={150} height={30} />
      <SkeletonBox width={80} height={30} />
      <SkeletonBox width={100} height={30} />
    </>
  )
}
