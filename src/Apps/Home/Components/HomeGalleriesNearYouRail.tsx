import {
  ActionType,
  ClickedGalleryGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Button, Skeleton } from "@artsy/palette"
import {
  CellPartnerFragmentContainer,
  CellPartnerPlaceholder,
} from "Components/Cells/CellPartner"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/useSystemContext"
import { HomeGalleriesNearYouRailQuery } from "__generated__/HomeGalleriesNearYouRailQuery.graphql"
import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { HomeGalleriesNearYouRail_partnersConnection$data } from "__generated__/HomeGalleriesNearYouRail_partnersConnection.graphql"
import { useState } from "react"
import { extractNodes } from "Utils/extractNodes"

interface HomeGalleriesNearYouRailProps {
  partnersConnection: HomeGalleriesNearYouRail_partnersConnection$data | null
  relay: RelayRefetchProp
}

const HomeGalleriesNearYouRail: React.FC<HomeGalleriesNearYouRailProps> = ({
  partnersConnection,
  relay,
}) => {
  const { trackEvent } = useTracking()

  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState<GeolocationPosition | null>(null)

  const refetch = () => {
    relay.refetch(
      {
        ...queryVariables,
        near:
          position?.coords &&
          `${position?.coords?.latitude},${position?.coords?.longitude}`,
        includePartnersNearIpBasedLocation: !position?.coords,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        setIsLoading(false)
      }
    )
  }

  const requestLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)

      navigator.geolocation.getCurrentPosition(position => {
        console.log({ position })

        setPosition(position)
        refetch()
      }),
        () => {
          setIsLoading(false)
          console.error("Geolocation not supported")
        }
    } else {
      console.error("Geolocation not supported")
    }
  }

  const nodes = extractNodes(partnersConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      {!position && (
        <Button onClick={() => requestLocation()} loading={isLoading}>
          Near Me
        </Button>
      )}
      <Rail
        title="Berlin"
        countLabel={partnersConnection?.totalCount ?? 0}
        viewAllLabel="View All Galleries"
        viewAllHref="/galleries"
        viewAllOnClick={() => {
          const trackingEvent: ClickedGalleryGroup = {
            action: ActionType.clickedGalleryGroup,
            // TODO: Fix this
            context_module: ContextModule.featuredGalleriesRail,
            context_page_owner_type: OwnerType.home,
            destination_page_owner_type: OwnerType.galleries,
            type: "viewAll",
          }
          trackEvent(trackingEvent)
        }}
        getItems={() =>
          nodes.map((node, index) => (
            <CellPartnerFragmentContainer
              key={node.internalID}
              partner={node}
              onClick={() => {
                const trackingEvent: ClickedGalleryGroup = {
                  action: ActionType.clickedGalleryGroup,
                  // TODO: Fix this
                  context_module: ContextModule.featuredGalleriesRail,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: node.internalID,
                  destination_page_owner_slug: node.slug,
                  destination_page_owner_type: OwnerType.galleries,
                  type: "thumbnail",
                }

                trackEvent(trackingEvent)
              }}
            />
          ))
        }
      />
    </>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Featured Galleries"
      viewAllLabel="View All Galleries"
      viewAllHref="/galleries"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <CellPartnerPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

const HomeGalleriesNearYouRailRefetchContainer = createRefetchContainer(
  HomeGalleriesNearYouRail,
  {
    // requestLocation: graphql`
    //   fragment HomeGalleriesNearYouRail_requestLocation on Query {
    //     requestLocation
    //       @optionalField
    //       @include(if: $includePartnersNearIpBasedLocation) {
    //       coordinates {
    //         lat
    //         lng
    //       }
    //     }
    //   }
    // `,
    partnersConnection: graphql`
      fragment HomeGalleriesNearYouRail_partnersConnection on PartnerConnection {
        totalCount
        edges {
          node {
            internalID
            ...CellPartner_partner
            ... on Partner {
              internalID
              slug
            }
          }
        }
      }
    `,
  },
  graphql`
    query HomeGalleriesNearYouRailRefetchQuery(
      $includePartnersNearIpBasedLocation: Boolean!
      $near: String
      $count: Int
      $after: String
    ) {
      # ...HomeGalleriesNearYouRail_requestLocation

      partnersConnection(
        first: $count
        after: $after
        eligibleForListing: true
        excludeFollowedPartners: true
        includePartnersNearIpBasedLocation: $includePartnersNearIpBasedLocation
        defaultProfilePublic: true
        sort: DISTANCE
        maxDistance: 100
        near: $near
        type: GALLERY
      ) {
        ...HomeGalleriesNearYouRail_partnersConnection
        edges {
          node {
            internalID
          }
        }
      }
    }
  `
)

const queryVariables = {
  includePartnersNearIpBasedLocation: true,
  count: 20,
}

export const HomeGalleriesNearYouRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeGalleriesNearYouRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeGalleriesNearYouRailQuery(
          $includePartnersNearIpBasedLocation: Boolean!
          $near: String
          $count: Int
          $after: String
        ) {
          # ...HomeGalleriesNearYouRail_requestLocation

          partnersConnection(
            first: $count
            after: $after
            eligibleForListing: true
            excludeFollowedPartners: true
            includePartnersNearIpBasedLocation: $includePartnersNearIpBasedLocation
            defaultProfilePublic: true
            sort: DISTANCE
            maxDistance: 100
            near: $near
            type: GALLERY
          ) {
            ...HomeGalleriesNearYouRail_partnersConnection
            edges {
              node {
                internalID
              }
            }
          }
        }
      `}
      variables={queryVariables}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props) {
          return (
            <HomeGalleriesNearYouRailRefetchContainer
              partnersConnection={props.partnersConnection}
            />
          )
        }

        return null
      }}
    />
  )
}
