import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Home} from './Home';

describe('Accueil', () => {
  it('présente un seul profil par discipline et ouvre les deux parcours', () => {
    const onDiscipline = vi.fn(); const onOpen = vi.fn(); const onSurvey = vi.fn();
    render(<Home discipline="GAM" onDiscipline={onDiscipline} onOpen={onOpen} onSurvey={onSurvey}/>);
    expect(screen.getByText('Anthony MANSARD')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', {name: 'GAF'})); expect(onDiscipline).toHaveBeenCalledWith('GAF');
    fireEvent.click(screen.getByRole('button', {name: /Ouvrir la démo/})); expect(onOpen).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', {name: /Accède à tes propres statistiques/})); expect(onSurvey).toHaveBeenCalledOnce();
  });
});
