import React from "react"
import { describe, expect, it, jest } from "@jest/globals"
import Login from "./index.jsx"
import { render } from "@testing-library/react"
import { Context } from "store/context"
import { BrowserRouter, Route } from "react-router-dom"

describe("Login", () => {
  it("render Login component", () => {
    const {asFragment} = render(<Context.Provider value={{ isAuthorised: false, setIsAuthorized: jest.fn() }}>
      <BrowserRouter>
        <Route path="/login">
          <Login />
        </Route>
      </BrowserRouter>
    </Context.Provider>)
    expect(asFragment()).toBeTruthy()
  })
})