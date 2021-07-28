import { screen, render } from "@testing-library/react"
import Footer from "./index"

test("render footer with text: Version", () => {
  render(<Footer />)

  expect(screen.getByText("Version: 28.07.2021-1")).toBeInTheDocument()
})
test("render should be once", () => {
  render(<Footer />)

  expect(screen.getByText("Corporate policy")).toBeInTheDocument()
})
