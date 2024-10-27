import styled from 'styled-components';

const NeighborhoodContainer = styled.div``;

function Neighborhood() {
    // TODO: Implement the neighborhood component
    // The component should display the value and the symbol of the neighborhood
    // The symbol is displayed as an icon from the `symbolToIcon` map
    //
    // The component should also display a popover with the neighborhood cells
    // The popover should be displayed when the user clicks on the neighborhood
    // The popover should be closed when the user clicks on the neighborhood again
    // Optionally the popover can be closed when the user clicks outside of the popover
    //
    // The icon representing the symbol should be colored based on the value
    // - The value is a number between 0 and 72
    // - The color should be calculated as follows:
    //   - The value is converted to a percentage (0-100)
    //   - The percentage is converted to a color value, where 0 is white and 100 is green, the values in between are shades of green
    //
    // The component displaying the icon and value should be a button
    return (
        <NeighborhoodContainer classNames="Neighborhood" />
    );
}

Neighborhood.propTypes = {};

export default Neighborhood;
