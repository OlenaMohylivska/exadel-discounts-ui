import React from "react"
import { render, screen } from "@testing-library/react"
import Toast from "./index"
import { expect, test } from "@jest/globals"

test("renders simple success text", () => {
  render(<Toast />)
  expect(screen.getByText("Success!")).toBeInTheDocument()
})
