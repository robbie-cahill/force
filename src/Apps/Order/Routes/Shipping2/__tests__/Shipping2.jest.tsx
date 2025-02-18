/* eslint-disable jest/no-disabled-tests */
// TODO: Re-enable tests
import { cloneDeep } from "lodash"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { ShippingFragmentContainer } from "Apps/Order/Routes/Shipping2"
import { graphql } from "react-relay"
import {
  UntouchedBuyOrder,
  UntouchedOfferOrder,
  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  UntouchedBuyOrderWithShippingQuotes,
  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
} from "Apps/__tests__/Fixtures/Order"
import {
  settingOrderShipmentSuccess,
  settingOrderArtaShipmentSuccess,
  selectShippingQuoteSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderShipping"
import { saveAddressSuccess } from "Apps/Order/Routes/__fixtures__/MutationResults/saveAddress"
import {
  Shipping2TestQuery,
  Shipping2TestQuery$rawResponse,
} from "__generated__/Shipping2TestQuery.graphql"
import { screen, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useFeatureFlag } from "System/useFeatureFlag"
import {
  fillAddressForm,
  validAddress,
} from "Components/__tests__/Utils/addressForm2"
import userEvent from "@testing-library/user-event"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { queryByAttribute } from "@testing-library/dom"
import { ErrorDialogMessage } from "Apps/Order/Utils/getErrorDialogCopy"
import { within } from "@testing-library/dom"
import {
  createMockEnvironment,
  MockEnvironment,
  MockPayloadGenerator,
} from "relay-test-utils"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ title, children, onClose, footer }) => {
      return (
        <div data-testid="ModalDialog">
          <button onClick={onClose}>close</button>
          {title}
          {children}
          {footer}
        </div>
      )
    },
  }
})

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

const mockShowErrorDialog = jest.fn()
jest.mock("Apps/Order/Dialogs", () => ({
  ...jest.requireActual("Apps/Order/Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const order = {
  ...UntouchedBuyOrder,
}

const pageInfo = {
  startCursor: "aaa",
  endCursor: "bbb",
  hasNextPage: false,
  hasPreviousPage: false,
}

const meWithoutAddress: Shipping2TestQuery$rawResponse["me"] = {
  name: "Test Name",
  email: "test@gmail.com",
  id: "4321",
  location: {
    id: "123",
    country: "United States",
  },
  addressConnection: {
    totalCount: 0,
    edges: [],
    pageInfo,
  },
}

const meWithAddresses: Shipping2TestQuery$rawResponse["me"] = Object.assign(
  {},
  meWithoutAddress,
  {
    addressConnection: {
      totalCount: 0,
      edges: [
        {
          node: {
            __typename: "UserAddress",
            internalID: "1",
            addressLine1: "1 Main St",
            addressLine2: "",
            addressLine3: "",
            city: "Madrid",
            country: "ES",
            isDefault: false,
            name: "Test Name",
            phoneNumber: "555-555-5555",
            postalCode: "28001",
            region: "",
            id: "addressID1",
          },
          cursor: "aaa",
        },
        {
          node: {
            __typename: "UserAddress",
            internalID: "2",
            addressLine1: "401 Broadway",
            addressLine2: "Floor 25",
            addressLine3: "",
            city: "New York",
            country: "US",
            isDefault: true,
            name: "Test Name",
            phoneNumber: "422-424-4242",
            postalCode: "10013",
            region: "NY",
            id: "addressID2",
          },
          cursor: "aaa",
        },
      ],
      pageInfo,
    },
  }
)

const saveAndContinue = async () => {
  await waitFor(() => userEvent.click(screen.getByText("Save and Continue")))
}

const recommendedAddress = {
  addressLine1: "401 Broadway Suite 25",
  addressLine2: null,
  city: "New York",
  region: "NY",
  postalCode: "10013",
  country: "US",
}

// TODO: Is there a better way than matching on the error string?
const getAllInputErrors = () => {
  return screen.getAllByText(/[\w\s]is required/)
}

const verifyAddressWithSuggestions = async (
  mockResolveLastOperation,
  input,
  suggested
) => {
  const addressLines = addr => {
    return [
      addr.addressLine1,
      addr.addressLine2,
      `${addr.city}, ${addr.region} ${addr.postalCode}`,
      addr.country,
    ]
  }

  const suggestedAddress = suggested
    ? { ...recommendedAddress, ...suggested }
    : recommendedAddress

  const { operationName, operationVariables } = await waitFor(() => {
    return mockResolveLastOperation({
      VerifyAddressPayload: () => ({
        verifyAddressOrError: {
          __typename: "VerifyAddressType",
          verificationStatus: "VERIFIED_WITH_CHANGES",
          suggestedAddresses: [
            {
              lines: addressLines(suggestedAddress),
              address: suggestedAddress,
            },
          ],
          inputAddress: {
            lines: addressLines(validAddress),
            address: validAddress,
          },
        },
      }),
    })
  })

  expect(operationName).toBe("AddressVerificationFlowQuery")
  expect(operationVariables).toEqual({
    address: {
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2,
      city: input.city,
      region: input.region,
      postalCode: input.postalCode,
      country: input.country,
    },
  })

  expect(await screen.findByText("Confirm your delivery address")).toBeVisible()
  expect(await screen.findByText("Recommended")).toBeVisible()
  expect(await screen.findByText("What you entered")).toBeVisible()
}

const resolveSaveFulfillmentDetails = async (
  mockResolveLastOperation,
  commerceSetShipping
) =>
  await waitFor(() =>
    mockResolveLastOperation({
      CommerceSetShippingPayload: () => commerceSetShipping,
    })
  )

describe("Shipping", () => {
  let isCommittingMutation: boolean
  let relayEnv: MockEnvironment
  const mockPush = jest.fn()

  beforeEach(() => {
    isCommittingMutation = false
    relayEnv = createMockEnvironment()
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const { renderWithRelay } = setupTestWrapperTL<Shipping2TestQuery>({
    Component: props => (
      <MockBoot relayEnvironment={relayEnv}>
        <ShippingFragmentContainer
          order={props.order!}
          me={props.me!}
          router={{ push: mockPush } as any}
          // @ts-ignore // Is the return type for injectCommitMutation wrong?
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query Shipping2TestQuery @relay_test_operation @raw_response_type {
        order: commerceOrder(id: "unused") {
          ...Shipping2_order
        }
        me {
          ...Shipping2_me
        }
      }
    `,
  })

  describe("with partner shipping", () => {
    describe("with no saved address", () => {
      it("shows an active offer stepper if it's an offer order", async () => {
        renderWithRelay(
          {
            CommerceOrder: () => UntouchedOfferOrder,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        expect(screen.getAllByRole("button", { name: "Offer" }).length).toBe(2)
      })

      it("renders fulfillment selection if artwork is available for pickup", async () => {
        renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        expect(screen.getByText("Delivery method")).toBeVisible()
        expect(screen.getByRole("radio", { name: "Shipping" })).toBeVisible()
        expect(
          screen.getByRole("radio", { name: /Arrange for pickup/ })
        ).toBeVisible()
      })

      it("does not render fulfillment selection if artwork is not available for pickup", async () => {
        const shippingOnlyOrder = cloneDeep(order) as any
        shippingOnlyOrder.lineItems.edges[0].node.artwork.pickup_available = false

        renderWithRelay(
          {
            CommerceOrder: () => shippingOnlyOrder,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        expect(screen.queryByText("Delivery method")).not.toBeInTheDocument()
        expect(
          screen.queryByRole("radio", { name: "Shipping" })
        ).not.toBeInTheDocument()
        expect(
          screen.queryByRole("radio", { name: /Arrange for pickup/ })
        ).not.toBeInTheDocument()
      })

      it("sets and disables country select if artwork only ships domestically and is not in the EU", async () => {
        const domesticShippingNonEUOrder = cloneDeep(order) as any
        const artwork =
          domesticShippingNonEUOrder.lineItems.edges[0].node.artwork

        Object.assign(artwork, {
          onlyShipsDomestically: true,
          euShippingOrigin: false,
          shippingCountry: "US",
        })

        renderWithRelay(
          {
            CommerceOrder: () => domesticShippingNonEUOrder,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        expect(screen.getByTestId("AddressForm_country")).toHaveValue("US")
        expect(screen.getByTestId("AddressForm_country")).toBeDisabled()
      })

      it("sets and enables country select if artwork only ships domestically and is in the EU", async () => {
        const domesticShippingEUOrder = cloneDeep(order) as any
        const artwork = domesticShippingEUOrder.lineItems.edges[0].node.artwork

        Object.assign(artwork, {
          onlyShipsDomestically: true,
          euShippingOrigin: true,
          shippingCountry: "IT",
        })

        renderWithRelay(
          {
            CommerceOrder: () => domesticShippingEUOrder,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        expect(screen.getByTestId("AddressForm_country")).toHaveValue("IT")
        expect(screen.getByTestId("AddressForm_country")).toBeEnabled()
      })

      it("sets shipping on order, saves address on user and advances to payment", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => ({ ...order, __id: order.id }),
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()

        const fulfillmentRequest = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(fulfillmentRequest.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(fulfillmentRequest.operationVariables).toMatchObject({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP",
            phoneNumber: validAddress.phoneNumber,
            shipping: {
              ...validAddress,
              phoneNumber: "",
            },
          },
        })

        const createAddressOperation = await waitFor(() =>
          mockResolveLastOperation({
            CommerceCreateUserAddressPayload: () => saveAddressSuccess,
          })
        )
        expect(createAddressOperation.operationName).toBe(
          "useCreateSavedAddressMutation"
        )
        expect(createAddressOperation.operationVariables).toMatchObject({
          input: {
            attributes: validAddress,
          },
        })
        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
        })
      })

      it("save address not checked: sets shipping on order and advances to payment without saving address", async () => {
        const { env, mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await userEvent.click(
          screen.getByRole("checkbox", { name: /Save shipping address/ })
        )
        await saveAndContinue()

        const fulfillmentRequest = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(fulfillmentRequest.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )
        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
        })
        expect(() => env.mock.getMostRecentOperation()).toThrow()
      })

      it("shows the button spinner while loading the mutation", async () => {
        isCommittingMutation = true
        renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        const button = screen.getByRole("button", { name: "Save and Continue" })
        expect(queryByAttribute("class", button, /Spinner/)).toBeInTheDocument()
      })

      it("shows a generic error when there is an unrecognized error code in the result", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()
        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "validation",
              code: "something_new",
              data: null,
            },
          },
        })
        await waitFor(() => {
          expect(mockShowErrorDialog).toHaveBeenCalledWith()
        })
      })

      it("shows an error when the mutation throws an error", async () => {
        const { mockRejectLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()
        await waitFor(() => mockRejectLastOperation(new Error("wrong number")))
        await waitFor(() => expect(mockShowErrorDialog).toHaveBeenCalledWith())
      })

      it("shows an error when there is a missing_country error from the server", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()

        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "validation",
              code: "missing_country",
              data: null,
            },
          },
        })
        await waitFor(() =>
          expect(mockShowErrorDialog).toHaveBeenCalledWith({
            title: "Invalid address",
            message:
              "There was an error processing your address. Please review and try again.",
          })
        )
      })

      it("shows an error when there is a missing_region error from the server", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()

        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "validation",
              code: "missing_region",
              data: null,
            },
          },
        })
        await waitFor(() =>
          expect(mockShowErrorDialog).toHaveBeenCalledWith({
            title: "Invalid address",
            message:
              "There was an error processing your address. Please review and try again.",
          })
        )
      })

      it("shows an error when there is a destination_could_not_be_geocodederror from the server", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()

        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "arta",
              code: "destination_could_not_be_geocoded",
              data:
                '{"status":422,"errors":{"destination":["could not be geocoded"]}}',
            },
          },
        })
        expect(mockShowErrorDialog).toHaveBeenCalledWith({
          title: "Cannot calculate shipping",
          message: (
            <ErrorDialogMessage message="Please confirm that your address details are correct and try again. If the issue continues contact orders@artsy.net." />
          ),
        })
      })

      it("pre-populates address form for order with already persisted shipping info", async () => {
        renderWithRelay(
          {
            CommerceOrder: () => ({
              ...order,
              requestedFulfillment: {
                ...validAddress,
                __typename: "CommerceShip",
                name: "Dr Collector",
              },
            }),
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        expect(screen.getByPlaceholderText("Full name")).toHaveValue(
          "Dr Collector"
        )
      })

      it("resets shipping for order with already persisted shipping info", async () => {
        const { env, mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => ({
              ...order,
              requestedFulfillment: {
                ...validAddress,
                __typename: "CommerceShip",
                name: "Dr Collector",
              },
            }),
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await saveAndContinue()

        const fulfillmentRequest = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(fulfillmentRequest.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(fulfillmentRequest.operationVariables).toMatchObject({
          // Fill in when test is fixed
        })
        await flushPromiseQueue()
        expect(() => env.mock.getMostRecentOperation()).toThrow()
      })

      describe("form validations", () => {
        it("does not submit an empty form", async () => {
          const { env } = renderWithRelay(
            {
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            },
            undefined,
            relayEnv
          )

          await saveAndContinue()
          await flushPromiseQueue()
          expect(() => env.mock.getMostRecentOperation()).toThrow()
        })

        it("does not submit an incomplete form", async () => {
          const { env } = renderWithRelay(
            {
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            },
            undefined,
            relayEnv
          )

          await userEvent.paste(
            screen.getByPlaceholderText("Full name"),
            "First Last"
          )

          await saveAndContinue()
          await flushPromiseQueue()
          expect(() => env.mock.getMostRecentOperation()).toThrow()
        })

        it("requires some fields", async () => {
          renderWithRelay(
            {
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            },
            undefined,
            relayEnv
          )

          await saveAndContinue()
          await waitFor(() =>
            expect(getAllInputErrors().map(el => el.textContent)).toEqual([
              "Full name is required",
              "Street address is required",
              "City is required",
              "State is required",
              "ZIP code is required",
              "Phone number is required",
            ])
          )
        })

        it("requires a phone number", async () => {
          renderWithRelay(
            {
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            },
            undefined,
            relayEnv
          )

          await fillAddressForm({
            name: "Erik David",
            addressLine1: "401 Broadway",
            addressLine2: "",
            city: "New York",
            region: "NY",
            postalCode: "10013",
            phoneNumber: "",
            country: "US",
          })
          await saveAndContinue()

          await waitFor(() =>
            expect(
              screen.getByText("Phone number is required")
            ).toBeInTheDocument()
          )
        })

        // TODO: New custom postal code validator needs to be relaxed to pass this
        it.skip("allows a missing postal code and state/province if the selected country is not US or Canada", async () => {
          const { mockResolveLastOperation } = renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          await fillAddressForm({
            name: "Erik David",
            addressLine1: "401 Broadway",
            addressLine2: "",
            city: "New York",
            region: "",
            postalCode: "",
            phoneNumber: "5555937743",
            country: "AQ",
          })

          await saveAndContinue()
          await resolveSaveFulfillmentDetails(
            mockResolveLastOperation,
            settingOrderShipmentSuccess.commerceSetShipping
          )

          expect(
            screen.queryByText(/[\w\s]is required/)
          ).not.toBeInTheDocument()
        })

        it("only shows validation errors on touched inputs before submission", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          const name = screen.getByPlaceholderText("Full name")
          userEvent.type(name, "First Last")
          userEvent.clear(name)
          userEvent.tab()

          await waitFor(async () => {
            expect(getAllInputErrors().map(el => el.textContent)).toEqual([
              "Full name is required",
            ])
          })
        })

        it("shows all validation errors including untouched inputs after submission", async () => {
          renderWithRelay(
            {
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            },
            undefined,
            relayEnv
          )

          const name = screen.getByPlaceholderText("Full name")
          userEvent.type(name, "First Last")
          userEvent.clear(name)

          await saveAndContinue()
          await waitFor(() =>
            expect(getAllInputErrors().length).toBeGreaterThan(1)
          )
        })
      })

      describe("address verification", () => {
        describe("with US enabled and international disabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
          })

          it("triggers basic form validation before address verification", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            expect(
              screen.queryByText(/[\w\s]is required/)
            ).not.toBeInTheDocument()

            await fillAddressForm(validAddress)
            userEvent.clear(screen.getByPlaceholderText("Street address"))

            await userEvent.click(screen.getByText("Save and Continue"))

            await waitFor(() => {
              expect(
                screen.getByText("Street address is required")
              ).toBeVisible()
            })
            expect(() => env.mock.getMostRecentOperation()).toThrow()
          })

          it("triggers the flow for US address after clicking continue", async () => {
            const { env, mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await userEvent.click(screen.getByText("Save and Continue"))

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddress,
              recommendedAddress
            )

            expect(() => env.mock.getMostRecentOperation()).toThrow()
          })

          it("uses recommended address", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await userEvent.click(screen.getByText("Save and Continue"))

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddress,
              recommendedAddress
            )

            await userEvent.click(screen.getByText("Use This Address"))
            await flushPromiseQueue()
            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )
            const createAddressOperation = await waitFor(() =>
              mockResolveLastOperation({
                CommerceCreateUserAddressPayload: () => saveAddressSuccess,
              })
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...recommendedAddress,
                  name: "Erik David",
                  phoneNumber: "",
                },
              },
            })
            expect(createAddressOperation.operationName).toBe(
              "useCreateSavedAddressMutation"
            )
          })

          it("goes back and edits address after verification", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            const initialAddress = { ...validAddress, city: "New York" }
            await fillAddressForm(initialAddress)
            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddress,
              recommendedAddress
            )

            // Clicking "Back to Edit" allows users to edit the address form
            // and requires clicking "Save and Continue" to proceed.
            await userEvent.click(screen.getByText("Back to Edit"))
            await userEvent.paste(
              screen.getByPlaceholderText("City"),
              ": the big apple"
            )
            await flushPromiseQueue()
            await saveAndContinue()
            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "USER",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...initialAddress,
                  city: "New York: the big apple",

                  name: "Erik David",
                  phoneNumber: "",
                },
              },
            })
          })

          it("does not triggers the flow for international address after clicking continue", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            userEvent.selectOptions(screen.getByTestId("AddressForm_country"), [
              "TW",
            ])
            await flushPromiseQueue()
            await userEvent.click(screen.getByText("Save and Continue"))

            expect(() => env.mock.getMostRecentOperation()).toThrow()
          })
        })

        describe("with US disabled and international enabled", () => {
          let inputAddress
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) =>
                featureName === "address_verification_intl"
            )
            inputAddress = { ...validAddress, country: "TW" }
          })

          it("does not trigger the flow for US address after clicking continue", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await saveAndContinue()

            const { operationName } = await waitFor(() =>
              mockResolveLastOperation({})
            )
            expect(operationName).toBe("useSaveFulfillmentDetailsMutation")
          })

          it("triggers the flow for international address after clicking continue", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(inputAddress)
            await userEvent.selectOptions(
              screen.getByTestId("AddressForm_country"),
              ["TW"]
            )
            await userEvent.click(screen.getByText("Save and Continue"))

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              inputAddress,
              {
                ...inputAddress,
                addressLine1: "<recommended change>",
              }
            )
            await userEvent.click(screen.getByText("Use This Address"))
            await flushPromiseQueue()
            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...inputAddress,
                  addressLine1: "<recommended change>",
                  name: "Erik David",
                  phoneNumber: "",
                },
              },
            })
          })
        })
      })
    })

    // TODO: Reproducing saved address behavior ticketed in EMI-1520 https://artsyproduct.atlassian.net/browse/EMI-1520
    // e.g.: Should valid saved address be automatically saved to show shipping quotes?
    describe("with saved addresses", () => {
      it("does not show the new address form", async () => {
        renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithAddresses,
          },
          undefined,
          relayEnv
        )

        // TODO: need a better way to check if the form is collapsed (height 0).
        // Zero height is not considered invisible.
        // https://github.com/testing-library/jest-dom/issues/450
        expect(screen.getByPlaceholderText("Street address")).toHaveAttribute(
          "tabindex",
          "-1"
        )
      })

      it("lists the addresses and renders the add address option", async () => {
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        expect(
          screen.getByRole("radio", { name: /401 Broadway/ })
        ).toBeVisible()
        expect(screen.getByRole("radio", { name: /1 Main St/ })).toBeVisible()
        expect(
          screen.getByRole("button", { name: "Add a new address" })
        ).toBeVisible()
      })

      // TODO: EMI-1520
      // TODO it("automatically saves the default saved address on load if valid", async () => {})
      // TODO it("automatically re-saves the existing already-saved address if present", async () => {})

      it("sets shipping with the first saved address and phone number when user submits the form directly", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithAddresses,
          },
          undefined,
          relayEnv
        )

        // This test may be in conflict with the above, but silently passing. Confirm behavior
        // TODO: Confirm whether this behavior is desired for EMI-1520
        // (Or only when shipping quotes are required)
        // await resolveFulfillmentDetails(mockResolveLastOperation,
        //  settingOrderShipmentSuccess.commerceSetShipping,
        // )
        await saveAndContinue()

        const fulfillmentMutation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(fulfillmentMutation.operationName).toEqual(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(fulfillmentMutation.operationVariables).toEqual({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP",
            phoneNumber: "422-424-4242",
            shipping: {
              addressLine1: "401 Broadway",
              addressLine2: "Floor 25",
              city: "New York",
              country: "US",
              name: "Test Name",
              phoneNumber: "",
              postalCode: "10013",
              region: "NY",
            },
          },
        })
      })

      it("sets shipping with the selected saved address and phone number", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () => order,
            Me: () => meWithAddresses,
          },
          undefined,
          relayEnv
        )
        // Set shipping on load for the default address
        // TODO: Confirm whether this behavior is desired for EMI-1520
        // (Or only when shipping quotes are required) and if so add this initial
        // operation resolver
        // await resolveFulfillmentDetails(mockResolveLastOperation,
        //  settingOrderShipmentSuccess.commerceSetShipping,
        // )
        await userEvent.click(screen.getByRole("radio", { name: /1 Main St/ }))
        // This test may be in conflict with the above, but silently passing. Confirm behavior
        await saveAndContinue()

        const fulfillmentMutation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )
        expect(fulfillmentMutation.operationName).toEqual(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(fulfillmentMutation.operationVariables).toEqual({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP",
            phoneNumber: "555-555-5555",
            shipping: {
              addressLine1: "1 Main St",
              addressLine2: "",
              city: "Madrid",
              country: "ES",
              name: "Test Name",
              phoneNumber: "",
              postalCode: "28001",
              region: "",
            },
          },
        })
      })

      describe("address verification", () => {
        describe("with address verification enabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
          })

          it("does not trigger the flow", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithAddresses,
              },
              undefined,
              relayEnv
            )
            await userEvent.click(
              screen.getByRole("radio", { name: /1 Main St/ })
            )

            await saveAndContinue()

            const { operationName } = await waitFor(() =>
              mockResolveLastOperation({})
            )
            expect(operationName).toBe("useSaveFulfillmentDetailsMutation")
          })
        })
      })

      describe("editing address", () => {
        // Failing: Double elements on screen
        it.skip("opens a modal with the address prepopulated", async () => {
          renderWithRelay(
            {
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => meWithAddresses,
            },
            undefined,
            relayEnv
          )

          // Set shipping on load for the default address
          // TODO: Confirm whether this behavior is desired for EMI-1520
          // (or only when shipping quotes are required)
          // await resolveFulfillmentDetails(mockResolveLastOperation,
          //   settingOrderShipmentSuccess.commerceSetShipping,
          // )

          const selectedAddress = screen.getByRole("radio", {
            name: /401 Broadway/,
            checked: true,
          })
          await userEvent.click(within(selectedAddress).getByText("Edit"))

          await waitFor(async () => {
            expect(screen.getByText("Edit address")).toBeVisible()
            expect(screen.getByDisplayValue("401 Broadway")).toBeInTheDocument()
            expect(screen.getByDisplayValue("Floor 25")).toBeInTheDocument()
            expect(screen.getByDisplayValue("New York")).toBeInTheDocument()
            expect(screen.getByDisplayValue("NY")).toBeInTheDocument()
            expect(screen.getByDisplayValue("10013")).toBeInTheDocument()
          })
        })

        // TODO: Address should be saved to order on update
        it.skip("updates the address after submitting the modal form", async () => {
          const { mockResolveLastOperation } = renderWithRelay(
            {
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => meWithAddresses,
            },
            undefined,
            relayEnv
          )
          // Set shipping on load for the default address
          // TODO: Confirm whether this behavior is desired for EMI-1520
          // (Or only when shipping quotes are required)
          // await resolveFulfillmentDetails(mockResolveLastOperation,
          //  settingOrderShipmentSuccess.commerceSetShipping,
          // )

          const selectedAddress = screen.getByRole("radio", {
            name: /401 Broadway/,
            checked: true,
          })
          await userEvent.click(within(selectedAddress).getByText("Edit"))

          const modalTitle = screen.getByText("Edit address")
          expect(modalTitle).toBeVisible()

          // TODO: need a better way to get a specific input field from multiple forms
          const addressLine2 = screen.getAllByPlaceholderText(
            /Apt, floor, suite/
          )[0]
          userEvent.clear(addressLine2)
          userEvent.paste(addressLine2, "25th fl.")
          userEvent.click(screen.getByRole("button", { name: "Save" }))
          await flushPromiseQueue()
          const createAddressOperation = await waitFor(() =>
            mockResolveLastOperation({
              CommerceCreateUserAddressPayload: () => saveAddressSuccess,
            })
          )
          // const saveFulfillmentOperation = await resolveFulfillmentDetails(mockResolveLastOperation,
          //  settingOrderShipmentSuccess.commerceSetShipping,
          // )
          expect(createAddressOperation.operationName).toEqual(
            "useUpdateSavedAddressMutation"
          )
          expect(createAddressOperation.operationVariables).toMatchObject({
            input: {
              attributes: {
                addressLine1: "401 Broadway",
                addressLine2: "25th fl.",
                city: "New York",
                country: "US",
                name: "Test Name",
                phoneNumber: "422-424-4242",
                postalCode: "10013",
                region: "NY",
              },
              userAddressID: "2",
            },
          })
        })
      })
    })
  })

  describe("with Artsy shipping", () => {
    describe("with no saved address", () => {
      describe("address verification", () => {
        describe("with US enabled and international disabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
          })

          it("uses recommended address", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddress,
              recommendedAddress
            )

            await userEvent.click(screen.getByText("Use This Address"))
            await flushPromiseQueue()

            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderArtaShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...recommendedAddress,
                  name: "Erik David",
                  phoneNumber: "",
                },
              },
            })
            const createAddressOperation = await waitFor(() =>
              mockResolveLastOperation({
                CommerceCreateUserAddressPayload: () => saveAddressSuccess,
              })
            )
            expect(createAddressOperation.operationName).toBe(
              "useCreateSavedAddressMutation"
            )

            await waitFor(() => userEvent.click(screen.getByText(/^Premium/)))
            await saveAndContinue()

            const selectShippingOptionOperation = await waitFor(() =>
              mockResolveLastOperation({
                CommerceSelectShippingOptionPayload: () =>
                  selectShippingQuoteSuccess.commerceSelectShippingOption,
              })
            )
            expect(selectShippingOptionOperation.operationName).toBe(
              "useSelectShippingQuoteMutation"
            )
          })

          it("goes back and edits address after verification", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddress,
              recommendedAddress
            )

            // Clicking "Back to Edit" allows users to edit the address form
            // and requires clicking "Save and Continue" to proceed.
            userEvent.click(screen.getByText("Back to Edit"))
            await userEvent.click(screen.getByText("Save and Continue"))
            await flushPromiseQueue()

            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderArtaShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                addressVerifiedBy: "USER",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...validAddress,
                  addressLine2: "",
                  name: "Erik David",
                  phoneNumber: "",
                },
              },
            })
            const createAddressOperation = await waitFor(() =>
              mockResolveLastOperation({
                CommerceCreateUserAddressPayload: () => saveAddressSuccess,
              })
            )
            expect(createAddressOperation.operationName).toBe(
              "useCreateSavedAddressMutation"
            )

            await waitFor(() => userEvent.click(screen.getByText(/^Premium/)))
            await saveAndContinue()

            const selectShippingOptionOperation = await waitFor(() =>
              mockResolveLastOperation({
                CommerceSelectShippingOptionPayload: () =>
                  selectShippingQuoteSuccess.commerceSelectShippingOption,
              })
            )
            expect(selectShippingOptionOperation.operationName).toBe(
              "useSelectShippingQuoteMutation"
            )
          })
        })
      })

      it("shows an error if Arta doesn't return shipping quotes", async () => {
        const settingOrderArtaShipmentSuccessWithoutQuotes = cloneDeep(
          settingOrderArtaShipmentSuccess
        ) as any
        settingOrderArtaShipmentSuccessWithoutQuotes.commerceSetShipping.orderOrError.order.lineItems.edges[0].node.shippingQuoteOptions.edges = []

        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () =>
              UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccessWithoutQuotes.commerceSetShipping
        )

        expect(
          screen.queryByRole("radio", { name: /Standard/ })
        ).not.toBeInTheDocument()
        expect(
          screen.getByText(
            /In order to provide a shipping quote, we need some more information from you./
          )
        ).toBeInTheDocument()
      })

      it.skip("removes saved address if save address is deselected after fetching shipping quotes", async () => {
        const { mockResolveLastOperation } = renderWithRelay(
          {
            CommerceOrder: () =>
              UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
            Me: () => meWithoutAddress,
          },
          undefined,
          relayEnv
        )

        await fillAddressForm(validAddress)
        await saveAndContinue()

        const fulfillmentOperation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccess.commerceSetShipping
        )
        expect(fulfillmentOperation.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )

        const saveAddressOperation = await waitFor(() =>
          mockResolveLastOperation({
            CommerceCreateUserAddressPayload: () => saveAddressSuccess,
          })
        )

        expect(saveAddressOperation.operationName).toBe(
          "useCreateSavedAddressMutation"
        )
        // FIXME: `getByRole` can be slow and cause test to time out.
        // https://github.com/testing-library/dom-testing-library/issues/552#issuecomment-625172052
        const premiumShipping = await screen.findByRole("radio", {
          name: /Premium/,
        })

        userEvent.click(premiumShipping)
        userEvent.click(screen.getByText(/^Save shipping address/))

        await saveAndContinue()

        const selectShippingOptionOperation = await waitFor(() =>
          mockResolveLastOperation({
            CommerceSelectShippingOptionPayload: () =>
              selectShippingQuoteSuccess.commerceSelectShippingOption,
          })
        )
        expect(selectShippingOptionOperation.operationName).toBe(
          "useSelectShippingQuoteMutation"
        )

        const deleteAddressOperation = await waitFor(() =>
          mockResolveLastOperation({
            DeleteUserAddressPayload: () => saveAddressSuccess,
          })
        )
        expect(deleteAddressOperation.operationName).toBe(
          "useDeleteSavedAddressMutation"
        )
        expect(deleteAddressOperation.operationVariables).toEqual({
          input: {
            userAddressID: "address-id",
          },
        })
      })
    })

    // TODO: EMI-1526 https://artsyproduct.atlassian.net/browse/EMI-1526
    describe.skip("with saved addresses", () => {
      describe("Artsy shipping international only", () => {
        describe("with artwork located in the US", () => {
          it.skip("sets shipping on order if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
                Me: () => meWithDefaultAddressInSpain,
              },
              undefined,
              relayEnv
            )
            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "555-555-5555",
                shipping: {
                  addressLine1: "1 Main St",
                  addressLine2: "",
                  city: "Madrid",
                  country: "ES",
                  name: "Test Name",
                  phoneNumber: "555-555-5555",
                  postalCode: "28001",
                  region: "",
                },
              },
            })
          })

          it.skip("does not set shipping on order automatically if the collector is in the US", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
                Me: () => meWithAddresses,
              },
              undefined,
              relayEnv
            )
            await flushPromiseQueue()

            expect(() => env.mock.getMostRecentOperation()).toThrow()
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })
        })

        describe("with artwork located in Germany", () => {
          it.skip("does not set shipping on order automatically if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { env } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
                Me: () => meWithDefaultAddressInSpain,
              },
              undefined,
              relayEnv
            )
            await flushPromiseQueue()

            expect(() => env.mock.getMostRecentOperation()).toThrow()
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })

          it.skip("sets shipping on order automatically if the collector is in the US", async () => {
            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
                Me: () => meWithAddresses,
              },
              undefined,
              relayEnv
            )
            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "422-424-4242",
                shipping: {
                  addressLine1: "401 Broadway",
                  addressLine2: "Floor 25",
                  city: "New York",
                  country: "US",
                  name: "Test Name",
                  phoneNumber: "422-424-4242",
                  postalCode: "10013",
                  region: "NY",
                },
              },
            })
          })
        })
      })

      describe("Artsy shipping domestic only", () => {
        describe("with artwork located in Germany", () => {
          it.skip("sets shipping on order if the collector is in Germany", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { mockResolveLastOperation } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
                Me: () => meWithDefaultAddressInSpain,
              },
              undefined,
              relayEnv
            )
            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "555-555-5555",
                shipping: {
                  addressLine1: "1 Main St",
                  addressLine2: "",
                  city: "Madrid",
                  country: "ES",
                  name: "Test Name",
                  phoneNumber: "555-555-5555",
                  postalCode: "28001",
                  region: "",
                },
              },
            })
          })

          it.skip("does not set shipping on order if the collector is in the US", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
                Me: () => meWithAddresses,
              },
              undefined,
              relayEnv
            )
            await flushPromiseQueue()

            expect(() => env.mock.getMostRecentOperation()).toThrow()
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })
        })

        describe("with artwork located in the US", () => {
          it.skip("does not fetch or show shipping quotes if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { env } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithDefaultAddressInSpain,
              },
              undefined,
              relayEnv
            )
            await flushPromiseQueue()

            expect(() => env.mock.getMostRecentOperation()).toThrow()
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })

          describe("with the collector in the US", () => {
            it.skip("sets shipping with the default address on load", async () => {
              const { mockResolveLastOperation } = renderWithRelay({
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithAddresses,
              })
              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )
              expect(fulfillmentRequest.operationVariables).toEqual({
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "422-424-4242",
                shipping: {
                  addressLine1: "401 Broadway",
                  addressLine2: "Floor 25",
                  city: "New York",
                  country: "US",
                  name: "Test Name",
                  phoneNumber: "422-424-4242",
                  postalCode: "10013",
                  region: "NY",
                },
              })
            })

            it.skip("shows shipping quotes for the default address on load", async () => {
              const { mockResolveLastOperation } = renderWithRelay(
                {
                  CommerceOrder: () =>
                    UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                  Me: () => meWithAddresses,
                },
                undefined,
                relayEnv
              )
              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )

              expect(
                screen.getAllByRole("radio", {
                  name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
                })
              ).toHaveLength(5)
            })

            it.skip("sets shipping on order, shows shipping quotes and saves the pre-selected quote", async () => {
              const { mockResolveLastOperation } = renderWithRelay(
                {
                  // Simulate the condition with an order with saved shipping quotes
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined,
                relayEnv
              )

              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )
              expect(screen.getByText("Save and Continue")).toBeEnabled()

              await saveAndContinue()

              const selectShippingOptionOperation = await waitFor(() =>
                mockResolveLastOperation({})
              )

              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )
              expect(selectShippingOptionOperation.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                },
              })
            })

            it.skip("selects a different shipping quote and saves it", async () => {
              const { mockResolveLastOperation } = renderWithRelay(
                {
                  // Simulate the condition with an order with saved shipping quotes
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined,
                relayEnv
              )
              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )
              expect(fulfillmentRequest.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  fulfillmentType: "SHIP_ARTA",
                  phoneNumber: "422-424-4242",
                  shipping: {
                    addressLine1: "401 Broadway",
                    addressLine2: "Floor 25",
                    city: "New York",
                    country: "US",
                    name: "Test Name",
                    phoneNumber: "422-424-4242",
                    postalCode: "10013",
                    region: "NY",
                  },
                },
              })

              userEvent.click(screen.getByText(/^Premium/))
              expect(screen.getByText("Save and Continue")).toBeEnabled()
              await saveAndContinue()

              const selectShippingOptionOperation = await waitFor(() =>
                mockResolveLastOperation({})
              )
              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )
              expect(selectShippingOptionOperation.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                },
              })
            })

            it.skip("keeps the submit button enabled after selecting a shipping quote", async () => {
              const { mockResolveLastOperation } = renderWithRelay(
                {
                  // Simulate the condition with an order with saved shipping quotes
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined,
                relayEnv
              )
              await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              const premiumShipping = screen.getByRole("radio", {
                name: /^Premium/,
              })
              expect(premiumShipping).not.toBeChecked()

              userEvent.click(premiumShipping)
              await flushPromiseQueue()

              expect(premiumShipping).toBeChecked()
              expect(
                screen.getByRole("button", { name: "Save and Continue" })
              ).toBeEnabled()
            })

            it.skip("routes to payment screen after saving shipping option", async () => {
              const { mockResolveLastOperation } = renderWithRelay(
                {
                  // Simulate the condition with an order with saved shipping quotes
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined,
                relayEnv
              )
              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )
              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )
              await saveAndContinue()

              const selectShippingOptionOperation = await waitFor(() =>
                mockResolveLastOperation({
                  CommerceSelectShippingOptionPayload: () =>
                    selectShippingQuoteSuccess.commerceSelectShippingOption,
                })
              )
              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )

              expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
            })

            it.skip("reloads shipping quotes after editing the selected address", async () => {
              // const updateAddressResponse = cloneDeep(
              //   updateAddressSuccess
              // ) as any
              // // Match the edited address with the selected address to trigger refetching quotes
              // updateAddressResponse.updateUserAddress.userAddressOrErrors.internalID =
              //   "2"
              // const updateAddressSpy = jest
              //   .spyOn(updateUserAddress, "updateUserAddress")
              //   // @ts-ignore
              //   .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
              //     onSuccess(updateAddressResponse)
              //   })

              const { mockResolveLastOperation } = renderWithRelay(
                {
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined
              )

              await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              // Edit the selected address
              const selectedAddress = screen.getByRole("radio", {
                name: /401 Broadway/,
                checked: true,
              })
              await userEvent.click(within(selectedAddress).getByText("Edit"))

              const modalTitle = screen.getByText("Edit address")
              expect(modalTitle).toBeVisible()

              // TODO: need a better way to get a specific input field from multiple forms
              const addressLine2 = screen.getAllByPlaceholderText(
                /Apt, floor, suite/
              )[0]
              userEvent.clear(addressLine2)
              userEvent.paste(addressLine2, "25th fl.")
              userEvent.click(screen.getByText("Save"))

              await flushPromiseQueue()
              const updateAddressOperation = await waitFor(() =>
                mockResolveLastOperation({
                  UpdateUserAddressPayload: () => saveAddressSuccess,
                })
              )

              expect(updateAddressOperation.operationName).toBe(
                "useUpdateSavedAddressMutation"
              )
              expect(updateAddressOperation.operationVariables).toEqual({
                input: {
                  attributes: {
                    addressLine1: "401 Broadway",
                    addressLine2: "25th fl.",
                    city: "New York",
                    country: "US",
                    name: "Test Name",
                    phoneNumber: "422-424-4242",
                    postalCode: "10013",
                    region: "NY",
                  },
                  userAddressID: "2",
                },
              })

              await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              await saveAndContinue()

              const selectShippingOptionOperation = await waitFor(() =>
                mockResolveLastOperation({
                  CommerceSelectShippingOptionPayload: () =>
                    selectShippingQuoteSuccess.commerceSelectShippingOption,
                })
              )

              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )
              expect(selectShippingOptionOperation.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                },
              })
            })

            // TODO: Does this behavior matter? Test above shows migration from
            // for a very similar usage of mockCommitMutation. stale code
            // has been commented out
            it.skip("does not reload shipping quotes after editing a non-selected address", async () => {
              // mockCommitMutation
              //   .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
              //   .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)

              // const updateAddressResponse = cloneDeep(
              //   updateAddressSuccess
              // ) as any
              // // Match the edited address with the selected address to trigger refetching quotes
              // updateAddressResponse.updateUserAddress.userAddressOrErrors.internalID =
              //   "1"
              // const updateAddressSpy = jest
              //   .spyOn(updateUserAddress, "updateUserAddress")
              //   // @ts-ignore
              //   .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
              //     onSuccess(updateAddressResponse)
              //   })

              const { env } = renderWithRelay(
                {
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined,
                relayEnv
              )
              await flushPromiseQueue()

              // Set shipping/fetch quotes on load for the default address
              // expect(mockCommitMutation).toHaveBeenCalledTimes(1)
              // let mutationArg = mockCommitMutation.mock.calls[0][0]
              // expect(mutationArg.mutation.default.operation.name).toEqual(
              //   "SetShippingMutation"
              // )

              // Edit the address that's not selected
              const nonSelectedAddress = screen.getByRole("radio", {
                name: /1 Main St/,
                checked: false,
              })
              await userEvent.click(
                within(nonSelectedAddress).getByText("Edit")
              )

              const modalTitle = screen.getByText("Edit address")
              expect(modalTitle).toBeVisible()

              // TODO: need a better way to get a specific input field from multiple forms
              const addressLine2 = screen.getAllByPlaceholderText(
                /Apt, floor, suite/
              )[0]
              userEvent.clear(addressLine2)
              userEvent.paste(addressLine2, "25th fl.")
              userEvent.click(screen.getByText("Save"))

              await flushPromiseQueue()

              // expect(updateAddressSpy).toHaveBeenCalledTimes(1)
              // expect(updateAddressSpy).toHaveBeenCalledWith(
              //   expect.anything(),
              //   "1",
              //   {
              //     addressLine1: "1 Main St",
              //     addressLine2: "25th fl.",
              //     addressLine3: "",
              //     city: "Madrid",
              //     country: "ES",
              //     name: "Test Name",
              //     phoneNumber: "555-555-5555",
              //     postalCode: "28001",
              //     region: "",
              //   },
              //   expect.anything(),
              //   expect.anything(),
              //   expect.anything()
              // )

              // TODO: This uses relay mock environment to mock the refetch query. Is there a better way?
              const mutation = env.mock.getMostRecentOperation()
              expect(mutation.request.node.operation.name).toEqual(
                "SavedAddressesRefetchQuery"
              )
              expect(mutation.request.variables).toEqual({})

              const updatedMe = cloneDeep(meWithAddresses) as any
              updatedMe.addressConnection.edges[1].node.addressLine2 =
                "25th fl."
              env.mock.resolveMostRecentOperation(operation => {
                return MockPayloadGenerator.generate(operation, {
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => updatedMe,
                })
              })

              // Wait for the second setShipping mutation to complete before clicking save and continue
              await flushPromiseQueue()
              await saveAndContinue()

              // expect(mockCommitMutation).toHaveBeenCalledTimes(2)

              // mutationArg = mockCommitMutation.mock.calls[1][0]
              // expect(mutationArg.mutation.default.operation.name).toEqual(
              //   "SelectShippingOptionMutation"
              // )
              // expect(mutationArg.variables).toEqual({
              //   input: {
              //     id: "2939023",
              //     selectedShippingQuoteId:
              //       "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
              //   },
              // })
            })
          })
        })
      })
    })
  })

  describe("with pickup", () => {
    it("shows an empty phone number input with saved addresses", async () => {
      renderWithRelay({
        CommerceOrder: () => order,
        Me: () => meWithAddresses,
      })

      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )
      const phoneNumber = screen.getByPlaceholderText(
        "Add phone number including country code"
      )
      // TODO: need a better way to check the input is displayed/expanded (height > 0)
      expect(phoneNumber).toHaveAttribute("tabindex", "0")
      expect(phoneNumber).toHaveValue("")
    })

    it("sets pickup on order and advances to payment", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        },
        undefined,
        relayEnv
      )

      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )
      await userEvent.paste(
        screen.getAllByPlaceholderText(
          "Add phone number including country code"
        )[0],
        "2813308004"
      )
      await userEvent.paste(
        screen.getByPlaceholderText("Full name"),
        "Erik David"
      )
      await saveAndContinue()

      const fulfillmentRequest = await resolveSaveFulfillmentDetails(
        mockResolveLastOperation,
        {
          orderOrError: {
            __typename: "CommerceOrderWithMutationSuccess",
            order: {
              id: "2939023",
              requestedFulfillment: {
                __typename: "CommercePickup",
                phoneNumber: "2813308004",
              },
            },
          },
        }
      )

      expect(fulfillmentRequest.operationName).toBe(
        "useSaveFulfillmentDetailsMutation"
      )
      expect(fulfillmentRequest.operationVariables).toMatchObject({
        input: {
          id: "2939023",
          fulfillmentType: "PICKUP",
          shipping: {
            addressLine1: "",
            addressLine2: "",
            country: "US",
            name: "",
            city: "",
            postalCode: "",
            region: "",
            phoneNumber: "",
          },
          phoneNumber: "2813308004",
        },
      })
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
      })
    })

    it("disables submission without a phone number", async () => {
      renderWithRelay({
        CommerceOrder: () => order,
        Me: () => meWithoutAddress,
      })

      userEvent.click(screen.getByRole("radio", { name: /Arrange for pickup/ }))
      await flushPromiseQueue()
      expect(
        screen.getByRole("button", {
          name: "Save and Continue",
        }) as HTMLInputElement
      ).toBeDisabled()
    })
  })
})
