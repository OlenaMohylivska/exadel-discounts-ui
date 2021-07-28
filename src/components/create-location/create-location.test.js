import { render } from "@testing-library/react"
import CreateLocation from "./index"

test("create location should be rendered", async () => {
  const createLocation = await render(<CreateLocation />)
  expect(createLocation).toMatchSnapshot()
})
