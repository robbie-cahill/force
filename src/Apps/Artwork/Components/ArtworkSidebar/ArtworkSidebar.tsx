import { Expandable, Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarArtistsFragmentContainer } from "./ArtworkSidebarArtists"
import { ArtworkSidebar_artwork$data } from "__generated__/ArtworkSidebar_artwork.graphql"
import { ArtworkSidebar_me$data } from "__generated__/ArtworkSidebar_me.graphql"
import { ArtworkSidebarShippingInformationFragmentContainer } from "./ArtworkSidebarShippingInformation"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarArtworkTitleFragmentContainer } from "./ArtworkSidebarArtworkTitle"
import { ArtworkSidebarDetailsFragmentContainer } from "./ArtworkSidebarDetails"
import { ArtworkSidebarArtsyGuarantee } from "./ArtworkSidebarArtsyGuarantee"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "./ArtworkSidebarPartnerInfo"
import { ArtworkSidebarCreateArtworkAlertFragmentContainer } from "./ArtworkSidebarCreateArtworkAlert"
import { useTimer } from "Utils/Hooks/useTimer"
import { useState } from "react"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { useAuctionWebsocket } from "Components/useAuctionWebsocket"
import { ArtworkSidebarLinksFragmentContainer } from "./ArtworkSidebarLinks"
import { ArtworkSidebarCommercialButtonsFragmentContainer } from "./ArtworkSidebarCommercialButtons"
import { ArtworkSidebarEstimatedValueFragmentContainer } from "./ArtworkSidebarEstimatedValue"
import { ArtworkSidebarBiddingClosedMessageFragmentContainer } from "./ArtworkSidebarBiddingClosedMessage"
import { ArtworkSidebarAuctionTimerFragmentContainer } from "./ArtworkSidebarAuctionTimer"
import { ArtworkSidebarAuctionPollingRefetchContainer } from "./ArtworkSidebarAuctionInfoPolling"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork$data
  me: ArtworkSidebar_me$data
}

const checkIfArtworkIsOnLoanOrPermanentCollection = (
  saleMessage: string | null
) => {
  switch (saleMessage) {
    case "On loan":
      return true
    case "Permanent collection":
      return true
    default:
      return false
  }
}

export const ArtworkSidebar: React.FC<ArtworkSidebarProps> = ({
  artwork,
  me,
}) => {
  const {
    isSold,
    isAcquireable,
    isInAuction,
    isEligibleForArtsyGuarantee,
    isOfferable,
    saleArtwork,
    sale,
  } = artwork
  const startAt = sale?.startAt
  const endAt = saleArtwork?.endAt
  const lotLabel = saleArtwork?.lotLabel
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = useState(biddingEndAt)

  const { t } = useTranslation()

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID!,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
    },
  })

  const artworkEcommerceAvailable = !!(isAcquireable || isOfferable)

  const { hasEnded } = useTimer(updatedBiddingEndAt!, startAt!)
  const shouldHideDetailsCreateAlertCTA =
    artwork.artists?.length === 0 ||
    (isInAuction && hasEnded) ||
    (isInAuction && lotIsClosed(sale, saleArtwork)) ||
    isSold

  const shoudlDisplayLotLabel = !!isInAuction && !!lotLabel

  const { trackEvent } = useTracking()
  // Expanded state for shipping component
  const [expandedShipping, setExpandedShipping] = useState(false)

  // Expanded state for guarantee component
  const [expandedGuarantee, setExpandedGuarantee] = useState(false)

  const handleExpandableClick = (
    label: string,
    expanded: boolean,
    setExpanded: (expanded: boolean) => void
  ) => {
    setExpanded(!expanded)
    trackEvent({
      action: ActionType.toggledAccordion,
      context_module: ContextModule.artworkSidebar,
      context_owner_type: OwnerType.artwork,
      subject: label,
      expand: !expanded,
    })
  }

  return (
    <Flex flexDirection="column" data-test={ContextModule.artworkSidebar}>
      {shoudlDisplayLotLabel && (
        <Text variant="sm" color="black100" mb={0.5}>
          Lot {lotLabel}
        </Text>
      )}
      <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />

      <ArtworkSidebarArtworkTitleFragmentContainer artwork={artwork} />

      <Spacer y={2} />

      <ArtworkSidebarDetailsFragmentContainer artwork={artwork} />
      {isInAuction ? (
        <>
          <Separator />
          <Spacer y={2} />
          <ArtworkSidebarEstimatedValueFragmentContainer artwork={artwork} />
          <Join separator={<Spacer y={2} />}>
            {hasEnded ? (
              <ArtworkSidebarBiddingClosedMessageFragmentContainer
                artwork={artwork}
              />
            ) : (
              <ArtworkSidebarAuctionPollingRefetchContainer
                artwork={artwork}
                me={me}
              />
            )}
          </Join>
          {!hasEnded && (
            <ArtworkSidebarAuctionTimerFragmentContainer artwork={artwork} />
          )}
          <Spacer y={2} />
        </>
      ) : (
        <ArtworkSidebarCommercialButtonsFragmentContainer artwork={artwork} />
      )}

      {!isSold && artworkEcommerceAvailable && (
        <>
          <Expandable
            label={t`artworkPage.sidebar.shippingAndTaxes.expandableLabel`}
            pt={0}
            onClick={() =>
              handleExpandableClick(
                t`artworkPage.sidebar.shippingAndTaxes.expandableLabel`,
                expandedShipping,
                setExpandedShipping
              )
            }
            borderColor="black10"
          >
            <ArtworkSidebarShippingInformationFragmentContainer
              artwork={artwork}
            />
          </Expandable>
        </>
      )}

      {!!isEligibleForArtsyGuarantee && (
        <>
          <Expandable
            label={t`artworkPage.sidebar.artsyGuarantee.expandableLabel`}
            onClick={() =>
              handleExpandableClick(
                t`artworkPage.sidebar.artsyGuarantee.expandableLabel`,
                expandedGuarantee,
                setExpandedGuarantee
              )
            }
            borderColor="black10"
          >
            <ArtworkSidebarArtsyGuarantee />
          </Expandable>
        </>
      )}
      <Separator />
      <Spacer y={2} />

      <ArtworkSidebarPartnerInfoFragmentContainer artwork={artwork} />

      <Spacer y={2} />
      {(!shouldHideDetailsCreateAlertCTA ||
        checkIfArtworkIsOnLoanOrPermanentCollection(artwork.saleMessage)) && (
        <ArtworkSidebarCreateArtworkAlertFragmentContainer artwork={artwork} />
      )}
      <Separator />

      {/* @ts-ignore RELAY_UPGRADE 13  */}
      <ArtworkSidebarLinksFragmentContainer artwork={artwork} />
    </Flex>
  )
}

export const ArtworkSidebarFragmentContainer = createFragmentContainer(
  ArtworkSidebar,
  {
    artwork: graphql`
      fragment ArtworkSidebar_artwork on Artwork {
        slug
        isSold
        isAcquireable
        isOfferable
        isInAuction
        saleMessage
        isBiddable
        isEligibleForArtsyGuarantee
        ...ArtworkSidebarArtworkTitle_artwork
        ...ArtworkSidebarArtists_artwork
        ...ArtworkSidebarDetails_artwork
        ...ArtworkSidebarCommercialButtons_artwork
        ...ArtworkSidebarShippingInformation_artwork
        ...ArtworkSidebarPartnerInfo_artwork
        ...ArtworkSidebarCreateArtworkAlert_artwork
        ...ArtworkSidebarLinks_artwork
        ...ArtworkSidebarEstimatedValue_artwork
        ...ArtworkSidebarBiddingClosedMessage_artwork
        ...ArtworkSidebarAuctionTimer_artwork
        ...ArtworkSidebarAuctionInfoPolling_artwork
        sale {
          startAt
          isClosed
        }
        saleArtwork {
          lotID
          lotLabel
          extendedBiddingEndAt
          endAt
        }
        artists {
          internalID
        }
      }
    `,
    me: graphql`
      fragment ArtworkSidebar_me on Me {
        ...ArtworkSidebarAuctionInfoPolling_me
      }
    `,
  }
)
