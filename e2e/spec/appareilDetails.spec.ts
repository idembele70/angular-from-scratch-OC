import { APIRequestContext, test } from "@playwright/test"
import { appareilList } from "e2e/data"
import { AppareilDetailsPageParamsWithoutStatus, PageInfo, RouterLinkParams, assertCurrentRouteNavLinkActive, getAppareilByIndex, goToDetailsPage, isAppareilDetailsPage, navigateWithRouterLink, signIn, toggleAppareilStatus, validatePageURL } from "e2e/utils"
import { AppareilStatus } from "src/app/models/appareil.model"

test.describe('appareil details page', () => {
  let apiContext: APIRequestContext;

  test.beforeEach(async function ({ page, baseURL, playwright }) {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await page.goto("/auth")
    await signIn(pageInfo)
    validatePageURL({ ...pageInfo, path: "" })
    apiContext = await playwright.request.newContext({
      baseURL: "https://http-client-demo-afd69-default-rtdb.europe-west1.firebasedatabase.app/",
      extraHTTPHeaders: {
        "Accept": "application/json"
      }
    })
    // Wait for appareil list to be fetch and rendered on DOM
    await page.waitForSelector(".list-group-item")
  })


  test('should verify an appareil turn on initial state', async ({ page, baseURL }) => {
    const idx = 0
    const { name } = await getAppareilByIndex({ apiContext, idx })
    await goToDetailsPage({ page, name })
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.ON, baseURL })
  })

  test('should verify an appareil turn off initial state', async ({ page, baseURL }) => {
    const idx = 1
    const { name } = await getAppareilByIndex({ apiContext, idx })
    await goToDetailsPage({ page, name })
    await isAppareilDetailsPage({ page, name, status: AppareilStatus.OFF, baseURL })
  })

  test('should update an appareil info on switch off', async ({ page, baseURL }) => {
    const idx = 0
    const { name } = await getAppareilByIndex({ apiContext, idx })
    const locator = page.getByTestId("home-wrapper").locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut`) }
    )
    const goTodetailsPageInfo = { page, name }
    await goToDetailsPage(goTodetailsPageInfo)
    const appareilDetaisPageInfo: AppareilDetailsPageParamsWithoutStatus =
      { page, name, baseURL }
    await isAppareilDetailsPage({ ...appareilDetaisPageInfo, status: AppareilStatus.ON })
    await navigateWithRouterLink({ page, innerText: "Appareils" })
    await toggleAppareilStatus({ locator, innerText: "Éteindre" })
    await goToDetailsPage(goTodetailsPageInfo)
    await isAppareilDetailsPage({ ...appareilDetaisPageInfo, status: AppareilStatus.OFF })
  })

  test('should update an appareil info on switch on', async ({ page, baseURL }) => {
    const idx = 1
    const { name } = await getAppareilByIndex({ apiContext, idx })
    const locator = page.getByTestId("home-wrapper").locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut`, "g") }
    )
    const goTodetailsPageInfo = { page, name }
    await goToDetailsPage(goTodetailsPageInfo)
    const appareilDetaisPageInfo: AppareilDetailsPageParamsWithoutStatus =
      { page, name, baseURL }
    await isAppareilDetailsPage({ status: AppareilStatus.OFF, ...appareilDetaisPageInfo })
    await page.goBack()
    await toggleAppareilStatus({ locator, innerText: "Allumer" })
    await goToDetailsPage(goTodetailsPageInfo)
    await isAppareilDetailsPage({ status: AppareilStatus.ON, ...appareilDetaisPageInfo })
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