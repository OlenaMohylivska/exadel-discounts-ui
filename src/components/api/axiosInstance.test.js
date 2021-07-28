import { expect, it } from "@jest/globals"
import axiosInstance from "./index"

it("axiosInstance", () => {
  let action = axiosInstance()
  expect(action).toBeDefined()
})