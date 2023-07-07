import { Text, Spacer, Column, GridColumns, Message } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { ArtistArtistSeriesRoute_artist$data } from "__generated__/ArtistArtistSeriesRoute_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { Jump } from "Utils/Hooks/useJump"
import { CellArtistSeriesFragmentContainer } from "Components/Cells/CellArtistSeries"
import { FC } from "react"

interface ArtistArtistSeriesRouteProps {
  artist: ArtistArtistSeriesRoute_artist$data
}

const ArtistArtistSeriesRoute: FC<ArtistArtistSeriesRouteProps> = ({
  artist,
}) => {
  const artistSeries = extractNodes(artist.artistSeriesConnection)

  if (artistSeries.length === 0) {
    return <Message>There aren’t any series available at this time.</Message>
  }

  return (
    <>
      <Title>{artist.name} - Series</Title>

      <Jump id="top" />

      <Text variant="xl">{artist.name} Series</Text>

      <Spacer y={6} />

      <GridColumns gridRowGap={[2, 4]}>
        {artistSeries.map(series => {
          return (
            <Column key={series.internalID} span={[6, 4, 3]}>
              <CellArtistSeriesFragmentContainer
                artistSeries={series}
                mode="GRID"
              />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ArtistArtistSeriesRouteFragmentContainer = createFragmentContainer(
  ArtistArtistSeriesRoute,
  {
    artist: graphql`
      fragment ArtistArtistSeriesRoute_artist on Artist {
        internalID
        name
        slug
        artistSeriesConnection(first: 50) {
          edges {
            node {
              ...CellArtistSeries_artistSeries
              internalID
            }
          }
        }
      }
    `,
  }
)
