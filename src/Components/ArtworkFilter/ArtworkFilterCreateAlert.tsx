import { ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { Button } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { usePrepareFiltersForPills } from "Components/ArtworkFilter/Utils/usePrepareFiltersForPills"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { ProgressiveOnboardingAlertReady } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertReady"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import { getSearchCriteriaFromFilters } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { DEFAULT_METRIC } from "Utils/metrics"
import { FC } from "react"

export const ArtworkFilterCreateAlert: FC = () => {
  const artist = {
    name: "Pablo Picasso",
    internalID: "4d8b92b34eb68a1b2c0003f4",
    slug: "pablo-picasso",
  }
  const savedSearchEntity: SavedSearchEntity = {
    placeholder: artist.name ?? "",
    owner: {
      type: OwnerType.artist,
      id: artist.internalID,
      name: artist.name ?? "",
      slug: artist.slug,
    },
    defaultCriteria: {
      artistIDs: [
        {
          displayValue: artist.name ?? "",
          value: artist.internalID,
        },
      ],
    },
  }

  const { aggregations } = useArtworkFilterContext()
  const filters = usePrepareFiltersForPills()
  const criteria = getSearchCriteriaFromFilters(savedSearchEntity, filters)
  const metric = filters?.metric ?? DEFAULT_METRIC

  return (
    <SavedSearchCreateAlertButtonContainer
      entity={savedSearchEntity}
      criteria={criteria}
      metric={metric}
      aggregations={aggregations}
      authDialogOptions={{
        options: {
          title: "Sign up to create your alert",
          afterAuthAction: {
            action: "createAlert",
            kind: "artworks",
            objectId: savedSearchEntity.owner.id,
          },
        },
        analytics: {
          contextModule: ContextModule.artworkGrid,
          intent: Intent.createAlert,
        },
      }}
      renderButton={({ onClick }) => (
        <ProgressiveOnboardingAlertCreate>
          {({ onSkip: createSkip }) => (
            <ProgressiveOnboardingAlertReady>
              {({ onSkip: readySkip }) => (
                <Button
                  variant="tertiary"
                  size="small"
                  Icon={BellStrokeIcon}
                  onClick={() => {
                    createSkip()
                    readySkip()
                    onClick()
                  }}
                >
                  Create Alert
                </Button>
              )}
            </ProgressiveOnboardingAlertReady>
          )}
        </ProgressiveOnboardingAlertCreate>
      )}
    />
  )
}
