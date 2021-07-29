import React from "react"
import { describe, expect, it, jest } from "@jest/globals"
import { render } from "@testing-library/react"
import { Context } from "store/context"
import FavouritePage from "."

describe("Favourite", () => {
  it("render Favourite component", () => {
    const {asFragment} = render(<Context.Provider value={{ bindToken: jest.fn() }}>
      <FavouritePage />
    </Context.Provider>)
    expect(asFragment()).toBeTruthy()
  })
})