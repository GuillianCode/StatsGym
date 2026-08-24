import {fireEvent, render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it} from 'vitest';
import {Survey} from './Survey';

describe('Questionnaire', () => {
  beforeEach(() => sessionStorage.clear());
  it('conserve cinq étapes et bloque une étape incomplète', () => {
    render(<Survey/>);
    expect(screen.getByText('Étape 1 sur 5')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: 'Continuer →'}));
    expect(screen.getByRole('alert')).toHaveTextContent('Complétez les champs');
  });

  it('réinitialise le contexte quand le profil change', () => {
    render(<Survey/>);
    fireEvent.change(screen.getByLabelText('Vous êtes…'), {target: {value: 'club'}});
    fireEvent.change(screen.getByLabelText('Combien de licenciés compte votre club ?'), {target: {value: '101–250'}});
    fireEvent.change(screen.getByLabelText('Vous êtes…'), {target: {value: 'gymnaste'}});
    expect(screen.getByLabelText('Niveau de pratique')).toHaveValue('');
  });
});
