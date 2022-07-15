import { Button, FilterIcon, Flex, Spacer } from "@artsy/palette"
import * as React from "react"
import { Media } from "v2/Utils/Responsive"
import { KeywordFilter } from "./KeywordFilter"
import { SortSelect } from "./SortSelect"

export const AuctionResultsControls = ({ toggleMobileActionSheet }) => {
  return (
    <Media at="xs">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Button
          size="small"
          onClick={() => toggleMobileActionSheet(true)}
          Icon={FilterIcon}
        >
          Filter
        </Button>

        <SortSelect />
      </Flex>

      <Spacer mt={2} />

      <KeywordFilter />
    </Media>
  )
}
