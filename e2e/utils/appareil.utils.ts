import { Page, expect } from "@playwright/test"
import { AppareilStatus } from "src/app/models/appareil.model"

interface isAppareilDetailsPageParams {
  page: Page,
  name: string,
  status: AppareilStatus
}
async function isAppareilDetailsPage({ page, name, status }: isAppareilDetailsPageParams) {
  const appareilName = page.getByRole('heading', { name })
  const appareilStatusText = page.locator('p').getByText(`Statut: ${status}`)
  const appareilPageLink = page.getByRole("link", { name: "Retour à la liste" })

  await expect(appareilName).toBeVisible()
  await expect(appareilStatusText).toBeVisible()
  await expect(appareilPageLink).toBeVisible()
}

export {
  isAppareilDetailsPageParams,
  isAppareilDetailsPage
}