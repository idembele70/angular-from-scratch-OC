import { test, expect } from "@playwright/test"
import { isSignIn, isSignOut, navigateWithRouterLink, signIn, signOut, validatePageURL, } from "../utils"



test.describe('Auth page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth")
  })
  test("should sign in", async ({ page, baseURL }) => {
    const options = { page, baseURL: baseURL || "" }
    await isSignOut(options)
    await signIn(options)
    validatePageURL({ ...options, path: "" })
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    validatePageURL({ ...options, path: "auth" })
    await isSignIn(options)
  })

  test("should sign out", async ({ page, baseURL }) => {
    const options = { page, baseURL: baseURL || "" }
    await isSignOut(options)
    await signIn(options)
    validatePageURL({ ...options, path: "" })
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    await isSignIn(options)
    await signOut(options)
    validatePageURL({ ...options, path: "auth" })
    await isSignOut(options)
  })

  test('should sign out on reload', async ({ page, baseURL }) => {
    await page.goto("/auth")
    const options = { page, baseURL: baseURL || "" }
    await isSignOut(options)
    await signIn(options)
    await page.reload()
    validatePageURL({ ...options, path: "auth" })
    await isSignOut({ ...options })
  })
  test('should disallow navigation when signed out', async ({ page, baseURL }) => {
    const options = { page, baseURL: baseURL || "", path: "auth" }
    const validatePageURLParams = { ...options, path: "auth" }
    validatePageURL(validatePageURLParams)
    await isSignOut(options)
    await navigateWithRouterLink({ page, innerText: "Appareils" })
    validatePageURL(validatePageURLParams)
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    validatePageURL(validatePageURLParams)
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    validatePageURL(validatePageURLParams)
  })
  test('should allow navigation when signed in', async ({ page, baseURL }) => {
    const options = { page, baseURL: baseURL || "", path: "auth" }
    const validatePageURLParams = { ...options, path: "auth" }
    validatePageURL(validatePageURLParams)
    await isSignOut(options)
    await signIn(options)
    validatePageURL({ ...options, path: "" })
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    validatePageURL({ ...options, path: "edit" })
    await navigateWithRouterLink({ page, innerText: "Appareils" })
    validatePageURL({ ...options, path: "appareils" })
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    validatePageURL({ ...options, path: "auth" })
  })
})

