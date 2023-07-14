import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { AddressVerificationFlowQuery } from "__generated__/AddressVerificationFlowQuery.graphql"
import { AddressVerificationFlow_verifiedAddressResult$data } from "__generated__/AddressVerificationFlow_verifiedAddressResult.graphql"
import {
  BorderedRadio,
  Box,
  Button,
  Flex,
  ModalDialog,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { useCallback, useEffect, useState } from "react"

interface AddressVerificationFlowProps {
  verifiedAddressResult: AddressVerificationFlow_verifiedAddressResult$data
  onChosenAddress: (address: AddressValues) => void
  onClose: () => void
}

export interface AddressValues {
  addressLine1: string
  addressLine2?: string
  country: string
  city: string
  region: string
  postalCode: string
}

enum ModalType {
  SUGGESTIONS = "suggestions",
  REVIEW_AND_CONFIRM = "review_and_confirm",
}

interface AddressOption {
  key: string
  recommended: boolean
  lines: string[]
  address: AddressValues
}

enum AddressSuggestionRadioButton {
  recommended = "Recommended",
  user_address = "What you entered",
}

const AddressVerificationFlow: React.FC<AddressVerificationFlowProps> = ({
  verifiedAddressResult,
  onChosenAddress,
  onClose,
}) => {
  console.log({ queryResult: verifiedAddressResult })
  const [modalType, setModalType2] = useState<ModalType | null>(null)
  const [addressOptions, setAddressOptions2] = useState<AddressOption[]>([])

  const [selectedAddressKey, setSelectedAddressKey2] = useState<string | null>(
    null
  )

  const setModalType = (type: ModalType) => {
    console.log("modal", type)
    setModalType2(type)
  }
  const setAddressOptions = (options: AddressOption[]) => {
    console.log("options", options)
    setAddressOptions2(options)
  }
  const setSelectedAddressKey = (key: string) => {
    console.log("key", key)
    setSelectedAddressKey2(key)
  }

  const chooseAddress = useCallback(() => {
    if (!selectedAddressKey) return

    const selectedAddress = addressOptions.find(
      option => option.key === selectedAddressKey
    )
    if (selectedAddress) {
      onChosenAddress(selectedAddress.address)
    }
  }, [addressOptions, onChosenAddress, selectedAddressKey])

  useEffect(() => {
    if (addressOptions.length > 0) {
      setSelectedAddressKey(addressOptions[0].key)
    }
  }, [addressOptions])

  // Handling possibly incorrectly (by MP) possible null values
  const suggestedAddresses =
    verifiedAddressResult.suggestedAddresses ||
    ([] as NonNullable<
      NonNullable<AddressVerificationFlow_verifiedAddressResult$data>
    >["suggestedAddresses"])
  const inputAddress = verifiedAddressResult.inputAddress as NonNullable<
    NonNullable<AddressVerificationFlow_verifiedAddressResult$data>
  >["inputAddress"]
  const verificationStatus = verifiedAddressResult.verificationStatus as NonNullable<
    AddressVerificationFlow_verifiedAddressResult$data
  >["verificationStatus"]

  useEffect(() => {
    const inputOption: AddressOption = {
      ...(inputAddress as any),
      key: "userAddress",
      recommended: false,
    }

    if (verificationStatus === "VERIFIED_NO_CHANGE") {
      onChosenAddress(inputOption.address as AddressValues)
    } else {
      if (verificationStatus === "VERIFIED_WITH_CHANGES") {
        console.log("start of VERIFIED_WITH_CHANGES")
        setModalType(ModalType.SUGGESTIONS)
        const suggestedOptions = suggestedAddresses!
          .slice(0, 1)
          .map(({ address, lines }: any, index) => ({
            key: `suggestedAddress-${index}`,
            recommended: index === 0,
            lines: lines,
            address: address,
          }))
        setAddressOptions([...suggestedOptions, inputOption])

        console.log("post-select initial key")
      } else {
        setAddressOptions([inputOption])
        setModalType(ModalType.REVIEW_AND_CONFIRM)
      }
    }
  }, [
    inputAddress,
    // inputOption,
    onChosenAddress,
    suggestedAddresses,
    verificationStatus,
  ])

  console.log("pre-render")
  if (addressOptions.length === 0) return null
  console.log("rendering", { modalType, addressOptions, selectedAddressKey })
  return modalType === ModalType.SUGGESTIONS ? (
    <ModalDialog title="Confirm your delivery address" onClose={onClose}>
      <Text>
        To ensure prompt and accurate delivery, we suggest a modified shipping
        address.
      </Text>
      <Spacer y={2} />
      <RadioGroup
        defaultValue={selectedAddressKey || ""}
        onSelect={(selected: AddressOption["key"]) => {
          setSelectedAddressKey(selected)
        }}
      >
        {addressOptions.map(
          ({ key, recommended, ...addressOption }) =>
            addressOption.lines && (
              <BorderedRadio
                key={key}
                value={key}
                label={
                  recommended
                    ? AddressSuggestionRadioButton.recommended
                    : AddressSuggestionRadioButton.user_address
                }
              >
                <Flex flexDirection="column">
                  {addressOption.lines.map((line: string) => (
                    <Text variant="xs" key={line}>
                      {line}
                    </Text>
                  ))}
                </Flex>
              </BorderedRadio>
            )
        )}
      </RadioGroup>
      <Spacer y={4} />
      <Flex width="100%" justifyContent="space-between">
        <Button onClick={onClose} variant="secondaryBlack" flex={1}>
          Back to Edit
        </Button>
        <Spacer x={1} />
        <Button
          disabled={!(selectedAddressKey && selectedAddressKey.length > 0)}
          onClick={chooseAddress}
          flex={1}
        >
          Use this Address
        </Button>
      </Flex>
    </ModalDialog>
  ) : (
    <ModalDialog title="Check your delivery address" onClose={onClose}>
      <Text>
        The address you entered may be incorrect or incomplete. Please check it
        and make any changes necessary.
      </Text>
      <Spacer y={4} />
      <Text fontWeight="bold">What you entered</Text>
      <Spacer y={1} />
      <Box border="1px solid" borderColor="black30" p={2}>
        {addressOptions[0]!.lines!.map((line: string) => (
          <Text key={line}>{line}</Text>
        ))}
      </Box>
      <Spacer y={4} />
      <Flex width="100%" justifyContent="space-between">
        <Button onClick={chooseAddress} variant="secondaryBlack" flex={1}>
          Use This Address
        </Button>
        <Spacer x={1} />
        <Button onClick={onClose} flex={1}>
          Edit Address
        </Button>
      </Flex>
    </ModalDialog>
  )
}

const AddressVerificationFlowFragmentContainer = createFragmentContainer(
  AddressVerificationFlow,
  {
    verifiedAddressResult: graphql`
      fragment AddressVerificationFlow_verifiedAddressResult on VerifyAddressType {
        inputAddress {
          lines
          address {
            addressLine1
            addressLine2
            city
            country
            postalCode
            region
          }
        }
        suggestedAddresses {
          lines
          address {
            addressLine1
            addressLine2
            city
            country
            postalCode
            region
          }
        }
        verificationStatus
      }
    `,
  }
)

export const AddressVerificationFlowQueryRenderer: React.FC<{
  address: AddressValues
  onChosenAddress: (address: AddressValues) => void
  onClose: () => void
}> = ({ address, onChosenAddress, onClose }) => {
  return (
    <SystemQueryRenderer<AddressVerificationFlowQuery>
      variables={{ address }}
      placeholder={<div>... loading ... </div>}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.verifyAddress) {
          return <div>... loading ... </div>
        }

        console.warn("props change")
        return (
          <AddressVerificationFlowFragmentContainer
            verifiedAddressResult={props.verifyAddress}
            onChosenAddress={onChosenAddress}
            onClose={onClose}
          />
        )
      }}
      query={graphql`
        query AddressVerificationFlowQuery($address: AddressInput!) {
          verifyAddress(address: $address) {
            ...AddressVerificationFlow_verifiedAddressResult
          }
        }
      `}
    />
  )
}
