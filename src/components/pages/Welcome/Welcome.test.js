import { render, screen } from '@testing-library/react';
import { WelcomePage } from '.';

// These unit tests were based on the acceptance criteria for the Welcome Page User Story.
test('renders Welcome Page component', () => {
    // Arrange

    // Act
    const { getByTestId } = render(<WelcomePage />);
    const welcomePage = getByTestId('welcome-page');

    // Assert
    expect(welcomePage).toBeInTheDocument();
});


test('renders Welcome Page title', () => {
    // Arrange

    // Act
    render(<WelcomePage />);
    const carouselCaptionTitles = screen.getAllByText(/Welcome to BlockHeads!/i);

    // Assert
    expect(carouselCaptionTitles[0]).toBeInTheDocument();
});

test('renders Welcome Page description', () => {
    // Arrange
    const expectedSubtring = "BlockHeads was designed to be an all-in-one solution to Lego set management"

    // Act
    const { getByTestId } = render(<WelcomePage />);
    
    // Assert
    expect(getByTestId('welcome-description-0')).toBeInTheDocument();
    expect(getByTestId('welcome-description-0').textContent).toContain(expectedSubtring);
});