import {
  Box,
  Flex,
  Pill,
  ShelfNavigationProps,
  ShelfNext,
  ShelfPrevious,
} from "@artsy/palette"
import { FC, useEffect, useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { NewSearchInputPills_viewer$data } from "__generated__/NewSearchInputPills_viewer.graphql"
import {
  PILLS,
  PillType,
  TOP_PILL,
} from "Components/Search/NewSearch/constants"

const ChevronStyle = css`
  position: absolute;
  width: 30px;
  height: 30px;
  @media (hover: none) {
    display: none;
  }
`

const PreviousChevron = styled(ShelfPrevious)<ShelfNavigationProps>`
  ${ChevronStyle}
`

const NextChevron = styled(ShelfNext)<ShelfNavigationProps>`
  ${ChevronStyle}
`

interface GradientBgProps {
  placement: "right" | "left"
}

const GradientBg = styled(Box)<GradientBgProps>`
  position: "absolute";
  right: 0;
  width: 100px;
  height: 30px;
  background: transparent;
  background-image: linear-gradient(
    to ${props => props.placement},
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 40%
  );
`

const PillsContainer = styled(Flex)`
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const GRADIENT_BG_WIDTH = 30

interface NewSearchInputPillsProps {
  viewer: NewSearchInputPills_viewer$data
}

const NewSearchInputPills: FC<NewSearchInputPillsProps> = ({ viewer }) => {
  const pillsRef = useRef<HTMLDivElement>(null)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  const [showPreviousChevron, setShowPreviousChevron] = useState<boolean>(false)
  const [showNextChevron, setShowNextChevron] = useState<boolean>(false)

  const aggregation = viewer.searchConnectionAggregation?.aggregations?.[0]

  const isPillDisabled = (key: string) => {
    if (key === TOP_PILL.key) {
      return false
    }

    return !aggregation?.counts?.find(agg => agg?.name === key)
  }

  // On inital load
  useEffect(() => {
    if (pillsRef.current) {
      const pillsContainer = pillsRef.current
      setShowNextChevron(
        pillsContainer.scrollWidth > pillsContainer.clientWidth
      )
    }
  }, [])

  // when screen width changes
  useEffect(() => {
    const handleResize = () => {
      if (pillsRef.current) {
        const pillsContainer = pillsRef.current
        if (pillsContainer.scrollWidth <= pillsContainer.clientWidth) {
          setShowNextChevron(false)
        } else {
          setShowNextChevron(true)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToLeft = () => {
    if (pillsRef.current) {
      const pillsContainer = pillsRef.current
      const pills = pillsContainer.children
      const currentScroll = pillsContainer.scrollLeft
      const visibleWidth = pillsContainer.offsetWidth
      let scrollBy = 0

      // Find the last visible pill and the next pill
      for (let i = pills.length - 1; i >= 0; i--) {
        const pill = pills[i] as HTMLElement
        if (
          pill.offsetLeft + pill.offsetWidth <=
          currentScroll + visibleWidth
        ) {
          const prevPill = pills[i - 1] as HTMLElement
          scrollBy = -prevPill.offsetWidth
          break
        }
      }

      pillsContainer.scrollBy({
        left: scrollBy - GRADIENT_BG_WIDTH,
        behavior: "smooth",
      })
    }
  }

  const scrollToRight = () => {
    if (pillsRef.current) {
      const pillsContainer = pillsRef.current
      const pills = pillsContainer.children
      const currentScroll = pillsContainer.scrollLeft
      let scrollBy = 0

      // Find the first visible pill and the next pill
      for (let i = 0; i < pills.length; i++) {
        const pill = pills[i] as HTMLElement
        if (pill.offsetLeft >= currentScroll) {
          const nextPill = pills[i + 1] as HTMLElement
          scrollBy = nextPill.offsetWidth
          break
        }
      }

      pillsContainer.scrollBy({
        left: scrollBy + GRADIENT_BG_WIDTH,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (pillsRef.current) {
      const currentPosition = pillsRef.current.scrollLeft
      const maxScroll =
        pillsRef.current.scrollWidth - pillsRef.current.clientWidth

      // Check if the scroll position is at the beginning or end
      if (currentPosition === 0) {
        // Hide PreviousChevron when pills is at the beginning
        setShowPreviousChevron(false)
        setShowNextChevron(true)
      } else if (currentPosition === maxScroll) {
        // Hide NextChevron when pills reaches the end
        setShowPreviousChevron(true)
        setShowNextChevron(false)
      } else {
        // Show both chevrons otherwise
        setShowPreviousChevron(true)
        setShowNextChevron(true)
      }
    }
  }

  const onPillClick = (pill: PillType) => {
    setSelectedPill(pill)
  }

  return (
    <Flex alignItems="center" bg="white">
      <Flex position="absolute" left={0} zIndex={showPreviousChevron ? 0 : -1}>
        <PreviousChevron onClick={scrollToLeft} left={2} />
        <GradientBg placement="left" />
      </Flex>

      <PillsContainer
        ref={pillsRef as any}
        px={2}
        py={2}
        onScroll={handleScroll}
      >
        {PILLS.map(pill => {
          const { key, displayName } = pill
          const selected = selectedPill.key === pill.key
          const disabled = isPillDisabled(key)

          return (
            <Pill
              key={key}
              mr={1}
              selected={selected}
              disabled={disabled}
              onClick={() => onPillClick(pill)}
            >
              {displayName}
            </Pill>
          )
        })}
      </PillsContainer>
      <Flex position="absolute" right={0} zIndex={showNextChevron ? 0 : -1}>
        <NextChevron onClick={scrollToRight} right={2} />
        <GradientBg placement="right" />
      </Flex>
    </Flex>
  )
}

export const NewSearchInputPillsFragmentContainer = createFragmentContainer(
  NewSearchInputPills,
  {
    viewer: graphql`
      fragment NewSearchInputPills_viewer on Viewer
        @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
        searchConnectionAggregation: searchConnection(
          first: 0
          mode: AUTOSUGGEST
          query: $term
          aggregations: [TYPE]
        ) {
          aggregations {
            counts {
              count
              name
            }
          }
        }
      }
    `,
  }
)
