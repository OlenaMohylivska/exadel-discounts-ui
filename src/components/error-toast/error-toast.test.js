import React from "react"
import { render, screen } from "@testing-library/react"
import { expect, test } from "@jest/globals"
import ErrorToast from "./index"

test("renders Toast with props", () => {
  render(<ErrorToast errorMessage="Something went wrong"/>)
  expect(screen.getByText("Something went wrong")).toBeInTheDocument()
})

test("renders simple error text", () => {
  render(<ErrorToast/>)
  expect(screen.getByText("Error!")).toBeInTheDocument()
})
