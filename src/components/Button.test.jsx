import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
test("Le compteur s'incrémente au clic", () => {
  render(<App />);
  const button = screen.getByText('count is 0');
  fireEvent.click(button);
  expect(screen.getByText('count is 1')).toBeInTheDocument();
});
