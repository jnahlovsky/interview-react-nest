import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from './header';
import { getTimePeriod } from './helpers/utils';
import Neighborhood from './neighborhood';
import useData from './use_data';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

// App logic
// 1. The neighborhoods should be filtered by current time period, @see `utils.js` - `getTimePeriod`
//   - when the period is 0, only neighborhoods with value of 0 - 9 are displayed
//   - When the period is 1, only neighborhoods with value of 10 - 19 are displayed, etc.
//   - When the period is 5, neighborhoods with value 50 - 72 are displayed.
// 2. The neighborhoods should be optionally filtered by the currently selected symbol (if selected)
// 3. The time period filtering can be toggled on and off
// 4. Opening the popover should stop the time period filtering while the popover is open

function App() {
    const { neighborhoods, isLoading } = useData();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [isTimeFilterEnabled, setIsTimeFilterEnabled] = useState(true);
    const [activePopoverId, setActivePopoverId] = useState(null);
    const [currentPeriod, setCurrentPeriod] = useState(0);

    // Update current time and period every second
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentDateTime(now);
            if (isTimeFilterEnabled && !activePopoverId) {
                setCurrentPeriod(getTimePeriod(now));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [activePopoverId, isTimeFilterEnabled]);

    const filteredNeighborhoods = neighborhoods.filter((neighborhood) => {
        const isInTimePeriod = (currentPeriod === 5
            ? neighborhood.value >= 50 && neighborhood.value <= 72
            : Math.floor(neighborhood.value / 10) === currentPeriod);

        const matchesSymbol = !selectedSymbol || neighborhood.type === selectedSymbol;

        if (isTimeFilterEnabled) {
            return isInTimePeriod && matchesSymbol;
        }

        return matchesSymbol;
    });

    const handlePopoverToggle = (neighborhoodId) => {
        setActivePopoverId((current) => (current === neighborhoodId ? null : neighborhoodId),
        );
    };

    return (
        <AppContainer>
            <Header
                currentDateTime={currentDateTime}
                currentPeriod={currentPeriod}
                isTimeFilterEnabled={isTimeFilterEnabled}
                setIsTimeFilterEnabled={setIsTimeFilterEnabled}
                selectedSymbol={selectedSymbol}
                setSelectedSymbol={setSelectedSymbol}
                isPopoverOpen={!!activePopoverId}
            />
            {isLoading ? (<div>Processing data</div>) : (
                <main>
                    {filteredNeighborhoods.map((neighborhood) => (
                        <Neighborhood
                            key={neighborhood.id}
                            id={neighborhood.id}
                            value={neighborhood.value}
                            symbol={neighborhood.type}
                            cells={neighborhood.cells}
                            isPopoverOpen={activePopoverId === neighborhood.id}
                            onPopoverToggle={handlePopoverToggle}
                        />
                    ))}
                </main>
            )}
        </AppContainer>
    );
}

export default App;
