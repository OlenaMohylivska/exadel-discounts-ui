import React from "react"
import { render, screen } from "@testing-library/react"
import ErrorToast from "./index"

test("renders simple errorMessage", () => {
  render(<ErrorToast errorMessage="Something went wrong"/>)
  expect(screen.getByText("Something went wrong")).toBeInTheDocument()
})

test("renders simple success text", () => {
  render(<ErrorToast errorMessage="badMessage"/>)
  expect(screen.getByText("badMessage")).toBeInTheDocument()
})
