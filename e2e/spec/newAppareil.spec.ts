import { expect, test } from "@playwright/test"
import { PageInfo, RouterLinkParams, addAppareil, assertCurrentRouteNavLinkActive, checkAppareilStatus, checkDetailsLinkFunctionality, navigateWithRouterLink, signIn, toggleAppareilStatus, validatePageURL } from "e2e/utils"
import { AppareilStatus, IAppareil } from "src/app/models/appareil.model"

test.describe('Create a new appareil page', () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto("/auth")
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await signIn(pageInfo)
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    validatePageURL({ ...pageInfo, path: "edit" })
  })

  test('should verify the inital state of the page', async ({ page }) => {
    const wrapperLocator = page.getByTestId("edit-appareil-wrapper")
    const nameLabel = wrapperLocator.locator("label")
      .getByText("Nom de l'appareil")
    await expect(nameLabel).toBeVisible()
    const nameInputValue = await wrapperLocator.locator("input#name").inputValue()
    expect(nameInputValue).toEqual("")
    const statusLabel = wrapperLocator.locator("label")
      .getByText("Etat de l'appareil")
    await expect(statusLabel).toBeVisible()
    const statusSelectedOption = await wrapperLocator.locator("select").inputValue()
    expect(statusSelectedOption).toEqual(AppareilStatus.OFF)
    const btn = wrapperLocator.locator("button")
    await expect(btn).toBeDisabled()

  })

  test('should create a new appareil Turned off', async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "Laptop", status: AppareilStatus.OFF }
    await addAppareil({ page, baseURL: baseURL || "", newAppareil })
    const appareilLocator = page.locator("li").filter({
      hasText: new RegExp(newAppareil.name, "g")
    })
    await checkAppareilStatus({ appareil: newAppareil, appareilLocator, status: newAppareil.status })
  })

  test('should create a new appareil Turned on', async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "Ipad", status: AppareilStatus.ON }
    await addAppareil({ page, baseURL: baseURL || "", newAppareil })
    const appareilLocator = page.locator("li").filter({
      hasText: new RegExp(newAppareil.name, "g")
    })
    await isTurnOn({ appareil: newAppareil, appareilLocator })
  })

  test('should allow to check a new appareil details', async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "Ipad", status: AppareilStatus.ON }
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await addAppareil({ ...pageInfo, newAppareil })
    const appareilLocator = page.locator("li").filter({
      hasText: new RegExp(newAppareil.name, "g")
    })
    await isTurnOn({ appareil: newAppareil, appareilLocator })
    await checkDetailsLinkFunctionality({ ...pageInfo, parentLocator: appareilLocator, appareil: newAppareil })
  })

  test('should allow to edit appareil a new Name', async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "Ipad", status: AppareilStatus.ON }
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await addAppareil({ ...pageInfo, newAppareil })
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator("li").filter({
      hasText: new RegExp(newAppareil.name, "g")
    })

    const appareilInputLocator = appareilLocator.locator(".form-control")
    const inputValue = await appareilInputLocator.inputValue()
    const appareilNameLocator = appareilLocator.locator("h4")
    await expect(appareilNameLocator).toContainText(inputValue)
    const newInputValue = "My new Ipad"
    await appareilInputLocator.fill(newInputValue)
    const inputValueAfterFill = await appareilInputLocator.inputValue()
    await expect(appareilNameLocator).toContainText(inputValueAfterFill)
  })

  test('should verify if new appareils nav link is active', async ({ page }) => {
    const routerLinkOptions: RouterLinkParams = { page, innerText: "Nouvel appareil" }
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
  })

  test("should turn on and off all appareils the new one too", async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "Ipad", status: AppareilStatus.ON }
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await addAppareil({ ...pageInfo, newAppareil })
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator(".list-group .list-group-item h4")
    const appareilInitialNames = (await appareilName.allInnerTexts()).join('')
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    const appareilSetToOnNames = (await appareilName.allInnerTexts()).join('')
    expect(appareilInitialNames).not.toEqual(appareilSetToOnNames)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    const appareilSetToOffNames = (await appareilName.allInnerTexts()).join('')
    expect(appareilSetToOnNames).not.toEqual(appareilSetToOffNames)
  })

  test("should turn off and on all appareils the new one too", async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "XBOX 360", status: AppareilStatus.OFF }
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await addAppareil({ ...pageInfo, newAppareil })
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilName = homeLocator.locator(".list-group .list-group-item h4")
    const appareilInitialNames = (await appareilName.allInnerTexts()).join('')
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Éteindre" })
    const appareilSetToOffNames = (await appareilName.allInnerTexts()).join('')
    expect(appareilInitialNames).not.toEqual(appareilSetToOffNames)
    await toggleAppareilStatus({ locator: homeLocator, innerText: "Tout Allumer" })
    const appareilSetToOnNames = (await appareilName.allInnerTexts()).join('')
    expect(appareilSetToOffNames).not.toEqual(appareilSetToOnNames)

  })

  test("should turn on and off a new appareil", async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "XBOX 360", status: AppareilStatus.OFF }
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await addAppareil({ ...pageInfo, newAppareil })
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator(".list-group .list-group-item").
      filter({
        hasText: new RegExp(newAppareil.name)
      })
    const turnOnOffOptions: TurnOnOffParams = { appareilLocator, appareil: newAppareil }
    await isTurnOff(turnOnOffOptions)
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Allumer" })
    await isTurnOn(turnOnOffOptions)
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Éteindre" })
    await isTurnOff(turnOnOffOptions)
  })

  test("should turn off and on a new appareil", async ({ page, baseURL }) => {
    const newAppareil: IAppareil = { id: Date.now(), name: "PS5", status: AppareilStatus.ON }
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await addAppareil({ ...pageInfo, newAppareil })
    const homeLocator = page.getByTestId("home-wrapper")
    const appareilLocator = homeLocator.locator(".list-group .list-group-item").
      filter({
        hasText: new RegExp(newAppareil.name)
      })
    const turnOnOffOptions: TurnOnOffParams = { appareilLocator, appareil: newAppareil }
    await isTurnOn(turnOnOffOptions)
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Éteindre" })
    await isTurnOff(turnOnOffOptions)
    await toggleAppareilStatus({ locator: appareilLocator, innerText: "Allumer" })
    await isTurnOn(turnOnOffOptions)
  })
})