import React from "react"
import { expect, it, jest } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import ProfileUserInfo from "./index"
import { Context } from "store/context"

it("render ProfileUserInfo Page", () => {
  render(<Context.Provider value={{ bindToken: jest.fn() }}><ProfileUserInfo/></Context.Provider> )
  expect(screen.getByText("Manage my subscriptions")).toBeInTheDocument()
})