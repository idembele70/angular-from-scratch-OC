
import { Locator, Page, expect } from "@playwright/test"
import { IAppareil } from "src/app/models/appareil.model"

// used in multiple files
interface URLValidationParams {
  page: Page,
  baseURL: string
  path: string
}
const validatePageURL = ({ page, baseURL, path }: URLValidationParams) => {
  const url = page.url()
  expect(url).toEqual(`${baseURL}/${path}`)
}

//used in multiple files
interface RouterLinkParams {
  page: Page;
  innerText: string;
}
const navigateWithRouterLink = async ({ page, innerText }: RouterLinkParams) => {
  const navLink = page.locator(".nav.navbar-nav li a").getByText(innerText)
  await navLink.click()
}

const assertCurrentRouteNavLinkActive = async ({ page, innerText }: RouterLinkParams) => {
  const navListItem = page.locator(".nav.navbar-nav li").
    filter(
      ({ has: page.getByRole("link", { name: innerText }) })
    )
  await expect(navListItem).toHaveClass("active")
}

interface FillInputParams {
  page: Page,
  appareil: IAppareil,
  newValue: string
}
const fillInput = async ({ page, appareil, newValue }: FillInputParams) => {
  const { name } = appareil
  const homeLocator = page.getByTestId("home-wrapper")
  const currentAppareilLocator = homeLocator.locator("li").
    filter(
      { hasText: new RegExp(`${name}|${newValue}`, "g") }
    )
  const appareilInputLocator = currentAppareilLocator.locator(".form-control")
  const inputValue = await appareilInputLocator.inputValue()
  const appareilNameLocator = currentAppareilLocator.locator("h4")
  await expect(appareilNameLocator).toContainText(inputValue)
  await appareilInputLocator.fill(newValue)
  const inputValueAfterFill = await appareilInputLocator.inputValue()
  expect(inputValueAfterFill).toEqual(newValue)
  await expect(appareilNameLocator).toContainText(newValue)
}

export {
  URLValidationParams,
  validatePageURL,
  RouterLinkParams,
  navigateWithRouterLink,
  assertCurrentRouteNavLinkActive,
  fillInput
}
