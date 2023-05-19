import { test, expect } from "@playwright/test"
import { RouterLinkParams, PageInfo, URLValidationParams, assertCurrentRouteNavLinkActive, isSignIn, isSignOut, navigateWithRouterLink, signIn, signOut, validatePageURL, } from "../utils"



test.describe('Auth page tests', () => {

  test.beforeEach(async ({ page, baseURL }) => {
    const path = "auth"
    await page.goto(`/${path}`)
    const validatePageURLOptions: URLValidationParams = { page, baseURL: baseURL || "", path }
    validatePageURL(validatePageURLOptions)
  })

  test("should sign in", async ({ page, baseURL }) => {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await isSignOut(pageInfo)
    await signIn(pageInfo)
    validatePageURL({ ...pageInfo, path: "" })
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    validatePageURL({ ...pageInfo, path: "auth" })
    await isSignIn(pageInfo)
  })

  test("should sign out", async ({ page, baseURL }) => {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await isSignOut(pageInfo)
    await signIn(pageInfo)
    validatePageURL({ ...pageInfo, path: "" })
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    await isSignIn(pageInfo)
    await signOut(pageInfo)
    validatePageURL({ ...pageInfo, path: "auth" })
    await isSignOut(pageInfo)
  })

  test('should sign out on reload', async ({ page, baseURL }) => {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await isSignOut(pageInfo)
    await signIn(pageInfo)
    await page.reload()
    validatePageURL({ ...pageInfo, path: "auth" })
    await isSignOut({ ...pageInfo })
  })

  test('should disallow navigation when signed out', async ({ page, baseURL }) => {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    const validatePageURLParams: URLValidationParams = { ...pageInfo, path: "auth" }
    await isSignOut(pageInfo)
    await navigateWithRouterLink({ page, innerText: "Appareils" })
    validatePageURL(validatePageURLParams)
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    validatePageURL(validatePageURLParams)
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    validatePageURL(validatePageURLParams)
  })

  test('should allow navigation when signed in', async ({ page, baseURL }) => {
    const pageInfo: PageInfo = { page, baseURL: baseURL || "" }
    await isSignOut(pageInfo)
    await signIn(pageInfo)
    validatePageURL({ ...pageInfo, path: "" })
    await navigateWithRouterLink({ page, innerText: "Nouvel appareil" })
    validatePageURL({ ...pageInfo, path: "edit" })
    await navigateWithRouterLink({ page, innerText: "Appareils" })
    validatePageURL({ ...pageInfo, path: "appareils" })
    await navigateWithRouterLink({ page, innerText: "Authentification" })
    validatePageURL({ ...pageInfo, path: "auth" })
  })

  test('should verify if auth nav link is active', async ({ page }) => {
    const routerLinkOptions: RouterLinkParams = { page, innerText: "authentification" }
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await page.reload()
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
    await navigateWithRouterLink(routerLinkOptions)
    await assertCurrentRouteNavLinkActive(routerLinkOptions)
  })


})
