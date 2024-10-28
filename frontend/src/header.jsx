import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { dateToString, symbolToIcon } from './helpers/utils';

const HeaderContainer = styled.header`
    position: relative;
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

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: ${props => props.$shouldShow ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const progressAnimation = `
  @keyframes progress {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: var(--success-color);
  transform-origin: left;
  transition: width 0.95s linear;
  ${props => props.$isAnimating && `
    animation: progress ${10 - (props.$initialSeconds % 10)}s linear forwards;
  `}
  ${progressAnimation}
`;

const SymbolButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-right: 16px;
`;

const SymbolButton = styled.button`
  background: ${props => props.$isSelected ? 'var(--primary-color)' : 'var(--card-bg)'};
  border: 2px solid ${props => props.$isSelected ? 'var(--primary-color)' : 'transparent'};
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }

  &:hover {
    background: var(--hover-color);
  }
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
    selectedSymbol,
    setSelectedSymbol,
}) {
    const [shouldShowProgress, setShouldShowProgress] = useState(true);
    const seconds = currentDateTime.getSeconds();
    const milliseconds = currentDateTime.getMilliseconds();
    const periodKey = Math.floor(seconds / 10);
    
    // Calculate initial progress based on current time within the 10-second interval
    const initialProgress = ((seconds % 10) * 1000 + milliseconds) / 10000 * 100;

    useEffect(() => {
        if (!isTimeFilterEnabled || isPopoverOpen) {
            setShouldShowProgress(false);
        } else {
            setShouldShowProgress(true);
        }
    }, [isTimeFilterEnabled, isPopoverOpen]);

    const handleSymbolClick = (symbol) => {
        setSelectedSymbol(current => current === symbol ? null : symbol);
    };

    return (
        <HeaderContainer>
            <HeaderTime>
                {dateToString(currentDateTime)}
                {isTimeFilterEnabled && (
                    <PeriodPill $isFreezed={isPopoverOpen}>
                        Period {currentPeriod} {isPopoverOpen && '(Freezed)'}
                    </PeriodPill>
                )}
            </HeaderTime>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SymbolButtonGroup>
                    {Object.entries(symbolToIcon).map(([symbol, Icon]) => (
                        <SymbolButton
                            key={symbol}
                            onClick={() => handleSymbolClick(symbol)}
                            $isSelected={selectedSymbol === symbol}
                            aria-label={symbol}
                        >
                            <Icon />
                        </SymbolButton>
                    ))}
                </SymbolButtonGroup>
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
            </div>
            {isTimeFilterEnabled && (
                <ProgressBarContainer 
                    key={periodKey} 
                    $shouldShow={shouldShowProgress}
                >
                    <ProgressBar 
                        style={{ width: `${initialProgress}%` }}
                        $isAnimating={true} 
                    />
                </ProgressBarContainer>
            )}
        </HeaderContainer>
    );
}

Header.propTypes = {
    isTimeFilterEnabled: PropTypes.bool.isRequired,
    setIsTimeFilterEnabled: PropTypes.func.isRequired,
    currentDateTime: PropTypes.instanceOf(Date).isRequired,
    currentPeriod: PropTypes.number.isRequired,
    isPopoverOpen: PropTypes.bool.isRequired,
    selectedSymbol: PropTypes.string,
    setSelectedSymbol: PropTypes.func.isRequired,
};

export default Header;
