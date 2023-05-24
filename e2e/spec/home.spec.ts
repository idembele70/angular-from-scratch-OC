import { appareilList } from 'e2e/data';

import { APIRequestContext, expect, test } from '@playwright/test';
import { CheckAppareilInfo, CheckDetailsLinkFunctionalityParams, PageInfo, RouterLinkParams, assertCurrentRouteNavLinkActive, checkAppareilStatus, checkDetailsLinkFunctionality, fillInput, getAppareil, getAppareilByIndex, getAppareilNameText, navigateWithRouterLink, signIn, toggleAppareilStatus, validatePageURL } from 'e2e/utils';
import { AppareilStatus } from 'src/app/models/appareil.model';

test.describe('home page tests', () => {
  let apiContext: APIRequestContext;

  test.beforeEach(async function ({ page, baseURL, playwright, request }) {
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

  test("Should verify the initial state of all appareils", async ({ page, }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilList = await getAppareil(apiContext)
    const appareilLocator = homeLocator.locator("li")
    // check if every appareil is in the dom
    const appareilLocatorCount = await appareilLocator.count()
    expect(appareilLocatorCount).toEqual(appareilList.length)
    // check the style of each appareil
    for (let idx = 0; idx < appareilLocatorCount; idx++) {
      const appareil = appareilList[idx]
      const { name, status } = appareil
      // appareils Locators
      const appareilLocator = homeLocator.locator("li")
      // current appareil locators
      const currentAppareil = appareilLocator.filter(
        { hasText: new RegExp(`Appareil: ${appareil.name} -- Statut ${status}`) }
      )
      // check appareil Input value
      const currentAppareilInput = currentAppareil.locator(".form-control")
      const inputValue = await currentAppareilInput.inputValue()
      expect(inputValue).toEqual(name)
      // check if details link work well
      const checkDetailsLinkFunctionalityOptions: CheckDetailsLinkFunctionalityParams = { page, appareil, parentLocator: currentAppareil }
      await checkDetailsLinkFunctionality(checkDetailsLinkFunctionalityOptions)
      //  Check appareil styles and attributes based on status
      await checkAppareilStatus({ appareilLocator: currentAppareil, appareil, status })
    }
    // check all appareils H4 text
    const appareilNameLocators = appareilLocator.locator("h4")
    const appareilNameInitalText = await getAppareilNameText({ appareilList })
    await expect(appareilNameLocators).toHaveText(
      appareilNameInitalText
    )
  })

  test("should verify the initial state of an turn off appareil", async ({ page }) => {
    const idx = 1
    const appareil = await getAppareilByIndex({ apiContext, idx })
    const { name, status } = appareil
    const appareilLocator = page.getByTestId("home-wrapper").locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut ${status}`) }
    )
    await checkAppareilStatus({ appareilLocator, appareil, status })
    await checkDetailsLinkFunctionality({ page, appareil, parentLocator: appareilLocator })
  })

  test("should verify the initial state of an turn on appareil", async ({ page }) => {
    const idx = 0
    const appareil = await getAppareilByIndex({ apiContext, idx })
    const { name, status } = appareil
    const appareilLocator = page.getByTestId("home-wrapper").locator("li").filter(
      { hasText: new RegExp(`Appareil: ${name} -- Statut ${status}`) }
    )
    await checkAppareilStatus({ appareilLocator, appareil, status })
    await checkDetailsLinkFunctionality({ page, appareil, parentLocator: appareilLocator })
  })

  test("should turn on an appareil", async ({ page }) => {
    const idx = 1
    const appareil = await getAppareilByIndex({ apiContext, idx })
    const appareilLocator = page.getByTestId("home-wrapper").locator(".list-group .list-group-item")
      .filter(
        { hasText: new RegExp(`${appareil.name}`, "g") }
      )
    const checkappareilInfo: CheckAppareilInfo = { appareilLocator, appareil }
    await checkAppareilStatus({ ...checkappareilInfo, status: AppareilStatus.OFF })
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Allumer" })
    await checkAppareilStatus({ ...checkappareilInfo, status: AppareilStatus.ON })
  })

  test("should turn off an appareil", async ({ page }) => {
    const idx = 2
    const appareil = await getAppareilByIndex({ apiContext, idx })

    const appareilLocator = page.getByTestId("home-wrapper").locator(".list-group .list-group-item").filter(
      { hasText: new RegExp(`${appareil.name}`, "g") }
    )
    const checkappareilInfo: CheckAppareilInfo = { appareilLocator, appareil }
    await checkAppareilStatus({ ...checkappareilInfo, status: AppareilStatus.ON })
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Éteindre" })
    await checkAppareilStatus({ ...checkappareilInfo, status: AppareilStatus.OFF })

  })

  test("should turn on all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator(".list-group .list-group-item h4")
    const appareilList = await getAppareil(apiContext)
    const appareilNameInitalText = await getAppareilNameText({ appareilList })
    await expect(appareilName).toHaveText(appareilNameInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    const appareilNameTurnOnText = await getAppareilNameText({ appareilList, status: AppareilStatus.ON })
    await expect(appareilName).toHaveText(appareilNameTurnOnText)
  })

  test("should turn off all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator("li h4")
    const appareilList = await getAppareil(apiContext)
    const appareilNameInitalText = await getAppareilNameText({ appareilList })
    await expect(appareilName).toHaveText(appareilNameInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    const appareilNameTurnOnText = await getAppareilNameText({ appareilList, status: AppareilStatus.OFF })
    await expect(appareilName).toHaveText(appareilNameTurnOnText)
  })

  test("should turn on and off one appareil", async ({ page }) => {
    const idx = 1
    const appareil = await getAppareilByIndex({ apiContext, idx })
    const appareilLocator = page.getByTestId("home-wrapper").locator(".list-group .list-group-item").
      filter({
        hasText: new RegExp(appareil.name)
      })
    const checkAppareilInfo: CheckAppareilInfo = { appareilLocator, appareil }
    await checkAppareilStatus({ ...checkAppareilInfo, status: AppareilStatus.OFF })
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Allumer" })
    await checkAppareilStatus({ ...checkAppareilInfo, status: AppareilStatus.ON })
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Éteindre" })
    await checkAppareilStatus({ ...checkAppareilInfo, status: AppareilStatus.OFF })
  })

  test("should turn off and on one appareil", async ({ page }) => {
    const idx = 2
    const appareil = await getAppareilByIndex({ apiContext, idx })
    const appareilLocator = page.getByTestId("home-wrapper").locator(".list-group .list-group-item").
      filter({
        hasText: new RegExp(appareil.name)
      })
    const checkAppareilInfo: CheckAppareilInfo = { appareilLocator, appareil }
    await checkAppareilStatus({ ...checkAppareilInfo, status: AppareilStatus.ON })
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Éteindre" })
    await checkAppareilStatus({ ...checkAppareilInfo, status: AppareilStatus.OFF })
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Allumer" })
    await checkAppareilStatus({ ...checkAppareilInfo, status: AppareilStatus.ON })
  })

  test("should turn on and off all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator(".list-group .list-group-item h4")
    const appareilList = await getAppareil(apiContext)
    const appareilNameInitalText = await getAppareilNameText({ appareilList })
    await expect(appareilName).toHaveText(appareilNameInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    const appareilNameTurnOnText = await getAppareilNameText({ appareilList, status: AppareilStatus.ON })
    await expect(appareilName).toHaveText(appareilNameTurnOnText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    const appareilNameTurnOffText = await getAppareilNameText({ appareilList, status: AppareilStatus.OFF })
    await expect(appareilName).toHaveText(appareilNameTurnOffText)
  })

  test("should turn off and on all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator("li h4")
    const appareilList = await getAppareil(apiContext)
    const appareilNameInitalText = await getAppareilNameText({ appareilList })
    await expect(appareilName).toHaveText(appareilNameInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    const appareilNameTurnOffText = await getAppareilNameText({ appareilList, status: AppareilStatus.OFF })
    await expect(appareilName).toHaveText(appareilNameTurnOffText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    const appareilNameTurnOnText = await getAppareilNameText({ appareilList, status: AppareilStatus.ON })
    await expect(appareilName).toHaveText(appareilNameTurnOnText)
  })

  test('should verify if home nav link is active', async ({ page }) => {
    const routerLinkOptions: RouterLinkParams = { page, innerText: "Appareils" }
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    await page.goBack()
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
  })

  test('should allow to edit appareil Name', async ({ page }) => {
    const idx = 1
    const appareil = await getAppareilByIndex({ apiContext, idx })
    await fillInput({ appareil, page, newValue: "My new Ipad" })
  })
})



