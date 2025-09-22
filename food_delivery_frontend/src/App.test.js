import { render, screen } from '@testing-library/react';
import App from './App';

test('renders nav brand and cart icon placeholder', () => {
  render(<App />);
  // Brand text
  expect(screen.getByText(/Food Delivery/i)).toBeInTheDocument();
  // Cart icon button
  expect(screen.getByLabelText(/Cart/i)).toBeInTheDocument();
});
