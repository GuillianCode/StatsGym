import {useEffect, useMemo, useRef, useState} from 'react';
import {accessOptionsByProfile, disciplines, featureKeys, priceScaleFor, surveyPayloadSchema, type SurveyPayload} from '@statsgym/contracts';
import {analytics} from '../lib/analytics';
import {submitSurvey} from '../lib/survey-api';

type Profile = SurveyPayload['profil'];
type AccessModel = SurveyPayload['access_model'];
type SurveyState = {
  submissionId: string;
  profil: Profile | '';
  clubName: string;
  discipline: string;
  context: string;
  ratings: number[];
  statsClarity: string;
  statsPreference: string;
  clubOffer: string;
  accessModel: AccessModel | '';
  priceRange: string;
  idea: string;
  firstName: string;
  lastName: string;
  email: string;
  waitlist: boolean;
};

const emptyState = (): SurveyState => ({
  submissionId: crypto.randomUUID(), profil: '', clubName: '', discipline: '', context: '', ratings: [0, 0, 0, 0, 0],
  statsClarity: '', statsPreference: '', clubOffer: '', accessModel: '', priceRange: '', idea: '',
  firstName: '', lastName: '', email: '', waitlist: false,
});

const profileFeatures: Record<Profile, [string, string][]> = {
  gymnaste: [['Historique des compétitions', 'Vos résultats, notes et classements.'], ['Repères par agrès', 'Vos agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Vos podiums et médailles.'], ['Progression dans le temps', 'L’évolution de vos notes, grâce à des graphiques.'], ['Comparer deux gymnastes', 'Comparer vos statistiques avec un autre gymnaste.']],
  parent: [['Historique des compétitions', 'Les résultats, notes et classements de votre enfant.'], ['Repères par agrès', 'Les agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Les podiums et médailles de votre enfant.'], ['Progression dans le temps', 'L’évolution des notes de votre enfant, grâce à des graphiques.'], ['Comparer deux gymnastes', 'Comparer ses statistiques avec un autre gymnaste.']],
  entraineur: [['Historique des compétitions', 'Les résultats, notes et classements des gymnastes encadrés.'], ['Repères par agrès', 'Les agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Les podiums et médailles des gymnastes encadrés.'], ['Progression dans le temps', 'L’évolution des notes, grâce à des graphiques.'], ['Comparer deux gymnastes', 'Comparer les statistiques de deux gymnastes encadrés.']],
  club: [['Historique des compétitions', 'Les résultats, notes et classements du club.'], ['Repères par agrès', 'Les agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Les podiums et médailles du club.'], ['Progression dans le temps', 'L’évolution des notes, grâce à des graphiques.'], ['Comparer deux gymnastes', 'Comparer les statistiques de deux gymnastes du club.']],
};

const profileOptions: [Profile, string][] = [['gymnaste', 'Gymnaste'], ['parent', 'Parent'], ['entraineur', 'Entraîneur'], ['club', 'Représentant(e) de club']];

function Field({label, children}: {label: string; children: React.ReactNode}) {
  return <label className="survey-field"><span>{label}</span>{children}</label>;
}

function Select({value, onChange, placeholder, options}: {value: string; onChange: (value: string) => void; placeholder: string; options: readonly (string | readonly [string, string])[]}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const normalized = options.map(option => Array.isArray(option) ? [option[0], option[1]] as const : [option, option] as const);
  const selected = normalized.find(([key]) => key === value)?.[1];
  useEffect(() => {const close = (event: PointerEvent) => {if (!ref.current?.contains(event.target as Node)) setOpen(false);}; addEventListener('pointerdown', close); return () => removeEventListener('pointerdown', close);}, []);
  return <div ref={ref} className={`pretty-select${open ? ' open' : ''}${value ? ' has-value' : ''}`}>
    <select className="native-select" required value={value} onChange={event => onChange(event.target.value)}><option value="" disabled>{placeholder}</option>{normalized.map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select>
    <button className="select-trigger" type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(value => !value)}><span className={selected ? 'selected' : ''}>{selected || placeholder}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></button>
    <div className="select-content" role="listbox">{normalized.map(([key, label]) => <button type="button" className="select-item" role="option" aria-selected={key === value} key={key} onClick={() => {onChange(key); setOpen(false);}}>{label}</button>)}</div>
  </div>;
}

export function Survey() {
  const stepLabels = ['Profil', 'Fonctionnalités', 'Attentes', 'Vos idées', 'Coordonnées'];
  const [step, setStep] = useState(0);
  const [state, setState] = useState<SurveyState>(emptyState);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{simulated: boolean} | null>(null);
  const [storyReady, setStoryReady] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const profile = state.profil || 'gymnaste';

  useEffect(() => {analytics.capture('survey_step_viewed', {survey: 'new-sondage', step_number: step + 1});}, [step]);
  useEffect(() => {if (success) videoRef.current?.play().catch(() => {});}, [success]);

  const set = <K extends keyof SurveyState>(key: K, value: SurveyState[K]) => setState(previous => ({...previous, [key]: value}));
  const changeProfile = (value: string) => setState(previous => ({
    ...previous, profil: value as Profile, context: '', ratings: [0, 0, 0, 0, 0], statsClarity: '', statsPreference: '', clubOffer: '', accessModel: '', priceRange: '',
  }));
  const changeAccess = (value: AccessModel) => setState(previous => ({...previous, accessModel: value, priceRange: ''}));
  const accessScale = state.accessModel ? priceScaleFor(state.accessModel) : undefined;

  const contextOptions = useMemo(() => profile === 'entraineur' ? ['1–10', '11–30', '31–60', '61–100', 'Plus de 100'] : profile === 'club' ? ['1–100', '101–250', '251–500', '501–1 000', 'Plus de 1 000'] : ['Loisir', 'Compétition fédérale', 'Compétition nationale', 'Élite / haut niveau'], [profile]);
  const pageValid = () => {
    if (step === 0) return Boolean(state.profil && state.discipline && state.context);
    if (step === 1) return state.ratings.every(Boolean) && (profile === 'club' ? Boolean(state.clubOffer) : Boolean(state.statsClarity && state.statsPreference));
    if (step === 2) {
      if (!state.accessModel) return false;
      return !accessScale || Boolean(state.priceRange);
    }
    if (step === 4) return Boolean(state.firstName.trim() && state.lastName.trim() && /^\S+@\S+\.\S+$/.test(state.email));
    return true;
  };

  const payload = (): SurveyPayload => surveyPayloadSchema.parse({
    submission_id: state.submissionId, profil: state.profil, club_name: state.clubName, discipline: state.discipline, context: state.context,
    feature_ratings: Object.fromEntries(featureKeys.map((key, index) => [key, state.ratings[index]])),
    stats_clarity: profile === 'club' ? null : state.statsClarity || null,
    stats_preference: profile === 'club' ? null : state.statsPreference || null,
    club_offer: profile === 'club' ? state.clubOffer || null : null,
    access_model: state.accessModel,
    club_pricing_model: null,
    price_range: accessScale ? state.priceRange || null : null,
    price_period: accessScale ? accessScale.period : null,
    idea: state.idea, first_name: state.firstName, last_name: state.lastName, email: state.email,
    waitlist_opt_in: state.waitlist,
  });

  const next = async () => {
    setError('');
    if (!pageValid()) {setError('Complétez les champs demandés avant de continuer.'); return;}
    analytics.capture('survey_step_completed', {survey: 'new-sondage', step_number: step + 1});
    if (step < 4) {setStep(value => value + 1); return;}
    setSending(true);
    try {
      const result = await submitSurvey(payload());
      setSuccess(result);
      if (!result.simulated) analytics.capture('survey_response_submitted', {survey: 'new-sondage', profile, discipline: state.discipline});
    } catch {
      setError('Impossible d’enregistrer votre réponse. Vérifiez votre connexion puis réessayez.');
      analytics.capture('survey_submission_failed', {survey: 'new-sondage'});
    } finally {setSending(false);}
  };

  const shareLink = async () => {
    const url = new URL(location.href); url.searchParams.set('utm_source', 'participant_share'); url.searchParams.set('utm_medium', 'native_share'); url.searchParams.set('utm_campaign', 'new_sondage');
    await navigator.share?.({title: 'Découvre StatsGym', text: 'Teste la démo StatsGym et donne ton avis !', url: url.toString()});
  };
  const shareStory = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}assets/share/statsgym-story.jpg`);
    const file = new File([await response.blob()], 'statsgym-story.jpg', {type: 'image/jpeg'});
    if (!navigator.canShare?.({files: [file]})) throw new Error('unsupported');
    await navigator.share({files: [file], title: 'Découvre StatsGym'});
  };

  useEffect(() => {
    if (!success) return;
    fetch(`${import.meta.env.BASE_URL}assets/share/statsgym-story.jpg`).then(response => {
      if (!response.ok) throw new Error(); return response.blob();
    }).then(() => setStoryReady(true)).catch(() => setShareStatus('Impossible de préparer l’image de story.'));
  }, [success]);

  if (success) return <section className="tab-page survey-page"><article className="survey-card glass-panel survey-success">
    <h2>Merci pour votre retour.</h2>
    {success.simulated && <p className="local-notice">Mode local : réponse simulée, aucune donnée enregistrée.</p>}
    <p>Il nous aide à construire un StatsGym utile à la communauté gymnique. Avant de partager, découvrez ce petit message.</p>
    <div className="thank-you-video"><video ref={videoRef} controls autoPlay playsInline preload="metadata" aria-label="Merci d’avoir répondu au sondage StatsGym"><source src={`${import.meta.env.BASE_URL}assets/video/statsgym-merci.mp4`} type="video/mp4"/></video></div>
    <div className="share-actions"><button type="button" disabled={!storyReady} onClick={() => shareStory().then(() => setShareStatus('Le menu de partage est ouvert. Choisissez Instagram puis Story.')).catch(() => setShareStatus('Le partage de fichier n’est pas disponible sur ce navigateur.'))}>{storyReady ? 'Partager en story Instagram' : 'Préparation du partage Instagram…'}</button><button className="secondary" type="button" disabled={!navigator.share} onClick={() => shareLink().then(() => setShareStatus('Merci pour le partage !')).catch(() => setShareStatus('Partage annulé ou indisponible.'))}>Partager la démo autrement</button></div>
    <p className="share-status" role="status" aria-live="polite">{shareStatus || (!navigator.share ? 'Le partage natif sera disponible sur mobile une fois le site ouvert en HTTPS.' : '')}</p>
  </article></section>;

  return <section className="tab-page survey-page"><article className="survey-card glass-panel">
    <div className="survey-progress"><div className="survey-dots">{stepLabels.map((label, index) => <button type="button" key={label} className={`${index === step ? 'active' : ''}${index < step ? ' done' : ''}`} disabled={index > step} onClick={() => index <= step && setStep(index)}><i/><span>{label}</span></button>)}</div><div className="survey-bar"><i style={{width: `${step / 4 * 100}%`}}/></div></div>
    <div className="survey-stage">
      {step === 0 && <><h2>Accédez à vos propres statistiques</h2><p>La démo présente les statistiques de trois gymnastes. Pour demander l’accès à vos propres données, il faut répondre à ce questionnaire.</p><p>Vos réponses nous permettent de construire l’accès StatsGym le plus utile pour votre profil.</p><Field label="Vous êtes…"><Select value={state.profil} onChange={changeProfile} placeholder="Choisir votre profil" options={profileOptions}/></Field><Field label="Nom du club (facultatif)"><input value={state.clubName} onChange={event => set('clubName', event.target.value)}/></Field><Field label="Discipline gymnique"><Select value={state.discipline} onChange={value => set('discipline', value)} placeholder="Choisir une discipline" options={disciplines}/></Field><Field label={profile === 'club' ? 'Combien de licenciés compte votre club ?' : profile === 'entraineur' ? 'Combien de gymnastes encadrez-vous ?' : profile === 'parent' ? 'Niveau de pratique de votre enfant' : 'Niveau de pratique'}><Select value={state.context} onChange={value => set('context', value)} placeholder="Choisir une réponse" options={contextOptions}/></Field></>}
      {step === 1 && <><h2>Évaluez les fonctionnalités de StatsGym</h2><p>Pour chaque fonctionnalité, notez son utilité de 1 (<strong>Pas du tout utile</strong>) à 5 (<strong>Indispensable</strong>).</p><div className="ratings">{profileFeatures[profile].map(([title, copy], index) => <article className="rating" key={title}><h3>{index + 1}. {title}</h3><p>{copy}</p><div className="rating-scale">{[1, 2, 3, 4, 5].map(value => <label key={value}><input type="radio" name={`rating-${index}`} checked={state.ratings[index] === value} onChange={() => setState(previous => ({...previous, ratings: previous.ratings.map((rating, ratingIndex) => ratingIndex === index ? value : rating)}))}/><span>{value}</span></label>)}</div></article>)}</div>{profile === 'club' ? <Field label="Un outil permettant à vos entraîneurs de suivre plus facilement les résultats et la progression des gymnastes est-il le type de service que votre club aimerait mettre à leur disposition ?"><Select value={state.clubOffer} onChange={value => set('clubOffer', value)} placeholder="Choisir une réponse" options={['all', 'some', 'maybe', 'no'].map((value, index) => [value, ['Oui, pour l’ensemble des entraîneurs du club', 'Oui, mais d’abord pour certains entraîneurs ou groupes', 'Peut-être, j’aimerais en savoir davantage', 'Non, ce n’est pas un outil que nous souhaiterions proposer'][index]] as const)}/></Field> : <><Field label={profile === 'entraineur' ? 'Les graphiques actuels vous donnent-ils suffisamment d’informations pour suivre la progression d’une gymnaste ?' : 'Les graphiques actuels vous paraissent-ils faciles à comprendre ?'}><Select value={state.statsClarity} onChange={value => set('statsClarity', value)} placeholder="Choisir une réponse" options={[['1', 'Pas du tout'], ['2', 'Plutôt non'], ['3', 'Moyennement'], ['4', 'Plutôt oui'], ['5', 'Tout à fait']]}/></Field><Field label={profile === 'entraineur' ? 'Pour suivre vos gymnastes, préféreriez-vous une vue plus simple et plus rapide à lire, ou des graphiques encore plus poussés pour aller plus loin dans l’analyse ?' : 'Préférez-vous une vue plus simple des statistiques, ou des graphiques encore plus poussés ?'}><Select value={state.statsPreference} onChange={value => set('statsPreference', value)} placeholder="Choisir une réponse" options={[['simple', 'Une vue plus simple'], ['balanced', 'L’équilibre actuel me convient'], ['advanced', 'Des graphiques et analyses plus poussés']]}/></Field></>}</>}
      {step === 2 && <><h2>Et pour la suite ?</h2><p>Quelle proposition correspond le mieux à ce que vous attendez de StatsGym ?</p><div className="choice-list">{accessOptionsByProfile[profile].map(([value, label]) => <label className="choice" key={value}><input type="radio" checked={state.accessModel === value} onChange={() => changeAccess(value)}/><span>{label}</span></label>)}</div>{accessScale && <Field label={accessScale.prompt}><Select value={state.priceRange} onChange={value => set('priceRange', value)} placeholder={accessScale.period === 'annual' ? 'Choisir un budget annuel' : 'Choisir un budget mensuel'} options={accessScale.ranges}/></Field>}</>}
      {step === 3 && <><h2>Vos idées</h2><p>Dites-nous ce qui rendrait StatsGym plus utile ou plus accessible.</p><Field label="Une idée, un besoin ou une amélioration ? (facultatif)"><textarea rows={5} value={state.idea} onChange={event => set('idea', event.target.value)}/></Field></>}
      {step === 4 && <><h2>Finaliser votre demande d’accès</h2><p>Vos coordonnées servent à analyser les retours sur StatsGym. Nous ne vous contacterons au sujet du lancement que si vous cochez la case ci-dessous.</p><Field label="Prénom"><input required value={state.firstName} onChange={event => set('firstName', event.target.value)}/></Field><Field label="Nom"><input required value={state.lastName} onChange={event => set('lastName', event.target.value)}/></Field><Field label="E-mail"><input required type="email" value={state.email} onChange={event => set('email', event.target.value)}/></Field><label className="choice"><input type="checkbox" checked={state.waitlist} onChange={event => set('waitlist', event.target.checked)}/><span>Je souhaite être informé(e) du lancement de StatsGym</span></label></>}
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
    <footer className="survey-footer"><span>Étape {step + 1} sur 5</span><div><button className="secondary" type="button" hidden={step === 0} onClick={() => {setError(''); setStep(value => value - 1);}}>← Retour</button><button type="button" disabled={sending} onClick={next}>{sending ? 'Envoi en cours…' : step === 4 ? 'Envoyer ✓' : 'Continuer →'}</button></div></footer>
  </article></section>;
}
