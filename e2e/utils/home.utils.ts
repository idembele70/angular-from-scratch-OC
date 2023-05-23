
import { APIRequestContext, Locator, Page, expect } from "@playwright/test";
import { AppareilStatus, IAppareil } from "src/app/models/appareil.model";
import { RouterLinkParams, assertCurrentRouteNavLinkActive, isAppareilDetailsPage, navigateWithRouterLink } from "./index";

interface CheckAppareilStylesParams {
  currentAppareilOnBtn: Locator
  currentAppareilOffBtn: Locator
  currentAppareil: Locator
  currentAppareilName: Locator,
  status: AppareilStatus
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

  switch (status) {
    case AppareilStatus.ON:
      await expect(currentAppareil).toHaveCSS(
        "background-color", "rgb(223, 240, 216)"
      )
      await expect(currentAppareilName).toHaveCSS(
        "color", "rgb(0, 128, 0)"
      )
      break;

    case AppareilStatus.OFF:
      await expect(currentAppareil).toHaveCSS(
        "background-color", "rgb(242, 222, 222)"
      )
      await expect(currentAppareilName).toHaveCSS(
        "color", "rgb(255, 0, 0)"
      )
      break;

    default:
      console.error("The status: '%s' provided on checkAppareilStyles func doesn't exist ", status)
      break;
  }
}

// used in multiple files
interface CheckAppareilStatusParams {
  appareilLocator: Locator;
  appareil: IAppareil;
  status: AppareilStatus
}
type CheckAppareilInfo = Omit<CheckAppareilStatusParams, "status">
async function checkAppareilStatus({ appareilLocator, appareil, status }: CheckAppareilStatusParams) {
  const currentAppareilName = appareilLocator.locator("h4")
  const currentAppareilOnBtn = appareilLocator.locator(".btn.btn-success")
  const currentAppareilOffBtn = appareilLocator.locator(".btn.btn-danger")
  //  Check appareil styles and attributes based on status
  await checkAppareilStyles({
    currentAppareil: appareilLocator,
    currentAppareilName,
    currentAppareilOffBtn,
    currentAppareilOnBtn,
    status
  })

  switch (status) {
    case AppareilStatus.ON:
      await expect(currentAppareilOnBtn).toBeDisabled()
      await expect(currentAppareilOffBtn).toBeEnabled()
      // check appareil H4 text
      await expect(currentAppareilName).toHaveText(
        `Appareil: ${appareil.name} -- Statut ${AppareilStatus.ON}`
      )
      break;

    case AppareilStatus.OFF:
      // check button attribute
      await expect(currentAppareilOnBtn).toBeEnabled()
      await expect(currentAppareilOffBtn).toBeDisabled()

      // check appareil name and status
      await expect(currentAppareilName).toHaveText(
        `Appareil: ${appareil.name} -- Statut ${AppareilStatus.OFF}`
      )
      break;

    default:
      console.error("The status: '%s' provided on checkAppareilStatus func doesn't exist ", status)
      break;
  }
}

interface ToggleAppareilStatusParams {
  locator: Locator;
  innerText: string;
}

async function toggleAppareilStatus({ locator, innerText }: ToggleAppareilStatusParams) {
  const btn = locator.getByRole("button", { name: innerText })
  await btn.click()
}



// used in mutiple files
interface CheckDetailsLinkFunctionalityParams {
  parentLocator: Locator;
  appareil: IAppareil;
  page: Page,
}
async function checkDetailsLinkFunctionality({ parentLocator, appareil, page }: CheckDetailsLinkFunctionalityParams) {
  const appareilDetailLink = parentLocator.locator("a").getByText("détails")
  await appareilDetailLink.click()
  await isAppareilDetailsPage({ page, ...appareil })
  const routerLinkOptions: RouterLinkParams = { page, innerText: "appareils" }
  await assertCurrentRouteNavLinkActive(routerLinkOptions)
  await navigateWithRouterLink(routerLinkOptions)
}



export {
  checkAppareilStyles,
  CheckAppareilStatusParams,
  CheckAppareilInfo,
  checkAppareilStatus,
  ToggleAppareilStatusParams,
  toggleAppareilStatus,
  CheckDetailsLinkFunctionalityParams,
  checkDetailsLinkFunctionality,
};
