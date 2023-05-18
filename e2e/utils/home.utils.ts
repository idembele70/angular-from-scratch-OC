import { Locator, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions, expect } from "@playwright/test"
import { appareilTurnOffText, appareilTurnOnText } from "e2e/data"
import { signIn } from "./auth.utils"
import { validatePageURL } from "./commons.utils"


enum StyleStatus {
  ON = "on",
  OFF = "off",
}
interface CheckAppareilStylesOptions {
  currentAppareilOnBtn: Locator
  currentAppareilOffBtn: Locator
  currentAppareil: Locator
  currentAppareilName: Locator,
  status: StyleStatus
}

async function checkAppareilStyles({ currentAppareilOnBtn,
  currentAppareilOffBtn,
  currentAppareil,
  currentAppareilName, status }: CheckAppareilStylesOptions) {
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

interface ISwitchOnOff {
  currentAppareil: Locator;
  idx: number;
}
async function isTurnOn({ currentAppareil, idx }: ISwitchOnOff) {
  // current appareil locators
  const currentAppareilName = currentAppareil.locator("h4")
  const currentAppareilOnBtn = currentAppareil.locator(".btn.btn-success")
  const currentAppareilOffBtn = currentAppareil.locator(".btn.btn-danger")
  //  Check appareil styles and attributes based on status
  await checkAppareilStyles({ currentAppareil, currentAppareilName, currentAppareilOffBtn, currentAppareilOnBtn, status: StyleStatus.ON })
  // check button attribute
  await expect(currentAppareilOnBtn).toBeDisabled()
  await expect(currentAppareilOffBtn).toBeEnabled()
  // check appareil H4 text
  await expect(currentAppareilName).toHaveText(
    appareilTurnOnText[idx]
  )
}
async function isTurnOff({ currentAppareil, idx }: ISwitchOnOff) {
  //current appareils locator
  const currentAppareilName = currentAppareil.locator("h4")
  const currentAppareilOnBtn = currentAppareil.locator(".btn-success")
  const currentAppareilOffBtn = currentAppareil.locator(".btn-danger")

  //  Check appareil styles and attributes based on status
  await checkAppareilStyles({ currentAppareil, currentAppareilName, currentAppareilOffBtn, currentAppareilOnBtn, status: StyleStatus.OFF })
  // check button attribute
  await expect(currentAppareilOnBtn).toBeEnabled()
  await expect(currentAppareilOffBtn).toBeDisabled()
  // check appareil name and status
  await expect(currentAppareilName).toHaveText(
    appareilTurnOffText[idx]
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


export {
  checkAppareilStyles,
  isTurnOn,
  isTurnOff,
  toggleAppareilStatus,

}