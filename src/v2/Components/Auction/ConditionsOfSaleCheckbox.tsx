import { Checkbox, CheckboxProps, Link, Text } from "@artsy/palette"
import React from "react"
import { data as sd } from "sharify"

export const ConditionsOfSaleCheckbox: React.FC<CheckboxProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <Checkbox selected={selected} onSelect={onSelect}>
      <Text variant="md" display="inline" color="black60" size="3t" ml={0.5}>
        {"Agree to "}
        <Text variant="md" display="inline" color="black100" size="3t">
          <Link
            color="black100"
            href={`${sd.APP_URL}/conditions-of-sale`}
            target="_blank"
          >
            Conditions of Sale
          </Link>
        </Text>
      </Text>
    </Checkbox>
  )
}
