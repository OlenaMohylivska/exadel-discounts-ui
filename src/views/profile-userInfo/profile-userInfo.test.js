import React from "react"
import { render, screen } from "@testing-library/react"
import { Context } from "store/context"
import { BrowserRouter, Route } from "react-router-dom"
import ProfileUserInfo from "./index"

describe("Checks main title on the page", () => {
  it("renders without crashing", () => {
    render(
      <Context.Provider
        value={{ isAuthorised: false, setIsAuthorized: jest.fn() }}
      >
        <BrowserRouter>
          <Route path="/profile/info">
            <ProfileUserInfo />
          </Route>
        </BrowserRouter>
      </Context.Provider>
    )
  })
  expect(screen.getByText(new RegExp("", "i"))).toBeInTheDocument()
  expect(screen.findByRole('button'))
})