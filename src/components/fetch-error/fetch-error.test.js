import React from "react"
import { render } from "@testing-library/react"
import { expect, test } from "@jest/globals"
import FetchError from "./index"
import { BrowserRouter, Route } from "react-router-dom"
test("renders Error component with props", () => {

  const {asFragment, getByText} = render(
    <BrowserRouter>
      <Route>
        <FetchError error="Something went wrong" />
      </Route>
    </BrowserRouter>
  )
  expect(asFragment()).toBeTruthy()
  expect(getByText("Something went wrong.")).toBeTruthy()
})

