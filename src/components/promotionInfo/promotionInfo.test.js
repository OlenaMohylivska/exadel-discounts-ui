import React from "react"
import { render } from "@testing-library/react"
import PromotionInfo from "./index"
import { Context } from "store/context"
import { BrowserRouter, Route } from "react-router-dom"
import { expect, test, describe, jest } from "@jest/globals"

describe("PromotionInfo", () => {
  const data = {
    id: 88,
    name: "Beautiful German Shepherd",
    description: "Looking for a pet? This dog is a best choice to protect you!",
    periodStart: "2021-07-31",
    periodEnd: "2021-08-08",
    rate: 0.0,
    nameImage: "de858906-cb46-488a-b182-d830d4861482.jpeg",
  }
  test("renders PromotionInfo with props", () => {
    const { asFragment } = render(<Context.Provider value={{ bindToken: jest.fn() }}>
      <BrowserRouter>
        <Route path="/admin/all-promotions">
          <PromotionInfo elem={data} />
        </Route>
      </BrowserRouter>
    </Context.Provider>
    )
    expect(asFragment()).toBeTruthy()
  })

})
