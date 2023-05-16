import { async } from '@angular/core/testing';
import { test, expect, Page, Locator } from '@playwright/test';
import { AppareilStatus, IAppareil } from 'src/app/models/appareil.model';


const appareilList: IAppareil[] = [
  {
    id: 0,
    name: 'Machine à laver',
    status: AppareilStatus.ON
  }, {
    id: 1,
    name: "Televions",
    status: AppareilStatus.OFF
  }, {
    id: 2,
    name: "Ordinateur",
    status: AppareilStatus.ON
  }
]
const AppareilInitalText = appareilList.map(
  ({ name, status }) => `Appareil: ${name} -- Statut ${status}`
)
const appareilTurnOnText = appareilList.map(
  ({ name }) => `Appareil: ${name} -- Statut ${AppareilStatus.ON}`
)
const appareilTurnOffText = appareilList.map(
  ({ name }) => `Appareil: ${name} -- Statut ${AppareilStatus.OFF}`
)

test.describe("appareils initial state", () => {
  test.beforeEach(async function ({ page }) {
    await page.goto("/")
  })

  test("Verify the initial state of all appareils", async ({ page }) => {
    const appareilLocator = page.locator("li")

    // check if every appareil is in the dom
    const appareilLocatorCount = await appareilLocator.count()
    expect(appareilLocatorCount).toEqual(appareilList.length)

    // check the style of each appareil
    const appareilNameLocator = appareilLocator.locator("h4")
    const appareilInputLocator = appareilLocator.locator(".form-control")
    for (let idx = 0; idx < appareilLocatorCount; idx++) {
      const appareil = appareilList[idx]
      // appareils Locators
      const appareilLocator = page.locator("li")
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
    const appareilNameLocatorInnerText = appareilList.map(
      ({ name, status }) =>
        `Appareil: ${name} -- Statut ${status}`
    )
    await expect(appareilNameLocator).toHaveText(
      appareilNameLocatorInnerText
    )
  })
  test("Verify the initial state of an turn off appareil", async ({ page }) => {
    // appareils Locators
    const idx = 1
    const currentAppareil = page.locator("li").nth(idx)
    await isTurnOff({ currentAppareil, idx })

  })
  test("Verify the initial state of an turn on appareil", async ({ page }) => {
    const idx = 0
    // appareils Locators
    const currentAppareil = page.locator("li").nth(idx)
    await isTurnOn({ currentAppareil, idx })
  })

})
test.describe("switch on/off appareils", async () => {
  test.beforeEach(async function ({ page }) {
    await page.goto("/")
  })

  test("should turn on an appareil", async ({ page }) => {
    const idx = 1
    const currentAppareil = page.locator("li").nth(idx)
    await isTurnOff({ currentAppareil, idx })
    const turnOnBtn = currentAppareil.locator(".btn-success")
    await turnOnBtn.click()
    await isTurnOn({ currentAppareil, idx })

  })
  test("should turn off an appareil", async ({ page }) => {
    const idx = 2
    const currentAppareil = page.locator("li").nth(idx)
    await isTurnOn({ currentAppareil, idx })
    const turnOffBtn = currentAppareil.locator(".btn-danger")
    await turnOffBtn.click()
    await isTurnOff({ currentAppareil, idx })

  })
  test("should turn on all appareils", async ({ page }) => {
    const appareilName = page.locator("li h4")

    await expect(appareilName).toHaveText(
      AppareilInitalText
    )
    const turnAllOnBtn = page.locator("button").getByText("Tout Allumer")
    await turnAllOnBtn.click()
    await expect(appareilName).toHaveText(appareilTurnOnText)
  })
  test("should turn off all appareils", async ({ page }) => {
    const appareilName = page.locator("li h4")

    await expect(appareilName).toHaveText(
      AppareilInitalText
    )
    const turnAllOffBtn = page.locator("button").getByText("Tout Éteindre")
    await turnAllOffBtn.click()
    await expect(appareilName).toHaveText(appareilTurnOffText)
  })
})
interface ISwitchOnOff {
  currentAppareil: Locator;
  idx: number;
}

async function isTurnOn({ currentAppareil, idx }: ISwitchOnOff) {
  // current appareil locators
  const currentAppareilName = currentAppareil.locator("h4")
  const currentAppareilOnBtn = currentAppareil.locator(".btn.btn-success")
  const currentAppareilOffBtn = currentAppareil.locator(".btn.btn-danger")
  const appareil = appareilList[idx]
  //  Check appareil styles and attributes based on status
  await expect(currentAppareilOnBtn).toHaveCSS(
    "background-color", "rgb(92, 184, 92)"
  )
  await expect(currentAppareilOffBtn).toHaveCSS(
    "background-color", "rgb(217, 83, 79)"
  )
  await expect(currentAppareil).toHaveCSS(
    "background-color", "rgb(223, 240, 216)"
  )
  await expect(currentAppareilName).toHaveCSS(
    "color", "rgb(0, 128, 0)"
  )
  // check button attribute
  await expect(currentAppareilOnBtn).toBeDisabled()
  await expect(currentAppareilOffBtn).toBeEnabled()
  // check appareil H4 text
  const appareilNameLocatorInnerText =
    `Appareil: ${appareil.name} -- Statut ${AppareilStatus.ON}`
  await expect(currentAppareilName).toHaveText(
    appareilNameLocatorInnerText
  )
}
async function isTurnOff({ currentAppareil, idx }: ISwitchOnOff) {
  //current appareils locator
  const currentAppareilName = currentAppareil.locator("h4")
  const currentAppareilOnBtn = currentAppareil.locator(".btn-success")
  const currentAppareilOffBtn = currentAppareil.locator(".btn-danger")
  const appareil = appareilList[idx]

  //  Check appareil styles and attributes based on status
  await expect(currentAppareilOnBtn).toHaveCSS(
    "background-color", "rgb(92, 184, 92)"
  )
  await expect(currentAppareilOffBtn).toHaveCSS(
    "background-color", "rgb(217, 83, 79)"
  )
  await expect(currentAppareil).toHaveCSS(
    "background-color", "rgb(242, 222, 222)"
  )
  await expect(currentAppareilName).toHaveCSS(
    "color", "rgb(255, 0, 0)"
  )
  // check button attribute
  await expect(currentAppareilOnBtn).toBeEnabled()
  await expect(currentAppareilOffBtn).toBeDisabled()
  // check appareil name and status
  const appareilNameLocatorInnerText =
    `Appareil: ${appareil.name} -- Statut ${AppareilStatus.OFF}`
  await expect(currentAppareilName).toHaveText(
    appareilNameLocatorInnerText
  )
}
