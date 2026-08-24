import {useEffect, useMemo, useRef, useState} from 'react';
import {disciplines, featureKeys, surveyPayloadSchema, type SurveyPayload} from '@statsgym/contracts';
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
  clubPricingModel: string;
  priceRange: string;
  idea: string;
  firstName: string;
  lastName: string;
  email: string;
  waitlist: boolean;
};

const storageKey = 'statsgym-survey-v1';
const emptyState = (): SurveyState => ({
  submissionId: crypto.randomUUID(), profil: '', clubName: '', discipline: '', context: '', ratings: [0, 0, 0, 0, 0],
  statsClarity: '', statsPreference: '', clubOffer: '', accessModel: '', clubPricingModel: '', priceRange: '', idea: '',
  firstName: '', lastName: '', email: '', waitlist: false,
});

function restoreState(): SurveyState {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey) || 'null') as SurveyState | null;
    return value?.submissionId ? {...emptyState(), ...value} : emptyState();
  } catch { return emptyState(); }
}

const profileFeatures: Record<Profile, [string, string][]> = {
  gymnaste: [['Historique des compétitions', 'Vos résultats, notes et classements.'], ['Repères par agrès', 'Vos agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Vos podiums et médailles.'], ['Progression dans le temps', 'L’évolution de vos notes, grâce à des graphiques.'], ['Comparer deux gymnastes', 'Comparer vos statistiques avec un autre gymnaste.']],
  parent: [['Historique des compétitions', 'Les résultats, notes et classements de votre enfant.'], ['Repères par agrès', 'Les agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Les podiums et médailles de votre enfant.'], ['Progression dans le temps', 'L’évolution des notes de votre enfant.'], ['Comparer deux gymnastes', 'Comparer ses statistiques avec un autre gymnaste.']],
  entraineur: [['Historique des compétitions', 'Les résultats, notes et classements des gymnastes encadrés.'], ['Repères par agrès', 'Les agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Les podiums et médailles des gymnastes encadrés.'], ['Progression dans le temps', 'L’évolution des notes.'], ['Comparer deux gymnastes', 'Comparer deux gymnastes encadrés.']],
  club: [['Historique des compétitions', 'Les résultats, notes et classements du club.'], ['Repères par agrès', 'Les agrès les plus solides et ceux à travailler.'], ['Palmarès', 'Les podiums et médailles du club.'], ['Progression dans le temps', 'L’évolution des notes.'], ['Comparer deux gymnastes', 'Comparer deux gymnastes du club.']],
};

const profileOptions: [Profile, string][] = [['gymnaste', 'Gymnaste'], ['parent', 'Parent'], ['entraineur', 'Entraîneur'], ['club', 'Représentant(e) de club']];
const accessOptions: [AccessModel, string][] = [['no_pay', 'Je ne pense pas être prêt à payer pour ce type d’application.'], ['club_access', 'Je pense que mon club devrait financer cet accès.'], ['freemium', 'Je préférerais une version gratuite avec des options avancées payantes.'], ['individual', 'Je serais prêt à payer moi-même cet accès.']];

function Field({label, children}: {label: string; children: React.ReactNode}) {
  return <label className="survey-field"><span>{label}</span>{children}</label>;
}

function Select({value, onChange, placeholder, options}: {value: string; onChange: (value: string) => void; placeholder: string; options: readonly (string | readonly [string, string])[]}) {
  return <select required value={value} onChange={event => onChange(event.target.value)}><option value="" disabled>{placeholder}</option>{options.map(option => {const [key, label] = Array.isArray(option) ? option : [option, option]; return <option value={key} key={key}>{label}</option>;})}</select>;
}

export function Survey() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<SurveyState>(restoreState);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{simulated: boolean} | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const profile = state.profil || 'gymnaste';

  useEffect(() => {sessionStorage.setItem(storageKey, JSON.stringify(state));}, [state]);
  useEffect(() => {analytics.capture('survey_step_viewed', {survey: 'new-sondage', step_number: step + 1});}, [step]);
  useEffect(() => {if (success) videoRef.current?.play().catch(() => {});}, [success]);

  const set = <K extends keyof SurveyState>(key: K, value: SurveyState[K]) => setState(previous => ({...previous, [key]: value}));
  const changeProfile = (value: string) => setState(previous => ({
    ...previous, profil: value as Profile, context: '', ratings: [0, 0, 0, 0, 0], statsClarity: '', statsPreference: '', clubOffer: '', accessModel: '', clubPricingModel: '', priceRange: '',
  }));
  const changeAccess = (value: AccessModel) => setState(previous => ({...previous, accessModel: value, clubPricingModel: '', priceRange: ''}));

  const contextOptions = useMemo(() => profile === 'entraineur' ? ['1–10', '11–30', '31–60', '61–100', 'Plus de 100'] : profile === 'club' ? ['1–100', '101–250', '251–500', '501–1 000', 'Plus de 1 000'] : ['Loisir', 'Compétition fédérale', 'Compétition nationale', 'Élite / haut niveau'], [profile]);
  const pageValid = () => {
    if (step === 0) return Boolean(state.profil && state.discipline && state.context);
    if (step === 1) return state.ratings.every(Boolean) && (profile === 'club' ? Boolean(state.clubOffer) : Boolean(state.statsClarity && state.statsPreference));
    if (step === 2) {
      if (!state.accessModel) return false;
      if (profile === 'club' && state.accessModel === 'club_access') return Boolean(state.clubPricingModel && state.priceRange);
      if (profile !== 'club' && ['individual', 'freemium'].includes(state.accessModel)) return Boolean(state.priceRange);
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
    club_pricing_model: profile === 'club' && state.accessModel === 'club_access' ? state.clubPricingModel || null : null,
    price_range: state.priceRange || null,
    price_period: state.priceRange ? (profile === 'club' ? 'annual' : 'monthly') : null,
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
      setSuccess(result); sessionStorage.removeItem(storageKey);
      if (!result.simulated) analytics.capture('survey_response_submitted', {survey: 'new-sondage', profile, discipline: state.discipline, club_name: state.clubName || null});
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

  if (success) return <section className="tab-page survey-page"><article className="survey-card glass-panel survey-success">
    <h2>Merci pour votre retour.</h2>
    {success.simulated && <p className="local-notice">Mode local : réponse simulée, aucune donnée enregistrée.</p>}
    <p>Il nous aide à construire un StatsGym utile à la communauté gymnique. Avant de partager, découvrez ce petit message.</p>
    <div className="thank-you-video"><video ref={videoRef} controls autoPlay playsInline preload="metadata" aria-label="Merci d’avoir répondu au sondage StatsGym"><source src={`${import.meta.env.BASE_URL}assets/video/statsgym-merci.mp4`} type="video/mp4"/></video></div>
    <div className="share-actions"><button type="button" onClick={() => shareStory().catch(() => {})}>Partager en story Instagram</button><button className="secondary" type="button" onClick={() => shareLink().catch(() => {})}>Partager la démo autrement</button></div>
  </article></section>;

  return <section className="tab-page survey-page"><article className="survey-card glass-panel">
    <div className="survey-progress"><div className="survey-meta"><span>Votre avis</span><span>Étape {step + 1} sur 5</span></div><div><i style={{width: `${step / 4 * 100}%`}}/></div></div>
    <div className="survey-stage">
      {step === 0 && <><h2>Accédez à vos propres statistiques</h2><p>La démo présente les statistiques de trois gymnastes. Pour demander l’accès à vos propres données, il faut répondre à ce questionnaire.</p><Field label="Vous êtes…"><Select value={state.profil} onChange={changeProfile} placeholder="Choisir votre profil" options={profileOptions}/></Field><Field label="Nom du club (facultatif)"><input value={state.clubName} onChange={event => set('clubName', event.target.value)}/></Field><Field label="Discipline gymnique"><Select value={state.discipline} onChange={value => set('discipline', value)} placeholder="Choisir une discipline" options={disciplines}/></Field><Field label={profile === 'club' ? 'Combien de licenciés compte votre club ?' : profile === 'entraineur' ? 'Combien de gymnastes encadrez-vous ?' : 'Niveau de pratique'}><Select value={state.context} onChange={value => set('context', value)} placeholder="Choisir une réponse" options={contextOptions}/></Field></>}
      {step === 1 && <><h2>Évaluez les fonctionnalités de StatsGym</h2><p>Pour chaque fonctionnalité, notez son utilité de 1 à 5.</p><div className="ratings">{profileFeatures[profile].map(([title, copy], index) => <article className="rating" key={title}><h3>{index + 1}. {title}</h3><p>{copy}</p><div className="rating-scale">{[1, 2, 3, 4, 5].map(value => <label key={value}><input type="radio" name={`rating-${index}`} checked={state.ratings[index] === value} onChange={() => setState(previous => ({...previous, ratings: previous.ratings.map((rating, ratingIndex) => ratingIndex === index ? value : rating)}))}/><span>{value}</span></label>)}</div></article>)}</div>{profile === 'club' ? <Field label="Votre club aimerait-il proposer cet outil à ses entraîneurs ?"><Select value={state.clubOffer} onChange={value => set('clubOffer', value)} placeholder="Choisir une réponse" options={['all', 'some', 'maybe', 'no'].map((value, index) => [value, ['Oui, à tous', 'Oui, à certains', 'Peut-être', 'Non'][index]] as const)}/></Field> : <><Field label="Les graphiques actuels sont-ils faciles à comprendre ?"><Select value={state.statsClarity} onChange={value => set('statsClarity', value)} placeholder="Choisir une réponse" options={[['1', 'Pas du tout'], ['2', 'Plutôt non'], ['3', 'Moyennement'], ['4', 'Plutôt oui'], ['5', 'Tout à fait']]}/></Field><Field label="Quel niveau de détail préférez-vous ?"><Select value={state.statsPreference} onChange={value => set('statsPreference', value)} placeholder="Choisir une réponse" options={[['simple', 'Une vue plus simple'], ['balanced', 'L’équilibre actuel'], ['advanced', 'Des analyses plus poussées']]}/></Field></>}</>}
      {step === 2 && <><h2>Comment aimeriez-vous accéder à StatsGym ?</h2><p>Quel modèle d’accès vous conviendrait le mieux ?</p><div className="choice-list">{accessOptions.map(([value, label]) => <label className="choice" key={value}><input type="radio" checked={state.accessModel === value} onChange={() => changeAccess(value)}/><span>{label}</span></label>)}</div>{profile === 'club' && state.accessModel === 'club_access' && <><Field label="Mode de financement"><Select value={state.clubPricingModel} onChange={value => setState(previous => ({...previous, clubPricingModel: value, priceRange: ''}))} placeholder="Choisir un mode" options={[['all_members', 'Forfait pour tous les licenciés'], ['per_gymnast', 'Prix par gymnaste']]}/></Field><Field label="Budget annuel"><Select value={state.priceRange} onChange={value => set('priceRange', value)} placeholder="Choisir un budget" options={['50-99', '100-199', '200-299', '300-399', '400-500']}/></Field></>}{profile !== 'club' && ['individual', 'freemium'].includes(state.accessModel) && <Field label="Budget mensuel"><Select value={state.priceRange} onChange={value => set('priceRange', value)} placeholder="Choisir un budget" options={['1-2', '3-4', '5-6', '7-8', '9-10']}/></Field>}</>}
      {step === 3 && <><h2>Vos idées</h2><p>Dites-nous ce qui rendrait StatsGym plus utile ou plus accessible.</p><Field label="Une idée, un besoin ou une amélioration ? (facultatif)"><textarea rows={5} value={state.idea} onChange={event => set('idea', event.target.value)}/></Field></>}
      {step === 4 && <><h2>Finaliser votre demande d’accès</h2><p>Vos coordonnées servent à analyser les retours. Nous vous contacterons au sujet du lancement uniquement si vous le demandez.</p><Field label="Prénom"><input required value={state.firstName} onChange={event => set('firstName', event.target.value)}/></Field><Field label="Nom"><input required value={state.lastName} onChange={event => set('lastName', event.target.value)}/></Field><Field label="E-mail"><input required type="email" value={state.email} onChange={event => set('email', event.target.value)}/></Field><label className="choice"><input type="checkbox" checked={state.waitlist} onChange={event => set('waitlist', event.target.checked)}/><span>Je souhaite être informé(e) du lancement de StatsGym</span></label></>}
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
    <footer className="survey-footer"><button className="secondary" type="button" hidden={step === 0} onClick={() => {setError(''); setStep(value => value - 1);}}>Retour</button><button type="button" disabled={sending} onClick={next}>{sending ? 'Envoi en cours…' : step === 4 ? 'Envoyer ✓' : 'Continuer →'}</button></footer>
  </article></section>;
}
