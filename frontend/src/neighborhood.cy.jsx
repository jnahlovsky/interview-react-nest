import Neighborhood from './neighborhood';

describe('<Neighborhood />', () => {
    const mockProps = {
        id: '1-21',
        symbol: '#',
        value: 24,
        cells: [
            [1, 2, 3],
            [4, '#', 6],
            ['.', 8, '.'],
        ],
        isPopoverOpen: false,
        onPopoverToggle: () => {},
    };

    it('renders with basic props', () => {
        cy.mount(<Neighborhood {...mockProps} />);
        cy.get('[data-test-id="neighborhood"]').should('exist');
        cy.get('svg').should('exist');
        cy.get('span').contains('24');
    });

    it('displays correct color based on value', () => {
        cy.mount(<Neighborhood {...mockProps} />);
        // For value 24, color should be a light green shade
        cy.get('svg').should('have.attr', 'color', 'rgb(170, 255, 170)');
    });

    it('toggles popover on click', () => {
        const spy = cy.spy().as('popoverToggle');
        cy.mount(<Neighborhood {...mockProps} onPopoverToggle={spy} />);
        cy.get('[data-test-id="neighborhood"]').click();
        cy.get('@popoverToggle').should('have.been.calledWith', mockProps.id);
    });

    it('displays popover content when open', () => {
        cy.mount(<Neighborhood { ...{ ...mockProps, isPopoverOpen: true } } />);
        cy.get('[data-test-id*="neighborhood-popover-grid"]').should('be.visible');
        cy.get('[data-test-id*="neighborhood-popover-grid-center-cell"]').find('svg').should('exist');
        cy.get('[data-test-id*="neighborhood-popover-grid-cell"]').should('have.length', 8);
    });
});
