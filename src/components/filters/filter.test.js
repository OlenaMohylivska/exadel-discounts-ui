import { render } from "@testing-library/react"
import Filters from "./index"

test("change should notes in props", () => {
  const filters = render(<Filters />)
  console.log(filters.findByRole("insertion"))
})
