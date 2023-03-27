import { Spacer, Join, Flex, Pill } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeApp_featuredEventsOrderedSet$data } from "__generated__/HomeApp_featuredEventsOrderedSet.graphql"
import { HomeFeaturedMarketNewsQueryRenderer } from "./Components/HomeFeaturedMarketNews"
import { HomeFeaturedEventsRailFragmentContainer } from "./Components/HomeFeaturedEventsRail"
import { HomeMeta } from "./Components/HomeMeta"
import { FlashBannerQueryRenderer } from "Components/FlashBanner"
import { HomeFeaturedGalleriesRailQueryRenderer } from "./Components/HomeFeaturedGalleriesRail"
import { HomeFeaturedShowsRailQueryRenderer } from "./Components/HomeFeaturedShowsRail"
import { HomeCurrentFairsQueryRenderer } from "./Components/HomeCurrentFairs"
import { HomeTrendingArtistsRailQueryRenderer } from "./Components/HomeTrendingArtistsRail"
import { HomeAuctionLotsRailQueryRenderer } from "./Components/HomeAuctionLotsRail"
import { HomeWorksForYouTabBar } from "./Components/HomeWorksForYouTabBar"
import { MyBidsQueryRenderer } from "Apps/Auctions/Components/MyBids/MyBids"
import { HomeEmergingPicksArtworksRailQueryRenderer } from "./Components/HomeEmergingPicksArtworksRail"
import { SafeHomeContentCards } from "./Components/HomeContentCards"
import { SearchBarPills } from "Components/Search/SearchBarPills"
import { Shelf } from "Components/Shelf"
import { SearchPills } from "Components/Search/SearchBar"

interface HomeAppProps {
  featuredEventsOrderedSet: HomeApp_featuredEventsOrderedSet$data | null
}

export const HomeApp: React.FC<HomeAppProps> = ({
  featuredEventsOrderedSet,
}) => {
  return (
    <>
      <HomeMeta />

      <FlashBannerQueryRenderer />

      <Spacer y={[2, 0]} />

      <SafeHomeContentCards />

      <Spacer y={[4, 6]} />

      <Flex>
        {/* <SearchBarPills /> */}
        <Shelf showProgress={false}>
          {SearchPills.map(pill => (
            <Pill key={pill}>{pill}</Pill>
          ))}
        </Shelf>
      </Flex>

      <Join separator={<Spacer y={[6, 12]} />}>
        {featuredEventsOrderedSet && (
          <>
            <HomeFeaturedEventsRailFragmentContainer
              orderedSet={featuredEventsOrderedSet}
            />
          </>
        )}

        <MyBidsQueryRenderer />

        <HomeWorksForYouTabBar />

        <HomeEmergingPicksArtworksRailQueryRenderer />

        <HomeFeaturedMarketNewsQueryRenderer />

        <HomeAuctionLotsRailQueryRenderer />

        <HomeFeaturedShowsRailQueryRenderer />

        <HomeCurrentFairsQueryRenderer />

        <HomeFeaturedGalleriesRailQueryRenderer />

        <HomeTrendingArtistsRailQueryRenderer />
      </Join>
    </>
  )
}

export const HomeAppFragmentContainer = createFragmentContainer(HomeApp, {
  featuredEventsOrderedSet: graphql`
    fragment HomeApp_featuredEventsOrderedSet on OrderedSet {
      ...HomeFeaturedEventsRail_orderedSet
    }
  `,
})
