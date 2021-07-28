import React from "react"
import { render, screen } from "@testing-library/react"
import OrderConfirm from "./index"
import { Context } from "store/context"
import { BrowserRouter, Route } from "react-router-dom"

describe("Checks confirmation text", () => {
  it("renders without crashing", () => {
    render(
      <Context.Provider
        value={{ isAuthorised: false, setIsAuthorized: jest.fn() }}
      >
        <BrowserRouter>
          <Route path="/order-confirmation/:id">
            <OrderConfirm />
          </Route>
        </BrowserRouter>
      </Context.Provider>
    )
  })
  expect(screen.getByText(new RegExp("", "i"))).toBeInTheDocument()
})