import { expect, test } from '@playwright/test';
import { appareilInitalText, appareilList, appareilTurnOffText, appareilTurnOnText } from 'e2e/data';
import { isTurnOff, isTurnOn, signIn, toggleAppareilStatus, validatePageURL } from 'e2e/utils';
import { AppareilStatus } from 'src/app/models/appareil.model';

test.describe('home page tests', () => {

  test.beforeEach(async function ({ page, baseURL }) {
    const options = { page, baseURL: baseURL || "" }
    await page.goto("/auth")
    await signIn(options)
    validatePageURL({ ...options, path: "" })
  })

  test("Should verify the initial state of all appareils", async ({ page }) => {
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator("li")

    // check if every appareil is in the dom
    const appareilLocatorCount = await appareilLocator.count()
    expect(appareilLocatorCount).toEqual(appareilList.length)

    // check the style of each appareil
    const appareilNameLocator = appareilLocator.locator("h4")
    const appareilInputLocator = appareilLocator.locator(".form-control")
    for (let idx = 0; idx < appareilLocatorCount; idx++) {
      const appareil = appareilList[idx]
      // appareils Locators
      const appareilLocator = homeLocator.locator("li")
      // current appareil locators
      const currentAppareil = appareilLocator.nth(idx)
      //  Check appareil styles and attributes based on status
      if (appareil.status === AppareilStatus.ON)
        await isTurnOn({ currentAppareil, idx })
      else {
        await isTurnOff({ currentAppareil, idx })
      }
      const currentAppareilInput = appareilInputLocator.nth(idx)
      const inputValue = await currentAppareilInput.inputValue()
      expect(inputValue).toEqual(appareil.name)
    }
    // check appareil H4 text
    await expect(appareilNameLocator).toHaveText(
      appareilInitalText
    )
  })

  test("should verify the initial state of an turn off appareil", async ({ page }) => {
    // appareils Locators
    const idx = 1
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareil = homeLocator.locator("li").nth(idx)
    await isTurnOff({ currentAppareil, idx })
  })

  test("should verify the initial state of an turn on appareil", async ({ page }) => {
    const idx = 0
    // appareils Locators
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareil = homeLocator.locator("li").nth(idx)
    await isTurnOn({ currentAppareil, idx })
  })

  test("should turn on an appareil", async ({ page }) => {
    const idx = 1
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareil = homeLocator.locator(".list-group .list-group-item").nth(idx)
    await isTurnOff({ currentAppareil, idx })
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Allumer" })
    await isTurnOn({ currentAppareil, idx })
  })

  test("should turn off an appareil", async ({ page }) => {
    const idx = 2
    const homeLocator = page.getByTestId("home-wrapper")
    const currentAppareil = homeLocator.locator(".list-group .list-group-item").nth(idx)
    await isTurnOn({ currentAppareil, idx })
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Éteindre" })
    await isTurnOff({ currentAppareil, idx })

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

  test("should turn on and off an appareil", async ({ page }) => {
    const idx = 1
    const currentAppareil = page.locator(".list-group .list-group-item").nth(idx)
    await isTurnOff({ currentAppareil, idx })
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Allumer" })
    await isTurnOn({ currentAppareil, idx })
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Éteindre" })
    await isTurnOff({ currentAppareil, idx })
  })

  test("should turn off and on an appareil", async ({ page }) => {
    const idx = 2
    const currentAppareil = page.locator(".list-group .list-group-item").nth(idx)
    await isTurnOn({ currentAppareil, idx })
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Éteindre" })
    await isTurnOff({ currentAppareil, idx })
    await toggleAppareilStatus({ locator: currentAppareil, innerText: "Allumer" })
    await isTurnOn({ currentAppareil, idx })
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
})


test.describe("appareil input", async () => {
  test.beforeEach(async function ({ page }) {
    await page.goto("/")
  })
})

