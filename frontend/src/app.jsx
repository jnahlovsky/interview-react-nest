import styled from 'styled-components';

import Header from './header';
import Neighborhood from './neighborhood';
import useData from './use_data';

const AppContainer = styled.div``;

function App() {
    const { neighborhoods, isLoading } = useData();

    // TODO: Implement the app logic
    // 1. The neighborhoods should be filtered by current time period, @see `utils.js` - `getTimePeriod`
    //   - when the period is 0, only neighborhoods with value of 0 - 9 are displayed
    //   - When the period is 1, only neighborhoods with value of 10 - 19 are displayed, etc.
    //   - When the period is 5, neighborhoods with value 50 - 72 are displayed.
    // 2. The neighborhoods should be optionally filtered by the currently selected symbol (if selected)
    // 3. The time period filtering can be toggled on and off
    // 4. Opening the popover should stop the time period filtering while the popover is open

    return (
        <AppContainer>
            <Header />
            {isLoading ? (<div>Processing data</div>) : (
                <main>
                    {neighborhoods.map(({ id }) => <Neighborhood key={id} />)}
                </main>
            )}
        </AppContainer>
    );
}

export default App;
