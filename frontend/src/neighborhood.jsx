import PropTypes from 'prop-types';
import styled from 'styled-components';

import { symbolToIcon } from './helpers/utils';

const NeighborhoodContainer = styled.div`
    position: relative;
    background-color: var(--card-bg);
    border-radius: 8px;
    padding: 1.6rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    overflow: hidden;

    &:hover {
        background-color: var(--hover-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const IconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconSvg = styled.svg`
  width: 48px;
  height: 48px;
  fill: ${(props) => props.color};
`;

const Value = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const PopoverGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 10;

  ${(props) => props.$isOpen && `
    opacity: 1;
    visibility: visible;
  `}
`;

const GridCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.6rem;
  padding: 4px;
`;

const CenterGridCell = styled(GridCell)`
  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
`;

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

function Neighborhood({
    id,
    symbol,
    value,
    cells,
    isPopoverOpen,
    onPopoverToggle,
}) {
    const Icon = symbolToIcon[symbol];
    const percentage = (value / 72) * 100;
    const color = `rgb(${255 - ((255 * percentage) / 100)}, 255, ${255 - ((255 * percentage) / 100)})`;

    const handleClick = () => {
        onPopoverToggle(id);
    };

    return (
        <NeighborhoodContainer className="Neighborhood" onClick={handleClick}>
            <IconWrapper>
                <IconSvg as={Icon} color={color} />
                <Value>{value}</Value>
            </IconWrapper>
            <PopoverGrid $isOpen={isPopoverOpen}>
                {cells.flat().map((cellValue, index) => (
                    index === 4 ? (
                        <CenterGridCell key={index}>
                            <Icon />
                        </CenterGridCell>
                    ) : (
                        <GridCell key={index}>
                            {cellValue}
                        </GridCell>
                    )
                ))}
            </PopoverGrid>
        </NeighborhoodContainer>
    );
}

Neighborhood.propTypes = {
    id: PropTypes.string.isRequired,
    symbol: PropTypes.oneOf(Object.keys(symbolToIcon)).isRequired,
    value: PropTypes.number.isRequired,
    cells: PropTypes.array.isRequired,
    isPopoverOpen: PropTypes.bool.isRequired,
    onPopoverToggle: PropTypes.func.isRequired,
};

export default Neighborhood;
