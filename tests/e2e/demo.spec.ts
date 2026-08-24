import {expect, test} from '@playwright/test';

test('parcourt la fiche et ses cinq onglets', async ({page}) => {
  await page.goto('./');
  await expect(page.getByRole('heading', {name: 'StatsGym'})).toBeVisible();
  await page.getByRole('button', {name: /Ouvrir la démo/}).click();
  await expect(page.getByText('Anthony MANSARD')).toBeVisible();
  for (const tab of ['Compétitions', 'Statistiques', 'Comparer', 'Le projet']) {
    await page.getByRole('button', {name: tab, exact: true}).click();
  }
  await expect(page.getByText('Accédez à vos propres statistiques')).toBeVisible();
});

test('change de discipline depuis l’accueil', async ({page}) => {
  await page.goto('./');
  await page.getByRole('tab', {name: 'GR'}).click();
  await expect(page.getByText('Hélène KARBANOV')).toBeVisible();
});
