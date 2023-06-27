import { render, screen } from '@testing-library/react';
import App from '.';

test('renders BlockHeads Core App', () => {
    // Arrange
    const expectedTestId = 'core-app';

    // Act
    const { getByTestId } = render(<App />);
    const CoreApp = getByTestId(expectedTestId);

    // Assert
    expect(CoreApp).toBeInTheDocument();
});
