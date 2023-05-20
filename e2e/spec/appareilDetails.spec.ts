import { test } from "@playwright/test"
import { appareilList } from "e2e/data"
import { PageInfo, RouterLinkParams, assertCurrentRouteNavLinkActive, isAppareilDetailsPage, isTurnOff, navigateWithRouterLink, signIn, toggleAppareilStatus, validatePageURL } from "e2e/utils"
import { AppareilStatus } from "src/app/models/appareil.model"

test.describe('appareil details page', () => {
  test.beforeEach(async function ({ page, baseURL }) {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await page.goto("/auth")
    await signIn(pageInfo)
    validatePageURL({ ...pageInfo, path: "" })
  })

  test('should verify an appareil turn on initial state', async ({ page, baseURL }) => {
    const idx = 0
    const { name, status } = appareilList[idx]
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut ${AppareilStatus.ON}`) }
    )
    const detailsLink = appareilLocator.locator("a").getByText("détails")
    await detailsLink.click()
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.ON, baseURL })
  })

  test('should verify an appareil turn off initial state', async ({ page, baseURL }) => {
    const idx = 1
    const { name, status } = appareilList[idx]
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut ${AppareilStatus.OFF}`) }
    )

    const detailsLink = appareilLocator.locator("a").getByText("détails")
    await detailsLink.click()
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.OFF, baseURL })
  })

  test('should update an appareil info on switch off', async ({ page, baseURL }) => {
    const idx = 0
    const { name } = appareilList[idx]
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut`, "g") }
    )
    const detailsLink = appareilLocator.locator("a").getByText("détails")
    await detailsLink.click()
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.ON, baseURL })
    await navigateWithRouterLink({ page, innerText: "Appareils" })
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Éteindre" })
    await detailsLink.click()
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.OFF, baseURL })
  })

  test('should update an appareil info on switch on', async ({ page, baseURL }) => {
    const idx = 1
    const { name } = appareilList[idx]
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut`, "g") }
    )
    const detailsLink = appareilLocator.locator("a").getByText("détails")
    await detailsLink.click()
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.OFF, baseURL })
    await page.goBack()
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Allumer" })
    await detailsLink.click()
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.ON, baseURL })
  })
  test('should verify if appareil detail nav link is active', async ({ page }) => {
    const routerLinkOptions: RouterLinkParams = { page, innerText: "Appareils" }
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
  })
})