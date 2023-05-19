import { expect } from "@playwright/test"
import { URLValidationParams } from "./commons.utils"

// used in auth.spec
type PageInfo = Omit<URLValidationParams, "path">

const signIn = async ({ page, baseURL }: PageInfo) => {
  const signInBtn = page.locator('button').getByText("Se connecter")
  await signInBtn.click()
  const redirectedUrl = `${baseURL}/`
  await page.waitForURL(redirectedUrl)
}
const isSignIn = async ({ page }: PageInfo) => {
  const signInBtn = page.locator('button').getByText("Se connecter")
  const signOutBtn = page.locator('button').getByText("Se deconnecter")
  const isSignOutBtnVisible = await signOutBtn.isVisible()
  const isSignInBtnHidden = await signInBtn.isHidden()
  expect(isSignOutBtnVisible).toBeTruthy()
  expect(isSignInBtnHidden).toBeTruthy()
}

const signOut = async ({ page }: PageInfo) => {
  const signOutBtn = page.locator('button').getByText("Se deconnecter")
  await signOutBtn.click()
}
const isSignOut = async ({ page }: PageInfo) => {
  const signInBtn = page.locator('button').getByText("Se connecter")
  const signOutBtn = page.locator('button').getByText("Se deconnecter")
  await expect(signInBtn).toBeVisible()
  await expect(signOutBtn).toBeHidden()
}

export {
  PageInfo, isSignIn, isSignOut, signIn, signOut
}
