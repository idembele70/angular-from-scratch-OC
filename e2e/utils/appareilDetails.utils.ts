import { Page, expect } from "@playwright/test"
import { AppareilStatus } from "src/app/models/appareil.model"

interface isAppareilDetailsPageParams {
  page: Page,
  name: string,
  status: AppareilStatus,
  baseURL?: string
}
async function isAppareilDetailsPage({ page, name, status, baseURL }: isAppareilDetailsPageParams) {
  const appareilName = page.getByRole('heading', { name })
  const appareilStatusText = page.locator('p').getByText(`Statut: ${status}`)
  const appareilPageLink = page.getByRole("link", { name: "Retour à la liste" })
  if (baseURL) {
    await expect(page).toHaveURL(new RegExp(`${baseURL}/appareils/\\d+`))
  }
  await expect(appareilName).toBeVisible()
  await expect(appareilStatusText).toBeVisible()
  await expect(appareilPageLink).toBeVisible()
}

export {
  isAppareilDetailsPageParams,
  isAppareilDetailsPage
}