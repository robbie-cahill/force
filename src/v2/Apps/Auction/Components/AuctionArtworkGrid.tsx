import { Box, Button, Spacer, Text } from "@artsy/palette"
import { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { ArtworkGridContextProvider } from "v2/Components/ArtworkGrid/ArtworkGridContext"
import { useSystemContext } from "v2/System"
import { AuctionArtworkGrid_sale } from "v2/__generated__/AuctionArtworkGrid_sale.graphql"
import { AuctionClosedArtworkGridQueryRenderer } from "./AuctionClosedArtworkGrid"

interface AuctionArtworkGridProps {
  relay: RelayPaginationProp
  sale: AuctionArtworkGrid_sale
}

export const AuctionArtworkGrid: FC<AuctionArtworkGridProps> = ({
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

  const ShowMoreComponent = () =>
    relay.hasMore() ? (
      <Box textAlign="center" mt={4}>
        <Button onClick={handleClick} loading={loading}>
          Show More
        </Button>
      </Box>
    ) : (
      <>
        <Spacer mt={2} />
        <AuctionClosedArtworkGridQueryRenderer saleID={sale.internalID} />
      </>
    )

  return (
    <>
      <Text variant="lg-display" as="h3">
        Open Lots
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
      <ShowMoreComponent />
    </>
  )
}

export const AUCTION_ARTWORK_GRID_QUERY = graphql`
  query AuctionArtworkGridQuery($after: String, $saleID: String!) {
    sale(id: $saleID) {
      ...AuctionArtworkGrid_sale @arguments(after: $after)
    }
  }
`

export const AuctionArtworkGridPaginationContainer = createPaginationContainer(
  AuctionArtworkGrid,
  {
    sale: graphql`
      fragment AuctionArtworkGrid_sale on Sale
        @argumentDefinitions(after: { type: "String" }) {
        internalID
        artworksConnection(
          first: 15
          after: $after
          status: OPEN
          cached: false
        ) @connection(key: "AuctionArtworkGrid_artworksConnection") {
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
