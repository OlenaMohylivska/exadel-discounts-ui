import React from "react"
import { render } from "@testing-library/react"
import Promotions from "./index"
import { Context } from "store/context"
import { BrowserRouter, Route } from "react-router-dom"
import { expect, test, jest } from "@jest/globals"

test("renders All Promotions", () => {
  const { asFragment } = render(<Context.Provider value={{ isAuthorized: true, setIsAuthorized: jest.fn() }}>
    <BrowserRouter>
      <Route path="/admin/all-promotions">
        <Promotions />
      </Route>
    </BrowserRouter>
  </Context.Provider>
  )
  expect(asFragment()).toBeTruthy()
})