import { Locator, Page, expect } from "@playwright/test"

// used by SignParams
interface URLValidationParams {
  page: Page,
  baseURL: string
  path: string
}

const validatePageURL = ({ page, baseURL, path }: URLValidationParams) => {
  const url = page.url()
  const currentUrl = `${baseURL}/${path}`
  expect(url).toEqual(currentUrl)
}

interface NavigateWithRouterLinkParams {
  page: Page;
  innerText: string;
}
const navigateWithRouterLink = async ({ page, innerText }: NavigateWithRouterLinkParams) => {
  const authLink = page.locator(".nav.navbar-nav li a").getByText(innerText)
  await authLink.click()
}


export {
  validatePageURL,
  URLValidationParams,
  navigateWithRouterLink,
}
