import { test, expect } from "@playwright/test"
import { URLValidationParams, validatePageURL } from "./routing.spec"

test.describe('sign actions', () => {
  test("should sign in", async ({ page, baseURL }) => {
    await page.goto("/")
    const options = { page, baseURL: baseURL ? baseURL : "" }
    validatePageURL({ ...options, path: "auth" })
    await signIn(options)
  })

  test("should sign out", async ({ page, baseURL }) => {
    await page.goto("/")
    const options = { page, baseURL: baseURL ? baseURL : "" }
    await signIn(options)
    const authLink = page.locator("a").getByText("Authentification")
    await authLink.click()
    await signOut(options)
  })

  test('should sign out on reload', async ({ page, baseURL }) => {
    await page.goto("/")
    const options = { page, baseURL: baseURL ? baseURL : "" }
    await signIn(options)
    await page.reload()
    validatePageURL({ ...options, path: "auth" })
  })
})
type SignParams = Omit<URLValidationParams, "path">

const signIn = async ({ page, baseURL }: SignParams) => {
  const signInBtn = page.locator('button').getByText("Se connecter")
  const signOutBtn = page.locator('button').getByText("Se deconnecter")
  const isSignOutBtnHidden = await signOutBtn.isHidden()
  expect(isSignOutBtnHidden).toBeTruthy()
  await signInBtn.click()
  const currentUrl = `${baseURL}/`
  await page.waitForURL(currentUrl)
  validatePageURL({ page, baseURL, path: "" })
}
const signOut = async ({ page }: SignParams) => {
  const signOutBtn = page.locator('button').getByText("Se deconnecter")
  const signInBtn = page.locator('button').getByText("Se connecter")
  const isSignInBtnHidden = await signInBtn.isHidden()
  expect(isSignInBtnHidden).toBeTruthy()
  await signOutBtn.click()
  const isSignOutBtnHidden = await signOutBtn.isHidden()
  expect(isSignOutBtnHidden).toBeTruthy()
  const isSignInBtnVisible = await signInBtn.isVisible()
  expect(isSignInBtnVisible).toBeTruthy()

}
export {
  signIn,
  signOut
}