import { Locator, Page, expect } from "@playwright/test";
import { AppareilStatus, IAppareil } from "src/app/models/appareil.model";
import { RouterLinkParams, assertCurrentRouteNavLinkActive, isAppareilDetailsPage, navigateWithRouterLink } from "./index";


enum StyleStatus {
  ON = "on",
  OFF = "off",
}
interface CheckAppareilStylesParams {
  currentAppareilOnBtn: Locator
  currentAppareilOffBtn: Locator
  currentAppareil: Locator
  currentAppareilName: Locator,
  status: StyleStatus
}
async function checkAppareilStyles({ currentAppareilOnBtn,
  currentAppareilOffBtn,
  currentAppareil,
  currentAppareilName, status }: CheckAppareilStylesParams) {
  await expect(currentAppareilOnBtn).toHaveCSS(
    "background-color", "rgb(92, 184, 92)"
  )
  await expect(currentAppareilOffBtn).toHaveCSS(
    "background-color", "rgb(217, 83, 79)"
  )
  if (status == StyleStatus.ON) {
    await expect(currentAppareil).toHaveCSS(
      "background-color", "rgb(223, 240, 216)"
    )
    await expect(currentAppareilName).toHaveCSS(
      "color", "rgb(0, 128, 0)"
    )
  } else {
    await expect(currentAppareil).toHaveCSS(
      "background-color", "rgb(242, 222, 222)"
    )
    await expect(currentAppareilName).toHaveCSS(
      "color", "rgb(255, 0, 0)"
    )
  }
}

interface TurnOnOffParams {
  appareilLocator: Locator;
  appareil: IAppareil;
}
async function isTurnOn({ appareilLocator, appareil }: TurnOnOffParams) {
  const currentAppareilName = appareilLocator.locator("h4")
  const currentAppareilOnBtn = appareilLocator.locator(".btn.btn-success")
  const currentAppareilOffBtn = appareilLocator.locator(".btn.btn-danger")
  //  Check appareil styles and attributes based on status
  await checkAppareilStyles({ currentAppareil: appareilLocator, currentAppareilName, currentAppareilOffBtn, currentAppareilOnBtn, status: StyleStatus.ON })
  // check button attribute
  await expect(currentAppareilOnBtn).toBeDisabled()
  await expect(currentAppareilOffBtn).toBeEnabled()
  // check appareil H4 text
  await expect(currentAppareilName).toHaveText(
    `Appareil: ${appareil.name} -- Statut ${AppareilStatus.ON}`
  )
}
async function isTurnOff({ appareilLocator, appareil }: TurnOnOffParams) {
  //current appareils locator
  const currentAppareilName = appareilLocator.locator("h4")
  const currentAppareilOnBtn = appareilLocator.locator(".btn-success")
  const currentAppareilOffBtn = appareilLocator.locator(".btn-danger")

  //  Check appareil styles and attributes based on status
  await checkAppareilStyles({ currentAppareil: appareilLocator, currentAppareilName, currentAppareilOffBtn, currentAppareilOnBtn, status: StyleStatus.OFF })

  // check button attribute
  await expect(currentAppareilOnBtn).toBeEnabled()
  await expect(currentAppareilOffBtn).toBeDisabled()

  // check appareil name and status
  await expect(currentAppareilName).toHaveText(
    `Appareil: ${appareil.name} -- Statut ${AppareilStatus.OFF}`
  )
}
interface ToggleAppareilStatusParams {
  locator: Locator;
  innerText: string;
}
async function toggleAppareilStatus({ locator, innerText }: ToggleAppareilStatusParams) {
  const btn = locator.getByRole("button", { name: innerText })
  await btn.click()
}

interface CheckDetailsLinkFunctionalityParams {
  parentLocator: Locator;
  appareil: IAppareil;
  page: Page,
  baseURL?: string
}

async function checkDetailsLinkFunctionality({ parentLocator, appareil, page, baseURL }: CheckDetailsLinkFunctionalityParams) {
  const appareilDetailLink = parentLocator.locator("a").getByText("détails")
  await appareilDetailLink.click()
  const { name, status } = appareil
  await isAppareilDetailsPage({ page, name, status })
  const routerLinkOptions: RouterLinkParams = { page, innerText: "appareils" }
  await assertCurrentRouteNavLinkActive(routerLinkOptions)
  await navigateWithRouterLink(routerLinkOptions)
}

export {
  CheckDetailsLinkFunctionalityParams, ToggleAppareilStatusParams, TurnOnOffParams, checkAppareilStyles, checkDetailsLinkFunctionality, isTurnOff, isTurnOn, toggleAppareilStatus
};
