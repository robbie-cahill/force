import { mount } from "enzyme"
import {
  AlertProvider,
  useAlertContext,
} from "Components/Alert/Hooks/useAlertContext"
import { useSystemContext } from "System/useSystemContext"
import { Steps } from "Components/Alert/Components/Steps"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.mock("System/useSystemContext")
const useSystemContextMock = useSystemContext as jest.Mock

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

describe("Alert Modal", () => {
  beforeEach(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)

    useSystemContextMock.mockImplementation(() => {
      return {
        relayEnvironment: {},
        user: {
          name: "User Name",
          email: "loggedin@example.com",
        },
      }
    })
  })

  const StepsTestComponent = () => {
    let alertContext
    alertContext = useAlertContext()
    return <Steps />
  }

  const getWrapper = (initialCriteria = {}) => {
    return mount(
      <AlertProvider initialCriteria={initialCriteria}>
        <StepsTestComponent />
      </AlertProvider>
    )
  }

  it("display alert modal details", () => {
    const wrapper = getWrapper()

    expect(wrapper.html()).toContain("Create Alert")
    expect(wrapper.html()).toContain("Filters")
    expect(wrapper.html()).toContain("Add Filters")
  })

  it("display alert modal filters", () => {
    const wrapper = getWrapper()
    wrapper.find("button").at(0).simulate("click")
    expect(wrapper.html()).toContain("Medium")
    expect(wrapper.html()).toContain("Price Range")
    expect(wrapper.html()).toContain("Ways to buy")
    expect(wrapper.html()).toContain("Colors")
  })
})
