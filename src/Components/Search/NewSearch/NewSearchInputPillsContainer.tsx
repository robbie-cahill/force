import {
  Box,
  Flex,
  Pill,
  ShelfNavigationProps,
  ShelfNext,
  ShelfPrevious,
  compound,
  visuallyDisableScrollbar,
} from "@artsy/palette"
import { ReactNode, useCallback } from "react"
import {
  Children,
  FC,
  createRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"

const PILLS_OPTIONS = [
  "TOP",
  "ARTWORK",
  "ARTIST",
  "ARTICLE",
  "SALE",
  "ARTIST_SERIES",
  "COLLECTION",
  "FAIR",
  "SHOW",
  "GALLERY",
]

// const GRADIENT_BG_WIDTH = 80
const CHEVRON_BTN_SIZE = 30
const CHEVRON_BTN_OFFSET = 20
const CHEVRON_CONTAINER_WIDTH = CHEVRON_BTN_OFFSET + CHEVRON_BTN_SIZE

const ChevronStyle = css`
  position: absolute;
  width: ${CHEVRON_BTN_SIZE}px;
  height: ${CHEVRON_BTN_SIZE}px;
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

// interface GradientBgProps {
//   placement: "right" | "left"
// }

// const GradientBg = styled(Box)<GradientBgProps>`
//   position: "absolute";
//   right: 0;
//   width: ${GRADIENT_BG_WIDTH}px;
//   height: ${CHEVRON_BTN_SIZE}px;
//   background: transparent;
//   background-image: linear-gradient(
//     to ${props => props.placement},
//     rgba(255, 255, 255, 0) 0%,
//     rgba(255, 255, 255, 1) 40%
//   );
// `

const PillsContainer = styled(Flex)`
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  ${visuallyDisableScrollbar}
`

const content = PILLS_OPTIONS.map((pill, index) => {
  const isLastPill = index === PILLS_OPTIONS.length - 1

  return (
    <Pill key={pill} mr={isLastPill ? 0 : 1}>
      {pill}
    </Pill>
  )
})

export const NewSearchInputPillsContainer: FC = () => {
  const pillsContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showPreviousChevron, setShowPreviousChevron] = useState<boolean>(false)
  const [showNextChevron, setShowNextChevron] = useState<boolean>(false)

  const pills = useChildrenRefs(content)
  const [offsets, setOffsets] = useState([0])
  const [index, setIndex] = useState(0)

  // console.log("[debug] offsets", offsets)

  const scrollTo = (position: number) => {
    const pillsContainer = pillsContainerRef.current

    if (!pillsContainer) {
      return
    }

    if (pillsContainer.scrollTo) {
      pillsContainer.scrollTo({
        left: position,
        behavior: "smooth",
      })

      return
    }

    pillsContainer.scrollLeft = position
  }

  const scrollToIndex = (offsetIndex: number) => {
    const position = offsets[offsetIndex]
    scrollTo(position)
  }

  const scrollToLeft = () => {
    if (index === 0) {
      scrollTo(0)
      return
    }

    scrollToIndex(index - 1)
  }

  const scrollToRight = () => {
    scrollToIndex(index + 1)
  }

  const handleScroll = useCallback(() => {
    const pillsContainer = pillsContainerRef.current

    if (!pillsContainer) {
      return
    }

    const currentScroll = pillsContainer.scrollLeft
    const maxScroll = pillsContainer.scrollWidth - pillsContainer.clientWidth
    const isAtStart = currentScroll === 0
    const isAtEnd = currentScroll === maxScroll

    const nearestIndexByOffset = offsets.findIndex((offset, i) => {
      const nextOffset = offsets[i + 1] ?? Infinity

      return (
        pillsContainer.scrollLeft >= offset &&
        pillsContainer.scrollLeft < nextOffset
      )
    })

    setShowPreviousChevron(!isAtStart)
    setShowNextChevron(!isAtEnd)
    setIndex(nearestIndexByOffset)

    console.log("[debug] nearestIndexByOffset", nearestIndexByOffset)

    console.log(
      "[debug] scroll",
      pillsContainerRef.current.scrollWidth,
      pillsContainerRef.current.clientWidth,
      pillsContainerRef.current.scrollLeft,
      maxScroll
    )
  }, [offsets])

  useEffect(() => {
    const pillsContainer = pillsContainerRef.current

    if (!pillsContainer) {
      return
    }

    pillsContainer.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      pillsContainer.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const init = useCallback(() => {
    if (!containerRef.current || !pillsContainerRef.current) {
      return
    }

    const pillsContainer = pillsContainerRef.current
    const maxScroll = pillsContainer.scrollWidth - pillsContainer.clientWidth
    const values = pills.map(({ ref }) => {
      return ref.current!.clientWidth
    })

    const compounded = compound(values)
    const formatted = compounded.map(currentOffset =>
      Math.abs(currentOffset - CHEVRON_CONTAINER_WIDTH)
    )
    const filtered = formatted.filter(value => maxScroll > value)

    console.log("[debug] result", [0, ...filtered, maxScroll])

    setOffsets([0, ...filtered, maxScroll])
  }, [pills])

  useEffect(() => {
    init()
  }, [init])

  return (
    <Flex ref={containerRef as any} alignItems="center" bg="white">
      {showPreviousChevron && (
        <Flex
          width={CHEVRON_CONTAINER_WIDTH}
          height={CHEVRON_BTN_SIZE}
          bg="red"
          position="absolute"
          left={0}
        >
          <PreviousChevron
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              scrollToLeft()
            }}
            left={CHEVRON_BTN_OFFSET}
          />
          {/* <GradientBg placement="left" /> */}
        </Flex>
      )}

      <PillsContainer ref={pillsContainerRef as any} py={2}>
        {pills.map(({ child, ref }) => (
          <Box ref={ref as any}>{child}</Box>
        ))}
      </PillsContainer>

      {showNextChevron && (
        <Flex
          width={CHEVRON_CONTAINER_WIDTH}
          height={CHEVRON_BTN_SIZE}
          bg="green"
          position="absolute"
          right={0}
        >
          <NextChevron
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              scrollToRight()
            }}
            right={CHEVRON_BTN_OFFSET}
          />
          {/* <GradientBg placement="right" /> */}
        </Flex>
      )}
    </Flex>
  )
}

const useChildrenRefs = (children: ReactNode) => {
  const cells = useMemo(() => {
    const childrenAsArray = Children.toArray(children)
    const validChildren = childrenAsArray.filter(isValidElement)
    const childrenRefs = validChildren.map(child => ({
      child,
      ref: createRef<HTMLLIElement>(),
    }))

    return childrenRefs
  }, [children])

  return cells
}
