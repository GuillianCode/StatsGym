import {expect, test} from '@playwright/test';

async function ouvrirFiche(page: import('@playwright/test').Page) {
  await page.goto('./');
  await page.locator('.statsgym-home-athlete').first().click();
  await expect(page.locator('body')).not.toHaveClass(/sur-recherche/);
  await expect(page.locator('.dock-btn[data-tab="apercu"]')).toHaveClass(/active/);
}

test('change les onglets immédiatement et synchronise l’historique', async ({page}) => {
  await ouvrirFiche(page);

  for (const [index, tab] of ['apercu', 'competitions', 'statistiques', 'compare', 'classement'].entries()) {
    await page.locator(`.dock-btn[data-tab="${tab}"]`).click();
    const etat = await page.evaluate(async ({index, tab}) => {
      await new Promise(requestAnimationFrame);
      const piste = document.querySelector<HTMLElement>('.tabs-piste')!;
      return {
        actif: document.querySelector<HTMLButtonElement>('.dock-btn.active')?.dataset.tab,
        attendu: index * piste.clientWidth,
        position: piste.scrollLeft,
        historique: history.state?.tab,
      };
    }, {index, tab});
    expect(etat).toEqual({actif: tab, attendu: etat.attendu, position: etat.attendu, historique: tab});
  }
});

test('revient à l’accueil en une action et restaure la fiche avec suivant', async ({page}) => {
  await ouvrirFiche(page);
  const longueur = await page.evaluate(() => history.length);

  const retour = page.locator('button.retour');
  await expect(retour).toHaveCSS('width', '44px');
  await expect(retour).toHaveCSS('height', '44px');
  await retour.click();
  await expect(page.locator('body')).toHaveClass(/sur-recherche/);
  await expect.poll(() => page.evaluate(() => history.state?.view)).toBe('home');
  expect(await page.evaluate(() => history.length)).toBe(longueur);

  await page.goForward();
  await expect(page.locator('body')).not.toHaveClass(/sur-recherche/);
  await expect.poll(() => page.evaluate(() => history.state?.view)).toBe('profile');
});

test('mémorise la lecture de chaque onglet et remonte l’onglet retouché', async ({page}) => {
  await ouvrirFiche(page);
  const competitions = page.locator('.dock-btn[data-tab="competitions"]');
  await competitions.click();
  await page.evaluate(() => scrollTo(0, 600));
  const position = await page.evaluate(() => scrollY);
  expect(position).toBeGreaterThan(100);

  await page.locator('.dock-btn[data-tab="apercu"]').click();
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await competitions.click();
  expect(await page.evaluate(() => scrollY)).toBe(position);

  await competitions.click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test('ne révèle pas la fiche avant que son historique soit prêt', async ({page}) => {
  await page.goto('./');
  await page.evaluate(() => {
    const ouvrir = window.openProfile;
    window.openProfile = async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 250));
      return ouvrir(id);
    };
  });

  await page.locator('.statsgym-home-athlete').first().click();
  await page.waitForTimeout(100);
  await expect(page.locator('body')).toHaveClass(/sur-recherche/);
  expect(await page.evaluate(() => history.state?.view)).toBe('home');

  await expect(page.locator('body')).not.toHaveClass(/sur-recherche/);
  expect(await page.evaluate(() => history.state?.view)).toBe('profile');
});

test('annule un chargement devenu obsolète et supprime les voiles noirs', async ({page}) => {
  await page.goto('./');
  const resultat = await page.evaluate(async () => {
    const ouvrir = window.openProfile;
    window.openProfile = async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return ouvrir(id);
    };
    const navigation = window.ouvrirDepuisAccueil('GAM', 2677368, 'apercu', null);
    window.afficherAccueil();
    await navigation;
    const profil = document.querySelector('#screen-profile')!;
    return {
      vue: history.state?.view,
      accueil: document.body.classList.contains('sur-recherche'),
      voileHaut: getComputedStyle(profil, '::before').content,
      voileBas: getComputedStyle(profil, '::after').content,
    };
  });

  expect(resultat).toEqual({vue: 'home', accueil: true, voileHaut: 'none', voileBas: 'none'});
});

declare global {
  interface Window {
    afficherAccueil(): void;
    ouvrirDepuisAccueil(
      discipline: string,
      athleteId: number,
      onglet: string,
      source: HTMLElement | null,
      historique?: string,
    ): Promise<boolean>;
    openProfile(athleteId: number): Promise<unknown>;
  }
}
