/* Small progressive enhancement layer. It stays framework-agnostic while the
   React migration is introduced screen by screen. */
(() => {
  const close = (box) => {
    box.classList.remove('open');
    box.querySelector('.select-trigger')?.setAttribute('aria-expanded', 'false');
  };
  const open = (box) => {
    document.querySelectorAll('[data-select].open').forEach(close);
    box.classList.add('open');
    box.querySelector('.select-trigger')?.setAttribute('aria-expanded', 'true');
  };

  document.addEventListener('keydown', (event) => {
    const trigger = event.target.closest?.('.select-trigger');
    const current = event.target.closest?.('.select-item');
    if (!trigger && !current) return;
    const box = (trigger || current).closest('[data-select]');
    const items = [...box.querySelectorAll('.select-item')];
    const button = box.querySelector('.select-trigger');
    if (event.key === 'Escape') { event.preventDefault(); close(box); button.focus(); return; }
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open(box);
      (current ? items[Math.min(items.indexOf(current) + 1, items.length - 1)] : items[0])?.focus();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      open(box);
      (current ? items[Math.max(items.indexOf(current) - 1, 0)] : items.at(-1))?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    const item = event.target.closest?.('.select-item');
    if (item) close(item.closest('[data-select]'));
  });

  const title = document.querySelector('.hero-title');
  if (title && title.textContent.trim() === 'Stats_Gym') title.textContent = 'StatsGym';

  // Transitional bridge: React delegates navigation to the existing loaders
  // and charts, which remain the single data implementation.
  if (typeof window.openProfile === 'function' && !window.StatsGymLegacy) {
    const legacyOpenProfile = window.openProfile;
    const legacyGoToSearch = window.goToSearch;
    const homeState = { statsgym: true, view: 'home' };
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    const focusHome = () => requestAnimationFrame(() => document.querySelector('.statsgym-demo-athlete')?.focus());
    const showHome = () => {
      legacyGoToSearch();
      focusHome();
    };
    const selectDiscipline = (discipline) => {
      const button = document.querySelector(`.disc-btn[data-disc="${discipline}"]`);
      if (!button) throw new Error(`Discipline inconnue : ${discipline}`);
      if (!button.classList.contains('active')) button.click();
    };
    const showTab = (tab) => {
      if (typeof window.setTab === 'function') window.setTab(tab);
      else document.querySelector(`.dock-btn[data-tab="${tab}"]`)?.click();
    };
    const openDemoProfile = async ({ discipline, athleteId, tab = 'apercu', historyMode = 'push' }) => {
      const rowsBefore = currentRows;
      selectDiscipline(discipline);
      await legacyOpenProfile(athleteId);
      const profileLoaded = currentAthleteKey === athleteId && currentRows?.length && currentRows !== rowsBefore;
      if (!profileLoaded) {
        showHome();
        throw new Error('La fiche demandée n’a pas pu être chargée.');
      }
      await nextFrame();
      showTab(tab);
      const state = { statsgym: true, view: 'profile', discipline, athleteId, tab };
      if (historyMode === 'push') history.pushState(state, '');
      if (historyMode === 'replace') history.replaceState(state, '');
      window.dispatchEvent(new CustomEvent('statsgym:profile-loaded', { detail: { rows: currentRows || [] } }));
      return currentRows;
    };
    window.StatsGymLegacy = {
      rows: () => currentRows || [],
      openDemoProfile,
      goHome: () => window.goToSearch(),
    };
    window.openProfile = (athleteId) => openDemoProfile({
      discipline: currentDisc,
      athleteId,
      tab: 'apercu',
    });
    window.goToSearch = () => {
      if (history.state?.statsgym && history.state.view === 'profile') {
        history.back();
        return;
      }
      showHome();
      history.replaceState(homeState, '');
    };
    history.replaceState(homeState, '');
    const dock = document.getElementById('dock');
    if (dock) {
      const rememberActiveTab = () => {
        const state = history.state;
        const tab = dock.querySelector('.dock-btn.active')?.dataset.tab;
        if (state?.statsgym && state.view === 'profile' && tab && state.tab !== tab) {
          history.replaceState({ ...state, tab }, '');
        }
      };
      const tabObserver = new MutationObserver(rememberActiveTab);
      dock.querySelectorAll('.dock-btn').forEach((button) => tabObserver.observe(button, {
        attributes: true,
        attributeFilter: ['class'],
      }));
    }
    window.addEventListener('popstate', async (event) => {
      const state = event.state;
      if (!state?.statsgym || state.view === 'home') {
        showHome();
        return;
      }
      if (state.view === 'profile') {
        try {
          await openDemoProfile({ ...state, historyMode: 'none' });
        } catch (error) {
          console.error('Impossible de restaurer la navigation StatsGym :', error);
          history.replaceState(homeState, '');
        }
      }
    });
    document.addEventListener('keydown', (event) => {
      const editable = event.target.matches('input, textarea, select, [contenteditable="true"]');
      const profileVisible = getComputedStyle(document.getElementById('screen-profile')).display !== 'none';
      if (event.key === 'Escape' && profileVisible && !editable) {
        event.preventDefault();
        window.goToSearch();
      }
    });
  }

  const survey = document.getElementById('statsgym-form');
  if (survey) {
    document.getElementById('wizard-stage')?.setAttribute('aria-live', 'polite');
    const progress = document.getElementById('wizard-bar');
    progress?.setAttribute('role', 'progressbar');
    progress?.setAttribute('aria-valuemin', '1');
    progress?.setAttribute('aria-valuemax', '5');
    survey.addEventListener('invalid', (event) => {
      if (event.target.matches('input, textarea, select')) event.target.setAttribute('aria-invalid', 'true');
    }, true);
    survey.addEventListener('input', (event) => event.target.removeAttribute('aria-invalid'));
    survey.addEventListener('change', (event) => event.target.removeAttribute('aria-invalid'));
  }
})();
