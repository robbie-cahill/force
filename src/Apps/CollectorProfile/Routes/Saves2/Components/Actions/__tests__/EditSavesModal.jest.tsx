import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import { useMutation } from "Utils/Hooks/useMutation"
import { EditSavesModal } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/EditSavesModal"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"

jest.mock("Utils/Hooks/useMutation")

const collection = {
  internalID: "foobar",
  name: "Foo Bar",
} as SavesArtworks_collection$data

describe("EditSavesModal", () => {
  let setIsEditModalOpen: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    setIsEditModalOpen = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })
  })

  it("renders the modal content", async () => {
    render(
      <EditSavesModal
        collection={collection}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    )

    expect(screen.getByText("Edit your list")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Back/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Save/ })).toBeInTheDocument()
  })

  it("dismisses when the Cancel button is clicked", async () => {
    render(
      <EditSavesModal
        collection={collection}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: /Back/ }))

    expect(setIsEditModalOpen).toHaveBeenCalledWith(false)
  })

  it("calls the mutation when the Save button is clicked", async () => {
    render(
      <EditSavesModal
        collection={collection}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: /Save/,
      })
    )

    await waitFor(() => expect(submitMutation).toHaveBeenCalledTimes(1))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            id: "foobar",
            name: "Foo Bar",
          },
        },
      })
    )
  })
})
