import { Box, Button, Spacer, Text } from "@artsy/palette"
import { FC, useContext, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { ArtworkGridContextProvider } from "v2/Components/ArtworkGrid/ArtworkGridContext"
import { SystemContext, useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { AuctionClosedArtworkGrid_sale } from "v2/__generated__/AuctionClosedArtworkGrid_sale.graphql"
import { AuctionClosedArtworkGridQuery } from "v2/__generated__/AuctionClosedArtworkGridQuery.graphql"

interface AuctionClosedArtworkGridProps {
  relay: RelayPaginationProp
  sale: AuctionClosedArtworkGrid_sale
}

export const AuctionClosedArtworkGrid: FC<AuctionClosedArtworkGridProps> = ({
  sale,
  relay,
}) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSystemContext()

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(15, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  if (sale.artworksConnection!.edges!.length === 0) return null

  return (
    <>
      <Text variant="lg-display" as="h3">
        Closed Lots
      </Text>
      <Spacer mt={2} />
      <ArtworkGridContextProvider isAuctionArtwork>
        <ArtworkGrid
          artworks={sale.artworksConnection!}
          columnCount={[2, 3]}
          itemMargin={40}
          user={user}
        />
      </ArtworkGridContextProvider>
      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={handleClick} loading={loading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

const AUCTION_ARTWORK_GRID_QUERY = graphql`
  query AuctionClosedArtworkGridQuery($after: String, $saleID: String!) {
    sale(id: $saleID) {
      ...AuctionClosedArtworkGrid_sale @arguments(after: $after)
    }
  }
`

export const AuctionClosedArtworkGridPaginationContainer = createPaginationContainer(
  AuctionClosedArtworkGrid,
  {
    sale: graphql`
      fragment AuctionClosedArtworkGrid_sale on Sale
        @argumentDefinitions(after: { type: "String" }) {
        internalID
        artworksConnection(
          first: 15
          after: $after
          status: CLOSED
          cached: false
        ) @connection(key: "AuctionClosedArtworkGrid_artworksConnection") {
          edges {
            node {
              id
            }
          }
          ...ArtworkGrid_artworks
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(
      { sale: { internalID: saleID } },
      { cursor: after },
      fragmentVariables
    ) {
      return { ...fragmentVariables, after, saleID }
    },
    query: AUCTION_ARTWORK_GRID_QUERY,
  }
)

export const AuctionClosedArtworkGridQueryRenderer = ({
  saleID,
}: {
  saleID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <SystemQueryRenderer<AuctionClosedArtworkGridQuery>
      environment={relayEnvironment}
      variables={{ saleID }}
      query={AUCTION_ARTWORK_GRID_QUERY}
      render={({ props }) => {
        if (props?.sale) {
          return (
            <AuctionClosedArtworkGridPaginationContainer sale={props.sale} />
          )
        }
      }}
    />
  )
}
