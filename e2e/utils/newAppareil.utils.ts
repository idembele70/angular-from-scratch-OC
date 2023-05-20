import { Page, expect } from "@playwright/test"
import { AppareilStatus, IAppareil } from "src/app/models/appareil.model"

interface AddAppareilParams {
  page: Page,
  baseURL: string
  newAppareil: IAppareil
}

async function addAppareil({ page, baseURL, newAppareil }: AddAppareilParams) {
  const wrapperLocator = page.getByTestId("edit-appareil-wrapper")
  const nameInput = wrapperLocator.locator("input#name")
  const { name, status, id } = newAppareil
  await nameInput.fill(name)
  const nameInputValue = await nameInput.inputValue()
  expect(nameInputValue).toEqual(name)
  const statusSelectedOption = wrapperLocator.locator("select")
  if (status === AppareilStatus.OFF) {
    const statusSelectValue = await statusSelectedOption.inputValue() === status
    expect(statusSelectValue).toBeTruthy()
  } else {
    await statusSelectedOption.selectOption(status)
    const statusSelectValue = await statusSelectedOption.inputValue() === status
    expect(statusSelectValue).toBeTruthy()
  }
  const btn = wrapperLocator.locator("button")
  await expect(btn).toBeEnabled()
  await btn.click()
  const redirectUrl = `${baseURL || ""}/appareils`
  await page.waitForURL(redirectUrl)
}

export {
  AddAppareilParams,
  addAppareil
}