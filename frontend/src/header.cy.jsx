import Header from './header';

describe('<Header />', () => {
    it('renders with basic props', () => {
        const props = {
            isTimeFilterEnabled: false,
            setIsTimeFilterEnabled: () => {},
            currentDateTime: new Date(),
            currentPeriod: 0,
            isPopoverOpen: false,
            selectedSymbol: null,
            setSelectedSymbol: () => {},
        };
        cy.mount(<Header {...props} />);
        cy.get('[data-test-id="header"]').should('exist');
    });
});
