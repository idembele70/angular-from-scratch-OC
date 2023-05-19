import { Locator, Page, expect } from "@playwright/test"

// used by PageInfo
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

//used in auth.spec
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

export {
  URLValidationParams,
  validatePageURL,
  RouterLinkParams,
  navigateWithRouterLink,
  assertCurrentRouteNavLinkActive,
}
