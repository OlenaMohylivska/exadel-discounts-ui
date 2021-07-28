import { render } from "@testing-library/react"
import Pagination from "./index"

test("pagination test should return more than new items", () => {
  const pagination = render(<Pagination itemsPerPage={8} />)
  expect(pagination.findByAltText("primary"))
})
