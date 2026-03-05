import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, test } from 'vitest';
import Login from './Login';

test('remplit les champs et appelle onLogin au clic', async () => {
  const login = vi.fn();
  render(<Login onLogin={login} />);

  //Utilisation de ^ et $ pour une correspondance exacte du nom du champ (à cause de mui)
  fireEvent.change(screen.getByRole('textbox', { name: /^nom$/i }), {
    target: { value: 'Potter' },
  });

  fireEvent.change(screen.getByRole('textbox', { name: /^prénom$/i }), {
    target: { value: 'Harry' },
  });

  //Email
  fireEvent.change(screen.getByLabelText(/^email$/i, { selector: 'input' }), {
    target: { value: 'harry@gmail.com' },
  });

  //Clic sur le bouton
  fireEvent.click(screen.getByRole('button', { name: /confirmer/i }));

  // 4. Attente du callback
  await waitFor(() => {
    expect(login).toHaveBeenCalledTimes(1);
  });
  // Vérifier que les données sont bien dans le localStorage de JSDOM
  expect(localStorage.getItem('nom')).toContain('Potter');
  expect(localStorage.getItem('prenom')).toContain('Harry');
  expect(localStorage.getItem('email')).toContain('harry@gmail.com');
  console.log('LocalStorage nom après le test :', localStorage.getItem('nom'));
  console.log('LocalStorage prenom après le test :', localStorage.getItem('prenom'));
  console.log('LocalStorage email après le test :', localStorage.getItem('email'));
});
