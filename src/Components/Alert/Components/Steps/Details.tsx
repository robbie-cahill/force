import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Flex,
  Join,
  Spacer,
  Text,
  useDidMount,
} from "@artsy/palette"
import { Formik } from "formik"
import { FC } from "react"

import { AlertNameInput } from "Components/Alert/Components/Form/AlertNameInput"
import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"
import { PriceRangeFilter } from "Components/Alert/Components/Form/PriceRange"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"

export interface AlertFormikValues {
  name: string
  push: boolean
  email: boolean
  details: string
}

export const Details: FC = () => {
  const { clickedAddFilters } = useAlertTracking()

  const { onComplete, dispatch, goToFilters, state } = useAlertContext()

  const newAlertModalFilteresEnabled = useFeatureFlag(
    "onyx_artwork_alert_modal_v2_filters"
  )
  const isMounted = useDidMount()

  return (
    <Formik<AlertFormikValues>
      initialValues={state.settings}
      onSubmit={onComplete}
    >
      {({ isSubmitting, values, setFieldValue, handleSubmit }) => {
        const transitionToFiltersAndTrack = () => {
          dispatch({ type: "SET_SETTINGS", payload: values })
          goToFilters()
          clickedAddFilters()
        }

        return (
          <Box
            maxWidth={[null, 500]}
            style={{
              ...(isMounted
                ? {
                    opacity: 1,
                    transform: "translateX(0)",
                    transition: "opacity 300ms, transform 300ms",
                  }
                : {
                    opacity: 0,
                    transform: "translateX(-10px)",
                  }),
            }}
          >
            <Flex flexDirection="column" p={2} overflowY="auto">
              <Text variant="lg">Create Alert</Text>
              <Spacer y={2} />
              <AlertNameInput />
              <Spacer y={4} />
              <Join separator={<Spacer y={4} />}>
                <Box>
                  <Text variant="sm-display" mb={1}>
                    Filters
                  </Text>
                  <Flex flexWrap="wrap" gap={1}>
                    <CriteriaPills />
                  </Flex>
                </Box>

                {newAlertModalFilteresEnabled ? (
                  <Clickable
                    data-testid="addFilters"
                    onClick={transitionToFiltersAndTrack}
                    width="100%"
                  >
                    <Flex justifyContent="space-between" alignItems={"center"}>
                      <Box>
                        <Text variant="sm-display">Add Filters:</Text>

                        <Text variant="sm" color="black60">
                          Including Price Range, Rarity, Medium, Color
                        </Text>
                      </Box>

                      <ChevronRightIcon />
                    </Flex>
                  </Clickable>
                ) : (
                  <PriceRangeFilter expanded={false} />
                )}

                <DetailsInput />

                <Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="sm-display">Email</Text>
                    <Checkbox
                      onSelect={selected => setFieldValue("email", selected)}
                      selected={values.email}
                    />
                  </Box>

                  <Spacer y={2} />

                  <Box display="flex" justifyContent="space-between">
                    <Text variant="sm-display">Push Notifications</Text>
                    <Checkbox
                      onSelect={selected => setFieldValue("push", selected)}
                      selected={values.push}
                    />
                  </Box>
                </Box>

                <Button
                  data-testid="submitCreateAlert"
                  loading={isSubmitting}
                  onClick={() => {
                    dispatch({ type: "SET_SETTINGS", payload: values })
                    handleSubmit()
                  }}
                  width="100%"
                >
                  Create Alert
                </Button>
              </Join>
            </Flex>
          </Box>
        )
      }}
    </Formik>
  )
}
