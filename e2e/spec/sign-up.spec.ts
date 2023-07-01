import { test } from '@playwright/test';
import { fillSignUpForm, clickSignUpBtn, validatePageURL } from 'e2e/utils';
import { SignUpCredentials, User } from 'src/app/models/User.model';

test.describe('sign-up page test', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const path = 'sign-up';
    await page.goto(`/${path}`);
    validatePageURL({ page, baseURL: baseURL || '', path });
  });

  test('should allow sign-up without touching the select', async ({
    page,
    baseURL,
  }) => {
    const date = Date.now();
    const newUser: SignUpCredentials = {
      email: `maam@mail.fr${date}`,
      firstName: `maam${date}`,
      lastName: `maamName${date}`,
      password: `maam${date}`,
    };
    await fillSignUpForm({ page, baseURL, newUser });
    await clickSignUpBtn({ page, baseURL, existingUser: false });
  });

  test('should sign-up as woman', async ({ page, baseURL }) => {
    const date = Date.now();
    const newUser: SignUpCredentials = {
      email: `meme@mail.fr${date}`,
      firstName: `meme${date}`,
      lastName: `memeName${date}`,
      password: `meme${date}`,
      gender: 'female',
    };
    await fillSignUpForm({ page, baseURL, newUser });
    await clickSignUpBtn({ page, baseURL, existingUser: false });
  });

  test('should sign-up as man', async ({ page, baseURL }) => {
    const date = Date.now();
    const newUser: SignUpCredentials = {
      email: `pepe@mail.fr${date}`,
      firstName: `pepe${date}`,
      lastName: `pepeName${date}`,
      password: `pepe${date}`,
      gender: 'male',
    };
    await fillSignUpForm({ page, baseURL, newUser });
    await clickSignUpBtn({ page, baseURL, existingUser: false });
  });

  test('should unauthorize to use an existing user email', async ({
    page,
    baseURL,
  }) => {
    const newUser: SignUpCredentials = {
      email: 'ikd@mail.fr',
      firstName: 'ikd',
      lastName: 'ikd',
      password: 'ikd',
      gender: 'male',
    };
    await fillSignUpForm({ page, baseURL, newUser });
    await clickSignUpBtn({ page, baseURL, existingUser: true });
  });
  test('should allow navigation on route not protected by authGuard', async ({
    page,
    baseURL,
  }) => {});
  test('should disallow navigation on auth guard route', async ({
    page,
    baseURL,
  }) => {});
  test('should verify if sign-up nav link is active', async ({
    page,
    baseURL,
  }) => {});
  test('', async ({ page, baseURL }) => {});
});
