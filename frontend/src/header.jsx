import styled from 'styled-components';

import { dateToString } from './helpers/utils';

const HeaderContainer = styled.header``;

function Header() {
    // TODO: Currently, the date does not change. It should update every second
    const currentDateTime = new Date();

    // TODO: This component should contain the controls for the app
    // The controls are:
    // - A toggle group to select the currently active symbol
    //   - The buttons in the toggle group should have aria-label attribute with the symbol (for example `aria-label="@"`)
    // - A checkbox to toggle if the current time period is used to filter results
    //   - The checkbox should have ID `filter_by_time_period`

    return (
        <HeaderContainer className='Header'>
            <div className='Header-Time'>{dateToString(currentDateTime)}</div>
        </HeaderContainer>
    );
}

Header.propTypes = {};

export default Header;
