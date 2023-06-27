import { render, screen } from '@testing-library/react';
import { WelcomePage } from '.';

// These unit tests were based on the acceptance criteria for the Welcome Page User Story.
test('renders Welcome Page component', () => {
    // Arrange
    const expectedTestId = 'welcome-page';

    // Act
    const { getByTestId } = render(<WelcomePage />);
    const welcomePage = getByTestId(expectedTestId);

    // Assert
    expect(welcomePage).toBeInTheDocument();
});


test('renders Welcome Page title', () => {
    // Arrange
    const expectedRegex = /Welcome to BlockHeads!/i;

    // Act
    render(<WelcomePage />);
    const carouselCaptionTitles = screen.getAllByText(expectedRegex);

    // Assert
    expect(carouselCaptionTitles[0]).toBeInTheDocument();
});

test('renders Welcome Page description', () => {
    // Arrange
    const expectedSubtring = "BlockHeads was designed to be an all-in-one solution to Lego set management";
    // "-0" here provided by id in component
    const expectedTestId = 'welcome-description-0';

    // Act
    const { getByTestId } = render(<WelcomePage />);
    const welcomeDescriptionTag = getByTestId(expectedTestId);
    
    // Assert
    expect(welcomeDescriptionTag).toBeInTheDocument();
    expect(welcomeDescriptionTag.textContent).toContain(expectedSubtring);
});