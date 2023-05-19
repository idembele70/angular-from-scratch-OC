import { expect, test } from '@playwright/test';
import { appareilInitalText, appareilList, appareilTurnOffText, appareilTurnOnText } from 'e2e/data';
import { PageInfo, RouterLinkParams, assertCurrentRouteNavLinkActive, isTurnOff, isTurnOn, navigateWithRouterLink, signIn, toggleAppareilStatus, validatePageURL, TurnOnOffParams, isAppareilDetailsPage, CheckDetailsLinkFunctionalityParams, checkDetailsLinkFunctionality } from 'e2e/utils';
import { AppareilStatus } from 'src/app/models/appareil.model';

test.describe('home page tests', () => {

  test.beforeEach(async function ({ page, baseURL }) {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await page.goto("/auth")
    await signIn(pageInfo)
    validatePageURL({ ...pageInfo, path: "" })
  })

  test("Should verify the initial state of all appareils", async ({ page, baseURL }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator("li")

    // check if every appareil is in the dom
    const appareilLocatorCount = await appareilLocator.count()
    expect(appareilLocatorCount).toEqual(appareilList.length)

    // check the style of each appareil
    for (let idx = 0; idx < appareilLocatorCount; idx++) {
      const appareil = appareilList[idx]
      // appareils Locators
      const appareilLocator = homeLocator.locator("li")
      // current appareil locators
      const currentAppareil = appareilLocator.nth(idx)
      const currentAppareilInput = currentAppareil.locator(".form-control")
      const inputValue = await currentAppareilInput.inputValue()
      expect(inputValue).toEqual(appareil.name)

      // check if details link work well
      const checkDetailsLinkFunctionalityOptions: CheckDetailsLinkFunctionalityParams = { page, baseURL, idx, parentLocator: currentAppareil }
      await checkDetailsLinkFunctionality(checkDetailsLinkFunctionalityOptions)

      //  Check appareil styles and attributes based on status
      const turnOnOffOptions: TurnOnOffParams = { currentAppareil, idx }
      if (appareil.status === AppareilStatus.ON)
        await isTurnOn(turnOnOffOptions)
      else {
        await isTurnOff(turnOnOffOptions)
      }
    }
    // check all appareils H4 text
    const appareilNameLocators = appareilLocator.locator("h4")
    await expect(appareilNameLocators).toHaveText(
      appareilInitalText
    )
  })

  test("should verify the initial state of an turn off appareil", async ({ page, baseURL }) => {
    // appareils Locators
    const idx = 1
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareilLocator = homeLocator.locator("li").nth(idx)
    await isTurnOff({ currentAppareil: currentAppareilLocator, idx })
    const checkDetailsLinkFunctionalityOptions: CheckDetailsLinkFunctionalityParams = { page, baseURL, idx, parentLocator: currentAppareilLocator }
    await checkDetailsLinkFunctionality(checkDetailsLinkFunctionalityOptions)
  })

  test("should verify the initial state of an turn on appareil", async ({ page, baseURL }) => {
    const idx = 0
    // appareils Locators
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareil = homeLocator.locator("li").nth(idx)
    await isTurnOn({ currentAppareil, idx })
    const checkDetailsLinkFunctionalityOptions: CheckDetailsLinkFunctionalityParams = { page, baseURL, idx, parentLocator: currentAppareil }
    await checkDetailsLinkFunctionality(checkDetailsLinkFunctionalityOptions)
  })

  test("should turn on an appareil", async ({ page }) => {
    const idx = 1
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareil = homeLocator.locator(".list-group .list-group-item").nth(idx)
    const turnOnOffOptions: TurnOnOffParams = { currentAppareil, idx }
    await isTurnOff(turnOnOffOptions)
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Allumer" })
    await isTurnOn(turnOnOffOptions)
  })

  test("should turn off an appareil", async ({ page }) => {
    const idx = 2
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareil = homeLocator.locator(".list-group .list-group-item").nth(idx)
    const turnOnOffOptions: TurnOnOffParams = { currentAppareil, idx }
    await isTurnOn(turnOnOffOptions)
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Éteindre" })
    await isTurnOff(turnOnOffOptions)

  })

  test("should turn on all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator(".list-group .list-group-item h4")
    await expect(appareilName).toHaveText(appareilInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    await expect(appareilName).toHaveText(appareilTurnOnText)
  })

  test("should turn off all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator("li h4")
    await expect(appareilName).toHaveText(appareilInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    await expect(appareilName).toHaveText(appareilTurnOffText)
  })

  test("should turn on and off one appareil", async ({ page }) => {
    const idx = 1
    const currentAppareil = page.locator(".list-group .list-group-item").nth(idx)
    const turnOnOffOptions: TurnOnOffParams = { currentAppareil, idx }
    await isTurnOff(turnOnOffOptions)
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Allumer" })
    await isTurnOn(turnOnOffOptions)
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Éteindre" })
    await isTurnOff(turnOnOffOptions)
  })

  test("should turn off and on one appareil", async ({ page }) => {
    const idx = 2
    const currentAppareil = page.locator(".list-group .list-group-item").nth(idx)
    const turnOnOffOptions: TurnOnOffParams = { currentAppareil, idx }
    await isTurnOn(turnOnOffOptions)
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Éteindre" })
    await isTurnOff(turnOnOffOptions)
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Allumer" })
    await isTurnOn(turnOnOffOptions)
  })

  test("should turn on and off all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator(".list-group .list-group-item h4")
    await expect(appareilName).toHaveText(appareilInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    await expect(appareilName).toHaveText(appareilTurnOnText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    await expect(appareilName).toHaveText(appareilTurnOffText)
  })

  test("should turn off and on all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator("li h4")
    await expect(appareilName).toHaveText(appareilInitalText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    await expect(appareilName).toHaveText(appareilTurnOffText)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    await expect(appareilName).toHaveText(appareilTurnOnText)
  })

  test('should verify if home nav link is active', async ({ page }) => {
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

  test('should allow to edit appareil Name', async ({ page }) => {
    const idx = 1
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareilLocator = homeLocator.locator(".list-group .list-group-item").nth(idx)
    const appareilInputLocator = currentAppareilLocator.locator(".form-control")
    const inputValue = await appareilInputLocator.inputValue()
    const appareilNameLocator = currentAppareilLocator.locator("h4")
    await expect(appareilNameLocator).toContainText(inputValue)
    const newInputValue = "New Name"
    await appareilInputLocator.fill(newInputValue)
    const inputValueAfterFill = await appareilInputLocator.inputValue()
    await expect(appareilNameLocator).toContainText(inputValueAfterFill)
  })
})



