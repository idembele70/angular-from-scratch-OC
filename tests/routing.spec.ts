import { Page, expect, test } from "@playwright/test";
import { signIn } from "./sign.spec";

test.describe("routing", () => {
  test("should restrict access to protected routes for non-signed-in users", async ({ page, baseURL }) => {
    await page.goto("/")
    const options = { page, baseURL: baseURL ? baseURL : "", path: "auth" }
    validatePageURL(options)
    await page.goto("/appareils")
    validatePageURL(options)
    await page.goto("/appareils/12")
    validatePageURL(options)
    await page.goto("/edit")
    validatePageURL(options)
  })

  test("should not restrict access to unprotected routes", async ({ page, baseURL }) => {
    const currentBaseURL = baseURL ? baseURL : ""
    const options = { page, baseURL: currentBaseURL }
    const notFoundOptions = { ...options, path: "not-found" }
    await page.goto("/not-found")
    validatePageURL(notFoundOptions)
    await page.goto("/thispage")
    validatePageURL(notFoundOptions)
    await page.goto("/not-sign-in")
    validatePageURL(notFoundOptions)
    await page.goto("/Auth")
    validatePageURL(notFoundOptions)
    await page.goto("/auth")
    validatePageURL({ ...options, path: "auth" })

  })

  test('should authorize me to navigate when signIn', async ({ page, baseURL }) => {
    await signIn({ page, baseURL: baseURL ? baseURL : "" })

  })
})



interface URLValidationParams {
  page: Page,
  baseURL: string
  path: string
}

const validatePageURL = ({ page, baseURL, path }: URLValidationParams) => {
  const url = page.url()
  const currentUrl = `${baseURL}/${path}`
  expect(url).toEqual(currentUrl)
}



export {
  URLValidationParams,
  validatePageURL,
}