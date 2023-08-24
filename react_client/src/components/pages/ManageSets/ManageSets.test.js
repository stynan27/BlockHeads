import { render, screen } from '@testing-library/react';
import { ManageSets } from '.';

// These unit tests were based on the acceptance criteria for the Set Management Page User Story.
test('renders ManageSets Page component', () => {
    // Arrange
    const expectedTestId = 'manage-sets-page';

    // Act
    const { getByTestId } = render(<ManageSets />);
    const manageSetsPage = getByTestId(expectedTestId);

    // Assert
    expect(manageSetsPage).toBeInTheDocument();
});


test('renders ManageSets Page title', () => {
    // Arrange
    const expectedRegex = /Manage Lego Sets/i;

    // Act
    render(<ManageSets />);
    const carouselCaptionTitles = screen.getAllByText(expectedRegex);

    // Assert
    expect(carouselCaptionTitles[0]).toBeInTheDocument();
});

test('renders Lego Set table', () => {

});

test('renders Add Lego Set button', () => {

});

test('renders Edit Lego set button', () => {

});

test('renders Delete Lego set button', () => {

});

// test('renders Price field', () => {

// });