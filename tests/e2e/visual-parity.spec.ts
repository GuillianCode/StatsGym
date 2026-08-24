import {expect, test} from '@playwright/test';

test('fige les cinq pages de la fiche validée', async ({page}) => {
  await page.goto('./');
  await page.getByRole('button', {name: /Ouvrir la démo/}).click();
  await page.waitForTimeout(500);

  const shell = await page.locator('.profile-shell').boundingBox();
  expect(Math.round(shell?.width ?? 0)).toBe(Math.min(536, page.viewportSize()!.width));

  for (const [tab, snapshot] of [
    ['Aperçu', 'fiche-apercu.png'],
    ['Compétitions', 'fiche-competitions.png'],
    ['Statistiques', 'fiche-statistiques.png'],
    ['Comparer', 'fiche-comparer.png'],
    ['Le projet', 'fiche-sondage.png'],
  ] as const) {
    await page.getByRole('button', {name: tab, exact: true}).click();
    await page.waitForTimeout(450);
    await expect(page).toHaveScreenshot(snapshot, {animations: 'disabled', maxDiffPixelRatio: .005});
  }
});
