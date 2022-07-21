import { mount } from "enzyme"
import { BankDebitProvider } from "../BankDebitProvider"
import React from "react"
import { BankDebitForm } from "../BankDebitForm"
import { CreateBankDebitSetupForOrder } from "v2/Components/BankDebitForm/Mutations/CreateBankDebitSetupForOrder"

jest.mock("v2/Components/BankDebitForm/Mutations/CreateBankDebitSetupForOrder")
jest.mock(
  "v2/__generated__/CreateBankDebitSetupForOrderMutation.graphql",
  () => ({
    ...jest.requireActual(
      "v2/__generated__/CreateBankDebitSetupForOrderMutation.graphql"
    ),
    CreateBankDebitSetupForOrderMutation: jest.fn().mockResolvedValue({
      commerceCreateBankDebitSetupForOrder: {
        actionOrError: {
          __typename: "CommerceOrderRequiresAction",
          actionData: {
            clientSecret: "client-secret-1",
          },
        },
      },
    }),
  })
)

const getWrapper = () =>
  mount(
    <BankDebitProvider
      order={{
        internalID: "1234",
        mode: "BUY",
        bankAccountId: "bank-id-1",
        " $refType": "BankAccountPicker_order",
      }}
      bankAccountHasInsufficientFunds={false}
    />
  )

describe("BankDebitProvider", () => {
  const mockCreateBankDebitSetupForOrder = CreateBankDebitSetupForOrder as jest.Mock
  const mockFn = jest.fn()
  mockCreateBankDebitSetupForOrder.mockImplementation(() => ({
    submitMutation: mockFn,
  }))

  it("calls createBankDebitSetupForOrder mutation with input", () => {
    getWrapper()
    expect(mockFn).toHaveBeenCalledWith({
      variables: { input: { id: "1234" } },
    })
  })

  it("calls createBankDebitSetupForOrder mutation 2", async () => {
    mockCreateBankDebitSetupForOrder.mockImplementation(() => ({
      submitMutation: jest.fn(() => ({
        commerceCreateBankDebitSetupForOrder: {
          actionOrError: {
            __typename: "CommerceOrderRequiresAction",
            actionData: {
              clientSecret: "client-secret-1",
            },
          },
        },
      })),
    }))

    let wrapper = await getWrapper()
    expect(wrapper.find(BankDebitForm).length).toBe(1)
  })

  // it("displays an error when no client secret is recieved, and no bank debit form is rendered", () => {
  //   const wrapper = getWrapper()

  //   expect(wrapper.find(BankDebitForm).length).toBe(0)
  //   expect(wrapper.html()).toMatch(
  //     "Bank transfer is not available at the moment"
  //   )
  // })

  // it("renders bank debit form when we receieve client secret", async () => {
  //   const wrapper = getWrapper()

  //   expect(wrapper.find(BankDebitForm).length).toBe(1)
  // })
})
