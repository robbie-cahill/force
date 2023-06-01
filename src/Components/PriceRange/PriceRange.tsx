import { FC, useState, FormEvent } from "react"
import { Flex, Spacer, Box, Text, Range } from "@artsy/palette"
import { Histogram, HistogramBarEntity } from "./Histogram"
import { CustomRange, DEFAULT_RANGE } from "Components/PriceRange/constants"
import { NumericInput } from "Components/PriceRange/NumericInput"
import { parseRange } from "Components/PriceRange/utils/parseRange"
import { parseSliderRange } from "Components/PriceRange/utils/parseSliderRange"
import { convertToFilterFormatRange } from "Components/PriceRange/utils/convertToFilterFormatRange"
import { getValue } from "Components/PriceRange/utils/getValue"

interface PriceRangeProps {
  priceRange: string
  onPriceRangeUpdate: (range: CustomRange) => void
  bars?: HistogramBarEntity[]
}

export const PriceRange: FC<PriceRangeProps> = ({
  priceRange,
  onPriceRangeUpdate,
  bars,
}) => {
  const [range, setRange] = useState(parseRange(priceRange))
  const sliderRange = parseSliderRange(range)
  const [minValue, maxValue] = range
  const [defaultMinValue, defaultMaxValue] = DEFAULT_RANGE

  const updateRange = (updatedRange: CustomRange) => {
    setRange(updatedRange)
    onPriceRangeUpdate(updatedRange)
  }

  const handleSliderValueChange = (range: number[]) => {
    const convertedRange = convertToFilterFormatRange(range)

    updateRange(convertedRange)
  }

  const handleInputValueChange = (changedIndex: number) => (
    event: FormEvent<HTMLInputElement>
  ) => {
    const { value } = event.currentTarget
    const updatedRange = range.map((rangeValue, index) => {
      if (index === changedIndex) {
        if (value === "" || value === "0") {
          return "*"
        }

        return parseInt(value, 10)
      }

      return rangeValue
    })

    updateRange(updatedRange)
  }

  return (
    <>
      <Flex>
        <Box flex={1}>
          <Text variant="xs" mb={0.5}>
            Min
          </Text>

          <NumericInput
            label="$USD"
            name="price_min"
            min="0"
            step="100"
            aria-label="Min price"
            value={getValue(minValue)}
            onChange={handleInputValueChange(0)}
          />
        </Box>

        <Spacer x={2} />

        <Box flex={1}>
          <Text variant="xs" mb={0.5}>
            Max
          </Text>

          <NumericInput
            label="$USD"
            name="price_max"
            min="0"
            step="100"
            aria-label="Max price"
            value={getValue(maxValue)}
            onChange={handleInputValueChange(1)}
          />
        </Box>
      </Flex>

      <Spacer y={2} />

      {shouldDisplayHistogram(bars) ? (
        <Histogram
          bars={bars!}
          selectedRange={[sliderRange[0], sliderRange[1]]}
          data-testid="PriceFilterHistogram"
        />
      ) : null}

      <Spacer y={shouldDisplayHistogram(bars) ? 2 : 4} />

      <Range
        min={defaultMinValue}
        max={defaultMaxValue}
        value={sliderRange}
        onChange={handleSliderValueChange}
        step={100}
        ariaLabels={["Min price", "Max price"]}
      />

      <Flex justifyContent="space-between" mt={1}>
        <Text variant="xs" color="black60">
          ${defaultMinValue}
        </Text>

        <Text variant="xs" color="black60">
          ${defaultMaxValue}+
        </Text>
      </Flex>
    </>
  )
}

const isAllBarsEmpty = (bars: HistogramBarEntity[]) => {
  return bars.every(bar => bar.count === 0)
}

const shouldDisplayHistogram = (bars?: HistogramBarEntity[]) => {
  if (!bars) return false

  return bars.length > 0 && !isAllBarsEmpty(bars)
}
