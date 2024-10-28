import styled from 'styled-components';
import PropTypes from 'prop-types';

import { dateToString } from './helpers/utils';

const HeaderContainer = styled.header`
    background-color: var(--card-bg);
    padding: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: background-color 0.2s ease-in-out;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: transform 0.2s ease-in-out;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--primary-color);
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderTime = styled.div``;

const PeriodPill = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: ${props => props.$isFreezed ? 'var(--error-color)' : 'var(--success-color)'};
  color: white;
  margin-left: 0.5rem;
`;

// TODO: This component should contain the controls for the app
// The controls are:
// - A toggle group to select the currently active symbol
//   - The buttons in the toggle group should have aria-label attribute with the symbol (for example `aria-label="@"`)
// - A checkbox to toggle if the current time period is used to filter results
//   - The checkbox should have ID `filter_by_time_period`

function Header({
    isTimeFilterEnabled,
    setIsTimeFilterEnabled,
    currentDateTime,
    currentPeriod,
    isPopoverOpen,
}) {
    return (
        <HeaderContainer>
            <HeaderTime>
                {dateToString(currentDateTime)}
                {isTimeFilterEnabled && (
                    <PeriodPill $isFreezed={isPopoverOpen}>Period {currentPeriod} {isPopoverOpen && '(Freezed)'}</PeriodPill>
                )}
            </HeaderTime>
            <ToggleLabel>
                <ToggleSwitch htmlFor="filter_by_time_period">
                    <input
                        type="checkbox"
                        id="filter_by_time_period"
                        checked={isTimeFilterEnabled}
                        onChange={(e) => setIsTimeFilterEnabled(e.target.checked)}
                    />
                    <span></span>
                </ToggleSwitch>
                Filter by time period
            </ToggleLabel>
        </HeaderContainer>
    );
}

Header.propTypes = {
    isTimeFilterEnabled: PropTypes.bool.isRequired,
    setIsTimeFilterEnabled: PropTypes.func.isRequired,
    currentDateTime: PropTypes.instanceOf(Date).isRequired,
    currentPeriod: PropTypes.number.isRequired,
    isPopoverOpen: PropTypes.bool.isRequired,
};

export default Header;
