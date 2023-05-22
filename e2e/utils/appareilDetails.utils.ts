import { Page, expect } from "@playwright/test"
import { AppareilStatus, IAppareil } from "src/app/models/appareil.model"

// used an other file
interface isAppareilDetailsPageParams {
  page: Page,
  name: string,
  status: AppareilStatus,
  baseURL?: string
}
type AppareilDetailsPageParamsWithoutStatus = Omit<isAppareilDetailsPageParams, "status">;
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

interface GoToDetailsPageParams {
  page: Page,
  name: string
}

async function goToDetailsPage({ page, name }: GoToDetailsPageParams) {
  const homeLocator = page.getByTestId("home-wrapper")
  const appareilLocator = homeLocator.locator("li").filter(
    { hasText: new RegExp(`Appareil: ${name}`) }
  )
  const detailsLink = appareilLocator.locator("a").getByText("détails")
  await detailsLink.click()
}

export {
  isAppareilDetailsPageParams,
  isAppareilDetailsPage,
  goToDetailsPage,
  AppareilDetailsPageParamsWithoutStatus
}