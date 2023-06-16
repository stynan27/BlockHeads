import { render, screen } from '@testing-library/react';
import App from '.';

test('renders BlockHeads App text', () => {
  render(<App />);
  const linkElement = screen.getByText(/BlockHeads App/i);
  expect(linkElement).toBeInTheDocument();
});
