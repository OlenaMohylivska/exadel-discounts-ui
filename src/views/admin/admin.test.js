import React from "react"
import { describe, expect, it } from "@jest/globals"
import Admin from "./index.jsx"
import { render } from "@testing-library/react"
import { BrowserRouter, Route } from "react-router-dom"

describe("Admin", () => {
  it("render Admin component", () => {
    const {asFragment} = render(
      <BrowserRouter>
        <Route path="/login">
          <Admin />
        </Route>
      </BrowserRouter>)

    expect(asFragment()).toBeTruthy()

  })
})