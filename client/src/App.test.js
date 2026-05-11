import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('muestra el título de la landing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Henry Countries/i);
  expect(titleElement).toBeInTheDocument();
});
