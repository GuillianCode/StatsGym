import {expect, test} from '@playwright/test';

async function ouvrirFiche(page: import('@playwright/test').Page) {
  await page.goto('./');
  await page.locator('.statsgym-home-athlete').first().click();
  await expect(page.locator('body')).not.toHaveClass(/sur-recherche/);
  await expect(page.locator('.dock-btn[data-tab="apercu"]')).toHaveClass(/active/);
}

async function afficherRemerciement(page: import('@playwright/test').Page) {
  await ouvrirFiche(page);
  await page.locator('.dock-btn[data-tab="classement"]').click();
  const next = page.locator('#wizard-next');
  await page.evaluate(() => {
    for (const [name, value] of Object.entries({profil: 'gymnaste', discipline: 'Gymnastique artistique féminine', context: 'Loisir'}))
      document.querySelector<HTMLInputElement>(`[name="${name}"]`)!.value = value;
  });
  await next.click();
  await page.evaluate(() => {
    for (let index = 0; index < 5; index += 1)
      document.querySelector<HTMLInputElement>(`[name="feature_${index}"][value="5"]`)!.checked = true;
    document.querySelector<HTMLInputElement>('[name="stats_clarity"]')!.value = '5';
    document.querySelector<HTMLInputElement>('[name="stats_preference"]')!.value = 'balanced';
  });
  await next.click();
  await page.evaluate(() => {
    document.querySelector<HTMLInputElement>('[name="access_model"][value="current_ok"]')!.checked = true;
  });
  await next.click();
  await next.click();
  await page.locator('[name="first_name"]').fill('Test');
  await page.locator('[name="last_name"]').fill('Partage');
  await page.locator('[name="email"]').fill('partage@example.com');
  await next.click();
  await expect(page.locator('.share-success')).toBeVisible();
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

test('dessine réellement le profil par agrès après la révélation', async ({page}) => {
  await ouvrirFiche(page);
  await expect.poll(() => page.evaluate(() => {
    const chart = (window as typeof window & {Chart: any}).Chart.getChart('radarChart');
    return chart.getDatasetMeta(0).data.every((point: {x: number; y: number}) =>
      Number.isFinite(point.x) && Number.isFinite(point.y));
  }), {timeout: 500}).toBe(true);

  const radar = await page.evaluate(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('#radarChart')!;
    const chart = (window as typeof window & {Chart: any}).Chart.getChart(canvas);
    const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
    let peints = 0;
    let bleus = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] !== 0) peints += 1;
      if (pixels[i] !== 0 && pixels[i - 1] > pixels[i - 3] + 20) bleus += 1;
    }
    const padding = chart.options.layout.padding;
    return {
      largeur: chart.chartArea.width,
      valeurs: chart.data.datasets[0].data.length,
      centreFini: Number.isFinite(chart.scales.r.xCenter),
      paddingFini: Number.isFinite(padding.left) && Number.isFinite(padding.right),
      pointsFinis: chart.getDatasetMeta(0).data.every((point: {x: number; y: number}) =>
        Number.isFinite(point.x) && Number.isFinite(point.y)),
      pixelsPeints: peints,
      pixelsBleus: bleus,
    };
  });

  expect(radar.largeur).toBeGreaterThan(0);
  expect(radar.valeurs).toBe(6);
  expect(radar.centreFini).toBe(true);
  expect(radar.paddingFini).toBe(true);
  expect(radar.pointsFinis).toBe(true);
  expect(radar.pixelsPeints).toBeGreaterThan(0);
  expect(radar.pixelsBleus).toBeGreaterThan(0);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
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

test('tente de lire la vidéo de remerciement automatiquement avec le son', async ({page}) => {
  await ouvrirFiche(page);
  await page.locator('.dock-btn[data-tab="classement"]').click();
  await page.evaluate(() => {
    (window as typeof window & {videoPlayCalls: number}).videoPlayCalls = 0;
    HTMLMediaElement.prototype.play = function () {
      (window as typeof window & {videoPlayCalls: number}).videoPlayCalls += 1;
      return Promise.resolve();
    };
  });

  const next = page.locator('#wizard-next');
  await page.evaluate(() => {
    for (const [name, value] of Object.entries({
      profil: 'gymnaste',
      discipline: 'Gymnastique artistique féminine',
      context: 'Loisir',
    })) document.querySelector<HTMLInputElement>(`[name="${name}"]`)!.value = value;
  });
  await next.click();

  await page.evaluate(() => {
    for (let index = 0; index < 5; index += 1)
      document.querySelector<HTMLInputElement>(`[name="feature_${index}"][value="5"]`)!.checked = true;
    document.querySelector<HTMLInputElement>('[name="stats_clarity"]')!.value = '5';
    document.querySelector<HTMLInputElement>('[name="stats_preference"]')!.value = 'balanced';
  });
  await next.click();

  await page.evaluate(() => {
    document.querySelector<HTMLInputElement>('[name="access_model"][value="current_ok"]')!.checked = true;
  });
  await next.click();
  await next.click();
  await page.locator('[name="first_name"]').fill('Test');
  await page.locator('[name="last_name"]').fill('Autoplay');
  await page.locator('[name="email"]').fill('autoplay@example.com');
  await next.click();

  const video = page.locator('.thank-you-video video');
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute('autoplay', '');
  await expect(video).not.toHaveAttribute('muted', '');
  await expect.poll(() => page.evaluate(() =>
    (window as typeof window & {videoPlayCalls: number}).videoPlayCalls,
  )).toBeGreaterThan(0);
});

test('propose un seul bouton et transmet un lien attribué au partage natif', async ({page}) => {
  await page.addInitScript(() => {
    (window as typeof window & {shareCalls: ShareData[]}).shareCalls = [];
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async (data: ShareData) => {
        (window as typeof window & {shareCalls: ShareData[]}).shareCalls.push(data);
      },
    });
  });
  await afficherRemerciement(page);
  await page.evaluate(() => {
    (window as typeof window & {analyticsEvents: {event: string; properties: Record<string, unknown>}[]}).analyticsEvents = [];
    (window as typeof window & {StatsGymAnalytics: {capture: (event: string, properties: Record<string, unknown>) => void}}).StatsGymAnalytics.capture = (event, properties) => {
      (window as typeof window & {analyticsEvents: {event: string; properties: Record<string, unknown>}[]}).analyticsEvents.push({event, properties});
    };
  });

  const buttons = page.locator('.share-actions button');
  await expect(buttons).toHaveCount(1);
  await expect(buttons).toHaveText('Partager StatsGym');
  await buttons.click();

  const calls = await page.evaluate(() => (window as typeof window & {shareCalls: ShareData[]}).shareCalls);
  expect(calls).toHaveLength(1);
  expect(calls[0].title).toBe('Découvre StatsGym');
  expect(calls[0].text).toBe('Teste la démo StatsGym et donne ton avis !');
  expect(calls[0].files).toBeUndefined();
  const url = new URL(calls[0].url!.toString());
  expect(url.searchParams.get('utm_source')).toBe('participant_share');
  expect(url.searchParams.get('utm_medium')).toBe('native_share');
  expect(url.searchParams.get('utm_campaign')).toBe('new_sondage');
  expect(url.searchParams.get('share_id')).toBeTruthy();
  await expect(page.locator('#share-status')).toHaveText('Partage transmis à l’application choisie.');

  const successfulEvents = await page.evaluate(() => (window as typeof window & {analyticsEvents: {event: string; properties: Record<string, unknown>}[]}).analyticsEvents);
  expect(successfulEvents.map(({event}) => event)).toEqual(['survey_share_started', 'survey_share_handoff']);
  expect(successfulEvents.every(({properties}) => properties.share_method === 'native_share')).toBe(true);

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', {configurable: true, value: async () => {throw new DOMException('cancelled', 'AbortError');}});
  });
  await buttons.click();
  await expect(page.locator('#share-status')).toHaveText('Partage annulé.');
  const cancelledEvents = await page.evaluate(() => (window as typeof window & {analyticsEvents: {event: string; properties: Record<string, unknown>}[]}).analyticsEvents);
  expect(cancelledEvents.map(({event}) => event)).toEqual(['survey_share_started', 'survey_share_handoff', 'survey_share_started']);
});

test('explique pourquoi le partage natif est indisponible', async ({page}) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'share', {configurable: true, value: undefined}));
  await afficherRemerciement(page);

  await expect(page.locator('.share-actions button')).toHaveCount(1);
  await expect(page.locator('#share-native')).toBeDisabled();
  await expect(page.locator('#share-status')).toHaveText('Le partage natif sera disponible sur mobile une fois le site ouvert en HTTPS.');
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
