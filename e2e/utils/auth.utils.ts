
import { expect } from "@playwright/test"
import { URLValidationParams } from "./commons.utils"

// used in different file
type PageInfo = Omit<URLValidationParams, "path">

const signIn = async ({ page, baseURL }: PageInfo) => {
  const signInBtn = page.getByTestId("auth-wrapper").
    locator('button').getByText("Se connecter")
  await signInBtn.click()
  await page.waitForURL(`${baseURL}/`)
}

const isSignIn = async ({ page }: PageInfo) => {
  const authWrapper = page.getByTestId("auth-wrapper")
  const signInBtn = authWrapper.locator('button').getByText("Se connecter")
  const signOutBtn = authWrapper.locator('button').getByText("Se deconnecter")
  await expect(signInBtn).toBeHidden()
  await expect(signOutBtn).toBeVisible()
}

const signOut = async ({ page }: PageInfo) => {
  const signOutBtn = page.getByTestId("auth-wrapper")
    .locator('button').getByText("Se deconnecter")
  await signOutBtn.click()
}
const isSignOut = async ({ page }: PageInfo) => {
  const authWrapper = page.getByTestId("auth-wrapper")
  const signInBtn = authWrapper.locator('button').getByText("Se connecter")
  const signOutBtn = authWrapper.locator('button').getByText("Se deconnecter")
  await expect(signInBtn).toBeVisible()
  await expect(signOutBtn).toBeHidden()
}

export {
  PageInfo, isSignIn, isSignOut, signIn, signOut
}
