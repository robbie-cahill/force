import {
  ActionType,
  ClickedGalleryGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Button, Skeleton, useToasts } from "@artsy/palette"
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
import { HomeGalleriesNearYouRail_query$data } from "__generated__/HomeGalleriesNearYouRail_query.graphql"
import { HomeGalleriesNearYouRail_requestLocation$data } from "__generated__/HomeGalleriesNearYouRail_requestLocation.graphql"
import { useState } from "react"
import { extractNodes } from "Utils/extractNodes"
import { useEffect, useCallback } from "react"

interface HomeGalleriesNearYouRailProps {
  query: HomeGalleriesNearYouRail_query$data | null
  requestLocation: HomeGalleriesNearYouRail_requestLocation$data | null
  relay: RelayRefetchProp
}

const HomeGalleriesNearYouRail: React.FC<HomeGalleriesNearYouRailProps> = ({
  query,
  relay,
  requestLocation,
}) => {
  const { trackEvent } = useTracking()
  const { sendToast } = useToasts()

  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState<GeolocationPosition | null>(null)

  const refetch = useCallback(() => {
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

        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      },
      {}
    )
  }, [position, relay])

  useEffect(() => {
    if (!position) {
      return
    }

    refetch()
  }, [refetch, position])

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      setIsLoading(true)

      refetch()

      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition(position)
          refetch()
        },
        () => {
          setIsLoading(false)

          console.error("Geolocation not supported")
          sendToast({
            variant: "error",
            message: "Could not get your location.",
          })
        }
      )
    } else {
      console.error("Geolocation not supported")
      sendToast({
        variant: "error",
        message: "Could not get your location.",
      })
    }
  }

  const NearMeButton = (
    <Button
      onClick={() => getCurrentPosition()}
      loading={isLoading}
      variant="secondaryNeutral"
      size="small"
      ml={[1, 2]}
    >
      Near Me
    </Button>
  )

  const showNearButton = !position || isLoading

  const partnersConnection = query?.partnersConnection

  const nodes = extractNodes(partnersConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Rail
        title={requestLocation?.requestLocation?.city ?? "Galleries Near You"}
        titleExtensionComponent={!!showNearButton && NearMeButton}
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
          nodes.map(node => (
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
    requestLocation: graphql`
      fragment HomeGalleriesNearYouRail_requestLocation on Query {
        requestLocation {
          city
          country
        }
      }
    `,
    query: graphql`
      fragment HomeGalleriesNearYouRail_query on Query
        @argumentDefinitions(
          includePartnersNearIpBasedLocation: { type: "Boolean!" }
          near: { type: "String" }
          count: { type: "Int" }
          after: { type: "String" }
        ) {
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
      ...HomeGalleriesNearYouRail_requestLocation

      ...HomeGalleriesNearYouRail_query
        @arguments(
          count: $count
          after: $after
          includePartnersNearIpBasedLocation: $includePartnersNearIpBasedLocation
          near: $near
        )
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
          ...HomeGalleriesNearYouRail_requestLocation

          ...HomeGalleriesNearYouRail_query
            @arguments(
              count: $count
              after: $after
              includePartnersNearIpBasedLocation: $includePartnersNearIpBasedLocation
              near: $near
            )
        }
      `}
      variables={queryVariables}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        console.log("yeah")
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        return (
          <HomeGalleriesNearYouRailRefetchContainer
            query={props}
            requestLocation={props}
          />
        )
      }}
    />
  )
}
