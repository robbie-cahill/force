import {
  Column,
  Expandable,
  GridColumns,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlights_artist$data } from "__generated__/ArtistCareerHighlights_artist.graphql"
import { ArtistCareerHighlightsQuery } from "__generated__/ArtistCareerHighlightsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"

interface ArtistCareerHighlightsProps {
  artist: ArtistCareerHighlights_artist$data
}

const ArtistCareerHighlights: FC<ArtistCareerHighlightsProps> = ({
  artist,
}) => {
  const insights = artist.insights
  const hasCareerHighlights = insights.length > 0

  if (!hasCareerHighlights) {
    return null
  }

  const numOfColumns = insights.length > 4 ? 2 : 1
  const mid = Math.ceil(insights.length / 2)

  return (
    <GridColumns gridRowGap={4}>
      <Column
        span={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="lg-display">Highlights and Achievements</Text>

        <Text
          variant="sm-display"
          flexShrink={0}
          as={RouterLink}
          // @ts-ignore
          to={`${artist.href}/cv`}
        >
          View {artist.name}'s CV
        </Text>
      </Column>

      <Column span={6}>
        {(numOfColumns === 2 ? insights.slice(0, mid) : insights).map(
          (insight, index) => {
            return (
              <Expandable
                key={insight.kind ?? index}
                label={insight.label}
                pb={1}
              >
                <Text variant="xs">
                  {insight.entities.length > 0
                    ? insight.entities.join(", ")
                    : insight.description}
                </Text>
              </Expandable>
            )
          }
        )}
      </Column>

      {numOfColumns === 2 && (
        <Column span={6}>
          {insights.slice(mid, insights.length).map((insight, index) => {
            return (
              <Expandable
                key={insight.kind ?? index}
                label={insight.label}
                pb={1}
              >
                <Text variant="xs">
                  {insight.entities.length > 0
                    ? insight.entities.join(", ")
                    : insight.description}
                </Text>
              </Expandable>
            )
          })}
        </Column>
      )}
    </GridColumns>
  )
}

export const ArtistCareerHighlightsFragmentContainer = createFragmentContainer(
  ArtistCareerHighlights,
  {
    artist: graphql`
      fragment ArtistCareerHighlights_artist on Artist {
        name
        href
        insights {
          entities
          description
          label
          kind
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <GridColumns gridRowGap={4}>
    <Column
      span={12}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <SkeletonText variant="lg-display">
        Highlights and Achievements
      </SkeletonText>

      <SkeletonText variant="sm-display">View Example Artist's CV</SkeletonText>
    </Column>

    {[...new Array(2)].map((_, i) => {
      return (
        <Column span={6} key={i}>
          {[...new Array(5)].map((_, j) => {
            return (
              <Expandable
                key={[i, j].join("-")}
                label={
                  <SkeletonText variant="sm-display">
                    Example Label
                  </SkeletonText>
                }
                pb={1}
                disabled
              >
                <></>
              </Expandable>
            )
          })}
        </Column>
      )
    })}
  </GridColumns>
)

export const ArtistCareerHighlightsQueryRenderer: FC<{
  id: string
}> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArtistCareerHighlightsQuery>
      lazyLoad
      variables={{ id }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtistCareerHighlightsQuery($id: String!) {
          artist(id: $id) {
            ...ArtistCareerHighlights_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.artist) {
          return (
            <ArtistCareerHighlightsFragmentContainer artist={props.artist} />
          )
        }
      }}
    />
  )
}
