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

test('regroupe les compétitions et ouvre la finale associée', async ({page}) => {
  await page.goto('./');
  await page.getByRole('button', {name: /Ouvrir la démo/}).click();
  await page.getByRole('button', {name: 'Compétitions', exact: true}).click();
  const first = page.locator('details').first();
  await expect(first).toContainText('77.45');
  await first.locator('summary').click();
  await expect(first).toContainText('Finale par agrès — Barres parallèles');
  await expect(first).toContainText('13.73 · 1er');
});

test('attend la sélection du partenaire puis affiche le duel historique', async ({page}) => {
  await page.goto('./');
  await page.getByRole('button', {name: /Ouvrir la démo/}).click();
  await page.getByRole('button', {name: 'Comparer', exact: true}).click();
  const comparison = page.locator('.comparison-page');
  await expect(comparison.getByText('Duel', {exact: true})).toHaveCount(0);
  await page.getByRole('button', {name: /Comparer avec/}).click();
  await expect(comparison.getByText('5 résultats pour Anthony MANSARD · 3 pour Arthur REINHARDT')).toBeVisible();
  await expect(comparison.getByText('104.75')).toBeVisible();
  await expect(comparison.getByText('100.78')).toBeVisible();
});
