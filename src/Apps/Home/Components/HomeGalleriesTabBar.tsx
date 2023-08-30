import { Tab, Tabs } from "@artsy/palette"
import { HomeFeaturedGalleriesRailQueryRenderer } from "Apps/Home/Components/HomeFeaturedGalleriesRail"
import { HomeGalleriesNearYouRailQueryRenderer } from "Apps/Home/Components/HomeGalleriesNearYouRail"
import { useSystemContext } from "System/useSystemContext"
import * as React from "react"

export const HomeGalleriesTabBar: React.FC = () => {
  const { user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <Tabs>
      <Tab name="Galleries Near You">
        <HomeGalleriesNearYouRailQueryRenderer />
      </Tab>
      <Tab name="Featured Galleries">
        <HomeFeaturedGalleriesRailQueryRenderer />
      </Tab>
    </Tabs>
  )
}
