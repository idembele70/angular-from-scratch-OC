import { Page, expect } from '@playwright/test';
import { SignUpCredentials, Gender } from 'src/app/models/User.model';
import { validatePageURL } from './commons.utils';

interface FillSignUpFormParams {
  page: Page;
  newUser: SignUpCredentials;
  baseURL?: string;
}

async function fillSignUpForm({
  page,
  newUser,
  baseURL,
}: FillSignUpFormParams) {
  // page initial state
  const signUpLocator = page.getByTestId('sign-up-wrapper');
  const title = signUpLocator.getByRole('heading', { name: /^inscription$/i });
  await expect(title).toBeVisible();
  const firstNameInput = signUpLocator.getByPlaceholder('Prénom');
  await expect(firstNameInput).toBeVisible();
  await expect(firstNameInput).toHaveValue('');
  const lastNameInput = signUpLocator.getByPlaceholder(/^Nom$/);
  await expect(lastNameInput).toBeVisible();
  await expect(lastNameInput).toHaveValue('');
  const emailInput = signUpLocator.getByPlaceholder('Email');
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toHaveValue('');
  const passwordInput = signUpLocator.getByPlaceholder('Mot de passe');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toHaveValue('');
  const select = signUpLocator.locator('select');
  await expect(select).toBeVisible();
  await expect(select).toHaveValue('female');
  const signUpBtn = signUpLocator.locator('button').getByText("S'inscrire");
  await expect(signUpBtn).toBeVisible();
  await expect(signUpBtn).toBeDisabled();
  const signInLink = signUpLocator
    .locator('a')
    .getByText('Je veux me connecter');
  await expect(signInLink).toBeVisible();

  //adding a new user
  const { firstName, lastName, email, password, gender } = newUser;
  await firstNameInput.fill(firstName);
  await expect(firstNameInput).toHaveValue(firstName);
  await lastNameInput.fill(lastName);
  await expect(lastNameInput).toHaveValue(lastName);
  await emailInput.fill(email);
  await expect(emailInput).toHaveValue(email);
  await passwordInput.fill(password);
  await expect(passwordInput).toHaveValue(password);
  if (gender !== undefined) {
    select.selectOption(gender);
    expect(select).toHaveValue(gender);
  }
}
interface ClickSignUpBtnParams {
  page: Page;
  existingUser: boolean;
  baseURL?: string;
}

async function clickSignUpBtn({
  page,
  existingUser,
  baseURL,
}: ClickSignUpBtnParams) {
  const signUpLocator = page.getByTestId('sign-up-wrapper');
  const signUpBtn = signUpLocator.locator('button').getByText("S'inscrire");
  await expect(signUpBtn).toBeEnabled();
  await signUpBtn.click();
  if (existingUser) {
    validatePageURL({ page, baseURL: baseURL || '', path: 'sign-up' });
    page.on('console', (msg) => {
      console.log(msg.type());
    });
  } else {
    const path = 'sign-in';
    await page.waitForURL(`${baseURL || ''}/${path}`);
    validatePageURL({ page, baseURL: baseURL || '', path });
  }
}

export { fillSignUpForm, clickSignUpBtn };
