import { render, screen } from '@testing-library/react';
import App from '.';

test('renders Welcome title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to BlockHeads!/i);
  expect(linkElement).toBeInTheDocument();
});
