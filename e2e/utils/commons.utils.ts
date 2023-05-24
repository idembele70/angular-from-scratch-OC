import { appareilList } from 'e2e/data';

import { APIRequestContext, Locator, Page, expect } from "@playwright/test"
import { AppareilStatus, IAppareil } from "src/app/models/appareil.model"

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

async function getAppareil(apiContext: APIRequestContext) {
  const response = await apiContext.get("appareils.json")
  expect(response.ok()).toBeTruthy()
  return await response.json() as IAppareil[]
}
interface GetAppareilByIdParams {
  apiContext: APIRequestContext;
  idx: number;
}
async function getAppareilByIndex({ apiContext, idx }: GetAppareilByIdParams) {
  const response = await apiContext.get("appareils/" + idx + ".json")
  expect(response.ok()).toBeTruthy()
  return await response.json() as IAppareil
}
interface GetAppareilNameText {
  appareilList: IAppareil[],
  status?: AppareilStatus
}
async function getAppareilNameText({ appareilList, status }: GetAppareilNameText) {
  return appareilList.map(
    ({ name, status: appareilStatus }) => {
      const currentStatus: AppareilStatus = !status ? appareilStatus : status
      return `Appareil: ${name} -- Statut ${currentStatus}`
    }
  )
}

export {
  URLValidationParams,
  validatePageURL,
  RouterLinkParams,
  navigateWithRouterLink,
  assertCurrentRouteNavLinkActive,
  fillInput,
  getAppareil,
  getAppareilByIndex,
  getAppareilNameText
}
